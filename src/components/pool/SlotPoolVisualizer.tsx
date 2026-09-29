"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Accent, SectionHeading } from "../SectionHeading";
import { buttonClass } from "../ui/Button";
import { cn, naira, rangeFill } from "../ui/cn";
import { Icon } from "../ui/Icons";
import { cardDark, wellDark } from "../ui/primitives";

const TOTAL_SLOTS = 1000000;
const SLOT_PRICE = 5000;
const ALLOCATED_SLOTS = 284621;
const AVAILABLE_SLOTS = TOTAL_SLOTS - ALLOCATED_SLOTS;
const MOBILISED_CAPITAL = ALLOCATED_SLOTS * SLOT_PRICE; // ₦1,423,105,000

/** One cell per 1% of the pool — 10,000 slots each. */
const CELLS = 100;
const SLOTS_PER_CELL = TOTAL_SLOTS / CELLS;

export function SlotPoolVisualizer() {
  const [selectedSlots, setSelectedSlots] = useState(1000);
  const sliderId = useId();

  const memberCapital = selectedSlots * SLOT_PRICE;
  const poolPercentage = ((selectedSlots / TOTAL_SLOTS) * 100).toFixed(3);
  const estimatedAnnualDividend = Math.round(memberCapital * 0.185); // 18.5% annualised target yield on active asset deployment

  const allocatedPercentage = ((ALLOCATED_SLOTS / TOTAL_SLOTS) * 100).toFixed(1);
  const fullCells = Math.floor(ALLOCATED_SLOTS / SLOTS_PER_CELL);
  const partial = (ALLOCATED_SLOTS % SLOTS_PER_CELL) / SLOTS_PER_CELL;

  return (
    <section id="pool-visualizer" className="relative overflow-hidden bg-forest-950 py-20 text-paper md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_100%_0%,rgb(217_190_114/0.08),transparent_70%)]"
      />
      <div className="shell relative">
        <SectionHeading
          tone="dark"
          layout="split"
          eyebrow="Slot pool · Transparent capitalisation"
          title={
            <>
              Every ₦5,000 slot, <Accent tone="dark">made visible.</Accent>
            </>
          }
          lead="Anchor’s capitalisation is governed by a capped pool of 1,000,000 ownership slots at ₦5,000 each. No hidden dilution, no behind-closed-doors equity."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* The pool */}
          <div className={cn(cardDark, "flex flex-col rounded-3xl p-6 sm:p-8 lg:col-span-7")}>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-gold-400">Anchor ownership pool</p>
                <p className="font-display mt-2 text-[1.75rem] leading-tight">1,000,000 total slots</p>
              </div>
              <div className="sm:text-right">
                <p className="text-[0.8125rem] font-medium text-paper/55">Mobilised member capital</p>
                <p className="figure-num mt-1 text-[1.75rem] leading-tight text-gold-300">
                  {naira(MOBILISED_CAPITAL)}
                </p>
              </div>
            </div>

            <div
              role="img"
              aria-label={`${allocatedPercentage}% of the pool allocated: ${ALLOCATED_SLOTS.toLocaleString()} of ${TOTAL_SLOTS.toLocaleString()} slots`}
              className="mt-8 grid grid-cols-10 gap-1.5 sm:grid-cols-20"
            >
              {Array.from({ length: CELLS }, (_, i) => (
                <span
                  key={i}
                  className={cn(
                    "aspect-square rounded-[3px]",
                    i < fullCells ? "bg-gold-400" : "bg-white/[0.07]",
                  )}
                  style={
                    i === fullCells && partial > 0
                      ? {
                          background: `linear-gradient(to top, var(--color-gold-400) ${partial * 100}%, rgb(255 255 255 / 0.07) ${partial * 100}%)`,
                        }
                      : undefined
                  }
                />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[0.8125rem] text-paper/65">
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-gold-400" />
                Allocated
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden="true" className="size-2.5 rounded-[3px] bg-white/15" />
                Available
              </span>
              <span className="text-paper/45">Each square = 10,000 slots</span>
            </div>

            <p className={cn(wellDark, "mt-7 mb-8 flex items-start gap-3 px-4 py-3.5 text-[0.875rem] leading-relaxed text-paper/65")}>
              <Icon name="shield" className="mt-0.5 size-5 shrink-0 text-gold-400" />
              The 10,000-slot ceiling equals 1% of the pool, so no single member can dominate the Society.
            </p>

            <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              <div>
                <dt className="text-[0.8125rem] font-medium text-paper/55">Allocated</dt>
                <dd className="figure-num mt-1 text-[1.375rem] text-paper sm:text-[1.625rem]">{allocatedPercentage}%</dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-medium text-paper/55">Slots allocated</dt>
                <dd className="figure-num mt-1 text-[1.375rem] text-paper sm:text-[1.625rem]">
                  {ALLOCATED_SLOTS.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="text-[0.8125rem] font-medium text-paper/55">Slots available</dt>
                <dd className="figure-num mt-1 text-[1.375rem] text-gold-300 sm:text-[1.625rem]">
                  {AVAILABLE_SLOTS.toLocaleString()}
                </dd>
              </div>
            </dl>
          </div>

          {/* Member stake simulator */}
          <div className="flex flex-col rounded-3xl bg-ivory p-6 text-ink shadow-[0_30px_60px_-28px_rgb(0_0_0/0.8)] sm:p-8 lg:col-span-5">
            <p className="eyebrow text-gold-700">Holding calculator</p>
            <h3 className="font-display mt-2 text-[1.625rem] leading-tight text-forest-900">
              Simulate your cooperative stake
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
              Minimum 100 slots, up to the statutory cap of 10,000 slots per member.
            </p>

            <div className="mt-7">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={sliderId} className="text-[0.875rem] font-medium text-ink">
                  Your holding
                </label>
                <span className="figure-num text-[1.5rem] text-forest-900">
                  {selectedSlots.toLocaleString()} <span className="text-[1rem] text-ink-faint">slots</span>
                </span>
              </div>
              <input
                id={sliderId}
                type="range"
                min="100"
                max="10000"
                step="50"
                value={selectedSlots}
                onChange={(e) => setSelectedSlots(Number(e.target.value))}
                className="range mt-2"
                style={rangeFill(selectedSlots, 100, 10000)}
              />
              <div className="mt-1 flex justify-between text-[0.75rem] text-ink-faint tnum">
                <span>100 · ₦500k</span>
                <span>5,000</span>
                <span>10,000 · ₦50m</span>
              </div>
            </div>

            <dl className="mt-7 divide-y divide-forest-900/[0.08] rounded-2xl bg-paper/70 ring-1 ring-forest-900/[0.06]">
              <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                <dt className="text-[0.875rem] text-ink-soft">Your contribution</dt>
                <dd className="text-[1rem] font-semibold text-forest-900 tnum">{naira(memberCapital)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                <dt className="text-[0.875rem] text-ink-soft">Share of slot pool</dt>
                <dd className="text-[1rem] font-semibold text-forest-900 tnum">{poolPercentage}%</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-4 py-3.5">
                <dt className="text-[0.875rem] text-ink-soft">
                  Est. annual project dividend
                  <span className="block text-[0.75rem] text-ink-faint">Target 18.5% yield on active projects</span>
                </dt>
                <dd className="text-[1rem] font-semibold text-mint-700 tnum">{naira(estimatedAnnualDividend)}/yr</dd>
              </div>
            </dl>

            <p className="mt-5 text-[0.75rem] leading-relaxed text-ink-faint">
              Subject to final Society bye-laws, audit, and applicable Nigerian cooperative regulation.
              Slot holdings are legally deeded with digital membership credentials.
            </p>

            <div className="mt-auto pt-7">
              <Link
                href={`/join?slots=${selectedSlots}`}
                className={buttonClass("dark", "lg", "w-full")}
              >
                Acquire {selectedSlots.toLocaleString()} slots
                <Icon name="arrow-right" className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
