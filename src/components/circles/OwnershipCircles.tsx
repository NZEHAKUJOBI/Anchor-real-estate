"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Accent, SectionHeading } from "../SectionHeading";
import { buttonClass } from "../ui/Button";
import { cn, naira, rangeFill } from "../ui/cn";
import { Icon, type IconName } from "../ui/Icons";
import { Pill, card } from "../ui/primitives";

interface CoOwner {
  id: number;
  name: string;
  relation: string;
  share: number; // percentage
}

const MEMBER_COLOURS = [
  "bg-forest-800",
  "bg-forest-600",
  "bg-gold-500",
  "bg-forest-400",
  "bg-gold-300",
  "bg-mint-500",
  "bg-clay-400",
  "bg-forest-300",
];

const PRICES = [25000000, 35000000, 50000000, 80000000];

const safeguards: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Proportionate deeded title",
    body: "Each member’s name and exact percentage is recorded on the sub-lease and cooperative share registry.",
    icon: "file",
  },
  {
    title: "Buyout & succession rules",
    body: "If one co-buyer encounters financial changes, existing members enjoy right-of-first-refusal, or Anchor liquidity kicks in.",
    icon: "scale",
  },
  {
    title: "Transparent split billing",
    body: "Each member receives dedicated payment links and statements for their exact portion.",
    icon: "users",
  },
];

