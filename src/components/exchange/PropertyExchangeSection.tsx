"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Accent, SectionHeading } from "../SectionHeading";
import { buttonClass } from "../ui/Button";
import { cn, naira } from "../ui/cn";
import { Icon } from "../ui/Icons";
import { Pill, cardDark } from "../ui/primitives";
import { Tabs, tabPanelProps } from "../ui/Tabs";

const PRICE_PER_SLOT = 5000;
const FEE_RATE = 0.005; // exchange escrow processing
const MIN_SLOTS = 50;
const MAX_SLOTS = 5000;

const orders = [
  { type: "buy", user: "Member #AK-2041", slots: "500 slots", val: "₦2,500,000", time: "12 mins ago" },
  { type: "sell", user: "Member #AK-1109", slots: "300 slots", val: "₦1,500,000", time: "44 mins ago" },
  { type: "buy", user: "Member #AK-4902", slots: "1,000 slots", val: "₦5,000,000", time: "2 hours ago" },
  { type: "sell", user: "Member #AK-0883", slots: "200 slots", val: "₦1,000,000", time: "5 hours ago" },
] as const;

function clampSlots(raw: string) {
  const n = Math.round(Number(raw));
  if (!Number.isFinite(n)) return MIN_SLOTS;
  return Math.min(MAX_SLOTS, Math.max(MIN_SLOTS, n));
}

