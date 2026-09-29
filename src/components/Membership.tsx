import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { cn } from "./ui/cn";
import { Icon, type IconName } from "./ui/Icons";
import { card } from "./ui/primitives";
import { fees, holdingBand, nonInvestorTier } from "@/lib/content";

const TICKS = Array.from({ length: 41 }, (_, i) => i);
const FEE_ICONS: IconName[] = ["idcard", "coins", "users"];

function Endpoint({
  slots,
  amount,
  caption,
  align,
}: {
  slots: string;
  amount: string;
  caption: string;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : ""}>
      <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-gold-700 uppercase">{caption}</p>
      <p className="figure-num mt-2 text-[1.75rem] leading-none text-forest-900 sm:text-[2.5rem]">{amount}</p>
      <p className="mt-2 text-[0.9375rem] text-ink-soft tnum">{slots}</p>
    </div>
  );
}

export function Membership() {
  return (
    <section id="membership" className="bg-paper-alt py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            layout="split"
            eyebrow="Membership & ownership"
            title={
              <>
                Ownership, in slots of <Accent>₦5,000.</Accent>
              </>
            }
            lead="Ownership is expressed in slots of ₦5,000 each. A member's stake is simply the number of slots held — nothing is discretionary, and nothing is negotiated case by case."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className={cn(card, "rounded-3xl p-6 sm:p-9")}>
            <div className="flex items-start justify-between gap-6">
              <Endpoint
                caption={holdingBand.floor.caption}
                amount={holdingBand.floor.amount}
                slots={holdingBand.floor.slots}
                align="left"
              />
              <Endpoint
                caption={holdingBand.ceiling.caption}
                amount={holdingBand.ceiling.amount}
                slots={holdingBand.ceiling.slots}
                align="right"
              />
            </div>

            {/* Graduated scale between the floor and the ceiling. */}
            <div className="mt-8" aria-hidden="true">
              <div className="h-2.5 rounded-full bg-linear-to-r from-forest-200 via-forest-500 to-forest-900" />
              <div className="mt-2 flex items-start justify-between px-px">
                {TICKS.map((tick) => {
                  const major = tick === 0 || tick === TICKS.length - 1;
                  const mid = tick % 10 === 0;
                  return (
                    <span
                      key={tick}
                      className={cn(
                        "w-px",
                        major ? "h-4 bg-gold-600" : mid ? "h-3 bg-forest-900/35" : "h-1.5 bg-forest-900/20",
                      )}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 text-[0.875rem] sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-ink-soft">
                <Icon name="trending" className="size-4 text-forest-600" />
                {holdingBand.scaleNote}
              </p>
              <p className="flex items-center gap-2 font-medium text-gold-700">
                <Icon name="shield" className="size-4" />
                {holdingBand.capNote}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <dl className="mt-5 grid gap-5 sm:grid-cols-3">
            {fees.map((fee, index) => (
              <div key={fee.detail} className="rounded-3xl border border-forest-900/10 bg-ivory/70 p-6 sm:p-7">
                <dt className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-forest-700/[0.08] text-forest-700">
                    <Icon name={FEE_ICONS[index] ?? "coins"} className="size-5" />
                  </span>
                  <span className="text-[0.875rem] font-semibold text-ink-soft">{fee.label}</span>
                </dt>
                <dd>
                  <p className="figure-num mt-5 text-[2.25rem] leading-none text-forest-900">{fee.amount}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{fee.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-gold-500/30 bg-gold-50 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400 text-forest-950">
              <Icon name="idcard" className="size-6" />
            </span>
            <div>
              <h3 className="text-[1.0625rem] font-semibold text-forest-900">{nonInvestorTier.title}</h3>
              <p className="mt-1 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">{nonInvestorTier.body}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
