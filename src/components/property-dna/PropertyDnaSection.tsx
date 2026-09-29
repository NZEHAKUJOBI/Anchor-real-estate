"use client";

import { useState } from "react";
import { Accent, SectionHeading } from "../SectionHeading";
import { cn } from "../ui/cn";
import { Icon, type IconName } from "../ui/Icons";
import { CheckList, IconTile, Pill, card, well } from "../ui/primitives";
import { Tabs, tabPanelProps } from "../ui/Tabs";

type Tab = "construction" | "land" | "developer" | "financial" | "standards";

const tabs: { id: Tab; label: string }[] = [
  { id: "construction", label: "Construction tracker" },
  { id: "land", label: "Land & title diligence" },
  { id: "developer", label: "Developer audit" },
  { id: "financial", label: "Cost transparency" },
  { id: "standards", label: "Green & inclusive specs" },
];

const milestones = [
  { milestone: "Foundation & Piling", pct: 100, status: "Completed & Certified" },
  { milestone: "Reinforced Concrete Superstructure", pct: 100, status: "Completed & Certified" },
  { milestone: "Roofing & Water-tight Envelope", pct: 100, status: "Completed & Certified" },
  { milestone: "MEP (Mechanical, Electrical, Solar Wiring)", pct: 61, status: "Underway — Phase 2 Conduit Piping" },
  { milestone: "Finishing, Screeding, Tiles & Doors", pct: 38, status: "Active Installation — BulkBuy Tier" },
  { milestone: "External Paving, Landscaping & Solar Streetlights", pct: 25, status: "Scheduled for Q4 2026" },
];

const landChecks: { title: string; detail: string; icon: IconName }[] = [
  { title: "Statutory Title", icon: "file", detail: "FCDA Right of Occupancy (R-of-O) File No. KJ/2024/9918. Verified clean title, free of government encumbrance or ancestral claims." },
  { title: "Cadastral Survey", icon: "map", detail: "Beacon No. FCT-1092/KJ authenticated by FCDA Survey Department. Perimeter beacon coordinates sealed." },
  { title: "Planning Approval", icon: "building", detail: "FCT Urban & Regional Planning Development Permit Ref: AGIS-DP-2025-014 for mixed-density residential scheme." },
  { title: "Geographical Coordinates", icon: "map-pin", detail: "Latitude 8.8872° N, Longitude 7.2284° E. High-elevation flood-free zone with natural drainage gradient." },
  { title: "Legal Search Certificate", icon: "scale", detail: "Conducted at Abuja Geographic Information Systems (AGIS) registry by Society Legal Counsel, ratified 12 July 2026." },
  { title: "Community Gazette & MoU", icon: "users", detail: "Signed tripartite agreement with host community leaders guaranteeing unhindered site operations." },
];

const costs = [
  { label: "Land Acquisition", amount: "₦220M", pct: 22, desc: "Direct purchase & registry", colour: "bg-forest-800" },
  { label: "Infrastructure", amount: "₦180M", pct: 18, desc: "Roads, drains, solar grids", colour: "bg-forest-500" },
  { label: "Civil Construction", amount: "₦420M", pct: 42, desc: "Foundations to roofing", colour: "bg-gold-500" },
  { label: "Professional Fees", amount: "₦80M", pct: 8, desc: "Engineers, architects, legal", colour: "bg-gold-300" },
  { label: "Contingency Fund", amount: "₦100M", pct: 10, desc: "Escrow buffer for pricing shifts", colour: "bg-forest-300" },
];

const PROGRESS = 74;

