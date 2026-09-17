import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import {
  Badge,
  ButtonLink,
  DescriptionItem,
  DescriptionList,
  EmptyState,
  Notice,
  PageHeader,
  StatTile,
  Table,
  Td,
  Th,
} from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { connectDb } from "@/lib/db";
import { Member } from "@/lib/models/Member";
import { Payment } from "@/lib/models/Payment";
import { MailMessage } from "@/lib/models/MailMessage";
import { computeDues, formatMonthKey } from "@/lib/dues";
import {
  KIND_LABEL,
  METHOD_LABEL,
  SLOT_PRICE_KOBO,
  STATUS_LABEL,
  TIER_LABEL,
  duesRateKobo,
  type MemberStatus,
} from "@/lib/constants";
import { formatNaira, formatNumber } from "@/lib/money";

const STATUS_TONE: Record<MemberStatus, "ok" | "warn" | "alert" | "neutral"> = {
  active: "ok",
  pending: "warn",
  suspended: "alert",
  exited: "neutral",
};

const dateFormat: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
};

export default async function MemberDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const session = await requirePermission("members:read");
  const { id } = await params;
  const { saved } = await searchParams;

  if (!isValidObjectId(id)) notFound();

  await connectDb();

  const member = await Member.findById(id).lean();
  if (!member) notFound();

  const payments = await Payment.find({ member: id })
    .sort({ receivedOn: -1, createdAt: -1 })
    .lean();

  const correspondence = await MailMessage.find({
    $or: [
      { member: id },
      { fromEmail: member.email.toLowerCase() },
      { toEmail: member.email.toLowerCase() },
    ],
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .lean();

  const duesPaidKobo = payments
    .filter((payment) => payment.kind === "dues")
    .reduce((sum, payment) => sum + payment.amountKobo, 0);

  const position = computeDues(
    { tier: member.tier, status: member.status, joinedOn: member.joinedOn },
    duesPaidKobo,
  );

  const totalReceived = payments.reduce(
    (sum, payment) => sum + payment.amountKobo,
    0,
  );
  const registrationPaid = payments.some(
    (payment) => payment.kind === "registration",
  );

  return (
    <>
      <PageHeader
        title={`${member.firstName} ${member.lastName}`}
        description={`${member.membershipNumber} · ${TIER_LABEL[member.tier]}`}
        action={
          <div className="flex flex-wrap gap-3">
            {can(session.role, "mail:write") ? (
              <ButtonLink
                href={`/admin/mail/compose?memberId=${id}&to=${encodeURIComponent(member.email)}`}
                variant="ghost"
              >
                Send Email
              </ButtonLink>
            ) : null}
            {can(session.role, "payments:write") ? (
              <ButtonLink
                href={`/admin/payments/new?member=${id}`}
                variant="gold"
              >
                Record Payment
              </ButtonLink>
            ) : null}
            {can(session.role, "members:write") ? (
              <ButtonLink href={`/admin/members/${id}/edit`} variant="ghost">
                Edit
              </ButtonLink>
            ) : null}
          </div>
        }
      />

      {saved ? (
        <div className="mb-8">
          <Notice tone="success">Changes saved.</Notice>
        </div>
      ) : null}

      {!registrationPaid ? (
        <div className="mb-8">
          <Notice tone="info">
            No registration fee has been recorded for this member.
          </Notice>
        </div>
      ) : null}

      <section aria-label="Position" className="mb-12">
        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile
            label="Ownership slots"
            value={formatNumber(member.slots)}
            detail={`Holding ${formatNaira(member.slots * SLOT_PRICE_KOBO)}`}
          />
          <StatTile
            label="Total received"
            value={formatNaira(totalReceived)}
            detail={`${payments.length} payment${payments.length === 1 ? "" : "s"} recorded`}
          />
          <StatTile
            label="Dues billed"
            value={formatNaira(position.expectedKobo)}
            detail={
              position.accruing
                ? `${position.monthsBilled} month${position.monthsBilled === 1 ? "" : "s"} at ${formatNaira(duesRateKobo(member.tier))}`
                : "Not accruing at this status"
            }
          />
          <StatTile
            label={position.creditKobo > 0 ? "Dues credit" : "Dues outstanding"}
            value={formatNaira(
              position.creditKobo > 0 ? position.creditKobo : position.arrearsKobo,
            )}
            detail={
              position.arrearsKobo > 0
                ? "Arrears on monthly dues"
                : position.creditKobo > 0
                  ? "Paid ahead of schedule"
                  : "Up to date"
            }
          />
        </div>
      </section>

      <section aria-labelledby="details-heading" className="mb-12">
        <h2
          id="details-heading"
          className="font-display mb-5 text-[1.25rem] text-forest-900"
        >
          Record
        </h2>

        <DescriptionList>
          <DescriptionItem term="Status">
            <Badge tone={STATUS_TONE[member.status]}>
              {STATUS_LABEL[member.status]}
            </Badge>
          </DescriptionItem>
          <DescriptionItem term="Tier">
            {TIER_LABEL[member.tier]}
          </DescriptionItem>
          <DescriptionItem term="Email">
            <a
              href={`mailto:${member.email}`}
              className="break-all underline-offset-4 hover:underline"
            >
              {member.email}
            </a>
          </DescriptionItem>
          <DescriptionItem term="Phone">
            <a
              href={`tel:${member.phone.replace(/\s/g, "")}`}
              className="tnum underline-offset-4 hover:underline"
            >
              {member.phone}
            </a>
          </DescriptionItem>
          <DescriptionItem term="Dues start">
            {member.joinedOn.toLocaleDateString("en-NG", dateFormat)}
          </DescriptionItem>
          <DescriptionItem term="Registered">
            {member.createdAt.toLocaleDateString("en-NG", dateFormat)}
          </DescriptionItem>
          {member.otherNames ? (
            <DescriptionItem term="Other names">
              {member.otherNames}
            </DescriptionItem>
          ) : null}
          {member.address ? (
            <DescriptionItem term="Address">{member.address}</DescriptionItem>
          ) : null}
          {member.notes ? (
            <DescriptionItem term="Notes">{member.notes}</DescriptionItem>
          ) : null}
        </DescriptionList>
      </section>

      <section aria-labelledby="payments-heading">
        <h2
          id="payments-heading"
          className="font-display mb-5 text-[1.25rem] text-forest-900"
        >
          Payment history
        </h2>

        {payments.length === 0 ? (
          <EmptyState
            title="No payments recorded"
            body="Receipts entered for this member will be listed here."
            action={
              can(session.role, "payments:write") ? (
                <ButtonLink
                  href={`/admin/payments/new?member=${id}`}
                  variant="ghost"
                >
                  Record a payment
                </ButtonLink>
              ) : undefined
            }
          />
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Received</Th>
                <Th>Type</Th>
                <Th>Method</Th>
                <Th>Reference</Th>
                <Th align="right">Amount</Th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={String(payment._id)}>
                  <Td>
                    <span className="tnum">
                      {payment.receivedOn.toLocaleDateString("en-NG", dateFormat)}
                    </span>
                    <span className="label-sm mt-1 block text-ink-faint">
                      by {payment.recordedByName}
                    </span>
                  </Td>
                  <Td>
                    {KIND_LABEL[payment.kind]}
                    {payment.duesPeriod ? (
                      <span className="label-sm mt-1 block text-ink-faint">
                        {formatMonthKey(payment.duesPeriod)}
                      </span>
                    ) : null}
                  </Td>
                  <Td>
                    {METHOD_LABEL[payment.method]}
                    {payment.bank ? (
                      <span className="label-sm mt-1 block text-ink-faint">
                        {payment.bank}
                      </span>
                    ) : null}
                  </Td>
                  <Td>
                    {payment.reference ? (
                      <span className="font-mono text-[0.8125rem]">
                        {payment.reference}
                      </span>
                    ) : (
                      <span className="text-ink-faint">—</span>
                    )}
                  </Td>
                  <Td align="right">
                    <span className="tnum">
                      {formatNaira(payment.amountKobo)}
                    </span>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </section>

      {correspondence.length > 0 ? (
        <section aria-label="Correspondence" className="mt-12 border-t border-rule pt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-[1.25rem] text-forest-900">
              Email Correspondence ({correspondence.length})
            </h2>
            {can(session.role, "mail:write") ? (
              <ButtonLink
                href={`/admin/mail/compose?memberId=${id}&to=${encodeURIComponent(member.email)}`}
                variant="ghost"
              >
                + Write Email
              </ButtonLink>
            ) : null}
          </div>
          <div className="space-y-3">
            {correspondence.map((msg) => (
              <div
                key={String(msg._id)}
                className="flex items-center justify-between border border-rule bg-white p-4 text-[0.875rem]"
              >
                <div className="min-w-0 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-forest-950">
                      {msg.direction === "inbound"
                        ? "From Member"
                        : "From Secretariat"}
                    </span>
                    <span className="text-ink-soft">·</span>
                    <span className="text-ink truncate">{msg.subject}</span>
                  </div>
                  <p className="mt-1 text-[0.8125rem] text-ink-soft truncate">
                    {msg.bodyText.slice(0, 120)}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  <span className="text-[0.75rem] text-ink-faint">
                    {new Date(msg.createdAt).toLocaleDateString("en-NG", dateFormat)}
                  </span>
                  <Link
                    href={`/admin/mail/${String(msg._id)}`}
                    className="label-sm text-forest-900 underline hover:text-gold-600"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <p className="mt-10">
        <Link
          href="/admin/members"
          className="label-sm text-ink-soft underline-offset-4 hover:underline"
        >
          ← Back to members
        </Link>
      </p>
    </>
  );
}
