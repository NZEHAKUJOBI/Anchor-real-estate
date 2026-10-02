"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { actorId, checkPermission } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Registration } from "@/lib/models/Registration";
import { Member } from "@/lib/models/Member";
import { nextMembershipNumber } from "@/lib/models/Counter";
import { recordAudit } from "@/lib/models/AuditLog";
import { fieldErrorsOf, registrationReviewSchema } from "@/lib/validation";
import { TOTAL_SLOT_POOL } from "@/lib/constants";
import { slotsAllocatedExcluding } from "@/lib/reporting";
import { duplicateKeyField, messageOf } from "@/lib/mongoErrors";
import { formatNumber } from "@/lib/money";

export type RegistrationReviewState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
};

export async function reviewRegistration(
  _previous: RegistrationReviewState,
  formData: FormData,
): Promise<RegistrationReviewState> {
  const guard = await checkPermission("enquiries:write");
  if ("error" in guard) return { error: guard.error };

  const parsed = registrationReviewSchema.safeParse({
    registrationId: formData.get("registrationId"),
    decision: formData.get("decision"),
    appProfileCreated: formData.get("appProfileCreated") ?? "",
    tier: formData.get("tier") ?? undefined,
    slots: formData.get("slots") ?? undefined,
    reviewNote: formData.get("reviewNote"),
  });

  if (!parsed.success) return { fieldErrors: fieldErrorsOf(parsed.error) };

  const { registrationId, decision, appProfileCreated, tier, slots, reviewNote } =
    parsed.data;
  if (!isValidObjectId(registrationId)) return { error: "Unknown registration." };

  let createdMemberId: string | null = null;

  try {
    await connectDb();

    const registration = await Registration.findById(registrationId).lean();
    if (!registration) return { error: "That registration no longer exists." };

    // Approving seeds the register once; later saves on an approved form only
    // update the review and official-use fields.
    if (decision === "approved" && !registration.member) {
      if (!tier) {
        return { fieldErrors: { tier: "Choose the member's tier." } };
      }

      const holding = tier === "investor" ? (slots ?? 0) : 0;

      // A pending member does not consume the pool, but flag an overflow now
      // rather than at admission time.
      const allocated = await slotsAllocatedExcluding();
      if (holding > TOTAL_SLOT_POOL - allocated) {
        return {
          fieldErrors: {
            slots: `Only ${formatNumber(TOTAL_SLOT_POOL - allocated)} slots remain unallocated.`,
          },
        };
      }

      const member = await Member.create({
        membershipNumber: await nextMembershipNumber(new Date().getUTCFullYear()),
        firstName: registration.firstName,
        lastName: registration.surname,
        otherNames: registration.otherNames,
        email: registration.email,
        phone: registration.phone,
        address: registration.officeAddress,
        tier,
        slots: holding,
        status: "pending",
        joinedOn: new Date(),
        notes: `Created from membership registration ${registration.reference}.`,
        createdBy: actorId(guard.session),
        updatedBy: actorId(guard.session),
      });

      createdMemberId = String(member._id);
    }

    const now = new Date();
    const set: Record<string, unknown> = {
      status: decision,
      reviewedBy: actorId(guard.session),
      reviewedByName: guard.session.name,
      reviewedAt: now,
    };
    // Mongoose drops undefined from $set, so a cleared field is unset instead.
    const unset: Record<string, 1> = {};

    if (reviewNote) set.reviewNote = reviewNote;
    else unset.reviewNote = 1;

    if (appProfileCreated) set.appProfileCreated = appProfileCreated === "yes";
    else unset.appProfileCreated = 1;

    if (createdMemberId) set.member = createdMemberId;

    // "Form received by": the first officer to act on it.
    if (!registration.receivedBy) {
      set.receivedBy = actorId(guard.session);
      set.receivedByName = guard.session.name;
      set.receivedAt = now;
    }

    await Registration.updateOne(
      { _id: registration._id },
      { $set: set, ...(Object.keys(unset).length ? { $unset: unset } : {}) },
    );

    const name = `${registration.firstName} ${registration.surname}`;

    await recordAudit({
      actor: actorId(guard.session),
      actorName: guard.session.name,
      actorRole: guard.session.role,
      action: `registration.${decision}`,
      entity: "member",
      entityId: createdMemberId ?? undefined,
      summary: createdMemberId
        ? `Approved membership registration ${registration.reference} from ${name} and seeded a pending member record.`
        : `Marked membership registration ${registration.reference} from ${name} as ${decision}.`,
    });
  } catch (error) {
    if (duplicateKeyField(error) === "email") {
      return {
        error:
          "A member with this email is already on the register. Update that record instead of approving this registration.",
      };
    }

    console.error("[registration] review failed", error);
    return { error: `Could not save the decision. ${messageOf(error)}` };
  }

  revalidatePath("/admin", "layout");
  revalidatePath("/admin/registrations");
  revalidatePath(`/admin/registrations/${registrationId}`);

  if (createdMemberId) {
    revalidatePath("/admin/members");
    redirect(`/admin/members/${createdMemberId}?saved=1`);
  }

  return { success: `Registration marked as ${decision}.` };
}
