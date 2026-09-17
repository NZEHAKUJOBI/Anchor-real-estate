import Link from "next/link";
import {
  Badge,
  ButtonLink,
  EmptyState,
  PageHeader,
  StatTile,
  Table,
  Td,
  Th,
} from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { connectDb } from "@/lib/db";
import { MailMessage } from "@/lib/models/MailMessage";
import { isMailConfigured } from "@/lib/mail";
import { InboundSimulator } from "./InboundSimulator";

const dateFormat: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
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

export default async function MailboxPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; unreadOnly?: string }>;
}) {
  const session = await requirePermission("mail:read");
  const { tab = "inbox", unreadOnly } = await searchParams;

  await connectDb();

  const [unreadCount, totalInbound, totalSent] = await Promise.all([
    MailMessage.countDocuments({ direction: "inbound", isRead: false }),
    MailMessage.countDocuments({ direction: "inbound" }),
    MailMessage.countDocuments({ direction: "outbound" }),
  ]);

  const query: Record<string, unknown> = {};
  if (tab === "inbox") {
    query.direction = "inbound";
  } else if (tab === "sent") {
    query.direction = "outbound";
  }

  if (unreadOnly === "true") {
    query.isRead = false;
  }

  const messages = await MailMessage.find(query)
    .sort({ createdAt: -1 })
    .limit(50)
    .populate<{ member?: { _id: unknown; firstName: string; lastName: string; membershipNumber: string } }>(
      "member",
      "firstName lastName membershipNumber",
    )
    .populate<{ enquiry?: { _id: unknown; reference: string; firstName: string; lastName: string } }>(
      "enquiry",
      "reference firstName lastName",
    )
    .lean();

  const mailConfigured = isMailConfigured();

  return (
    <>
      <PageHeader
        title="Mailbox"
        description="Receive incoming messages from website enquiries and direct emails, and send official communications to members."
        action={
          <div className="flex flex-wrap items-center gap-3">
            {can(session.role, "mail:write") ? (
              <ButtonLink href="/admin/mail/compose" variant="gold">
                Compose Email
              </ButtonLink>
            ) : null}
          </div>
        }
      />

      {!mailConfigured ? (
        <div className="mb-6 border-l-4 border-gold-500 bg-gold-400/10 p-4 text-[0.875rem] text-forest-950">
          <p className="font-semibold">SMTP / Resend is not configured</p>
          <p className="mt-1 text-ink-soft">
            Outbound emails will be safely saved in the database and marked as{" "}
            <span className="font-semibold text-gold-700">Simulated</span> for
            testing. To dispatch live emails to external mailboxes, configure{" "}
            <code>RESEND_API_KEY</code> or <code>SMTP_HOST</code> in{" "}
            <code>.env.local</code>.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <StatTile
          label="Unread Inbound"
          value={unreadCount}
          detail="Pending admin review"
        />
        <StatTile
          label="Total Received"
          value={totalInbound}
          detail="Website enquiries & incoming emails"
        />
        <StatTile
          label="Total Sent"
          value={totalSent}
          detail="Official communications dispatched"
        />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-rule pb-3">
        <div className="flex items-center gap-2">
          <Link
            href="/admin/mail?tab=inbox"
            className={`px-4 py-2 text-[0.875rem] font-semibold transition-colors ${
              tab === "inbox"
                ? "border-b-2 border-forest-900 text-forest-950"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Inbox {unreadCount > 0 ? `(${unreadCount})` : ""}
          </Link>
          <Link
            href="/admin/mail?tab=sent"
            className={`px-4 py-2 text-[0.875rem] font-semibold transition-colors ${
              tab === "sent"
                ? "border-b-2 border-forest-900 text-forest-950"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            Sent
          </Link>
          <Link
            href="/admin/mail?tab=all"
            className={`px-4 py-2 text-[0.875rem] font-semibold transition-colors ${
              tab === "all"
                ? "border-b-2 border-forest-900 text-forest-950"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            All Messages
          </Link>
        </div>

        <div className="flex items-center gap-3 text-[0.8125rem]">
          {tab === "inbox" ? (
            <Link
              href={
                unreadOnly === "true"
                  ? "/admin/mail?tab=inbox"
                  : "/admin/mail?tab=inbox&unreadOnly=true"
              }
              className={`rounded px-2.5 py-1 transition-colors ${
                unreadOnly === "true"
                  ? "bg-forest-900 text-paper"
                  : "bg-paper-sunken text-ink-soft hover:text-ink"
              }`}
            >
              {unreadOnly === "true" ? "✓ Unread Only" : "Filter: Unread Only"}
            </Link>
          ) : null}
        </div>
      </div>

      {/* Message List */}
      {messages.length === 0 ? (
        <EmptyState
          title={`No ${tab === "inbox" ? "inbound" : tab === "sent" ? "sent" : ""} messages found`}
          description={
            tab === "inbox"
              ? "When visitors submit enquiries or send emails to the secretariat, they will appear here."
              : "No emails have been sent from the admin panel yet."
          }
          action={
            can(session.role, "mail:write") ? (
              <ButtonLink href="/admin/mail/compose" variant="gold">
                Compose Email
              </ButtonLink>
            ) : undefined
          }
        />
      ) : (
        <Table>
          <thead>
            <tr>
              <Th className="w-10"></Th>
              <Th>{tab === "sent" ? "Recipient" : "Sender"}</Th>
              <Th>Subject</Th>
              <Th>Association</Th>
              <Th>Status</Th>
              <Th className="text-right">Date</Th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => {
              const isInbound = msg.direction === "inbound";
              const isUnread = isInbound && !msg.isRead;
              const association = msg.member ? (
                <Link
                  href={`/admin/members/${String(msg.member._id)}`}
                  className="font-mono text-[0.75rem] text-forest-900 underline hover:text-gold-600"
                >
                  {msg.member.membershipNumber} ({msg.member.firstName})
                </Link>
              ) : msg.enquiry ? (
                <Link
                  href={`/admin/applications/${String(msg.enquiry._id)}`}
                  className="font-mono text-[0.75rem] text-forest-900 underline hover:text-gold-600"
                >
                  {msg.enquiry.reference}
                </Link>
              ) : null;

              return (
                <tr
                  key={String(msg._id)}
                  className={`hover:bg-paper-sunken/40 transition-colors ${
                    isUnread ? "bg-gold-50/40 font-medium" : ""
                  }`}
                >
                  <Td className="w-10 text-center">
                    {isInbound ? (
                      <span
                        title={isUnread ? "Unread Inbound" : "Read Inbound"}
                        className={`inline-block h-2.5 w-2.5 rounded-full ${
                          isUnread ? "bg-gold-500" : "bg-forest-900/20"
                        }`}
                      />
                    ) : (
                      <span
                        title="Outbound Sent"
                        className="inline-block text-[0.75rem] text-ink-faint"
                      >
                        ↗
                      </span>
                    )}
                  </Td>
                  <Td className="font-medium text-ink">
                    <Link
                      href={`/admin/mail/${String(msg._id)}`}
                      className="block truncate max-w-[200px] hover:underline"
                    >
                      {tab === "sent"
                        ? msg.to.join(", ")
                        : msg.from}
                    </Link>
                    <div className="text-[0.75rem] text-ink-faint truncate max-w-[200px]">
                      {tab === "sent"
                        ? `By ${msg.sentBy?.name ?? "Admin"}`
                        : msg.fromEmail}
                    </div>
                  </Td>
                  <Td>
                    <Link
                      href={`/admin/mail/${String(msg._id)}`}
                      className="block hover:underline"
                    >
                      <div className="text-[0.9375rem] text-forest-950 font-medium">
                        {msg.subject}
                      </div>
                      <div className="text-[0.8125rem] text-ink-soft truncate max-w-[360px]">
                        {msg.bodyText.slice(0, 100)}
                      </div>
                    </Link>
                  </Td>
                  <Td>{association ?? <span className="text-ink-faint">—</span>}</Td>
                  <Td>
                    <Badge tone={STATUS_TONE[msg.status] ?? "neutral"}>
                      {STATUS_LABEL[msg.status] ?? msg.status}
                    </Badge>
                  </Td>
                  <Td className="text-right text-[0.8125rem] text-ink-soft whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString("en-NG", dateFormat)}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {/* Simulator tool for testing inbound mail */}
      {can(session.role, "mail:write") ? (
        <div className="mt-12">
          <InboundSimulator />
        </div>
      ) : null}
    </>
  );
}
