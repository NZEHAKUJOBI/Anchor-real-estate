import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import {
  Badge,
  ButtonLink,
  DescriptionItem,
  DescriptionList,
  Notice,
  PageHeader,
} from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
import { can } from "@/lib/rbac";
import { connectDb } from "@/lib/db";
import { Registration, registrantName } from "@/lib/models/Registration";
import {
  ENQUIRY_STATUS_LABEL,
  MARITAL_STATUS_LABEL,
  type EnquiryStatus,
} from "@/lib/constants";
import { formatNaira } from "@/lib/money";
import { ReviewForm } from "../ReviewForm";

const STATUS_TONE: Record<EnquiryStatus, "ok" | "warn" | "alert" | "neutral"> = {
  new: "warn",
  reviewing: "neutral",
  approved: "ok",
  declined: "alert",
};

const dateTimeFormat: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
};

// Dates of birth and contribution dates are calendar dates, stored at UTC midnight.
const dateFormat: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display mb-4 text-[1.25rem] text-forest-900">{title}</h2>
      {children}
    </section>
  );
}

function YesNo({ value }: { value: boolean }) {
  return value ? (
    <span className="text-ok">Yes — consented</span>
  ) : (
    <span className="text-ink-soft">No</span>
  );
}

export default async function RegistrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requirePermission("enquiries:read");
  const { id } = await params;

  if (!isValidObjectId(id)) notFound();

  await connectDb();
  const registration = await Registration.findById(id).lean();
  if (!registration) notFound();

  const name = `${registration.firstName} ${registration.surname}`;

  return (
    <>
      <PageHeader
        title={name}
        description={`${registration.reference} · received ${registration.createdAt.toLocaleDateString("en-NG", dateTimeFormat)}`}
        action={
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href={`/admin/registrations/${id}/print`} variant="ghost">
              Print Form
            </ButtonLink>
            {can(session.role, "mail:write") ? (
              <ButtonLink
                href={`/admin/mail/compose?${new URLSearchParams({
                  to: registration.email,
                  subject: `Your membership registration — ${registration.reference}`,
                })}`}
                variant="gold"
              >
                Send Email
              </ButtonLink>
            ) : null}
            {registration.member ? (
              <ButtonLink
                href={`/admin/members/${String(registration.member)}`}
                variant="ghost"
              >
                View Member Record
              </ButtonLink>
            ) : null}
          </div>
        }
      />

      {registration.applicantMail === "failed" ? (
        <div className="mb-8">
          <Notice tone="error">
            The confirmation email to the applicant could not be sent
            {registration.mailError ? `: ${registration.mailError}` : "."} Contact
            them by phone, and check the mail settings.
          </Notice>
        </div>
      ) : registration.applicantMail === "skipped" ? (
        <div className="mb-8">
          <Notice tone="info">
            No confirmation was sent — mail is not configured on this server.
          </Notice>
        </div>
      ) : null}

      <div className="grid gap-12 xl:grid-cols-12 xl:gap-14">
        <div className="xl:col-span-7">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start">
            <a
              href={`/admin/registrations/${id}/photo`}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 self-start"
            >
              {/* Served from an authenticated route; next/image cannot forward the session. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/admin/registrations/${id}/photo`}
                alt={`Passport photograph of ${name}`}
                className="aspect-[7/9] w-36 border border-rule bg-paper-alt object-cover"
              />
            </a>
            <div className="min-w-0 flex-1">
              <p className="label-sm text-ink-faint">Full name (surname first)</p>
              <p className="font-display mt-2 text-[1.375rem] leading-snug text-forest-900">
                {registrantName(registration)}
              </p>
              <dl className="mt-5 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="label-sm text-ink-faint">Status</dt>
                  <dd className="mt-2">
                    <Badge tone={STATUS_TONE[registration.status]}>
                      {ENQUIRY_STATUS_LABEL[registration.status]}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="label-sm text-ink-faint">Date of birth</dt>
                  <dd className="mt-2 text-[0.9375rem] tnum">
                    {registration.dateOfBirth.toLocaleDateString("en-GB", dateFormat)}
                  </dd>
                </div>
                <div>
                  <dt className="label-sm text-ink-faint">Marital status</dt>
                  <dd className="mt-2 text-[0.9375rem]">
                    {MARITAL_STATUS_LABEL[registration.maritalStatus]}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <Section title="Personal & employment">
            <DescriptionList>
              <DescriptionItem term="Office address">
                <span className="whitespace-pre-wrap">{registration.officeAddress}</span>
              </DescriptionItem>
              <DescriptionItem term="Office location / department">
                {registration.department}
              </DescriptionItem>
              <DescriptionItem term="Mobile phone">
                <a
                  href={`tel:${registration.phone.replace(/\s/g, "")}`}
                  className="tnum underline-offset-4 hover:underline"
                >
                  {registration.phone}
                </a>
              </DescriptionItem>
              <DescriptionItem term="Email">
                <a
                  href={`mailto:${registration.email}`}
                  className="break-all underline-offset-4 hover:underline"
                >
                  {registration.email}
                </a>
              </DescriptionItem>
            </DescriptionList>
          </Section>

          <Section title="Next of kin">
            <DescriptionList>
              <DescriptionItem term="Name">{registration.nextOfKin.name}</DescriptionItem>
              <DescriptionItem term="Relationship">
                {registration.nextOfKin.relationship}
              </DescriptionItem>
              <DescriptionItem term="Address">
                <span className="whitespace-pre-wrap">{registration.nextOfKin.address}</span>
              </DescriptionItem>
              <DescriptionItem term="Telephone">
                <a
                  href={`tel:${registration.nextOfKin.phone.replace(/\s/g, "")}`}
                  className="tnum underline-offset-4 hover:underline"
                >
                  {registration.nextOfKin.phone}
                </a>
              </DescriptionItem>
            </DescriptionList>
          </Section>

          <Section title="Financial & contribution">
            <DescriptionList>
              <DescriptionItem term="Monthly contribution">
                <span className="tnum">
                  {formatNaira(registration.monthlyContributionKobo)}
                </span>{" "}
                <span className="text-ink-soft">from salary</span>
              </DescriptionItem>
              <DescriptionItem term="Effective from">
                <span className="tnum">
                  {registration.contributionStartsOn.toLocaleDateString("en-GB", dateFormat)}
                </span>
              </DescriptionItem>
              <DescriptionItem term="Bank">{registration.bankName}</DescriptionItem>
              <DescriptionItem term="Account number">
                <span className="tnum tracking-[0.04em]">{registration.accountNumber}</span>
              </DescriptionItem>
            </DescriptionList>
          </Section>

          <Section title="Digital platform consent">
            <DescriptionList>
              <DescriptionItem term="Profile on the mobile app">
                <YesNo value={registration.consentAppProfile} />
              </DescriptionItem>
              <DescriptionItem term="Digital ID & biometric login">
                <YesNo value={registration.consentDigitalId} />
              </DescriptionItem>
            </DescriptionList>
          </Section>

          <Section title="Declaration & witness">
            <DescriptionList>
              <DescriptionItem term="Signed as">
                <span className="font-display italic">{registration.signatureName}</span>
              </DescriptionItem>
              <DescriptionItem term="Declared on">
                <span className="tnum">
                  {registration.declaredAt.toLocaleDateString("en-NG", dateTimeFormat)}
                </span>
              </DescriptionItem>
              <DescriptionItem term="Witness name">
                {registration.witness?.name ?? (
                  <span className="text-ink-faint">Not given</span>
                )}
              </DescriptionItem>
              <DescriptionItem term="Witness address">
                {registration.witness?.address ?? (
                  <span className="text-ink-faint">Not given</span>
                )}
              </DescriptionItem>
            </DescriptionList>
          </Section>

          {registration.reviewedAt ? (
            <div className="mt-10 border-t border-rule pt-6">
              <h3 className="label-sm text-ink-faint">Review</h3>
              <p className="mt-3 text-[0.9375rem] text-ink-soft">
                {ENQUIRY_STATUS_LABEL[registration.status]} by{" "}
                {registration.reviewedByName ?? "an officer"} on{" "}
                {registration.reviewedAt.toLocaleDateString("en-NG", dateTimeFormat)}.
              </p>
              {registration.reviewNote ? (
                <p className="mt-3 text-[0.9375rem] leading-relaxed whitespace-pre-wrap text-ink">
                  {registration.reviewNote}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="xl:col-span-5">
          <section className="mb-10 border border-gold-600/40 bg-gold-400/8 p-5">
            <h2 className="label text-gold-700">Official use only</h2>
            <dl className="mt-4 space-y-3 text-[0.9375rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Form received by</dt>
                <dd className="text-right text-ink">
                  {registration.receivedByName ?? (
                    <span className="text-ink-faint">Not yet</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">Date</dt>
                <dd className="text-right text-ink tnum">
                  {registration.receivedAt ? (
                    registration.receivedAt.toLocaleDateString("en-NG", dateTimeFormat)
                  ) : (
                    <span className="text-ink-faint">—</span>
                  )}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-soft">App profile created</dt>
                <dd className="text-right text-ink">
                  {registration.appProfileCreated === undefined ? (
                    <span className="text-ink-faint">Not recorded</span>
                  ) : registration.appProfileCreated ? (
                    "Yes"
                  ) : (
                    "No"
                  )}
                </dd>
              </div>
            </dl>
            <p className="mt-4 border-t border-gold-600/25 pt-3 text-[0.8125rem] text-ink-soft">
              The first officer to save a decision is recorded as receiving the form.
            </p>
          </section>

          {can(session.role, "enquiries:write") ? (
            <>
              <h2 className="font-display mb-5 text-[1.25rem] text-forest-900">
                Record a decision
              </h2>
              <ReviewForm
                registrationId={id}
                currentStatus={registration.status}
                alreadyLinked={Boolean(registration.member)}
                appProfileCreated={registration.appProfileCreated}
                consentedToApp={registration.consentAppProfile}
                reviewNote={registration.reviewNote}
              />
            </>
          ) : (
            <Notice tone="info">
              Your role can read registrations but not act on them.
            </Notice>
          )}
        </div>
      </div>

      <p className="mt-12">
        <Link
          href="/admin/registrations"
          className="label-sm text-ink-soft underline-offset-4 hover:underline"
        >
          ← Back to registrations
        </Link>
      </p>
    </>
  );
}
