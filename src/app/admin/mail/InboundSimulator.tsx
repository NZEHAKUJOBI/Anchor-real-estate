"use client";

import { useActionState, useState } from "react";
import { simulateInboundAction, type SimulateInboundState } from "./actions";
import { Button, Field, Input, Textarea, Notice } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/SubmitButton";

const initialState: SimulateInboundState = {};

export function InboundSimulator() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useActionState(simulateInboundAction, initialState);

  if (!open) {
    return (
      <div className="border-t border-rule pt-6 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-[0.8125rem] text-ink-soft hover:text-forest-900 underline transition-colors"
        >
          Need to test receiving mail? Click here to simulate an inbound email
        </button>
      </div>
    );
  }

  return (
    <div className="border border-dashed border-rule bg-paper-sunken/40 p-6 rounded-md">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-[1.125rem] text-forest-950">
            Simulate Inbound Email
          </h3>
          <p className="text-[0.8125rem] text-ink-soft mt-1">
            Test how incoming emails and enquiries arrive in the Secretariat Inbox.
            If the sender matches an existing Member or Enquiry email, it will
            automatically be linked.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-[0.8125rem] text-ink-soft hover:text-ink"
        >
          Close
        </button>
      </div>

      {state.error ? (
        <div className="mb-4">
          <Notice tone="error">{state.error}</Notice>
        </div>
      ) : null}

      {state.success ? (
        <div className="mb-4">
          <Notice tone="success">
            Simulated inbound message created successfully! Check your Inbox.
          </Notice>
        </div>
      ) : null}

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Sender Email" name="from" required>
            <Input
              id="from"
              name="from"
              type="email"
              placeholder="e.g. prospective.member@example.com"
              required
            />
          </Field>
          <Field label="Subject" name="subject" required>
            <Input
              id="subject"
              name="subject"
              placeholder="e.g. Enquiry regarding slot purchase"
              required
            />
          </Field>
        </div>

        <Field label="Message Body" name="body" required>
          <Textarea
            id="body"
            name="body"
            rows={3}
            placeholder="Write message content..."
            required
          />
        </Field>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <SubmitButton pendingLabel="Creating...">
            Simulate Incoming Email
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
