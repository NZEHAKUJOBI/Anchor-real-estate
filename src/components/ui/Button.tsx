import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./cn";
import { Icon } from "./Icons";

/*
  Public-site buttons. Pills in sentence case: the gold primary is the one
  action per view that matters; everything else is quieter by design.
  `outline` and `dark` sit on light grounds, `inverse` and `light` on forest.
*/
const variants = {
  primary:
    "bg-gold-400 text-forest-950 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_10px_24px_-12px_rgb(195_164_78/0.8)] hover:bg-gold-300",
  dark: "bg-forest-900 text-paper shadow-[0_10px_24px_-14px_rgb(7_31_23/0.8)] hover:bg-forest-800",
  outline:
    "border border-forest-900/20 bg-transparent text-forest-900 hover:border-forest-900/45 hover:bg-forest-900/[0.04]",
  inverse:
    "border border-paper/25 bg-transparent text-paper hover:border-paper/55 hover:bg-white/[0.06]",
  light: "bg-ivory text-forest-950 hover:bg-white",
} as const;

const sizes = {
  sm: "h-9 px-4 text-[0.8125rem] gap-1.5",
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-13 px-7 text-[1rem] gap-2.5",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "group/btn inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-[-0.005em] whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-200 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

function Arrow() {
  return (
    <Icon
      name="arrow-right"
      className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
      strokeWidth={2}
    />
  );
}

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<typeof Link>, "children">) {
  return (
    <Link {...props} className={buttonClass(variant, size, className)}>
      {children}
      {arrow ? <Arrow /> : null}
    </Link>
  );
}

/** In-page anchor — a plain <a>, so hash links scroll rather than navigate. */
export function ButtonAnchor({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: Common & Omit<ComponentProps<"a">, "children">) {
  return (
    <a {...props} className={buttonClass(variant, size, className)}>
      {children}
      {arrow ? <Arrow /> : null}
    </a>
  );
}

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  type = "button",
  ...props
}: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button {...props} type={type} className={buttonClass(variant, size, className)}>
      {children}
      {arrow ? <Arrow /> : null}
    </button>
  );
}
