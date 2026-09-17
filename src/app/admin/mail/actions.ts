"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isValidObjectId, Types } from "mongoose";
import { requirePermission } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { MailMessage } from "@/lib/models/MailMessage";
import { Member } from "@/lib/models/Member";
import { Enquiry } from "@/lib/models/Enquiry";
import { cleanEmailAddress, sendCustomMail } from "@/lib/mail";

export type SendMailFormState = {
  error?: string;
  success?: boolean;
  messageId?: string;
  fieldErrors?: Record<string, string>;
  simulated?: boolean;
};

export async function sendMailAction(
  _prev: SendMailFormState,
  formData: FormData,
): Promise<SendMailFormState> {
  const session = await requirePermission("mail:write");

  const recipientMode = String(formData.get("recipientMode") || "custom");
  const rawTo = String(formData.get("to") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const bodyText = String(formData.get("body") || "").trim();
  const memberId = String(formData.get("memberId") || "").trim();
  const enquiryId = String(formData.get("enquiryId") || "").trim();
  const inReplyTo = String(formData.get("inReplyTo") || "").trim();

  const fieldErrors: Record<string, string> = {};

  if (!subject) {
    fieldErrors.subject = "Subject is required";
  }
  if (!bodyText) {
    fieldErrors.body = "Message body is required";
  }

  let recipients: string[] = [];

  await connectDb();

  if (recipientMode === "all_active_members") {
    const activeMembers = await Member.find({ status: "active" })
      .select("email firstName lastName")
      .lean();
    recipients = activeMembers.map((m) => m.email).filter(Boolean);
    if (recipients.length === 0) {
      return { error: "No active members found to send to." };
    }
  } else if (recipientMode === "investor_members") {
    const investorMembers = await Member.find({
      status: "active",
      tier: "investor",
    })
      .select("email")
      .lean();
    recipients = investorMembers.map((m) => m.email).filter(Boolean);
    if (recipients.length === 0) {
      return { error: "No active investor members found." };
    }
  } else if (recipientMode === "non_investor_members") {
    const nonInvestors = await Member.find({
      status: "active",
      tier: "non_investor",
    })
      .select("email")
      .lean();
    recipients = nonInvestors.map((m) => m.email).filter(Boolean);
    if (recipients.length === 0) {
      return { error: "No active non-investor members found." };
    }
  } else {
    // Custom or specific recipient
    if (!rawTo) {
      fieldErrors.to = "Recipient email is required";
    } else {
      recipients = rawTo
        .split(/[,;\n]/)
        .map((e) => e.trim())
        .filter(Boolean);
      for (const email of recipients) {
        if (!cleanEmailAddress(email)) {
          fieldErrors.to = `Invalid email address: ${email}`;
          break;
        }
      }
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  try {
    const result = await sendCustomMail({
      to: recipients,
      subject,
      bodyText,
      memberId: memberId && isValidObjectId(memberId) ? memberId : undefined,
      enquiryId: enquiryId && isValidObjectId(enquiryId) ? enquiryId : undefined,
      inReplyTo: inReplyTo && isValidObjectId(inReplyTo) ? inReplyTo : undefined,
      adminUser: {
        id: session.id,
        name: session.name,
        email: session.email,
        role: session.role,
      },
    });

    if (!result.success && !result.simulated) {
      return { error: result.error || "Failed to deliver email" };
    }

    revalidatePath("/admin/mail");
    if (memberId) revalidatePath(`/admin/members/${memberId}`);
    if (enquiryId) revalidatePath(`/admin/applications/${enquiryId}`);

    return {
      success: true,
      messageId: result.messageDocId,
      simulated: result.simulated,
    };
  } catch (err) {
    console.error("[sendMailAction] error:", err);
    return {
      error: err instanceof Error ? err.message : "An unexpected error occurred while sending email.",
    };
  }
}

export async function toggleReadAction(id: string, isRead: boolean): Promise<void> {
  await requirePermission("mail:read");
  if (!isValidObjectId(id)) return;

  await connectDb();
  await MailMessage.updateOne({ _id: id }, { $set: { isRead } });
  revalidatePath("/admin/mail");
  revalidatePath(`/admin/mail/${id}`);
}

export async function deleteMailAction(id: string): Promise<void> {
  await requirePermission("mail:write");
  if (!isValidObjectId(id)) return;

  await connectDb();
  await MailMessage.deleteOne({ _id: id });
  revalidatePath("/admin/mail");
  redirect("/admin/mail");
}

export type SimulateInboundState = {
  error?: string;
  success?: boolean;
};

export async function simulateInboundAction(
  _prev: SimulateInboundState,
  formData: FormData,
): Promise<SimulateInboundState> {
  await requirePermission("mail:write");

  const from = String(formData.get("from") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const body = String(formData.get("body") || "").trim();

  if (!from || !subject || !body) {
    return { error: "Sender email, subject, and message body are required." };
  }

  const fromEmail = cleanEmailAddress(from) || from.toLowerCase();

  try {
    await connectDb();

    const [matchingMember, matchingEnquiry] = await Promise.all([
      Member.findOne({ email: fromEmail }).select("_id").lean(),
      Enquiry.findOne({ email: fromEmail })
        .sort({ createdAt: -1 })
        .select("_id")
        .lean(),
    ]);

    await MailMessage.create({
      direction: "inbound",
      from,
      fromEmail,
      to: ["Anchor Secretariat <secretariat@anchorrealestategroup.ng>"],
      toEmail: ["secretariat@anchorrealestategroup.ng"],
      subject,
      bodyText: body,
      status: "received",
      isRead: false,
      member: matchingMember?._id,
      enquiry: matchingEnquiry?._id,
    });

    revalidatePath("/admin/mail");
    return { success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to simulate incoming email",
    };
  }
}
