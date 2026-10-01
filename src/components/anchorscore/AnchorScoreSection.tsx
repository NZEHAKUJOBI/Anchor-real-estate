"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Accent, SectionHeading } from "../SectionHeading";
import { buttonClass } from "../ui/Button";
import { cn, rangeFill } from "../ui/cn";
import { Icon } from "../ui/Icons";
import { Pill, card, type PillTone } from "../ui/primitives";

const SCORE_MIN = 300;
const SCORE_MAX = 850;

/** Semicircle gauge. The arc is normalised with pathLength so the dash maths is a percentage. */
function ScoreGauge({ score, colour }: { score: number; colour: string }) {
  const pct = ((score - SCORE_MIN) / (SCORE_MAX - SCORE_MIN)) * 100;
  return (
    <svg viewBox="0 0 220 134" className="w-full max-w-[17rem]" aria-hidden="true">
      <path
        d="M 20 110 A 90 90 0 0 1 200 110"
        fill="none"
        stroke="rgb(11 46 34 / 0.09)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M 20 110 A 90 90 0 0 1 200 110"
        fill="none"
        stroke={colour}
        strokeWidth="14"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${pct} 100`}
        className="transition-[stroke-dasharray] duration-500 ease-out"
      />
      <text x="20" y="132" textAnchor="middle" className="fill-ink-faint text-[10px]">
        {SCORE_MIN}
      </text>
      <text x="200" y="132" textAnchor="middle" className="fill-ink-faint text-[10px]">
        {SCORE_MAX}
      </text>
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  points,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  points: number;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3.5 transition-colors",
        checked ? "border-forest-700/30 bg-forest-50" : "border-forest-900/12 bg-ivory hover:border-forest-900/25",
      )}
    >
      <span className="text-[0.875rem] leading-snug text-ink">
        {label}
        <span className="mt-0.5 block text-[0.75rem] font-semibold text-forest-600">+{points} points</span>
      </span>
      <span className="relative inline-flex shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="h-6 w-11 rounded-full bg-forest-900/15 transition-colors peer-checked:bg-forest-700 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-600"
        />
        <span
          aria-hidden="true"
          className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5"
        />
      </span>
    </label>
  );
}

export function AnchorScoreSection() {
  const [consistencyMonths, setConsistencyMonths] = useState(12);
  const [monthlyTurnover, setMonthlyTurnover] = useState(750000);
  const [rentHistoryGood, setRentHistoryGood] = useState(true);
  const [guarantorActive, setGuarantorActive] = useState(true);
  const monthsId = useId();
  const turnoverId = useId();

  // Dynamic score computation
  const baseScore = 580;
  const consistencyBonus = Math.min(110, consistencyMonths * 9);
  const turnoverBonus = Math.min(75, Math.round((monthlyTurnover / 1000000) * 60));
  const rentBonus = rentHistoryGood ? 45 : 0;
  const guarantorBonus = guarantorActive ? 32 : 0;

  const totalScore = Math.min(850, baseScore + consistencyBonus + turnoverBonus + rentBonus + guarantorBonus);

  const getTier = (score: number): { label: string; tier: string; colour: string; pill: PillTone } => {
    if (score >= 740) return { label: "Home finance ready", tier: "Tier 1 · Prime", colour: "var(--color-mint-600)", pill: "mint" };
    if (score >= 680) return { label: "Cooperative credit approved", tier: "Tier 2 · Qualified", colour: "var(--color-gold-500)", pill: "gold" };
    return { label: "Building capacity", tier: "Tier 3 · Accelerating", colour: "var(--color-clay-500)", pill: "clay" };
  };

  const status = getTier(totalScore);

  const weights = [
    { label: "Tenure & trust", weight: 40 },
    { label: "Contribution discipline", weight: 35 },
    { label: "Cash flow", weight: 25 },
  ];

  return (
    <section id="anchorscore" className="bg-ivory py-20 md:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Narrative */}
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="AnchorScore™ · Inclusive credit"
              title={
                <>
                  How do people without payslips become <Accent>mortgageable?</Accent>
                </>
              }
              lead="Conventional banking cannot see informal income. If you earn as a trader, artisan, consultant, driver, contractor, or diaspora entrepreneur, traditional mortgages shut the door."
              className="mb-10 md:mb-10"
            />

            <figure className="relative overflow-hidden rounded-3xl bg-forest-950 p-7 text-paper sm:p-8">
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute -top-6 right-5 text-[9rem] leading-none text-gold-400/15"
              >
                &ldquo;
              </span>
              <p className="eyebrow text-gold-400">Real-world case study</p>
              <blockquote className="font-display relative mt-4 text-[1.25rem] leading-[1.5] text-paper/95 italic sm:text-[1.375rem]">
                Mama Nkechi has run a retail provisions store for 12 years. She earns ₦600,000–₦900,000
                monthly. But she has no HR letter, no corporate pension, and no conventional payslip.
                Traditional banks turn her away.
              </blockquote>
              <figcaption className="mt-6 flex items-start gap-3 border-t border-white/10 pt-5 text-[0.9375rem] leading-relaxed text-gold-300">
                <Icon name="sparkle" className="mt-0.5 size-5 shrink-0" />
                Anchor turns her documented cash flow and regular cooperative contributions into an
                unassailable credit profile: AnchorScore™.
              </figcaption>
            </figure>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-forest-700/[0.08] text-forest-700">
                  <Icon name="chart" className="size-5" />
                </span>
                <div>
                  <dt className="text-[0.8125rem] font-medium text-ink-faint">Underwritten on</dt>
                  <dd className="mt-0.5 text-[0.9375rem] font-semibold text-forest-900">
                    Cooperative discipline &amp; turnover
                  </dd>
                </div>
              </div>
              <div className="flex gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-forest-700/[0.08] text-forest-700">
                  <Icon name="landmark" className="size-5" />
                </span>
                <div>
                  <dt className="text-[0.8125rem] font-medium text-ink-faint">Aligned with</dt>
                  <dd className="mt-0.5 text-[0.9375rem] font-semibold text-forest-900">
                    Renewed Hope Housing Mandate
                  </dd>
                </div>
              </div>
            </dl>
          </div>

          {/* Simulator */}
          <div className="lg:col-span-6">
            <div className={cn(card, "p-6 sm:p-8")}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-gold-700">Proprietary underwriting</p>
                  <h3 className="font-display mt-2 text-[1.625rem] leading-tight text-forest-900">
                    AnchorScore™ simulator
                  </h3>
                </div>
                <Pill tone="neutral">Max {SCORE_MAX}</Pill>
              </div>

              <div className="mt-6 flex flex-col items-center rounded-2xl bg-paper/70 px-4 pt-6 pb-5 ring-1 ring-forest-900/[0.06]">
                <div className="relative w-full max-w-[17rem]">
                  <ScoreGauge score={totalScore} colour={status.colour} />
                  <div className="absolute inset-x-0 bottom-6 text-center" aria-live="polite">
                    <p className="figure-num text-[3rem] leading-none text-forest-900">{totalScore}</p>
                    <p className="mt-1 text-[0.75rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                      {status.tier}
                    </p>
                  </div>
                </div>
                <Pill tone={status.pill} dot className="mt-4">
                  {status.label}
                </Pill>
              </div>

              <div className="mt-7 space-y-6">
                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={monthsId} className="text-[0.875rem] font-medium text-ink">
                      Consecutive contribution months
                    </label>
                    <span className="text-[0.9375rem] font-semibold text-forest-900 tnum">
                      {consistencyMonths} months
                    </span>
                  </div>
                  <input
                    id={monthsId}
                    type="range"
                    min="3"
                    max="24"
                    value={consistencyMonths}
                    onChange={(e) => setConsistencyMonths(Number(e.target.value))}
                    className="range mt-2"
                    style={rangeFill(consistencyMonths, 3, 24)}
                  />
                  <div className="mt-1 flex justify-between text-[0.75rem] text-ink-faint tnum">
                    <span>3 months</span>
                    <span>12 months</span>
                    <span>24 months</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={turnoverId} className="text-[0.875rem] font-medium text-ink">
                      Average monthly cash flow / turnover
                    </label>
                    <span className="text-[0.9375rem] font-semibold text-forest-900 tnum">
                      ₦{monthlyTurnover.toLocaleString()}
                    </span>
                  </div>
                  <input
                    id={turnoverId}
                    type="range"
                    min="200000"
                    max="3000000"
                    step="50000"
                    value={monthlyTurnover}
                    onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
                    className="range mt-2"
                    style={rangeFill(monthlyTurnover, 200000, 3000000)}
                  />
                  <div className="mt-1 flex justify-between text-[0.75rem] text-ink-faint tnum">
                    <span>₦200,000</span>
                    <span>₦1,500,000</span>
                    <span>₦3,000,000+</span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Toggle
                    checked={rentHistoryGood}
                    onChange={setRentHistoryGood}
                    label="Verified rent / utility payment history"
                    points={45}
                  />
                  <Toggle
                    checked={guarantorActive}
                    onChange={setGuarantorActive}
                    label="Cooperative guarantor endorsement"
                    points={32}
                  />
                </div>
              </div>

              <div className="mt-7 border-t border-forest-900/[0.08] pt-6">
                <p className="text-[0.8125rem] font-semibold tracking-[0.06em] text-ink-faint uppercase">
                  How the score is weighted
                </p>
                <ul className="mt-4 space-y-3">
                  {weights.map((item) => (
                    <li key={item.label} className="grid grid-cols-[9.5rem_1fr_2.5rem] items-center gap-3 text-[0.875rem]">
                      <span className="text-ink-soft">{item.label}</span>
                      <span className="h-2 overflow-hidden rounded-full bg-forest-900/[0.08]">
                        <span
                          className="block h-full rounded-full bg-gold-500"
                          style={{ width: `${item.weight}%` }}
                        />
                      </span>
                      <span className="text-right font-semibold text-forest-900 tnum">{item.weight}%</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href="/join?score=true" className={buttonClass("dark", "lg", "mt-7 w-full")}>
                Apply to build my AnchorScore™
                <Icon name="arrow-right" className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
