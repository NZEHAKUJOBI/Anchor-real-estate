import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { FormLetterhead } from "@/components/FormLetterhead";
import { cn } from "@/components/ui/cn";
import { requirePermission } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { Registration, registrantName } from "@/lib/models/Registration";
import { MARITAL_STATUS_LABEL, REGISTRATION_FEE_KOBO } from "@/lib/constants";
import { feeAccount, registrationSociety } from "@/lib/content";
import { formatNaira } from "@/lib/money";
import { PrintButton } from "./PrintButton";

export const metadata = { title: "Print Registration" };

/** DD/MM/YYYY, as the paper form asks. Calendar dates are stored at UTC midnight. */
function paperDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Section({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-[7mm] break-inside-avoid">
      <h2 className="text-[12.5pt] font-bold text-forest-900">
        {n}. {title}
      </h2>
      <div className="mt-[2mm]">{children}</div>
    </section>
  );
}

/** A filled "Label: ________" line. Values print in block letters unless `plain`. */
function Line({
  label,
  value,
  plain,
}: {
  label: string;
  value?: React.ReactNode;
  plain?: boolean;
}) {
  return (
    <div className="flex items-end gap-[2mm] py-[1.2mm]">
      <span className="shrink-0">{label}:</span>
      <span
        className={cn(
          "min-h-[1.45em] flex-1 border-b border-ink/60 px-[1mm] font-semibold text-ink",
          !plain && "uppercase",
        )}
      >
        {value}
      </span>
    </div>
  );
}

function Box({ checked }: { checked: boolean }) {
  return (
    <span className="inline-flex size-[3.4mm] shrink-0 items-center justify-center border border-ink align-middle text-[8pt] leading-none font-bold">
      {checked ? "✓" : ""}
    </span>
  );
}

export default async function PrintRegistrationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requirePermission("enquiries:read");
  const { id } = await params;

  if (!isValidObjectId(id)) notFound();

  await connectDb();
  const registration = await Registration.findById(id).lean();
  if (!registration) notFound();

  const society = `${registrationSociety.name} ${registrationSociety.descriptor}`;

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4 print:hidden">
        <Link
          href={`/admin/registrations/${id}`}
          className="label-sm text-ink-soft underline-offset-4 hover:underline"
        >
          ← Back to registration
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-[210mm] border border-rule bg-white px-[14mm] py-[12mm] font-display text-[10.5pt] leading-snug text-ink shadow-card print:max-w-none print:border-0 print:p-0 print:shadow-none">
        <h1 className="sr-only">
          Membership registration form — {registrantName(registration)}
        </h1>

        <div className="grid grid-cols-[28mm_1fr_28mm] items-start gap-[4mm]">
          <div aria-hidden="true" />
          <FormLetterhead />
          <figure>
            {/* Served from an authenticated route; next/image cannot forward the session. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/admin/registrations/${id}/photo`}
              alt="Passport photograph"
              className="aspect-[7/9] w-full border border-ink/60 object-cover"
            />
            <figcaption className="mt-[1mm] text-center font-sans text-[6.5pt] tracking-[0.08em] text-ink-soft uppercase">
              Passport photograph
            </figcaption>
          </figure>
        </div>

        <p className="mt-[6mm] flex justify-between gap-4 border-y border-rule py-[1.5mm] font-sans text-[8.5pt] text-ink-soft">
          <span>
            Reference: <strong className="text-ink tnum">{registration.reference}</strong>
          </span>
          <span>
            Submitted online:{" "}
            <strong className="text-ink tnum">{paperDate(registration.createdAt)}</strong>
          </span>
        </p>

        <Section n={1} title="Personal & Employment Information">
          <Line label="Full Name (Surname First)" value={registrantName(registration)} />
          <Line label="Date of Birth (DD/MM/YYYY)" value={paperDate(registration.dateOfBirth)} />
          <Line
            label="Marital Status"
            value={MARITAL_STATUS_LABEL[registration.maritalStatus]}
          />
          <Line label="Office Address" value={registration.officeAddress} />
          <Line label="Office Location / Department" value={registration.department} />
          <Line label="Mobile Phone Number" value={registration.phone} />
          <Line label="Email Address" value={registration.email} plain />
        </Section>

        <Section n={2} title="Next of Kin Details">
          <Line label="Name" value={registration.nextOfKin.name} />
          <Line label="Relationship" value={registration.nextOfKin.relationship} />
          <Line label="Address" value={registration.nextOfKin.address} />
          <Line label="Telephone" value={registration.nextOfKin.phone} />
        </Section>

        <Section n={3} title="Financial & Contribution Setup">
          <Line
            label="Monthly Contribution Amount (to be deducted from salary)"
            value={formatNaira(registration.monthlyContributionKobo)}
          />
          <Line
            label="Effective Date of Contribution"
            value={paperDate(registration.contributionStartsOn)}
          />
          <Line label="Bank Name (For App Withdrawals & Loans)" value={registration.bankName} />
          <Line label="Account Number" value={registration.accountNumber} />
        </Section>

        <Section n={4} title="Digital Platform Consent">
          <p className="flex gap-[2.5mm] py-[1mm]">
            <Box checked={registration.consentAppProfile} />
            <span>
              I consent to having my profile created on the Anchor Cooperative mobile
              application to access my Savings, Loans, Purchases, and Shares.
            </span>
          </p>
          <p className="flex gap-[2.5mm] py-[1mm]">
            <Box checked={registration.consentDigitalId} />
            <span>
              I agree to the setup of a Digital ID and biometric login for application
              security.
            </span>
          </p>
        </Section>

        <Section n={5} title="Declarations & Signatures">
          <p>
            I hereby declare that the information provided above is accurate and true. I agree
            to abide by the bye-laws and regulations governing the {society}.
          </p>
          <div className="mt-[3mm] grid grid-cols-[1fr_auto] gap-[6mm]">
            <Line label="Applicant Signature" />
            <div className="w-[48mm]">
              <Line label="Date" value={paperDate(registration.declaredAt)} />
            </div>
          </div>
          <p className="font-sans text-[8pt] text-ink-soft">
            Declared online by typing the name &ldquo;{registration.signatureName}&rdquo; on{" "}
            {paperDate(registration.declaredAt)}.
          </p>

          <p className="mt-[4mm] font-bold">Witness Details</p>
          <Line label="Name" value={registration.witness?.name} />
          <Line label="Address" value={registration.witness?.address} />
          <Line label="Signature & Date" />
        </Section>

        <Section n={6} title="Official Use Only / Payment Instructions">
          <p>
            Kindly pay your non-refundable registration fee of{" "}
            {formatNaira(REGISTRATION_FEE_KOBO)} to{" "}
            <strong>
              {feeAccount.bank} {feeAccount.accountName} A/C No. {feeAccount.accountNumber}.
            </strong>
          </p>
          <div className="mt-[3mm] grid grid-cols-[1fr_auto] gap-[6mm]">
            <Line label="Form Received By" value={registration.receivedByName} />
            <div className="w-[48mm]">
              <Line
                label="Date"
                value={registration.receivedAt ? paperDate(registration.receivedAt) : undefined}
              />
            </div>
          </div>
          <p className="flex items-center gap-[2mm] py-[1.2mm]">
            App Profile Created:
            <Box checked={registration.appProfileCreated === true} /> Yes
            <span className="ml-[3mm]" />
            <Box checked={registration.appProfileCreated === false} /> No
          </p>
        </Section>
      </article>
    </>
  );
}
