import { Icon } from "@/components/ui/Icons";

/* Form building blocks shared by the interest and registration forms. */

export const control =
  "w-full rounded-xl border border-forest-900/15 bg-white px-3.5 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint/80 transition-colors focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15 focus:outline-none aria-[invalid=true]:border-alert/60";

/** Wires an input to the error or hint that `Field` renders beneath it. */
export function describe(name: string, error?: string, hasHint = false) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${name}-error` : hasHint ? `${name}-hint` : undefined,
  } as const;
}

export function Field({
  label,
  name,
  error,
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[0.875rem] font-medium text-ink">
        {label}
        {required ? <span className="text-alert"> *</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${name}-error`} className="mt-2 flex items-center gap-1.5 text-[0.8125rem] text-alert">
          <Icon name="info" className="size-4 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${name}-hint`} className="mt-2 text-[0.8125rem] text-ink-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Legend({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <legend className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-forest-900 text-[0.8125rem] font-semibold text-gold-300">
        {step}
      </span>
      <span className="font-display text-[1.375rem] leading-tight text-forest-900">{children}</span>
    </legend>
  );
}