function ProgressRing({ pct }: { pct: number }) {
  return (
    <div className="relative size-20 shrink-0">
      <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="40" cy="40" r="34" fill="none" stroke="rgb(11 46 34 / 0.1)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="var(--color-forest-700)"
          strokeWidth="7"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${pct} 100`}
        />
      </svg>
      <span className="figure-num absolute inset-0 flex items-center justify-center text-[1.25rem] text-forest-900">
        {pct}%
      </span>
    </div>
  );
}

export function PropertyDnaSection() {
  const [activeTab, setActiveTab] = useState<Tab>("construction");

  return (
    <section id="property-dna" className="bg-paper-alt py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          layout="split"
          eyebrow="Property DNA™ · Radical transparency"
          title={
            <>
              Trust, <Accent>productised.</Accent>
            </>
          }
          lead="Nigerian real estate suffers from a trust deficit. Anchor solves this not with empty slogans, but with institutional verification for every land parcel, cost item, and construction milestone."
        />

        <div className={cn(card, "overflow-hidden rounded-3xl")}>
          {/* Project header */}
          <div className="flex flex-col gap-6 border-b border-forest-900/[0.08] p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill tone="neutral">Flagship development</Pill>
                <Pill tone="mint" icon="shield">
                  Anchor Verified
                </Pill>
              </div>
              <h3 className="font-display mt-4 text-[1.75rem] leading-tight tracking-[-0.015em] text-forest-900 sm:text-[2.125rem]">
                Anchor Gardens — Kuje
              </h3>
              <p className="mt-2 flex items-center gap-1.5 text-[0.875rem] text-ink-faint">
                <Icon name="map-pin" className="size-4 shrink-0" />
                Plot 408 Cadastral Zone E24, Kuje District, Abuja FCT
              </p>
            </div>

            <div className="flex items-center gap-5 md:gap-6">
              <ProgressRing pct={PROGRESS} />
              <dl className="space-y-3">
                <div>
                  <dt className="text-[0.8125rem] font-medium text-ink-faint">Verified progress</dt>
                  <dd className="text-[0.9375rem] font-semibold text-forest-900">{PROGRESS}% complete</dd>
                </div>
                <div>
                  <dt className="text-[0.8125rem] font-medium text-ink-faint">Last audit</dt>
                  <dd className="text-[0.9375rem] font-semibold text-forest-900">21 Sep 2026</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="px-6 pt-5 sm:px-8">
            <Tabs
              tabs={tabs}
              value={activeTab}
              onChange={setActiveTab}
              idBase="dna"
              label="Property DNA record"
              variant="underline"
            />
          </div>

          <div className="p-6 sm:p-8" {...tabPanelProps("dna", activeTab)}>
            {activeTab === "construction" && (
              <div className="animate-fade-in space-y-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h4 className="font-display text-[1.5rem] text-forest-900">Live milestone progress</h4>
                    <p className="mt-1 text-[0.9375rem] text-ink-soft">
                      Independently audited by certified structural engineers with monthly drone logs.
                    </p>
                  </div>
                  <Pill tone="gold" icon="hardhat" className="self-start sm:self-auto">
                    COREN Cert #CN-8841-26
                  </Pill>
                </div>

                <ul className="space-y-5">
                  {milestones.map((m) => {
                    const complete = m.pct === 100;
                    return (
                      <li key={m.milestone}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-start gap-3">
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                                complete ? "bg-mint-600 text-white" : "border-2 border-gold-500 bg-gold-100",
                              )}
                            >
                              {complete ? <Icon name="check" className="size-3" strokeWidth={3} /> : null}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[0.9375rem] leading-snug font-semibold text-forest-900">
                                {m.milestone}
                              </p>
                              <p className="mt-0.5 text-[0.8125rem] text-ink-faint">{m.status}</p>
                            </div>
                          </div>
                          <span className="text-[0.9375rem] font-semibold text-forest-900 tnum">{m.pct}%</span>
                        </div>
                        <div className="mt-2.5 ml-8 h-2 overflow-hidden rounded-full bg-forest-900/[0.08]">
                          <div
                            className={cn("h-full rounded-full", complete ? "bg-mint-600" : "bg-gold-500")}
                            style={{ width: `${m.pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <p className={cn(well, "flex items-center gap-3 px-4 py-3.5 text-[0.875rem] text-ink-soft")}>
                  <Icon name="info" className="size-5 shrink-0 text-forest-600" />
                  Site imagery &amp; drone orthomosaic maps refreshed every 14 days.
                </p>
              </div>
            )}

            {activeTab === "land" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h4 className="font-display text-[1.5rem] text-forest-900">Legal land diligence</h4>
                  <p className="mt-1 max-w-2xl text-[0.9375rem] text-ink-soft">
                    Every parcel held by the Society undergoes five-layer verification before a single
                    Naira of member funds is deployed.
                  </p>
                </div>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {landChecks.map((item) => (
                    <li key={item.title} className="rounded-2xl border border-forest-900/10 bg-white/60 p-5">
                      <div className="flex items-center justify-between">
                        <IconTile name={item.icon} size="sm" />
                        <Pill tone="mint" icon="check">
                          Verified
                        </Pill>
                      </div>
                      <h5 className="mt-4 text-[1rem] font-semibold text-forest-900">{item.title}</h5>
                      <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-soft">{item.detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "developer" && (
              <div className="animate-fade-in space-y-6">
                <div>
                  <h4 className="font-display text-[1.5rem] text-forest-900">Developer due diligence</h4>
                  <p className="mt-1 max-w-2xl text-[0.9375rem] text-ink-soft">
                    Anchor does not outsource to unvetted contractors. All builders are evaluated on
                    solvency, past completion rate, and engineering certifications.
                  </p>
                </div>

                <div className="rounded-2xl border border-forest-900/10 bg-white/60">
                  <div className="flex flex-col gap-4 border-b border-forest-900/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                    <div className="flex items-center gap-4">
                      <IconTile name="building" size="md" />
                      <div>
                        <p className="text-[0.8125rem] font-medium text-ink-faint">Lead contractor</p>
                        <h5 className="text-[1.125rem] font-semibold text-forest-900">
                          Apex Shelter Infrastructures Ltd
                        </h5>
                        <p className="text-[0.8125rem] text-ink-faint">
                          CAC Reg: RC-1194021 · 14 Years in Abuja Construction
                        </p>
                      </div>
                    </div>
                    <Pill tone="gold" icon="star" className="self-start sm:self-auto">
                      Tier 1 accredited
                    </Pill>
                  </div>
                  <dl className="grid divide-y divide-forest-900/[0.08] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    {[
                      { label: "Delivered units in FCT", value: "240+ Units", note: "Across Guzape, Lugbe, and Jahi" },
                      { label: "Engineering compliance", value: "COREN / CORBON", note: "Registered resident engineers on site" },
                      { label: "Defect liability period", value: "18 Months", note: "Bank-guaranteed defect warranty" },
                    ].map((item) => (
                      <div key={item.label} className="p-5 sm:p-6">
                        <dt className="text-[0.8125rem] font-medium text-ink-faint">{item.label}</dt>
                        <dd>
                          <p className="figure-num mt-1.5 text-[1.5rem] leading-tight text-forest-900">{item.value}</p>
                          <p className="mt-1 text-[0.8125rem] text-ink-faint">{item.note}</p>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {activeTab === "financial" && (
              <div className="animate-fade-in space-y-7">
                <div>
                  <h4 className="font-display text-[1.5rem] text-forest-900">Open-book cost breakdown</h4>
                  <p className="mt-1 max-w-2xl text-[0.9375rem] text-ink-soft">
                    Every Naira spent is accounted for transparently. Members see exactly how
                    construction capital is allocated across the estate.
                  </p>
                </div>

                <div>
                  <div className="flex h-4 overflow-hidden rounded-full" role="img" aria-label="Project cost split by category">
                    {costs.map((cost) => (
                      <span
                        key={cost.label}
                        className={cn(cost.colour, "h-full border-r-2 border-ivory last:border-r-0")}
                        style={{ width: `${cost.pct}%` }}
                      />
                    ))}
                  </div>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {costs.map((cost) => (
                      <li key={cost.label} className="rounded-2xl border border-forest-900/10 bg-white/60 p-4">
                        <div className="flex items-center gap-2">
                          <span aria-hidden="true" className={cn("size-2.5 rounded-full", cost.colour)} />
                          <span className="text-[0.8125rem] font-semibold text-ink-soft tnum">{cost.pct}%</span>
                        </div>
                        <p className="figure-num mt-2 text-[1.5rem] leading-none text-forest-900">{cost.amount}</p>
                        <p className="mt-2 text-[0.875rem] font-semibold text-forest-900">{cost.label}</p>
                        <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-faint">{cost.desc}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-3 rounded-2xl bg-forest-950 px-5 py-4 text-paper sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.9375rem] text-paper/80">
                    Total project capitalisation:{" "}
                    <strong className="font-semibold text-paper">₦1,000,000,000</strong> — fully ringfenced in
                    project escrow
                  </p>
                  <Pill tone="gold-dark" icon="shield">
                    Zero speculative debt
                  </Pill>
                </div>
              </div>
            )}

            {activeTab === "standards" && (
              <div className="animate-fade-in grid gap-5 md:grid-cols-2">
                <div className="rounded-2xl border border-forest-900/10 bg-white/60 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <IconTile name="leaf" />
                    <Pill tone="mint">Grade A efficiency</Pill>
                  </div>
                  <p className="eyebrow mt-5 text-mint-700">Sustainability standard</p>
                  <h5 className="font-display mt-1.5 text-[1.5rem] text-forest-900">Anchor GreenHome™ Standard</h5>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    Built for resilience against grid failures and extreme heat while reducing long-term
                    household utility bills.
                  </p>
                  <CheckList
                    className="mt-5"
                    size="sm"
                    items={[
                      <><strong className="font-semibold text-forest-900">3.5kWp hybrid solar:</strong> dedicated rooftop solar + lithium storage per unit.</>,
                      <><strong className="font-semibold text-forest-900">Natural thermal envelope:</strong> high thermal-mass bricks &amp; cross ventilation.</>,
                      <><strong className="font-semibold text-forest-900">Rainwater harvesting:</strong> 5,000L underground storage for irrigation.</>,
                      <><strong className="font-semibold text-forest-900">Estimated energy savings:</strong> ~₦65,000/month saved on diesel/NEPA.</>,
                    ]}
                  />
                </div>

                <div className="rounded-2xl border border-forest-900/10 bg-white/60 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <IconTile name="access" />
                    <Pill tone="gold">Universal access</Pill>
                  </div>
                  <p className="eyebrow mt-5 text-gold-700">Accessibility standard</p>
                  <h5 className="font-display mt-1.5 text-[1.5rem] text-forest-900">Anchor InclusiveHome™ Standard</h5>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    Accessibility is an integral structural standard, not an afterthought CSR checklist.
                  </p>
                  <CheckList
                    className="mt-5"
                    size="sm"
                    items={[
                      <><strong className="font-semibold text-forest-900">Zero-threshold step-free entrance:</strong> seamless access from parking to doorway.</>,
                      <><strong className="font-semibold text-forest-900">900mm wide doorways:</strong> full wheelchair and assistive mobility clearance.</>,
                      <><strong className="font-semibold text-forest-900">Adaptable ground-floor bathrooms:</strong> reinforced walls for grab bars.</>,
                      <><strong className="font-semibold text-forest-900">Elderly-friendly ergonomics:</strong> anti-slip textured porcelain floor tiles.</>,
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
