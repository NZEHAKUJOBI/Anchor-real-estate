"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { buttonClass } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { signIn, type LoginState } from "./actions";

const initial: LoginState = {};

const control =
  "mt-2 w-full rounded-xl border border-forest-900/15 bg-white px-3.5 py-3 text-[0.9375rem] text-ink transition-colors focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15 focus:outline-none aria-[invalid=true]:border-alert/60";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={buttonClass("primary", "lg", "w-full")}
    >
      {pending ? "Signing in…" : "Sign in"}
      {pending ? null : <Icon name="arrow-right" className="size-4" strokeWidth={2} />}
    </button>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} className="mt-2 text-[0.8125rem] text-alert">
      {message}
    </p>
  ) : null;
}

export function LoginForm({ next }: { next?: string }) {
  const [state, action] = useActionState(signIn, initial);
  const emailError = state.fieldErrors?.email;
  const passwordError = state.fieldErrors?.password;

  return (
    <form action={action} className="space-y-5" noValidate>
      {next ? <input type="hidden" name="next" value={next} /> : null}

      {state.error ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-alert/25 bg-alert-soft px-4 py-3 text-[0.9375rem] text-alert"
        >
          <Icon name="info" className="mt-0.5 size-5 shrink-0" />
          {state.error}
        </div>
      ) : null}

      <div>
        <label htmlFor="email" className="text-[0.875rem] font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          autoFocus
          required
          aria-invalid={Boolean(emailError) || undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          className={control}
        />
        <FieldError id="email-error" message={emailError} />
      </div>

      <div>
        <label htmlFor="password" className="text-[0.875rem] font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={Boolean(passwordError) || undefined}
          aria-describedby={passwordError ? "password-error" : undefined}
          className={control}
        />
        <FieldError id="password-error" message={passwordError} />
      </div>

      <div className="pt-2">
        <Submit />
      </div>
    </form>
  );
}
