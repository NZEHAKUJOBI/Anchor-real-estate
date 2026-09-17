import Link from "next/link";
import { isValidObjectId } from "mongoose";
import { PageHeader } from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Member } from "@/lib/models/Member";
import { Enquiry } from "@/lib/models/Enquiry";
import { MailMessage } from "@/lib/models/MailMessage";
import { isMailConfigured } from "@/lib/mail";
import { ComposeForm } from "./ComposeForm";

export default async function ComposeMailPage({
  searchParams,
}: {
  searchParams: Promise<{
    to?: string;
    subject?: string;
    memberId?: string;
    enquiryId?: string;
    replyToId?: string;
  }>;
}) {
  await requirePermission("mail:write");
  const params = await searchParams;

  await connectDb();

  const [membersRaw, enquiriesRaw] = await Promise.all([
    Member.find({ status: "active" })
      .sort({ firstName: 1, lastName: 1 })
      .select("_id firstName lastName membershipNumber email")
      .lean(),
    Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("_id firstName lastName reference email")
      .lean(),
  ]);

  const members = membersRaw.map((m) => ({
    id: String(m._id),
    name: `${m.firstName} ${m.lastName}`,
    membershipNumber: m.membershipNumber,
    email: m.email,
  }));

  const enquiries = enquiriesRaw.map((e) => ({
    id: String(e._id),
    name: `${e.firstName} ${e.lastName}`,
    reference: e.reference,
    email: e.email,
  }));

  let initialTo = params.to || "";
  let initialSubject = params.subject || "";
  let initialBody = "";
  let memberId = params.memberId || "";
  let enquiryId = params.enquiryId || "";
  const replyToId = params.replyToId || "";

  if (replyToId && isValidObjectId(replyToId)) {
    const original = await MailMessage.findById(replyToId).lean();
    if (original) {
      initialTo = original.fromEmail || original.from;
      initialSubject = original.subject.startsWith("Re:")
        ? original.subject
        : `Re: ${original.subject}`;
      initialBody = `\n\n--- On ${new Date(original.createdAt).toLocaleString("en-NG")}, ${original.from} wrote: ---\n${original.bodyText
        .split("\n")
        .map((line) => `> ${line}`)
        .join("\n")}`;

      if (original.member) memberId = String(original.member);
      if (original.enquiry) enquiryId = String(original.enquiry);
    }
  } else if (memberId && isValidObjectId(memberId)) {
    const mem = members.find((m) => m.id === memberId);
    if (mem && !initialTo) {
      initialTo = mem.email;
      if (!initialSubject) {
        initialSubject = `Anchor Real Estate Group — Notice to Member ${mem.membershipNumber}`;
      }
    }
  } else if (enquiryId && isValidObjectId(enquiryId)) {
    const enq = enquiries.find((e) => e.id === enquiryId);
    if (enq && !initialTo) {
      initialTo = enq.email;
      if (!initialSubject) {
        initialSubject = `Re: Enquiry ${enq.reference} — Anchor Real Estate Group`;
      }
    }
  }

  return (
    <>
      <PageHeader
        title="Compose Email"
        description="Dispatch an official Society message to members, prospective applicants, or any external email address."
        action={
          <Link
            href="/admin/mail"
            className="label-sm text-ink-soft hover:text-ink underline"
          >
            ← Back to Mailbox
          </Link>
        }
      />

      <ComposeForm
        members={members}
        enquiries={enquiries}
        initialTo={initialTo}
        initialSubject={initialSubject}
        initialBody={initialBody}
        initialMemberId={memberId}
        initialEnquiryId={enquiryId}
        initialInReplyTo={replyToId}
        isMailConfigured={isMailConfigured()}
      />
    </>
  );
}
