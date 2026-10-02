"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/components/ui/cn";
import { Icon } from "@/components/ui/Icons";
import { buttonClass } from "@/components/ui/Button";
import {
  MAX_INVESTOR_SLOTS,
  MIN_INVESTOR_SLOTS,
  SLOT_PRICE_KOBO,
  TIER_INTERESTS,
  TIER_INTEREST_LABEL,
  type TierInterest,
} from "@/lib/constants";
import { formatNaira } from "@/lib/money";
import { submitEnquiry, type EnquiryFormState } from "./actions";
import { Field, Legend, control } from "./fields";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={buttonClass("dark", "lg", "w-full sm:w-auto")}
    >
      {pending ? "Submitting…" : "Register my interest"}
      {pending ? null : <Icon name="arrow-right" className="size-4" strokeWidth={2} />}
    </button>
  );
}

export function EnquiryForm() {
  const [state, action] = useActionState<EnquiryFormState, FormData>(
    submitEnquiry,
    {},
  );
  const [tier, setTier] = useState<TierInterest>("investor");
  const [slots, setSlots] = useState("");

  if (state.reference) {
    return (
      <div className="py-4 text-center sm:py-8">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-mint-500/12 text-mint-700">
          <Icon name="check" className="size-7" strokeWidth={2.2} />
        </span>
        <p className="eyebrow mt-6 text-gold-700">Enquiry received</p>
        <h2 className="font-display mt-3 text-[1.75rem] leading-tight text-forest-900 sm:text-[2rem]">
          Thank you — we have your details.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
          Your reference is{" "}
          <strong className="rounded-md bg-forest-900/[0.06] px-2 py-0.5 font-semibold text-forest-900 tnum">
            {state.reference}
          </strong>
          . Please quote it in any correspondence. A member of the Secretariat will contact you.
        </p>

        {state.mailDelayed ? (
          <p className="mx-auto mt-6 max-w-md rounded-2xl border border-gold-500/30 bg-gold-50 px-5 py-4 text-left text-[0.9375rem] leading-relaxed text-ink-soft">
            We could not send your confirmation email just now, but your enquiry is safely
            recorded. If you do not hear from us within a few days, call the Secretariat on{" "}
            <a href="tel:+2349025250026" className="font-medium text-forest-900 underline underline-offset-4">
              +234 902 525 0026
            </a>
            .
          </p>
        ) : (
          <p className="mt-5 text-[0.9375rem] text-ink-soft">
            A confirmation has been sent to your email address.
          </p>
        )}

        <Link href="/" className={buttonClass("outline", "md", "mt-9")}>
          <Icon name="arrow-left" className="size-4" strokeWidth={2} />
          Back to the Society
        </Link>
      </div>
    );
  }

  const slotCount = Number(slots);
  const holdingKobo =
    Number.isInteger(slotCount) && slotCount > 0 ? slotCount * SLOT_PRICE_KOBO : 0;

  return (
    <form action={action} className="space-y-10" noValidate>
      {state.error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-alert/25 bg-alert-soft px-4 py-3.5 text-[0.9375rem] text-alert"
        >
          <Icon name="info" className="mt-0.5 size-5 shrink-0" />
          {state.error}
        </div>
      ) : null}

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="space-y-6">
        <Legend step={1}>Your details</Legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="First name" name="firstName" error={state.fieldErrors?.firstName} required>
            <input id="firstName" name="firstName" className={control} autoComplete="given-name" aria-invalid={Boolean(state.fieldErrors?.firstName) || undefined} required />
          </Field>
          <Field label="Surname" name="lastName" error={state.fieldErrors?.lastName} required>
            <input id="lastName" name="lastName" className={control} autoComplete="family-name" aria-invalid={Boolean(state.fieldErrors?.lastName) || undefined} required />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email" name="email" error={state.fieldErrors?.email} required>
            <input id="email" name="email" type="email" className={control} autoComplete="email" aria-invalid={Boolean(state.fieldErrors?.email) || undefined} required />
          </Field>
          <Field
            label="Phone"
            name="phone"
            error={state.fieldErrors?.phone}
            hint="Include the network code, e.g. 0803…"
            required
          >
            <input id="phone" name="phone" type="tel" className={control} autoComplete="tel" aria-invalid={Boolean(state.fieldErrors?.phone) || undefined} required />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Occupation" name="occupation" error={state.fieldErrors?.occupation}>
            <input id="occupation" name="occupation" className={control} autoComplete="organization-title" />
          </Field>
          <Field label="How did you hear about us?" name="heardFrom" error={state.fieldErrors?.heardFrom}>
            <input id="heardFrom" name="heardFrom" className={control} />
          </Field>
        </div>

        <Field label="Address" name="address" error={state.fieldErrors?.address}>
          <textarea id="address" name="address" rows={2} className={control} autoComplete="street-address" />
        </Field>
      </fieldset>

      <fieldset className="space-y-6 border-t border-forest-900/[0.08] pt-9">
        <Legend step={2}>Your interest</Legend>

        <div>
          <p id="tier-label" className="text-[0.875rem] font-medium text-ink">
            Which tier interests you?<span className="text-alert"> *</span>
          </p>
          <div role="radiogroup" aria-labelledby="tier-label" className="mt-3 grid gap-3">
            {TIER_INTERESTS.map((value) => {
              const selected = tier === value;
              return (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3.5 rounded-2xl border px-4 py-4 transition-[border-color,background-color,box-shadow]",
                    selected
                      ? "border-forest-700 bg-forest-50 shadow-[0_0_0_1px_var(--color-forest-700)]"
                      : "border-forest-900/15 bg-white hover:border-forest-900/30",
                  )}
                >
                  <input
                    type="radio"
                    name="tierInterest"
                    value={value}
                    checked={selected}
                    onChange={() => setTier(value)}
                    className="mt-0.5 size-4 accent-forest-700"
                  />
                  <span className="text-[0.9375rem] leading-snug text-ink">
                    {TIER_INTEREST_LABEL[value]}
                  </span>
                </label>
              );
            })}
          </div>
          {state.fieldErrors?.tierInterest ? (
            <p className="mt-2 text-[0.8125rem] text-alert">{state.fieldErrors.tierInterest}</p>
          ) : null}
        </div>

        {tier === "investor" ? (
          <Field
            label="Slots you are considering"
            name="slotsInterest"
            error={state.fieldErrors?.slotsInterest}
            hint={
              holdingKobo > 0
                ? `A holding of ${formatNaira(holdingKobo)}. Optional — an indication only.`
                : `${MIN_INVESTOR_SLOTS.toLocaleString()}–${MAX_INVESTOR_SLOTS.toLocaleString()} slots at ₦5,000 each. Optional.`
            }
          >
            <input
              id="slotsInterest"
              name="slotsInterest"
              type="number"
              inputMode="numeric"
              min={MIN_INVESTOR_SLOTS}
              max={MAX_INVESTOR_SLOTS}
              step={1}
              value={slots}
              onChange={(event) => setSlots(event.target.value)}
              placeholder="e.g. 100"
              className={cn(control, "sm:max-w-xs")}
            />
          </Field>
        ) : null}

        <Field
          label="Anything you would like to tell us?"
          name="message"
          error={state.fieldErrors?.message}
        >
          <textarea id="message" name="message" rows={4} className={control} />
        </Field>
      </fieldset>

      <div className="border-t border-forest-900/[0.08] pt-8">
        <p className="mb-6 flex max-w-xl gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
          <Icon name="shield" className="mt-0.5 size-5 shrink-0 text-forest-600" />
          <span>
            Submitting this form registers your interest only. It does not create membership and
            commits you to no payment. Ready to join?{" "}
            <Link
              href="/join/register"
              className="font-medium text-forest-900 underline underline-offset-4 hover:text-forest-700"
            >
              Complete the membership registration form
            </Link>
            .
          </span>
        </p>
        <Submit />
      </div>
    </form>
  );
}
