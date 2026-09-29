import type { ReactNode } from "react";
import { cn } from "./cn";
import { Icon, type IconName } from "./Icons";

/* ── Surfaces ─────────────────────────────────────────────────────── */

/** Raised card on a paper ground. */
export const card =
  "rounded-2xl border border-forest-900/10 bg-ivory shadow-card";

/** Quiet card on a forest ground. */
export const cardDark =
  "rounded-2xl border border-white/10 bg-white/[0.035]";

/** Inset well inside a card — figures, notes, sub-panels. */
export const well = "rounded-xl bg-paper/70 ring-1 ring-forest-900/[0.06]";
export const wellDark = "rounded-xl bg-black/15 ring-1 ring-white/[0.07]";

/* ── Pills ────────────────────────────────────────────────────────── */

const pillTones = {
  gold: "bg-gold-400/15 text-gold-700 ring-gold-600/25",
  "gold-dark": "bg-gold-400/12 text-gold-300 ring-gold-400/25",
  mint: "bg-mint-500/12 text-mint-700 ring-mint-600/25",
  "mint-dark": "bg-mint-400/12 text-mint-300 ring-mint-400/25",
  clay: "bg-clay-400/15 text-clay-600 ring-clay-500/25",
  "clay-dark": "bg-clay-400/12 text-clay-300 ring-clay-400/25",
  neutral: "bg-forest-900/[0.05] text-ink-soft ring-forest-900/10",
  "neutral-dark": "bg-white/[0.06] text-paper/75 ring-white/12",
  solid: "bg-gold-400 text-forest-950 ring-gold-500",
} as const;

export type PillTone = keyof typeof pillTones;

export function Pill({
  tone = "gold",
  dot,
  icon,
  className,
  children,
}: {
  tone?: PillTone;
  dot?: boolean;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.75rem] leading-none font-semibold whitespace-nowrap ring-1 ring-inset",
        pillTones[tone],
        className,
      )}
    >
      {dot ? (
        <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      ) : null}
      {icon ? <Icon name={icon} className="size-3.5" strokeWidth={2} /> : null}
      {children}
    </span>
  );
}

/* ── Lists ────────────────────────────────────────────────────────── */

export function CheckList({
  items,
  tone = "light",
  className,
  size = "md",
}: {
  items: ReactNode[];
  tone?: "light" | "dark";
  className?: string;
  size?: "sm" | "md";
}) {
  const dark = tone === "dark";
  return (
    <ul className={cn(size === "sm" ? "space-y-2.5" : "space-y-3", className)}>
      {items.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-start gap-3 leading-snug",
            size === "sm" ? "text-[0.875rem]" : "text-[0.9375rem]",
            dark ? "text-paper/80" : "text-ink-soft",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
              dark ? "bg-gold-400/15 text-gold-300" : "bg-forest-700/10 text-forest-700",
            )}
          >
            <Icon name="check" className="size-3" strokeWidth={2.4} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Icon tile ────────────────────────────────────────────────────── */

export function IconTile({
  name,
  tone = "light",
  size = "md",
  className,
}: {
  name: IconName;
  tone?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const tones = {
    light: "bg-forest-700/[0.08] text-forest-700 ring-forest-700/10",
    dark: "bg-gold-400/10 text-gold-300 ring-gold-400/20",
    gold: "bg-gold-400 text-forest-950 ring-gold-500",
  };
  const sizes = {
    sm: "size-9 rounded-lg [&>svg]:size-[1.125rem]",
    md: "size-11 rounded-xl [&>svg]:size-5",
    lg: "size-13 rounded-2xl [&>svg]:size-6",
  };
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center ring-1 ring-inset",
        tones[tone],
        sizes[size],
        className,
      )}
    >
      <Icon name={name} />
    </span>
  );
}

/* ── Key figure ───────────────────────────────────────────────────── */

export function Stat({
  label,
  value,
  note,
  tone = "light",
  accent,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  note?: ReactNode;
  tone?: "light" | "dark";
  accent?: "gold" | "mint";
  className?: string;
}) {
  const dark = tone === "dark";
  const valueColour =
    accent === "mint"
      ? dark
        ? "text-mint-300"
        : "text-mint-700"
      : accent === "gold"
        ? dark
          ? "text-gold-300"
          : "text-gold-700"
        : dark
          ? "text-paper"
          : "text-forest-900";
  return (
    <div className={className}>
      <p className={cn("text-[0.8125rem] font-medium", dark ? "text-paper/60" : "text-ink-faint")}>
        {label}
      </p>
      <p className={cn("figure-num mt-1.5 text-[1.5rem] leading-tight sm:text-[1.625rem]", valueColour)}>
        {value}
      </p>
      {note ? (
        <p className={cn("mt-1 text-[0.8125rem] leading-snug", dark ? "text-paper/55" : "text-ink-faint")}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
