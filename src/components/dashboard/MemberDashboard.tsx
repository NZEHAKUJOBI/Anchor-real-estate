"use client";

import { useState } from "react";
import Link from "next/link";
import { ButtonLink } from "../ui/Button";
import { cn, naira } from "../ui/cn";
import { Icon, type IconName } from "../ui/Icons";
import { Pill, card } from "../ui/primitives";
import { Tabs, tabPanelProps } from "../ui/Tabs";

type Tab = "overview" | "credit" | "transactions";

const member = {
  name: "Dr. Dayo Popoola",
  initials: "DP",
  memberId: "ANC-00842-FCT",
  tier: "Investing Member (Tier 1)",
  joined: "14 January 2026",
  totalContribution: 3750000,
  ownershipSlots: 750,
  portfolioValue: 4410000,
  homeSavings: 1850000,
  anchorScore: 718,
  targetHouse: "Anchor Gardens Phase 2 (2-Bed)",
  targetPrice: 25000000,
  ownershipProgress: 68,
  projectedDate: "March 2029",
  dividendEarned: 285400,
  nextContribution: "30 September 2026",
  depositGap: 3200000,
  projectsOwnedCount: 3,
};

const assets = [
  {
    title: "Anchor Gardens — Kuje",
    type: "Residential Co-ownership",
    slots: 400,
    progress: "74% Constructed",
    status: "Roofing & MEP Phase",
    dna: "FCDA R-of-O #KJ-2024",
    icon: "home" as IconName,
  },
  {
    title: "Idu Logistics Hub Phase 1",
    type: "Commercial Warehousing Asset",
    slots: 250,
    progress: "100% Tenanted",
    status: "Yielding 21% Annual Net Rent",
    dna: "Certificate of Occupancy #ID-882",
    icon: "package" as IconName,
  },
  {
    title: "Lugbe Smart Micro-Community",
    type: "Save-to-Own Allocated Unit",
    slots: 100,
    progress: "38% Site Preparation",
    status: "Earthworks underway",
    dna: "Cadastral Layout Approved",
    icon: "map" as IconName,
  },
];

const ledger = [
  { date: "30 Aug 2026", description: "Monthly Savings Allocation", slots: "+36 slots", amount: "₦180,000", status: "Confirmed" },
  { date: "15 Aug 2026", description: "Q2 2026 Asset Dividend Payout", slots: "+14 slots", amount: "₦71,350", status: "Reinvested" },
  { date: "30 Jul 2026", description: "Monthly Savings Allocation", slots: "+36 slots", amount: "₦180,000", status: "Confirmed" },
];

const kpis: { label: string; value: string; note: string; icon: IconName; accent?: "gold" | "mint" }[] = [
  { label: "Total contribution", value: naira(member.totalContribution), note: "Documented ledger equity", icon: "coins" },
  { label: "Ownership slots held", value: `${member.ownershipSlots.toLocaleString()} slots`, note: "0.075% of cooperative pool", icon: "grid", accent: "gold" },
  { label: "Current portfolio value", value: naira(member.portfolioValue), note: "+17.6% capital appreciation", icon: "trending", accent: "mint" },
  { label: "Total dividends earned", value: naira(member.dividendEarned), note: "Auto-reinvested in slots", icon: "sparkle" },
];

