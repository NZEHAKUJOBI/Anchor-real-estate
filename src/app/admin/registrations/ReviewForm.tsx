"use client";

import { useActionState, useState } from "react";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { Field, Input, Notice, Select, Textarea } from "@/components/admin/ui";
import {
  MAX_INVESTOR_SLOTS,
  MEMBER_TIERS,
  MIN_INVESTOR_SLOTS,
  TIER_LABEL,
  type MemberTier,
} from "@/lib/constants";
import { reviewRegistration, type RegistrationReviewState } from "./actions";

export function ReviewForm({
  registrationId,
  currentStatus,
  alreadyLinked,
  appProfileCreated,
  consentedToApp,
  reviewNote,
}: {
  registrationId: string;
  currentStatus: string;
  alreadyLinked: boolean;
  appProfileCreated?: boolean;
  consentedToApp: boolean;
  reviewNote?: string;
}) {
  const [state, action] = useActionState<RegistrationReviewState, FormData>(
    reviewRegistration,
    {},
  );
  const [decision, setDecision] = useState<string>(
    currentStatus === "new" ? "reviewing" : currentStatus,
  );
  const [tier, setTier] = useState<MemberTier>("investor");

  const seedsMember = decision === "approved" && !alreadyLinked;

  return (
    <form action={action} className="space-y-6" noValidate>
      <input type="hidden" name="registrationId" value={registrationId} />

      {state.error ? <Notice tone="error">{state.error}</Notice> : null}
      {state.success ? <Notice tone="success">{state.success}</Notice> : null}

      <Field label="Decision" name="decision" error={state.fieldErrors?.decision} required>
        <Select
          id="decision"
          name="decision"
          value={decision}
          onChange={(event) => setDecision(event.target.value)}
        >
          <option value="reviewing">Mark as reviewing</option>
          <option value="approved">
            {alreadyLinked ? "Approved — member record exists" : "Approve — create a pending member record"}
          </option>
          <option value="declined">Decline</option>
        </Select>
      </Field>

      {seedsMember ? (
        <>
          <Notice tone="info">
            A member record will be created with status <strong>pending</strong>, pre-filled
            from this form. The form does not ask for a tier, so choose it here. It takes no
            payment — an officer completes admission on the member record.
          </Notice>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Tier" name="tier" error={state.fieldErrors?.tier} required>
              <Select
                id="tier"
                name="tier"
                value={tier}
                onChange={(event) => setTier(event.target.value as MemberTier)}
              >
                {MEMBER_TIERS.map((value) => (
                  <option key={value} value={value}>
                    {TIER_LABEL[value]}
                  </option>
                ))}
              </Select>
            </Field>
            {tier === "investor" ? (
              <Field
                label="Slots"
                name="slots"
                error={state.fieldErrors?.slots}
                hint={`${MIN_INVESTOR_SLOTS.toLocaleString()}–${MAX_INVESTOR_SLOTS.toLocaleString()}`}
                required
              >
                <Input
                  id="slots"
                  name="slots"
                  type="number"
                  inputMode="numeric"
                  min={MIN_INVESTOR_SLOTS}
                  max={MAX_INVESTOR_SLOTS}
                  step={1}
                  defaultValue={MIN_INVESTOR_SLOTS}
                />
              </Field>
            ) : (
              <input type="hidden" name="slots" value="0" />
            )}
          </div>
        </>
      ) : null}

      <Field
        label="App profile created"
        name="appProfileCreated"
        error={state.fieldErrors?.appProfileCreated}
        hint={
          consentedToApp
            ? undefined
            : "The applicant did not consent to an app profile."
        }
      >
        <Select
          id="appProfileCreated"
          name="appProfileCreated"
          defaultValue={
            appProfileCreated === undefined ? "" : appProfileCreated ? "yes" : "no"
          }
        >
          <option value="">Not recorded</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Select>
      </Field>

      <Field
        label="Note"
        name="reviewNote"
        error={state.fieldErrors?.reviewNote}
        hint="Recorded against the registration and visible to other officers."
      >
        <Textarea id="reviewNote" name="reviewNote" rows={3} defaultValue={reviewNote} />
      </Field>

      <SubmitButton variant="gold" pendingLabel="Saving…">
        Save Decision
      </SubmitButton>
    </form>
  );
}
