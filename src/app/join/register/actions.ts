"use server";

import { headers } from "next/headers";
import { connectDb } from "@/lib/db";
import {
  Registration,
  nextRegistrationReference,
  registrantName,
} from "@/lib/models/Registration";
import { MailMessage } from "@/lib/models/MailMessage";
import { sendRegistrationMail } from "@/lib/mail";
import { fieldErrorsOf, registrationSchema } from "@/lib/validation";
import { duplicateKeyField } from "@/lib/mongoErrors";
import { PHOTO_MAX_BYTES, type PhotoType } from "@/lib/constants";
import { sniffImageType } from "@/lib/photo";

export type RegistrationFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  reference?: string;
  /** True when the registration was stored but the receipt could not be sent. */
  mailDelayed?: boolean;
};

/** Per-IP ceiling within this window, to blunt scripted submissions. */
const IP_WINDOW_MS = 10 * 60 * 1000;
const IP_LIMIT = 5;

async function clientIp(): Promise<string | undefined> {
  const store = await headers();
  const forwarded = store.get("x-forwarded-for");
  // Render sits behind a proxy; the client is the first entry.
  return forwarded?.split(",")[0]?.trim() || undefined;
}

type PhotoResult =
  | { photo: { data: Buffer; contentType: PhotoType; size: number } }
  | { error: string };

async function readPhoto(value: FormDataEntryValue | null): Promise<PhotoResult> {
  if (!(value instanceof File) || value.size === 0) {
    return { error: "Add a recent passport photograph." };
  }

  if (value.size > PHOTO_MAX_BYTES) {
    return { error: "That photograph is too large. Choose one under 2 MB." };
  }

  const data = Buffer.from(await value.arrayBuffer());
  const contentType = sniffImageType(data);

  if (!contentType) {
    return { error: "Use a JPG, PNG or WebP photograph." };
  }

  return { photo: { data, contentType, size: data.length } };
}

export async function submitRegistration(
  _previous: RegistrationFormState,
  formData: FormData,
): Promise<RegistrationFormState> {
  // Honeypot: a real person never fills a field they cannot see. Answer as if
  // it succeeded so a bot learns nothing from the response.
  if (formData.get("website")) {
    return { reference: "ARG-APP-0000-0000" };
  }

  const parsed = registrationSchema.safeParse({
    surname: formData.get("surname"),
    firstName: formData.get("firstName"),
    otherNames: formData.get("otherNames"),
    dateOfBirth: formData.get("dateOfBirth"),
    maritalStatus: formData.get("maritalStatus"),
    officeAddress: formData.get("officeAddress"),
    department: formData.get("department"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    nokName: formData.get("nokName"),
    nokRelationship: formData.get("nokRelationship"),
    nokAddress: formData.get("nokAddress"),
    nokPhone: formData.get("nokPhone"),
    monthlyContribution: formData.get("monthlyContribution"),
    contributionStartsOn: formData.get("contributionStartsOn"),
    bankName: formData.get("bankName"),
    accountNumber: formData.get("accountNumber"),
    consentAppProfile: formData.get("consentAppProfile") === "on",
    consentDigitalId: formData.get("consentDigitalId") === "on",
    declaration: formData.get("declaration") === "on",
    signatureName: formData.get("signatureName"),
    witnessName: formData.get("witnessName"),
    witnessAddress: formData.get("witnessAddress"),
  });

  const photoResult = await readPhoto(formData.get("photo"));

  // Report the photo alongside the text fields, so one round trip shows the
  // applicant everything that needs fixing.
  if (!parsed.success || "error" in photoResult) {
    return {
      fieldErrors: {
        ...(parsed.success ? {} : fieldErrorsOf(parsed.error)),
        ...("error" in photoResult ? { photo: photoResult.error } : {}),
      },
    };
  }

  const input = parsed.data;
  const email = input.email.toLowerCase();

  try {
    await connectDb();

    const open = await Registration.findOne({
      email,
      status: { $in: ["new", "reviewing"] },
    })
      .select("reference")
      .lean();

    if (open) {
      return {
        error: `We already have a registration from this email address (${open.reference}) and it is with the Secretariat. There is no need to submit again.`,
      };
    }

    const ip = await clientIp();

    if (ip) {
      const recentFromIp = await Registration.countDocuments({
        submittedIp: ip,
        createdAt: { $gte: new Date(Date.now() - IP_WINDOW_MS) },
      });

      if (recentFromIp >= IP_LIMIT) {
        return {
          error: "Too many registrations from this connection. Please try again later.",
        };
      }
    }

    const registration = await Registration.create({
      reference: await nextRegistrationReference(new Date().getUTCFullYear()),
      surname: input.surname,
      firstName: input.firstName,
      otherNames: input.otherNames || undefined,
      dateOfBirth: input.dateOfBirth,
      maritalStatus: input.maritalStatus,
      officeAddress: input.officeAddress,
      department: input.department,
      phone: input.phone,
      email,
      nextOfKin: {
        name: input.nokName,
        relationship: input.nokRelationship,
        address: input.nokAddress,
        phone: input.nokPhone,
      },
      monthlyContributionKobo: input.monthlyContribution,
      contributionStartsOn: input.contributionStartsOn,
      bankName: input.bankName,
      accountNumber: input.accountNumber,
      consentAppProfile: input.consentAppProfile,
      consentDigitalId: input.consentDigitalId,
      signatureName: input.signatureName,
      declaredAt: new Date(),
      witness:
        input.witnessName || input.witnessAddress
          ? {
              name: input.witnessName || undefined,
              address: input.witnessAddress || undefined,
            }
          : undefined,
      photo: photoResult.photo,
      submittedIp: ip,
      status: "new",
    });

    // The plain object still carries the photo bytes from creation; the mail
    // helpers have no use for them.
    const saved = registration.toObject();
    delete saved.photo;
    const name = registrantName(saved);

    // Also record as an inbound message in the Admin Mailbox.
    try {
      await MailMessage.create({
        direction: "inbound",
        from: `${input.firstName} ${input.surname} <${email}>`,
        fromEmail: email,
        to: ["Anchor Secretariat <secretariat@anchorrealestategroup.ng>"],
        toEmail: ["secretariat@anchorrealestategroup.ng"],
        subject: `New Registration — ${name} (${saved.reference})`,
        bodyText: `Membership registration form received via the website.\n\n[Department: ${input.department}, Phone: ${input.phone}, Ref: ${saved.reference}]`,
        status: "received",
        isRead: false,
        registration: saved._id,
      });
    } catch (mailErr) {
      console.warn("[registration] failed to create inbox message", mailErr);
    }

    // The registration is already safe in the database. Mail is attempted
    // after, and its outcome recorded rather than thrown, so a mail outage
    // can never cost the Society an application.
    const outcome = await sendRegistrationMail(saved);

    await Registration.updateOne(
      { _id: saved._id },
      {
        $set: {
          applicantMail: outcome.applicant,
          secretariatMail: outcome.secretariat,
          mailError: outcome.error,
        },
      },
    );

    return {
      reference: saved.reference,
      mailDelayed: outcome.applicant !== "sent",
    };
  } catch (error) {
    if (duplicateKeyField(error) === "reference") {
      return { error: "Please submit again — a reference collision occurred." };
    }

    console.error("[registration] submission failed", error);
    return {
      error:
        "We could not record your registration just now. Please try again, or call the Secretariat on +234 902 525 0026.",
    };
  }
}
