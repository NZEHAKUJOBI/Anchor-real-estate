import { Fragment } from "react";
import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { cn } from "./ui/cn";
import { Icon } from "./ui/Icons";
import { expansionNote, marketLanes } from "@/lib/content";

/** Turns down the page on narrow screens, along the lane on wide ones. */
function Arrow() {
  return (
    <span aria-hidden="true" className="flex shrink-0 items-center justify-center self-center py-1.5 sm:py-0">
      <Icon name="arrow-right" className="size-5 rotate-90 text-gold-400/70 sm:rotate-0" />
    </span>
  );
}

function Node({ children, terminal, first }: { children: string; terminal?: boolean; first?: boolean }) {
  return (
    <span
      className={cn(
        "flex items-center gap-3 rounded-2xl px-5 py-4 text-[0.9375rem] leading-snug sm:flex-1",
        terminal
          ? "border border-gold-400/40 bg-gold-400/10 font-medium text-gold-200"
          : "border border-white/12 bg-white/[0.04] text-paper/85",
      )}
    >
      {first ? <Icon name="users" className="size-5 shrink-0 text-gold-400" /> : null}
      {terminal ? <Icon name="target" className="size-5 shrink-0 text-gold-300" /> : null}
      {children}
    </span>
  );
}

export function TargetMarket() {
  return (
    <section id="outlook" className="relative overflow-hidden bg-forest-950 py-20 text-paper md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_100%_100%,rgb(43_115_88/0.4),transparent_70%)]"
      />
      <div className="shell relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            layout="split"
            eyebrow="Target market & expansion"
            title={
              <>
                Two routes, <Accent tone="dark">in sequence.</Accent>
              </>
            }
            lead="Two routes to membership, sequenced rather than pursued at once. The first is the founding cohort; the second widens access once the schemes and the credit machinery behind them are proven."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-4">
            {marketLanes.map((lane, laneIndex) => (
              <div
                key={lane.tier}
                className="rounded-3xl border border-white/10 bg-white/[0.025] p-5 sm:p-6 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8"
              >
                <div className="flex items-center gap-3 lg:col-span-2">
                  <span className="figure-num flex size-10 items-center justify-center rounded-full bg-gold-400 text-[1.125rem] text-forest-950">
                    {laneIndex + 1}
                  </span>
                  <p className="eyebrow text-gold-400">{lane.tier}</p>
                </div>

                <div className="mt-5 flex flex-col sm:flex-row sm:items-stretch sm:gap-3 lg:col-span-10 lg:mt-0">
                  <Node first>{lane.segment}</Node>
                  {lane.steps.map((step, index) => (
                    <Fragment key={step}>
                      <Arrow />
                      <Node terminal={index === lane.steps.length - 1}>{step}</Node>
                    </Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 flex items-center gap-2 text-[0.875rem] text-paper/55">
            <Icon name="info" className="size-4 text-gold-400" />
            {expansionNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
