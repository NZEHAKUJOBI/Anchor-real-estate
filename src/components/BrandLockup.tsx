import Link from "next/link";
import { Crest } from "./Crest";
import { cn } from "./ui/cn";

/**
 * The Society's signature: seal, a hairline, then the name set in spaced serif
 * capitals — echoing the lettering on the seal itself — over the legal
 * descriptor in small sans capitals. The two lines are tracked to roughly the
 * same measure so they read as one block.
 *
 * `tone` names the ground it sits on. A hash `href` renders a plain anchor so
 * it scrolls in place on the landing page instead of re-navigating.
 */
export function BrandLockup({
  href = "/",
  tone = "dark",
  size = "md",
  eager = false,
  className,
  onClick,
}: {
  href?: string;
  tone?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  eager?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const dark = tone === "dark";

  const seal = {
    sm: "size-9",
    md: "size-9 xs:size-10 sm:size-11",
    lg: "size-12 sm:size-14",
  }[size];

  // Below 360px the name scales with the viewport so it never collides with
  // the menu button.
  const name = {
    sm: "text-[0.78rem] tracking-[0.07em]",
    md: "text-[clamp(0.6875rem,3.6vw,0.8125rem)] tracking-[0.05em] xs:text-[0.875rem] xs:tracking-[0.06em] sm:text-[0.9375rem] sm:tracking-[0.075em] lg:text-[0.875rem] lg:tracking-[0.06em] xl:text-[0.9375rem] xl:tracking-[0.075em]",
    lg: "text-[0.9375rem] tracking-[0.07em] sm:text-[1.0625rem] sm:tracking-[0.08em]",
  }[size];

  const descriptor = {
    sm: "text-[0.5rem] tracking-[0.15em]",
    md: "text-[0.5rem] tracking-[0.12em] xs:text-[0.53rem] xs:tracking-[0.13em] sm:text-[0.5625rem] sm:tracking-[0.155em] lg:text-[0.53rem] lg:tracking-[0.13em] xl:text-[0.5625rem] xl:tracking-[0.155em]",
    lg: "text-[0.5625rem] tracking-[0.15em] sm:text-[0.625rem] sm:tracking-[0.16em]",
  }[size];

  const content = (
    <>
      <Crest
        size={size === "lg" ? 112 : 88}
        eager={eager}
        className={cn(
          seal,
          "shrink-0 rounded-full transition-transform duration-300 group-hover:scale-[1.03]",
          dark && "shadow-[0_0_0_1px_rgb(217_190_114/0.25),0_6px_18px_-6px_rgb(0_0_0/0.6)]",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "hidden h-9 w-px shrink-0 sm:block",
          size === "md" && "lg:hidden xl:block",
          dark ? "bg-gold-400/30" : "bg-gold-600/35",
        )}
      />
      <span className="flex min-w-0 flex-col">
        <span
          className={cn(
            "font-display leading-none font-semibold whitespace-nowrap uppercase",
            name,
            dark ? "text-paper" : "text-forest-900",
          )}
        >
          Anchor Real Estate Group
        </span>
        <span
          className={cn(
            "mt-[0.4375rem] leading-none font-semibold whitespace-nowrap uppercase",
            descriptor,
            dark ? "text-gold-400" : "text-gold-700",
          )}
        >
          Multipurpose Cooperative Society Ltd.
        </span>
      </span>
    </>
  );

  const classes = cn(
    "group flex min-w-0 items-center gap-2.5 sm:gap-3.5",
    className,
  );

  return href.startsWith("#") ? (
    <a href={href} onClick={onClick} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