export function MemberDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <>
      {/* Identity band */}
      <div className="relative isolate overflow-hidden bg-forest-950 text-paper">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(90%_100%_at_0%_0%,rgb(43_115_88/0.5),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(40%_60%_at_100%_0%,rgb(217_190_114/0.12),transparent_70%)]" />
        </div>

        <div className="shell pt-28 pb-28 md:pt-40">
          <div className="flex flex-wrap items-center gap-2">
            <p className="eyebrow text-gold-400">My Anchor · Personal wealth portal</p>
            <Pill tone="neutral-dark" icon="info">
              Preview with sample data
            </Pill>
          </div>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-center gap-5">
              <span className="font-display flex size-16 shrink-0 items-center justify-center rounded-full bg-gold-400 text-[1.5rem] text-forest-950 shadow-[0_0_0_4px_rgb(217_190_114/0.2)]">
                {member.initials}
              </span>
              <div>
                <h1 className="font-display text-[2rem] leading-tight tracking-[-0.02em] sm:text-[2.5rem]">
                  {member.name}
                </h1>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.875rem] text-paper/60">
                  <span>{member.tier}</span>
                  <span aria-hidden="true" className="size-1 rounded-full bg-paper/30" />
                  <span className="tnum">ID {member.memberId}</span>
                  <span aria-hidden="true" className="size-1 rounded-full bg-paper/30" />
                  <span>Joined {member.joined}</span>
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-nowrap">
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3">
                <p className="text-[0.75rem] font-medium text-paper/55">AnchorScore™</p>
                <p className="mt-0.5 flex items-baseline gap-2">
                  <span className="figure-num text-[1.75rem] leading-none text-gold-300">{member.anchorScore}</span>
                  <span className="text-[0.8125rem] text-paper/50">/ 850</span>
                  <Pill tone="mint-dark" className="ml-1">
                    Home finance ready
                  </Pill>
                </p>
              </div>
              <ButtonLink href="/join" size="lg" arrow>
                Top up monthly slots
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-paper pb-20">
        <div className="shell relative z-10 -mt-16 space-y-6">
          {/* KPIs */}
          <dl className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4">
            {kpis.map((kpi) => (
              <div key={kpi.label} className={cn(card, "p-5 sm:p-6")}>
                <dt className="flex items-center justify-between gap-3 text-[0.8125rem] font-medium text-ink-faint">
                  {kpi.label}
                  <Icon name={kpi.icon} className="size-5 text-forest-600" />
                </dt>
                <dd>
                  <p
                    className={cn(
                      "figure-num mt-3 text-[1.625rem] leading-none",
                      kpi.accent === "mint" ? "text-mint-700" : kpi.accent === "gold" ? "text-gold-700" : "text-forest-900",
                    )}
                  >
                    {kpi.value}
                  </p>
                  <p className={cn("mt-2 text-[0.8125rem]", kpi.accent === "mint" ? "text-mint-700" : "text-ink-faint")}>
                    {kpi.note}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          {/* Homeownership journey */}
          <div className={cn(card, "p-6 sm:p-8")}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow text-gold-700">Your path to homeownership</p>
                <h2 className="font-display mt-2 text-[1.5rem] leading-tight text-forest-900 sm:text-[1.75rem]">
                  {member.targetHouse}
                </h2>
              </div>
              <p className="text-[0.9375rem] text-ink-soft sm:text-right">
                Target price
                <span className="figure-num block text-[1.5rem] text-forest-900">{naira(member.targetPrice)}</span>
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-[0.875rem]">
                <span className="font-medium text-ink">Ownership progress</span>
                <span className="font-semibold text-forest-900 tnum">{member.ownershipProgress}%</span>
              </div>
              <div className="mt-2 h-3 overflow-hidden rounded-full bg-forest-900/[0.08]">
                <div
                  className="h-full rounded-full bg-linear-to-r from-forest-600 to-forest-800"
                  style={{ width: `${member.ownershipProgress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-paper/80 p-4 ring-1 ring-forest-900/[0.06]">
                <p className="text-[0.8125rem] text-ink-faint">To your 25% deposit</p>
                <p className="mt-1 text-[1.0625rem] font-semibold text-forest-900 tnum">{naira(member.depositGap)} more</p>
              </div>
              <div className="rounded-2xl bg-paper/80 p-4 ring-1 ring-forest-900/[0.06]">
                <p className="text-[0.8125rem] text-ink-faint">Projected home-ready date</p>
                <p className="mt-1 text-[1.0625rem] font-semibold text-forest-900">{member.projectedDate}</p>
              </div>
              <div className="rounded-2xl bg-paper/80 p-4 ring-1 ring-forest-900/[0.06]">
                <p className="text-[0.8125rem] text-ink-faint">Next contribution</p>
                <p className="mt-1 text-[1.0625rem] font-semibold text-forest-900">{member.nextContribution}</p>
              </div>
            </div>
          </div>

          {/* Detail tabs */}
          <div className={cn(card, "overflow-hidden")}>
            <div className="px-6 pt-5 sm:px-8">
              <Tabs
                tabs={[
                  { id: "overview", label: `My real estate assets (${member.projectsOwnedCount})` },
                  { id: "credit", label: "AnchorScore™ credit DNA" },
                  { id: "transactions", label: "Ledger & statements" },
                ]}
                value={activeTab}
                onChange={setActiveTab}
                idBase="dash"
                label="Member dashboard"
                variant="underline"
              />
            </div>

            <div className="p-6 sm:p-8" {...tabPanelProps("dash", activeTab)}>
              {activeTab === "overview" && (
                <ul className="animate-fade-in grid gap-5 md:grid-cols-3">
                  {assets.map((proj) => (
                    <li key={proj.title} className="flex flex-col rounded-2xl border border-forest-900/10 bg-white/60 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-forest-900 text-gold-300">
                          <Icon name={proj.icon} className="size-5" />
                        </span>
                        <Pill tone="mint">{proj.progress}</Pill>
                      </div>
                      <p className="mt-4 text-[0.75rem] font-semibold tracking-[0.06em] text-gold-700 uppercase">{proj.type}</p>
                      <h3 className="font-display mt-1 text-[1.25rem] leading-snug text-forest-900">{proj.title}</h3>
                      <p className="mt-1 text-[0.8125rem] text-ink-faint">{proj.dna}</p>
                      <div className="mt-4 flex items-baseline justify-between rounded-xl bg-paper/80 px-3.5 py-3 text-[0.875rem] ring-1 ring-forest-900/[0.06]">
                        <span className="text-ink-soft">Your stake</span>
                        <span className="font-semibold text-forest-900 tnum">
                          {proj.slots} slots · {naira(proj.slots * 5000)}
                        </span>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-[0.875rem]">
                        <span className="text-ink-soft">{proj.status}</span>
                        <Link href="/#property-dna" className="inline-flex shrink-0 items-center gap-1 font-semibold text-forest-700 hover:text-forest-900">
                          View DNA
                          <Icon name="arrow-right" className="size-4" />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "credit" && (
                <div className="animate-fade-in space-y-5">
                  <h3 className="font-display text-[1.5rem] text-forest-900">Your AnchorScore™ factor breakdown</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-forest-900/10 bg-white/60 p-5">
                      <p className="text-[0.8125rem] font-semibold text-gold-700">Contribution discipline · 35% weight</p>
                      <p className="mt-2 text-[1.0625rem] font-semibold text-forest-900">100% on-time (8 consecutive months)</p>
                      <p className="mt-1 text-[0.875rem] text-ink-soft">Regular ₦180,000 monthly debits processed without default.</p>
                    </div>
                    <div className="rounded-2xl border border-forest-900/10 bg-white/60 p-5">
                      <p className="text-[0.8125rem] font-semibold text-gold-700">Cooperative social collateral · 25% weight</p>
                      <p className="mt-2 text-[1.0625rem] font-semibold text-forest-900">2 vetted guarantors active</p>
                      <p className="mt-1 text-[0.875rem] text-ink-soft">Endorsed by Tier 1 Executive member and FCT cooperative trustee.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "transactions" && (
                <div className="animate-fade-in">
                  <h3 className="font-display text-[1.5rem] text-forest-900">Verified Society ledger entries</h3>
                  <div className="mt-5 overflow-x-auto">
                    <table className="w-full min-w-[40rem] text-left text-[0.9375rem]">
                      <thead>
                        <tr className="border-b border-forest-900/10 text-[0.8125rem] text-ink-faint">
                          <th scope="col" className="pb-3 font-medium">Date</th>
                          <th scope="col" className="pb-3 font-medium">Description</th>
                          <th scope="col" className="pb-3 font-medium">Slots</th>
                          <th scope="col" className="pb-3 font-medium">Amount</th>
                          <th scope="col" className="pb-3 text-right font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-forest-900/[0.07]">
                        {ledger.map((row) => (
                          <tr key={`${row.date}-${row.description}`}>
                            <td className="py-4 pr-4 text-ink-soft tnum">{row.date}</td>
                            <td className="py-4 pr-4 font-medium text-forest-900">{row.description}</td>
                            <td className="py-4 pr-4 text-ink-soft tnum">{row.slots}</td>
                            <td className="py-4 pr-4 font-semibold text-forest-900 tnum">{row.amount}</td>
                            <td className="py-4 text-right">
                              <Pill tone="mint" icon="check">
                                {row.status}
                              </Pill>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-forest-700 hover:text-forest-900">
              <Icon name="arrow-left" className="size-4" />
              Back to the public site
            </Link>
            <div className="flex flex-wrap gap-2">
              <Link href="/#bulkbuy" className="rounded-full border border-forest-900/15 bg-ivory px-4 py-2 text-[0.875rem] font-medium text-forest-900 transition-colors hover:border-forest-900/35">
                Anchor BulkBuy™
              </Link>
              <Link href="/#exchange" className="rounded-full border border-forest-900/15 bg-ivory px-4 py-2 text-[0.875rem] font-medium text-forest-900 transition-colors hover:border-forest-900/35">
                Property Exchange™
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