export function OwnershipCircles() {
  const [propertyPrice, setPropertyPrice] = useState(35000000);
  const [owners, setOwners] = useState<CoOwner[]>([
    { id: 1, name: "Dayo", relation: "Lead / Sibling 1", share: 30 },
    { id: 2, name: "Tunde", relation: "Sibling 2", share: 20 },
    { id: 3, name: "Amina", relation: "Sibling 3", share: 20 },
    { id: 4, name: "Bola", relation: "Sibling 4", share: 15 },
    { id: 5, name: "Grace", relation: "Sibling 5", share: 15 },
  ]);
  const nextId = useRef(6);

  const totalShare = owners.reduce((acc, curr) => acc + curr.share, 0);
  const balanced = totalShare === 100;

  const update = (id: number, patch: Partial<CoOwner>) =>
    setOwners((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const addOwner = () => {
    if (owners.length >= 8) return;
    const id = nextId.current++;
    setOwners((list) => [
      ...list,
      { id, name: `Partner ${list.length + 1}`, relation: "Co-Buyer", share: 10 },
    ]);
  };

  const removeOwner = (id: number) => {
    if (owners.length <= 2) return;
    setOwners((list) => list.filter((o) => o.id !== id));
  };

  return (
    <section id="circles" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          layout="split"
          eyebrow="Ownership Circles™ · Buy together"
          title={
            <>
              Own it <Accent>together,</Accent> on paper.
            </>
          }
          lead="Five siblings buying a home for their parents. Four colleagues co-investing in rental real estate. A diaspora association acquiring 20 homes. Anchor’s legal technology makes group ownership seamless and fully documented."
        />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          {/* Configurator */}
          <div className={cn(card, "rounded-3xl p-6 sm:p-8 lg:col-span-7")}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.8125rem] font-medium text-ink-faint">Circle target asset</p>
                <p className="figure-num mt-1 text-[2rem] leading-none text-forest-900">{naira(propertyPrice)}</p>
              </div>
              <div role="group" aria-label="Target asset price" className="inline-flex gap-1 rounded-full bg-forest-900/[0.06] p-1">
                {PRICES.map((price) => (
                  <button
                    key={price}
                    type="button"
                    aria-pressed={propertyPrice === price}
                    onClick={() => setPropertyPrice(price)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-[0.8125rem] font-semibold transition-colors",
                      propertyPrice === price
                        ? "bg-ivory text-forest-900 shadow-[0_1px_3px_rgb(7_31_23/0.12)]"
                        : "text-ink-soft hover:text-forest-900",
                    )}
                  >
                    ₦{price / 1000000}m
                  </button>
                ))}
              </div>
            </div>

            {/* The split, at a glance */}
            <div className="mt-7">
              <div className="flex h-3 overflow-hidden rounded-full bg-forest-900/[0.06]" aria-hidden="true">
                {owners.map((owner, index) => (
                  <span
                    key={owner.id}
                    className={cn(MEMBER_COLOURS[index % MEMBER_COLOURS.length], "h-full border-r-2 border-ivory transition-[width] duration-300 last:border-r-0")}
                    style={{ width: `${(owner.share / Math.max(100, totalShare)) * 100}%` }}
                  />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[0.8125rem]">
                <span className="text-ink-faint">Circle members &amp; proportional allocation</span>
                <Pill tone={balanced ? "mint" : "clay"} icon={balanced ? "check" : "info"}>
                  Total {totalShare}%{balanced ? "" : " · must equal 100%"}
                </Pill>
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {owners.map((owner, idx) => {
                const individualCost = Math.round((propertyPrice * owner.share) / 100);
                const monthlyPayment = Math.round(individualCost / 36); // 36-month timeline
                return (
                  <li key={owner.id} className="rounded-2xl border border-forest-900/10 bg-white/60 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex size-9 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-bold",
                            MEMBER_COLOURS[idx % MEMBER_COLOURS.length],
                            idx % MEMBER_COLOURS.length === 2 || idx % MEMBER_COLOURS.length === 4
                              ? "text-forest-950"
                              : "text-ivory",
                          )}
                        >
                          {owner.name.trim().charAt(0).toUpperCase() || idx + 1}
                        </span>
                        <div className="min-w-0">
                          <input
                            type="text"
                            value={owner.name}
                            aria-label={`Member ${idx + 1} name`}
                            onChange={(e) => update(owner.id, { name: e.target.value })}
                            className="w-full max-w-[11rem] rounded-md border border-transparent bg-transparent px-1.5 py-0.5 -ml-1.5 text-[0.9375rem] font-semibold text-forest-900 hover:border-forest-900/15 focus:border-forest-700 focus:bg-white focus:outline-none"
                          />
                          <span className="block text-[0.8125rem] text-ink-faint">{owner.relation}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <span className="block text-[0.9375rem] font-semibold text-forest-900 tnum">
                            {naira(individualCost)}
                          </span>
                          <span className="block text-[0.75rem] text-ink-faint tnum">
                            ~{naira(monthlyPayment)}/mo · 36 mos
                          </span>
                        </div>
                        {owners.length > 2 ? (
                          <button
                            type="button"
                            onClick={() => removeOwner(owner.id)}
                            className="flex size-8 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-alert-soft hover:text-alert"
                            aria-label={`Remove ${owner.name || `member ${idx + 1}`}`}
                          >
                            <Icon name="close" className="size-4" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={owner.share}
                        aria-label={`${owner.name || `Member ${idx + 1}`} share`}
                        onChange={(e) => update(owner.id, { share: Number(e.target.value) })}
                        className="range"
                        style={rangeFill(owner.share, 5, 80)}
                      />
                      <span className="w-11 text-right text-[0.875rem] font-semibold text-forest-900 tnum">
                        {owner.share}%
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {owners.length < 8 ? (
              <button
                type="button"
                onClick={addOwner}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-forest-900/25 py-3.5 text-[0.875rem] font-semibold text-forest-700 transition-colors hover:border-forest-700 hover:bg-forest-50"
              >
                <Icon name="plus" className="size-4" strokeWidth={2} />
                Add member to circle
              </button>
            ) : null}
          </div>

          {/* Legal framework */}
          <div className="relative overflow-hidden rounded-3xl bg-forest-950 p-6 text-paper sm:p-8 lg:col-span-5">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(90%_60%_at_100%_0%,rgb(217_190_114/0.12),transparent_60%)]"
            />
            <div className="relative">
              <p className="eyebrow text-gold-400">Institutional governance</p>
              <h3 className="font-display mt-2 text-[1.75rem] leading-tight">Co-tenancy legal deed</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">
                Every Ownership Circle is backed by an automated{" "}
                <strong className="font-semibold text-paper">Tenancy-in-Common (TIC) Agreement</strong>{" "}
                registered with the High Court and Anchor Cooperative Trustees.
              </p>

              <ul className="mt-7 space-y-5">
                {safeguards.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20 ring-inset">
                      <Icon name={item.icon} className="size-5" />
                    </span>
                    <div>
                      <p className="text-[0.9375rem] font-semibold text-paper">{item.title}</p>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-paper/65">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-white/10 pt-6">
                <Link href="/join?pathway=circle" className={buttonClass("primary", "lg", "w-full")}>
                  Start an Ownership Circle
                  <Icon name="arrow-right" className="size-4" strokeWidth={2} />
                </Link>
                <p className="mt-3 text-center text-[0.8125rem] text-paper/50">
                  Registering interest commits you to no payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
