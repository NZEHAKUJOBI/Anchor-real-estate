"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { cn } from "@/components/ui/cn";
import { Icon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/Button";
import { FormLetterhead } from "@/components/FormLetterhead";
import { MARITAL_STATUSES, MARITAL_STATUS_LABEL } from "@/lib/constants";
import { registrationSociety } from "@/lib/content";
import { Field, Legend, control, describe } from "../fields";
import { submitRegistration, type RegistrationFormState } from "./actions";
import { FeeAccount } from "./FeeAccount";
import { PhotoField } from "./PhotoField";

const BANKS = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank (FCMB)",
  "Globus Bank",
  "Guaranty Trust Bank (GTBank)",
  "Jaiz Bank",
  "Keystone Bank",
  "Kuda Microfinance Bank",
  "Moniepoint Microfinance Bank",
  "OPay",
  "PalmPay",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa (UBA)",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
];

const RELATIONSHIPS = [
  "Spouse",
  "Father",
  "Mother",
  "Son",
  "Daughter",
  "Brother",
  "Sister",
  "Relative",
  "Friend",
];

const sectionClass = "space-y-6 border-t border-forest-900/[0.08] pt-9";

function ConsentOption({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3.5 rounded-2xl border border-forest-900/15 bg-white px-4 py-4 transition-colors has-checked:border-forest-700 has-checked:bg-forest-50 hover:border-forest-900/30">
      <input type="checkbox" name={name} className="mt-0.5 size-4 shrink-0 accent-forest-700" />
      <span className="text-[0.9375rem] leading-snug text-ink">{children}</span>
    </label>
  );
}

function Success({ state }: { state: RegistrationFormState }) {
  const ref = useRef<HTMLDivElement>(null);

  // The applicant pressed submit at the foot of a long form; bring them up to
  // the confirmation that replaced it.
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, []);

  return (
    <div ref={ref} className="scroll-mt-24 py-2 text-center sm:py-6">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint-500/12 text-mint-700">
        <Icon name="check" className="size-7" strokeWidth={2.2} />
      </span>
      <p className="eyebrow mt-6 text-gold-700">Registration received</p>
      <h2 className="font-display mt-3 text-[1.75rem] leading-tight text-forest-900 sm:text-[2rem]">
        Thank you — your form is with the Secretariat.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
        Your reference is{" "}
        <strong className="rounded-md bg-forest-900/[0.06] px-2 py-0.5 font-semibold text-forest-900 tnum">
          {state.reference}
        </strong>
        . Please quote it in any correspondence.
      </p>

      <FeeAccount className="mx-auto mt-8 max-w-xl text-left" />
      <p className="mx-auto mt-3 max-w-xl text-left text-[0.875rem] text-ink-soft">
        If you have already paid, there is nothing more to do. The Secretariat will review your
        form and contact you.
      </p>

      {state.mailDelayed ? (
        <p className="mx-auto mt-6 max-w-xl rounded-2xl border border-forest-900/10 bg-paper-alt/60 px-5 py-4 text-left text-[0.9375rem] leading-relaxed text-ink-soft">
          We could not send your confirmation email just now, but your registration is safely
          recorded. If you do not hear from us within a few days, call the Secretariat on{" "}
          <a href="tel:+2349025250026" className="font-medium text-forest-900 underline underline-offset-4">
            +234 902 525 0026
          </a>
          .
        </p>
      ) : (
        <p className="mt-6 text-[0.9375rem] text-ink-soft">
          A copy of these details has been sent to your email address.
        </p>
      )}

      <Link href="/" className={buttonClass("outline", "md", "mt-9")}>
        <Icon name="arrow-left" className="size-4" strokeWidth={2} />
        Back to the Society
      </Link>
    </div>
  );
}

