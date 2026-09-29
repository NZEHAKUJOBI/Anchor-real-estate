import Link from "next/link";
import { Reveal } from "../Reveal";
import { Accent, SectionHeading } from "../SectionHeading";
import { ButtonAnchor, buttonClass } from "../ui/Button";
import { cn } from "../ui/cn";
import { Icon, type IconName } from "../ui/Icons";
import { CheckList } from "../ui/primitives";

interface Pathway {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  entryRequirement: string;
  timeline: string;
  features: string[];
  ctaText: string;
  icon: IconName;
  highlight?: boolean;
}

const pathways: Pathway[] = [
  {
    id: "start",
    name: "Anchor START™",
    tagline: "Save progressively towards your first property.",
    targetAudience: "Aspiring homeowners building initial capacity",
    entryRequirement: "From ₦10,000 / month savings",
    timeline: "12 – 36 months",
    features: [
      "Auto-allocation into ₦5,000 ownership slots",
      "Earn annual cooperative dividends while saving",
      "Progressive AnchorScore™ building",
      "Priority allocation in upcoming Anchor estates",
    ],
    ctaText: "Start saving",
    icon: "coins",
  },
  {
    id: "own",
    name: "Anchor OWN™",
    tagline: "For individuals ready for deposit + structured financing.",
    targetAudience: "Buyers with initial equity ready for construction",
    entryRequirement: "25% deposit threshold",
    timeline: "Immediate to 12 months",
    features: [
      "Verified FCDA / Area Council land titles",
      "Cooperative credit co-financing up to 10 years",
      "Fixed construction pricing — immune to inflation",
      "Transparent Property DNA™ project monitoring",
    ],
    ctaText: "Explore properties",
    icon: "key",
    highlight: true,
  },
  {
    id: "live",
    name: "Anchor LIVE™",
    tagline: "Move in now. Convert your monthly rent into equity.",
    targetAudience: "Tenants wanting to stop paying dead rent in Abuja",
    entryRequirement: "First year rent + deposit credit",
    timeline: "3 – 7 years to full deed transfer",
    features: [
      "Occupancy granted after verified onboarding",
      "70% of monthly rental payments credited to ownership",
      "AnchorScore™ underwriting (no payslip barrier)",
      "Option to buy out equity ahead of schedule",
    ],
    ctaText: "Check rent-to-own",
    icon: "home",
  },
  {
    id: "grow",
    name: "Anchor GROW™",
    tagline: "Institutional real-estate wealth for passive investors.",
    targetAudience: "Wealth builders seeking inflation-hedged yields",
    entryRequirement: "Minimum 100 slots (₦500,000)",
    timeline: "Ongoing wealth distribution",
    features: [
      "Direct exposure to prime warehousing & commercial assets",
      "Annual dividend distribution & capital appreciation",
      "Secondary liquidity via Anchor Property Exchange",
      "Protected by statutory cooperative asset collateral",
    ],
    ctaText: "Invest in slots",
    icon: "trending",
  },
];

const ladder = ["START", "OWN", "LIVE", "GROW"];

