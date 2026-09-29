"use client";

import { useState, type FormEvent } from "react";
import { Accent, SectionHeading } from "../SectionHeading";
import { Button } from "../ui/Button";
import { cn } from "../ui/cn";
import { Icon } from "../ui/Icons";
import { Pill, card, type PillTone } from "../ui/primitives";
import { Tabs, tabPanelProps } from "../ui/Tabs";
import { email } from "@/lib/content";

type Tab = "reverse-bidding" | "developer-intake";

const bids: {
  developer: string;
  delivery: string;
  price: number;
  green: string;
  greenStrong: boolean;
  status: string;
  tone: PillTone;
}[] = [
  { developer: "Primeworth Construction Ltd", delivery: "Q3 2028 (24 mos)", price: 26500000, green: "EDGE Certified Solar", greenStrong: true, status: "Passed BOQ audit", tone: "mint" },
  { developer: "Urban Haven Infrastructure", delivery: "Q4 2028 (28 mos)", price: 25800000, green: "Solar + Smart Water", greenStrong: true, status: "Under site inspection", tone: "gold" },
  { developer: "Sahara Keystone Properties", delivery: "Q1 2029 (32 mos)", price: 27200000, green: "Standard Grid Hybrid", greenStrong: false, status: "Initial review", tone: "neutral" },
];

const LOWEST = Math.min(...bids.map((b) => b.price));

const poolMetrics = [
  { label: "Verified member backers", value: "500 Buyers", note: "AnchorScore > 700", noteClass: "text-mint-700" },
  { label: "Target price window", value: "₦25m – ₦30m", note: "Sub-market negotiated", noteClass: "text-ink-faint" },
  { label: "Active developer bids", value: "4 Tenders", note: "Under technical audit", noteClass: "text-gold-700" },
  { label: "Tender closing date", value: "31 Oct 2026", note: "Final evaluation", noteClass: "text-clay-600" },
];

const field =
  "mt-2 w-full rounded-xl border border-forest-900/15 bg-white px-3.5 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint/80 transition-colors focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15 focus:outline-none";