export function RegistrationForm() {
  const [state, dispatch, pending] = useActionState<RegistrationFormState, FormData>(
    submitRegistration,
    {},
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  // On a failed submission, take the applicant to the first thing to fix.
  useEffect(() => {
    if (!state.fieldErrors && !state.error) return;

    const target =
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]') ??
      alertRef.current;
    if (!target) return;

    target.scrollIntoView({ block: "center", behavior: "smooth" });
    target.focus({ preventScroll: true });
  }, [state]);

  if (state.reference) return <Success state={state} />;

  const errors = state.fieldErrors ?? {};

  // Submitting through onSubmit, not the form `action` prop, so React does not
  // reset the form afterwards: a validation error must not wipe a long form.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (photo) formData.set("photo", photo);
    startTransition(() => dispatch(formData));
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-10" noValidate>
      <FormLetterhead />

      <p className="mx-auto max-w-lg text-center text-[0.9375rem] leading-relaxed text-ink-soft">
        Please complete every section. Fields marked <span className="text-alert">*</span> are
        required. You will need a recent passport photograph.
      </p>

      {state.error ? (
        <div
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="flex items-start gap-3 rounded-2xl border border-alert/25 bg-alert-soft px-4 py-3.5 text-[0.9375rem] text-alert focus:outline-none"
        >
          <Icon name="info" className="mt-0.5 size-5 shrink-0" />
          {state.error}
        </div>
      ) : state.fieldErrors ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-alert/25 bg-alert-soft px-4 py-3.5 text-[0.9375rem] text-alert"
        >
          <Icon name="info" className="mt-0.5 size-5 shrink-0" />
          Some details need attention. They are marked below.
        </div>
      ) : null}

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* 1 · Personal & employment */}
      <fieldset className="space-y-6">
        <Legend step={1}>Personal &amp; employment information</Legend>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          <PhotoField
            error={errors.photo}
            onChange={setPhoto}
            className="sm:order-last sm:pt-7"
          />

          <div className="min-w-0 flex-1 space-y-5">
            <Field label="Surname" name="surname" error={errors.surname} required>
              <input id="surname" name="surname" className={control} autoComplete="family-name" {...describe("surname", errors.surname)} />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" name="firstName" error={errors.firstName} required>
                <input id="firstName" name="firstName" className={control} autoComplete="given-name" {...describe("firstName", errors.firstName)} />
              </Field>
              <Field label="Other names" name="otherNames" error={errors.otherNames}>
                <input id="otherNames" name="otherNames" className={control} autoComplete="additional-name" {...describe("otherNames", errors.otherNames)} />
              </Field>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date of birth" name="dateOfBirth" error={errors.dateOfBirth} required>
                <input id="dateOfBirth" name="dateOfBirth" type="date" className={control} autoComplete="bday" {...describe("dateOfBirth", errors.dateOfBirth)} />
              </Field>
              <Field label="Marital status" name="maritalStatus" error={errors.maritalStatus} required>
                <select id="maritalStatus" name="maritalStatus" defaultValue="" className={control} {...describe("maritalStatus", errors.maritalStatus)}>
                  <option value="" disabled>
                    Choose…
                  </option>
                  {MARITAL_STATUSES.map((value) => (
                    <option key={value} value={value}>
                      {MARITAL_STATUS_LABEL[value]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </div>

        <Field label="Office address" name="officeAddress" error={errors.officeAddress} required>
          <textarea id="officeAddress" name="officeAddress" rows={2} className={control} autoComplete="work street-address" {...describe("officeAddress", errors.officeAddress)} />
        </Field>

        <Field label="Office location / department" name="department" error={errors.department} required>
          <input id="department" name="department" className={control} autoComplete="organization-title" {...describe("department", errors.department)} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Mobile phone number"
            name="phone"
            error={errors.phone}
            hint="Include the network code, e.g. 0803…"
            required
          >
            <input id="phone" name="phone" type="tel" className={control} autoComplete="tel" {...describe("phone", errors.phone, true)} />
          </Field>
          <Field label="Email address" name="email" error={errors.email} required>
            <input id="email" name="email" type="email" className={control} autoComplete="email" {...describe("email", errors.email)} />
          </Field>
        </div>
      </fieldset>

      {/* 2 · Next of kin */}
      <fieldset className={sectionClass}>
        <Legend step={2}>Next of kin details</Legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" name="nokName" error={errors.nokName} required>
            <input id="nokName" name="nokName" className={control} autoComplete="off" {...describe("nokName", errors.nokName)} />
          </Field>
          <Field label="Relationship" name="nokRelationship" error={errors.nokRelationship} required>
            <input id="nokRelationship" name="nokRelationship" list="relationships" className={control} autoComplete="off" {...describe("nokRelationship", errors.nokRelationship)} />
            <datalist id="relationships">
              {RELATIONSHIPS.map((value) => (
                <option key={value} value={value} />
              ))}
            </datalist>
          </Field>
        </div>

        <Field label="Address" name="nokAddress" error={errors.nokAddress} required>
          <textarea id="nokAddress" name="nokAddress" rows={2} className={control} autoComplete="off" {...describe("nokAddress", errors.nokAddress)} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Telephone" name="nokPhone" error={errors.nokPhone} required>
            <input id="nokPhone" name="nokPhone" type="tel" className={control} autoComplete="off" {...describe("nokPhone", errors.nokPhone)} />
          </Field>
        </div>
      </fieldset>

      {/* 3 · Financial & contribution setup */}
      <fieldset className={sectionClass}>
        <Legend step={3}>Financial &amp; contribution setup</Legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Monthly contribution"
            name="monthlyContribution"
            error={errors.monthlyContribution}
            hint="To be deducted from your salary."
            required
          >
            <div className="relative">
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[0.9375rem] text-ink-faint">
                ₦
              </span>
              <input
                id="monthlyContribution"
                name="monthlyContribution"
                inputMode="decimal"
                placeholder="e.g. 10,000"
                className={cn(control, "pl-8 tnum")}
                {...describe("monthlyContribution", errors.monthlyContribution, true)}
              />
            </div>
          </Field>
          <Field
            label="Effective date of contribution"
            name="contributionStartsOn"
            error={errors.contributionStartsOn}
            required
          >
            <input id="contributionStartsOn" name="contributionStartsOn" type="date" className={control} {...describe("contributionStartsOn", errors.contributionStartsOn)} />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Bank name"
            name="bankName"
            error={errors.bankName}
            hint="For app withdrawals and loans."
            required
          >
            <input id="bankName" name="bankName" list="banks" className={control} autoComplete="off" {...describe("bankName", errors.bankName, true)} />
            <datalist id="banks">
              {BANKS.map((value) => (
                <option key={value} value={value} />
              ))}
            </datalist>
          </Field>
          <Field label="Account number" name="accountNumber" error={errors.accountNumber} hint="10 digits." required>
            <input
              id="accountNumber"
              name="accountNumber"
              inputMode="numeric"
              maxLength={10}
              autoComplete="off"
              className={cn(control, "tnum tracking-[0.04em]")}
              {...describe("accountNumber", errors.accountNumber, true)}
            />
          </Field>
        </div>
      </fieldset>

      {/* 4 · Digital platform consent */}
      <fieldset className={sectionClass}>
        <Legend step={4}>Digital platform consent</Legend>
        <div className="grid gap-3">
          <ConsentOption name="consentAppProfile">
            I consent to having my profile created on the Anchor Cooperative mobile application to
            access my Savings, Loans, Purchases, and Shares.
          </ConsentOption>
          <ConsentOption name="consentDigitalId">
            I agree to the setup of a Digital ID and biometric login for application security.
          </ConsentOption>
        </div>
      </fieldset>

      {/* 5 · Declarations & signatures */}
      <fieldset className={sectionClass}>
        <Legend step={5}>Declarations &amp; signatures</Legend>

        <div>
          <label
            className={cn(
              "flex cursor-pointer items-start gap-3.5 rounded-2xl border px-4 py-4 transition-colors has-checked:border-forest-700 has-checked:bg-forest-50",
              errors.declaration ? "border-alert/50 bg-alert-soft/40" : "border-forest-900/15 bg-white hover:border-forest-900/30",
            )}
          >
            <input
              type="checkbox"
              name="declaration"
              className="mt-0.5 size-4 shrink-0 accent-forest-700"
              {...describe("declaration", errors.declaration)}
            />
            <span className="text-[0.9375rem] leading-relaxed text-ink">
              I hereby declare that the information provided above is accurate and true. I agree
              to abide by the bye-laws and regulations governing the {registrationSociety.name}{" "}
              {registrationSociety.descriptor}.<span className="text-alert"> *</span>
            </span>
          </label>
          {errors.declaration ? (
            <p id="declaration-error" className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-alert">
              <Icon name="info" className="size-4 shrink-0" />
              {errors.declaration}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-[1fr_auto]">
          <Field
            label="Applicant signature"
            name="signatureName"
            error={errors.signatureName}
            hint="Type your full name. It stands as your signature."
            required
          >
            <input
              id="signatureName"
              name="signatureName"
              autoComplete="name"
              className={cn(control, "font-display text-[1.0625rem] italic")}
              {...describe("signatureName", errors.signatureName, true)}
            />
          </Field>
          <div>
            <p className="text-[0.875rem] font-medium text-ink">Date</p>
            {/* Server and browser can straddle midnight; the browser's date wins. */}
            <p className="mt-2 rounded-xl border border-forest-900/10 bg-paper-alt/50 px-3.5 py-3 text-[0.9375rem] whitespace-nowrap text-ink-soft tnum" suppressHydrationWarning>
              {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-forest-900/10 bg-paper-alt/40 p-5 sm:p-6">
          <h3 className="text-[1rem] font-semibold text-forest-900">Witness details</h3>
          <p className="mt-1 text-[0.875rem] text-ink-soft">
            Optional here. Your witness signs the printed copy of this form.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Name" name="witnessName" error={errors.witnessName}>
              <input id="witnessName" name="witnessName" className={control} autoComplete="off" {...describe("witnessName", errors.witnessName)} />
            </Field>
            <Field label="Address" name="witnessAddress" error={errors.witnessAddress}>
              <input id="witnessAddress" name="witnessAddress" className={control} autoComplete="off" {...describe("witnessAddress", errors.witnessAddress)} />
            </Field>
          </div>
        </div>
      </fieldset>

      {/* 6 · Payment instructions */}
      <section className={sectionClass} aria-labelledby="payment-heading">
        <div className="flex items-center gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-forest-900 text-[0.8125rem] font-semibold text-gold-300">
            6
          </span>
          <h3 id="payment-heading" className="font-display text-[1.375rem] leading-tight text-forest-900">
            Payment instructions
          </h3>
        </div>
        <FeeAccount />
        <p className="text-[0.875rem] text-ink-soft">
          The &ldquo;Official use only&rdquo; part of the form is completed by the Secretariat.
        </p>
      </section>

      <div className="border-t border-forest-900/[0.08] pt-8">
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className={buttonClass("dark", "lg", "w-full sm:w-auto")}
        >
          {pending ? "Submitting…" : "Submit registration"}
          {pending ? null : <Icon name="arrow-right" className="size-4" strokeWidth={2} />}
        </button>
      </div>
    </form>
  );
}
