"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendMailAction, type SendMailFormState } from "../actions";
import {
  Button,
  Field,
  Input,
  Notice,
  Select,
  Textarea,
} from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";

type MemberOption = {
  id: string;
  name: string;
  membershipNumber: string;
  email: string;
};

type EnquiryOption = {
  id: string;
  name: string;
  reference: string;
  email: string;
};

const initialState: SendMailFormState = {};

export function ComposeForm({
  members,
  enquiries,
  initialTo = "",
  initialSubject = "",
  initialBody = "",
  initialMemberId = "",
  initialEnquiryId = "",
  initialInReplyTo = "",
  isMailConfigured = false,
}: {
  members: MemberOption[];
  enquiries: EnquiryOption[];
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  initialMemberId?: string;
  initialEnquiryId?: string;
  initialInReplyTo?: string;
  isMailConfigured?: boolean;
}) {
  const router = useRouter();
  const [recipientMode, setRecipientMode] = useState<string>(
    initialMemberId
      ? "member"
      : initialEnquiryId
        ? "enquiry"
        : "custom",
  );

  const [toEmail, setToEmail] = useState(initialTo);
  const [selectedMemberId, setSelectedMemberId] = useState(initialMemberId);
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(initialEnquiryId);

  const [state, formAction] = useActionState(sendMailAction, initialState);

  const handleMemberChange = (id: string) => {
    setSelectedMemberId(id);
    const m = members.find((item) => item.id === id);
    if (m) setToEmail(m.email);
  };

  const handleEnquiryChange = (id: string) => {
    setSelectedEnquiryId(id);
    const e = enquiries.find((item) => item.id === id);
    if (e) setToEmail(e.email);
  };

  return (
    <div className="max-w-3xl">
      {!isMailConfigured ? (
        <div className="mb-6">
          <Notice tone="info">
            SMTP / Resend is not configured on this environment. The email will
            be recorded in the database as <strong>Simulated</strong> and
            logged for your review.
          </Notice>
        </div>
      ) : null}

      {state.error ? (
        <div className="mb-6">
          <Notice tone="error">{state.error}</Notice>
        </div>
      ) : null}

      {state.success ? (
        <div className="mb-6">
          <Notice tone="success">
            {state.simulated
              ? "Email successfully recorded (Simulated mode)."
              : "Email dispatched successfully!"}
          </Notice>
          <div className="mt-3 flex gap-3">
            <Link
              href="/admin/mail"
              className="label-sm text-forest-900 underline hover:text-gold-600"
            >
              ← Back to Mailbox
            </Link>
            {state.messageId ? (
              <Link
                href={`/admin/mail/${state.messageId}`}
                className="label-sm text-forest-900 underline hover:text-gold-600"
              >
                View Dispatched Email →
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      <form action={formAction} className="space-y-6">
        <input type="hidden" name="inReplyTo" value={initialInReplyTo} />
        <input type="hidden" name="memberId" value={selectedMemberId} />
        <input type="hidden" name="enquiryId" value={selectedEnquiryId} />

        {/* Recipient Mode Selector */}
        <Field label="Recipient Mode" name="recipientMode">
          <Select
            id="recipientMode"
            name="recipientMode"
            value={recipientMode}
            onChange={(e) => setRecipientMode(e.target.value)}
          >
            <option value="custom">Specific Email Address</option>
            <option value="member">Select Society Member</option>
            <option value="enquiry">Select Applicant / Enquiry</option>
            <option value="all_active_members">
              Broadcast: All Active Members ({members.length})
            </option>
            <option value="investor_members">
              Broadcast: Investor Members
            </option>
            <option value="non_investor_members">
              Broadcast: Non-Investor Members
            </option>
          </Select>
        </Field>

        {/* Member dropdown */}
        {recipientMode === "member" ? (
          <Field label="Society Member" name="memberSelect">
            <Select
              id="memberSelect"
              name="memberSelect"
              value={selectedMemberId}
              onChange={(e) => handleMemberChange(e.target.value)}
            >
              <option value="">-- Choose Member --</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.membershipNumber}) — {m.email}
                </option>
              ))}
            </Select>
          </Field>
        ) : null}

        {/* Enquiry dropdown */}
        {recipientMode === "enquiry" ? (
          <Field label="Applicant / Enquiry" name="enquirySelect">
            <Select
              id="enquirySelect"
              name="enquirySelect"
              value={selectedEnquiryId}
              onChange={(e) => handleEnquiryChange(e.target.value)}
            >
              <option value="">-- Choose Applicant --</option>
              {enquiries.map((enq) => (
                <option key={enq.id} value={enq.id}>
                  {enq.name} ({enq.reference}) — {enq.email}
                </option>
              ))}
            </Select>
          </Field>
        ) : null}

        {/* Recipient Email Input */}
        {["custom", "member", "enquiry"].includes(recipientMode) ? (
          <Field
            label="Recipient Email"
            name="to"
            required
            error={state.fieldErrors?.to}
            hint="Separate multiple addresses with commas."
          >
            <Input
              id="to"
              name="to"
              type="text"
              value={toEmail}
              onChange={(e) => setToEmail(e.target.value)}
              placeholder="e.g. member@example.com"
              required
            />
          </Field>
        ) : (
          <div className="border border-forest-900/15 bg-paper-sunken/40 p-4 text-[0.875rem] text-forest-950">
            <strong>Group Broadcast Selected</strong>: Email will be sent
            individually to each qualifying member in the chosen group.
          </div>
        )}

        {/* Subject */}
        <Field
          label="Subject"
          name="subject"
          required
          error={state.fieldErrors?.subject}
        >
          <Input
            id="subject"
            name="subject"
            defaultValue={initialSubject}
            placeholder="e.g. Update regarding your membership application"
            required
          />
        </Field>

        {/* Message Body */}
        <Field
          label="Message Body"
          name="body"
          required
          error={state.fieldErrors?.body}
          hint="Paragraphs will be automatically styled inside the official Anchor letterhead template."
        >
          <Textarea
            id="body"
            name="body"
            rows={8}
            defaultValue={initialBody}
            placeholder="Write your email here..."
            required
          />
        </Field>

        {/* Preview / Notice */}
        <div className="border-l-2 border-gold-500 pl-4 py-2 text-[0.8125rem] text-ink-soft">
          <p className="font-semibold text-forest-950">Official Society Letterhead</p>
          <p className="mt-0.5">
            This message will be dispatched with Anchor Real Estate Group&apos;s
            official header banner, registration details (FCTA By-Laws No.
            R11913), and contact numbers.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-rule">
          <SubmitButton pendingLabel="Dispatching...">
            Send Official Email
          </SubmitButton>
          <Link
            href="/admin/mail"
            className="label-sm text-ink-soft hover:text-ink underline"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