export function DeveloperMarketplace() {
  const [activeTab, setActiveTab] = useState<Tab>("reverse-bidding");

  // No developer backend yet: hand the details to the Society's mailbox.
  const submitProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const line = (label: string, key: string) => `${label}: ${String(data.get(key) ?? "").trim() || "—"}`;
    const body = [
      "Developer accreditation enquiry",
      "",
      line("Company", "company"),
      line("Site location / district", "site"),
      line("Land title status", "title"),
      line("Unit capacity proposed", "units"),
    ].join("\n");
    window.location.href = `mailto:${email.address}?subject=${encodeURIComponent(
      "Build With Anchor — developer accreditation",
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="marketplace" className="bg-paper-alt py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          layout="split"
          eyebrow="Reverse bidding · Developer market"
          title={
            <>
              Developers compete. <Accent>Members win.</Accent>
            </>
          }
          lead="Instead of individual buyers begging developers for discounts, Anchor pools collective demand so developers bid against each other to build for our members."
        />

        <Tabs
          tabs={[
            { id: "reverse-bidding", label: "Live bidding pools" },
            { id: "developer-intake", label: "Build with Anchor" },
          ]}
          value={activeTab}
          onChange={setActiveTab}
          idBase="market"
          label="Developer marketplace"
          className="mb-6"
        />

        <div {...tabPanelProps("market", activeTab)}>
          {activeTab === "reverse-bidding" && (
            <div className={cn(card, "animate-fade-in overflow-hidden rounded-3xl")}>
              <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Pill tone="neutral">Syndicate pool #ABJ-04</Pill>
                    <Pill tone="mint" dot>
                      Tender open for bids
                    </Pill>
                  </div>
                  <h3 className="font-display mt-4 max-w-2xl text-[1.625rem] leading-tight tracking-[-0.015em] text-forest-900 sm:text-[2rem]">
                    500 verified buyers seeking 2-bedroom homes in Lugbe
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-[0.875rem] text-ink-faint">
                    <Icon name="map-pin" className="size-4" />
                    Airport Road Growth Corridor · Target delivery Q4 2028
                  </p>
                </div>
                <div className="lg:text-right">
                  <p className="text-[0.8125rem] font-medium text-ink-faint">Combined deposit capacity</p>
                  <p className="figure-num mt-1 text-[2.25rem] leading-none text-forest-900">₦4.8 billion</p>
                </div>
              </div>

              <dl className="grid grid-cols-2 border-y border-forest-900/[0.08] bg-paper/60 lg:grid-cols-4">
                {poolMetrics.map((metric, index) => (
                  <div
                    key={metric.label}
                    className={cn(
                      "p-5 sm:px-8",
                      index % 2 === 1 && "border-l border-forest-900/[0.08]",
                      index >= 2 && "border-t border-forest-900/[0.08] lg:border-t-0",
                      index === 2 && "lg:border-l",
                    )}
                  >
                    <dt className="text-[0.8125rem] font-medium text-ink-faint">{metric.label}</dt>
                    <dd>
                      <p className="figure-num mt-1 text-[1.375rem] leading-tight text-forest-900">{metric.value}</p>
                      <p className={cn("mt-0.5 text-[0.8125rem] font-medium", metric.noteClass)}>{metric.note}</p>
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="p-6 sm:p-8">
                <h4 className="text-[0.8125rem] font-semibold tracking-[0.06em] text-ink-faint uppercase">
                  Live developer tender submissions
                </h4>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[44rem] text-left text-[0.9375rem]">
                    <thead>
                      <tr className="border-b border-forest-900/10 text-[0.8125rem] text-ink-faint">
                        <th scope="col" className="pb-3 font-medium">Developer</th>
                        <th scope="col" className="pb-3 font-medium">Proposed delivery</th>
                        <th scope="col" className="pb-3 font-medium">Price / unit</th>
                        <th scope="col" className="pb-3 font-medium">Green standard</th>
                        <th scope="col" className="pb-3 text-right font-medium">Anchor diligence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-forest-900/[0.07]">
                      {bids.map((bid) => (
                        <tr key={bid.developer}>
                          <td className="py-4 pr-4 font-semibold text-forest-900">{bid.developer}</td>
                          <td className="py-4 pr-4 text-ink-soft">{bid.delivery}</td>
                          <td className="py-4 pr-4">
                            <span className="font-semibold text-forest-900 tnum">₦{bid.price.toLocaleString()}</span>
                            {bid.price === LOWEST ? (
                              <Pill tone="gold" className="ml-2 align-middle">
                                Lowest
                              </Pill>
                            ) : null}
                          </td>
                          <td className={cn("py-4 pr-4", bid.greenStrong ? "text-mint-700" : "text-ink-faint")}>
                            {bid.green}
                          </td>
                          <td className="py-4 text-right">
                            <Pill tone={bid.tone} icon={bid.tone === "mint" ? "check" : undefined}>
                              {bid.status}
                            </Pill>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "developer-intake" && (
            <div className={cn(card, "animate-fade-in grid overflow-hidden rounded-3xl lg:grid-cols-12")}>
              <div className="relative bg-forest-950 p-6 text-paper sm:p-8 lg:col-span-5">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(90%_70%_at_0%_100%,rgb(43_115_88/0.45),transparent_65%)]"
                />
                <div className="relative">
                  <p className="eyebrow text-gold-400">Accredited partner programme</p>
                  <h3 className="font-display mt-2 text-[1.75rem] leading-tight">Build with Anchor</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">
                    Developers gain instant off-taker security and de-risked milestone payments backed
                    by cooperative escrow. In return, you must meet Anchor’s stringent audit and
                    open-book pricing standards.
                  </p>
                  <ul className="mt-6 space-y-3 text-[0.875rem] text-paper/75">
                    {["Off-taker security from pooled demand", "Milestone payments via cooperative escrow", "Open-book BOQ and title audit"].map((point) => (
                      <li key={point} className="flex items-center gap-3">
                        <Icon name="check-circle" className="size-5 shrink-0 text-gold-400" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <form onSubmit={submitProject} className="p-6 sm:p-8 lg:col-span-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="dev-company" className="text-[0.875rem] font-medium text-ink">
                      Development company name
                    </label>
                    <input id="dev-company" name="company" type="text" required placeholder="e.g. Apex Civil Works Ltd" className={field} />
                  </div>
                  <div>
                    <label htmlFor="dev-site" className="text-[0.875rem] font-medium text-ink">
                      Proposed site location / district
                    </label>
                    <input id="dev-site" name="site" type="text" placeholder="e.g. Lugbe, Kuje, Life Camp" className={field} />
                  </div>
                  <div>
                    <label htmlFor="dev-title" className="text-[0.875rem] font-medium text-ink">
                      Land title status
                    </label>
                    <select id="dev-title" name="title" className={field}>
                      <option>FCDA Certificate of Occupancy (C-of-O)</option>
                      <option>Right of Occupancy (R-of-O) with AGIS recertification</option>
                      <option>Gazetted Customary Title under FCT Area Council</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dev-units" className="text-[0.875rem] font-medium text-ink">
                      Unit capacity proposed
                    </label>
                    <input id="dev-units" name="units" type="text" placeholder="e.g. 120 units (2-bed & 3-bed terraces)" className={field} />
                  </div>
                </div>

                <div className="mt-7 flex flex-col gap-4 border-t border-forest-900/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-[0.8125rem] leading-relaxed text-ink-faint">
                    Developers must attach BOQ, architectural permits, and tax clearance upon formal
                    invitation. Submitting opens an email to the Society.
                  </p>
                  <Button type="submit" variant="dark" size="md" arrow>
                    Submit for due diligence
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
