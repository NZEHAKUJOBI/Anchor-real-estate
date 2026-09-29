import type { ReactNode } from "react";
import { cn } from "./ui/cn";

/**
 * Section head: a short gold rule and eyebrow, the serif title, and an
 * optional lead. `split` sets the lead beside the title on wide screens —
 * the editorial layout used where the lead is long enough to deserve it.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "light",
  align = "left",
  layout = "stack",
  action,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  layout?: "stack" | "split";
  action?: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  const centered = align === "center";

  const eyebrowEl = (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        centered && "justify-center",
        dark ? "text-gold-400" : "text-gold-700",
      )}
    >
      <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
      {eyebrow}
      {centered ? (
        <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
      ) : null}
    </p>
  );

  const titleEl = (
    <h2
      className={cn(
        "font-display mt-5 text-[2.125rem] leading-[1.06] font-normal tracking-[-0.022em] text-balance sm:text-[2.625rem] lg:text-[3.125rem]",
        dark ? "text-paper" : "text-forest-900",
      )}
    >
      {title}
    </h2>
  );

  const leadEl = lead ? (
    <p
      className={cn(
        "text-[1.0625rem] leading-[1.65] text-pretty sm:text-[1.125rem]",
        dark ? "text-paper/70" : "text-ink-soft",
      )}
    >
      {lead}
    </p>
  ) : null;

  if (layout === "split") {
    return (
      <header
        className={cn(
          "mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12",
          className,
        )}
      >
        <div className="lg:col-span-7">
          {eyebrowEl}
          {titleEl}
        </div>
        {leadEl || action ? (
          <div className="space-y-6 lg:col-span-5 lg:pb-1.5">
            {leadEl}
            {action}
          </div>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "mb-12 md:mb-14",
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrowEl}
      {titleEl}
      {leadEl ? <div className="mt-5">{leadEl}</div> : null}
      {action ? <div className="mt-8">{action}</div> : null}
    </header>
  );
}

/** Italic accent inside a section title. */
export function Accent({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <em
      className={cn(
        "font-display italic",
        tone === "dark" ? "text-gold-300" : "text-forest-600",
      )}
    >
      {children}
    </em>
  );
}