export function PropertyExchangeSection() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [slotInput, setSlotInput] = useState("250");
  const inputId = useId();

  const slotUnits = clampSlots(slotInput);
  const gross = slotUnits * PRICE_PER_SLOT;
  const fee = Math.round(gross * FEE_RATE);
  const total = mode === "buy" ? gross + fee : gross - fee;

  return (
    <section id="exchange" className="relative overflow-hidden bg-forest-950 py-20 text-paper md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_100%,rgb(43_115_88/0.35),transparent_70%)]"
      />
      <div className="shell relative">
        <SectionHeading
          tone="dark"
          layout="split"
          eyebrow="Property Exchange™ · Member liquidity"
          title={
            <>
              Liquidity without <Accent tone="dark">giving up equity.</Accent>
            </>
          }
          lead="A cooperative member needing liquidity should not have to sacrifice their hard-earned equity. We provide an internal, peer-to-peer liquidity facility for verified members to transfer or acquire slots safely."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Order ticket */}
          <div className="flex flex-col rounded-3xl bg-ivory p-6 text-ink shadow-[0_30px_60px_-28px_rgb(0_0_0/0.8)] sm:p-8 lg:col-span-6">
            <Tabs
              tabs={[
                { id: "buy", label: "Acquire slots" },
                { id: "sell", label: "Transfer my slots" },
              ]}
              value={mode}
              onChange={setMode}
              idBase="exchange"
              label="Order type"
              className="w-full [&>button]:flex-1"
            />

            <div className="mt-7 flex flex-1 flex-col" {...tabPanelProps("exchange", mode)}>
              <label htmlFor={inputId} className="text-[0.875rem] font-medium text-ink">
                Number of ₦5,000 slots
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  id={inputId}
                  type="number"
                  inputMode="numeric"
                  min={MIN_SLOTS}
                  max={MAX_SLOTS}
                  step="50"
                  value={slotInput}
                  onChange={(e) => setSlotInput(e.target.value)}
                  onBlur={() => setSlotInput(String(slotUnits))}
                  className="w-full rounded-xl border border-forest-900/15 bg-white px-4 py-3 text-[1.25rem] font-semibold text-forest-900 tnum focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15 focus:outline-none sm:max-w-[10rem]"
                />
                <div className="flex gap-1.5">
                  {[100, 250, 500, 1000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      aria-pressed={slotUnits === preset}
                      onClick={() => setSlotInput(String(preset))}
                      className={cn(
                        "flex-1 rounded-full border px-3 py-2 text-[0.8125rem] font-semibold transition-colors tnum sm:flex-none",
                        slotUnits === preset
                          ? "border-forest-900 bg-forest-900 text-paper"
                          : "border-forest-900/15 text-ink-soft hover:border-forest-900/35",
                      )}
                    >
                      {preset.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-[0.8125rem] text-ink-faint">
                Between {MIN_SLOTS} and {MAX_SLOTS.toLocaleString()} slots per order.
              </p>

              <dl className="mt-6 divide-y divide-forest-900/[0.08] rounded-2xl bg-paper/80 ring-1 ring-forest-900/[0.06]">
                <div className="flex justify-between gap-4 px-4 py-3 text-[0.875rem]">
                  <dt className="text-ink-soft">
                    {slotUnits.toLocaleString()} slots × ₦5,000.00 par value
                  </dt>
                  <dd className="font-semibold text-forest-900 tnum">{naira(gross)}</dd>
                </div>
                <div className="flex justify-between gap-4 px-4 py-3 text-[0.875rem]">
                  <dt className="text-ink-soft">Escrow processing (0.5%, internal transfer)</dt>
                  <dd className="font-semibold text-forest-900 tnum">
                    {mode === "buy" ? "+" : "−"} {naira(fee)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 px-4 py-4">
                  <dt className="text-[0.9375rem] font-semibold text-forest-900">
                    {mode === "buy" ? "Total settlement" : "Net proceeds"}
                  </dt>
                  <dd className="figure-num text-[1.75rem] leading-none text-forest-900">{naira(total)}</dd>
                </div>
              </dl>

              <div className="mt-auto pt-6">
                <Link
                  href={`/join?exchange=${mode}&slots=${slotUnits}`}
                  className={buttonClass(mode === "buy" ? "dark" : "primary", "lg", "w-full")}
                >
                  {mode === "buy" ? "Submit bid to acquire slots" : "List slots on the liquidity board"}
                  <Icon name="arrow-right" className="size-4" strokeWidth={2} />
                </Link>
              </div>
            </div>
          </div>

          {/* Order book + notice */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div className={cn(cardDark, "rounded-3xl p-6 sm:p-7")}>
              <div className="flex items-center justify-between gap-3">
                <p className="eyebrow text-gold-400">Live internal match queue</p>
                <Pill tone="mint-dark" dot>
                  100% capital guaranteed
                </Pill>
              </div>

              <ul className="mt-5 divide-y divide-white/[0.07]">
                {orders.map((item) => (
                  <li key={item.user} className="flex items-center justify-between gap-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-full",
                          item.type === "buy" ? "bg-mint-400/12 text-mint-300" : "bg-gold-400/12 text-gold-300",
                        )}
                      >
                        <Icon name={item.type === "buy" ? "plus" : "exchange"} className="size-4" strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <p className={cn("text-[0.75rem] font-bold tracking-[0.08em] uppercase", item.type === "buy" ? "text-mint-300" : "text-gold-300")}>
                          {item.type === "buy" ? "Want to buy" : "Transfer offer"}
                        </p>
                        <p className="text-[0.875rem] text-paper/70">{item.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.9375rem] font-semibold text-paper tnum">{item.val}</p>
                      <p className="text-[0.75rem] text-paper/45">
                        {item.slots} · {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 rounded-3xl border border-gold-400/20 bg-gold-400/[0.05] p-6">
              <Icon name="scale" className="mt-0.5 size-6 shrink-0 text-gold-400" />
              <div>
                <p className="text-[0.9375rem] font-semibold text-paper">Regulatory &amp; bye-laws notice</p>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-paper/65">
                  All slot transfers are conducted strictly within the Anchor Multipurpose Cooperative
                  membership under statutory bye-laws (FCTA By-Laws No. R11913). Not an open public
                  securities exchange. Transfers require biometric identification and cooperative
                  committee counter-signature.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