export function OwnershipPathways() {
  return (
    <section id="pathways" className="relative overflow-hidden bg-forest-950 py-20 text-paper md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgb(43_115_88/0.35),transparent_70%)]"
      />
      <div className="shell relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            layout="split"
            eyebrow="Ownership pathways"
            title={
              <>
                Four pathways. <Accent tone="dark">One ladder</Accent> to ownership.
              </>
            }
            lead="Where are you in this system? Rather than presenting eight unrelated services, Anchor organises your journey into clear, structured milestones."
          />
        </Reveal>

        <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pathways.map((p, index) => {
            const featured = p.highlight;
            return (
              <Reveal key={p.id} delay={index * 70} className="h-full">
                <article
                  id={`pathway-${p.id}`}
                  className={cn(
                    "relative flex h-full scroll-mt-28 flex-col rounded-3xl p-6 sm:p-7",
                    featured
                      ? "bg-ivory text-ink shadow-[0_30px_60px_-24px_rgb(0_0_0/0.7)] ring-1 ring-gold-400/60"
                      : "border border-white/10 bg-white/[0.035] transition-colors duration-300 hover:border-white/20",
                  )}
                >
                  {featured ? (
                    <span className="absolute -top-3 right-6 inline-flex items-center gap-1.5 rounded-full bg-gold-400 px-3 py-1 text-[0.75rem] font-bold text-forest-950 shadow-md">
                      <Icon name="star" className="size-3.5" strokeWidth={2} />
                      Most popular
                    </span>
                  ) : null}

                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl ring-1 ring-inset",
                        featured
                          ? "bg-forest-900 text-gold-300 ring-forest-900"
                          : "bg-gold-400/10 text-gold-300 ring-gold-400/20",
                      )}
                    >
                      <Icon name={p.icon} className="size-5" />
                    </span>
                    <span
                      className={cn(
                        "text-[0.8125rem] font-bold tracking-[0.1em] uppercase",
                        featured ? "text-gold-700" : "text-gold-400",
                      )}
                    >
                      {p.name}
                    </span>
                  </div>

                  <h3
                    className={cn(
                      "font-display mt-6 text-[1.4375rem] leading-[1.25] tracking-[-0.01em] text-balance",
                      featured ? "text-forest-900" : "text-paper",
                    )}
                  >
                    {p.tagline}
                  </h3>
                  <p className={cn("mt-2.5 text-[0.875rem] leading-snug", featured ? "text-ink-soft" : "text-paper/60")}>
                    {p.targetAudience}
                  </p>

                  <dl
                    className={cn(
                      "mt-6 grid grid-cols-2 gap-4 rounded-2xl p-4 xl:grid-cols-1 xl:gap-3",
                      featured ? "bg-paper-alt/70" : "bg-black/15 ring-1 ring-white/[0.06]",
                    )}
                  >
                    <div>
                      <dt className={cn("text-[0.75rem] font-medium", featured ? "text-ink-faint" : "text-paper/50")}>
                        Entry point
                      </dt>
                      <dd className={cn("mt-1 text-[0.875rem] leading-snug font-semibold", featured ? "text-forest-900" : "text-gold-300")}>
                        {p.entryRequirement}
                      </dd>
                    </div>
                    <div>
                      <dt className={cn("text-[0.75rem] font-medium", featured ? "text-ink-faint" : "text-paper/50")}>
                        Timeline
                      </dt>
                      <dd className={cn("mt-1 text-[0.875rem] leading-snug font-semibold", featured ? "text-forest-900" : "text-paper")}>
                        {p.timeline}
                      </dd>
                    </div>
                  </dl>

                  <CheckList
                    items={p.features}
                    tone={featured ? "light" : "dark"}
                    size="sm"
                    className="mt-6 mb-8"
                  />

                  <Link
                    href={`/join?pathway=${p.id}`}
                    className={buttonClass(featured ? "dark" : "inverse", "md", "mt-auto w-full")}
                  >
                    {p.ctaText}
                    <Icon name="arrow-right" className="size-4" strokeWidth={2} />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* The ladder: members move between tiers rather than being boxed in. */}
        <Reveal delay={120}>
          <div className="mt-12 grid gap-8 rounded-3xl border border-gold-400/20 bg-linear-to-br from-forest-900/80 to-forest-950 p-7 sm:p-9 lg:grid-cols-12 lg:items-center lg:gap-10">
            <div className="lg:col-span-7">
              <p className="eyebrow text-gold-400">The housing ladder</p>
              <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-paper/80">
                You are never stuck in one tier. You can start with{" "}
                <strong className="font-semibold text-paper">Anchor START™</strong>, graduate to{" "}
                <strong className="font-semibold text-paper">Anchor OWN™</strong>, move into{" "}
                <strong className="font-semibold text-paper">Anchor LIVE™</strong>, and trade up to
                larger assets while building equity with{" "}
                <strong className="font-semibold text-paper">Anchor GROW™</strong>.
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5 lg:items-end">
              <ol className="flex w-full items-center justify-between gap-1 lg:max-w-sm">
                {ladder.map((rung, index) => (
                  <li key={rung} className="flex flex-1 items-center gap-1 last:flex-none">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-forest-950 text-[0.6875rem] font-bold tracking-[0.06em] text-gold-300">
                      {rung}
                    </span>
                    {index < ladder.length - 1 ? (
                      <span aria-hidden="true" className="h-px flex-1 bg-linear-to-r from-gold-400/50 to-gold-400/15" />
                    ) : null}
                  </li>
                ))}
              </ol>
              <ButtonAnchor href="#homepath" variant="primary" size="md" arrow>
                Find my starting point
              </ButtonAnchor>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
