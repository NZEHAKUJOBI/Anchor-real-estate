import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import {
  Badge,
  DescriptionItem,
  DescriptionList,
  Notice,
  PageHeader,
} from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { connectDb } from "@/lib/db";
import { MailMessage } from "@/lib/models/MailMessage";
import { MessageActions } from "./MessageActions";

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const STATUS_TONE: Record<string, "ok" | "warn" | "alert" | "neutral"> = {
  received: "ok",
  sent: "ok",
  simulated: "warn",
  failed: "alert",
};

const STATUS_LABEL: Record<string, string> = {
  received: "Received",
  sent: "Delivered",
  simulated: "Simulated",
  failed: "Failed",
};

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requirePermission("mail:read");
  const { id } = await params;

  if (!isValidObjectId(id)) notFound();

  await connectDb();

  const msg = await MailMessage.findById(id)
    .populate<{ member?: { _id: unknown; firstName: string; lastName: string; membershipNumber: string } }>(
      "member",
      "firstName lastName membershipNumber",
    )
    .populate<{ enquiry?: { _id: unknown; reference: string; firstName: string; lastName: string } }>(
      "enquiry",
      "reference firstName lastName",
    )
    .lean();

  if (!msg) notFound();

  // Mark inbound email as read when opened
  if (msg.direction === "inbound" && !msg.isRead) {
    await MailMessage.updateOne({ _id: id }, { $set: { isRead: true } });
    msg.isRead = true;
  }

  const isInbound = msg.direction === "inbound";

  return (
    <>
      <PageHeader
        title={msg.subject}
        description={`${isInbound ? "Inbound email received" : "Outbound email sent"} · ${new Date(msg.createdAt).toLocaleDateString("en-NG", dateFormat)}`}
        action={
          <MessageActions
            messageId={id}
            isRead={msg.isRead}
            direction={msg.direction}
            canWrite={can(session.role, "mail:write")}
          />
        }
      />

      {msg.status === "failed" ? (
        <div className="mb-8">
          <Notice tone="error">
            Delivery failed: {msg.errorMessage || "Unknown dispatch error"}.
            Check SMTP settings or recipient email validity.
          </Notice>
        </div>
      ) : msg.status === "simulated" ? (
        <div className="mb-8">
          <Notice tone="info">
            This email was recorded in <strong>Simulated</strong> mode because
            live SMTP or Resend API credentials are not configured on this host.
          </Notice>
        </div>
      ) : null}

      <div className="grid gap-10 xl:grid-cols-12">
        <div className="xl:col-span-8">
          {/* Email Content Box */}
          <div className="border border-rule bg-white shadow-sm">
            <div className="border-b border-rule bg-paper-sunken/40 px-6 py-4">
              <h2 className="font-display text-[1.125rem] text-forest-950">
                {msg.subject}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink font-sans">
                {msg.bodyText}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/admin/mail"
              className="label-sm text-ink-soft hover:text-ink underline"
            >
              ← Back to Mailbox
            </Link>
          </div>
        </div>

        {/* Metadata Sidebar */}
        <div className="xl:col-span-4">
          <div className="border border-rule bg-white p-6 shadow-sm">
            <h3 className="label-sm text-forest-900 border-b border-rule pb-3 mb-4">
              Message Header Details
            </h3>

            <DescriptionList>
              <DescriptionItem term="Direction">
                <Badge tone={isInbound ? "ok" : "neutral"}>
                  {isInbound ? "Inbound" : "Outbound"}
                </Badge>
              </DescriptionItem>

              <DescriptionItem term="Status">
                <Badge tone={STATUS_TONE[msg.status] ?? "neutral"}>
                  {STATUS_LABEL[msg.status] ?? msg.status}
                </Badge>
              </DescriptionItem>

              <DescriptionItem term="From">
                <span className="font-medium text-forest-950 break-all">
                  {msg.from}
                </span>
              </DescriptionItem>

              <DescriptionItem term="To">
                <span className="text-ink break-all">
                  {msg.to.join(", ")}
                </span>
              </DescriptionItem>

              {msg.replyTo ? (
                <DescriptionItem term="Reply-To">
                  <span className="text-ink-soft break-all">{msg.replyTo}</span>
                </DescriptionItem>
              ) : null}

              {msg.sentBy ? (
                <DescriptionItem term="Dispatched By">
                  <span>
                    {msg.sentBy.name} ({msg.sentBy.email})
                  </span>
                </DescriptionItem>
              ) : null}

              {msg.member ? (
                <DescriptionItem term="Linked Member">
                  <Link
                    href={`/admin/members/${String(msg.member._id)}`}
                    className="font-medium text-forest-900 underline hover:text-gold-600"
                  >
                    {msg.member.firstName} {msg.member.lastName} (
                    {msg.member.membershipNumber})
                  </Link>
                </DescriptionItem>
              ) : null}

              {msg.enquiry ? (
                <DescriptionItem term="Linked Enquiry">
                  <Link
                    href={`/admin/applications/${String(msg.enquiry._id)}`}
                    className="font-medium text-forest-900 underline hover:text-gold-600"
                  >
                    {msg.enquiry.firstName} {msg.enquiry.lastName} (
                    {msg.enquiry.reference})
                  </Link>
                </DescriptionItem>
              ) : null}

              <DescriptionItem term="Date">
                <span className="text-ink-soft">
                  {new Date(msg.createdAt).toLocaleDateString("en-NG", dateFormat)}
                </span>
              </DescriptionItem>
            </DescriptionList>
          </div>
        </div>
      </div>
    </>
  );
}
