"use client";

import { useState } from "react";
import Link from "next/link";

export function MemberDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "transactions" | "credit">("overview");

  const member = {
    name: "Dr. Dayo Popoola",
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

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val).replace("NGN", "₦");
  };

  return (
    <div className="bg-forest-950 text-paper min-h-screen py-10">
      <div className="shell space-y-8">
        {/* Top Member Header */}
        <div className="bg-forest-900 border border-gold-400/25 p-6 sm:p-8 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="label text-gold-400">MY ANCHOR · Personal Wealth Portal</span>
              <span className="text-[10px] label px-2 py-0.5 bg-gold-400/10 text-gold-300 border border-gold-400/30 rounded-xs">
                {member.tier}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl text-paper">{member.name}</h1>
            <p className="text-xs text-paper/60 font-mono">Member ID: {member.memberId} · Joined {member.joined}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-forest-950 border border-gold-400/30 px-5 py-3 rounded-sm text-right">
              <span className="label-sm text-paper/60 block">AnchorScore™</span>
              <div className="flex items-baseline gap-2 justify-end">
                <span className="font-display text-3xl text-gold-300 font-bold">{member.anchorScore}</span>
                <span className="text-xs text-emerald-400">/ 850</span>
              </div>
              <span className="text-[10px] text-emerald-400 block font-mono">Home Finance Ready</span>
            </div>

            <Link
              href="/join"
              className="label-sm bg-gold-400 text-forest-950 px-5 py-3.5 hover:bg-gold-300 transition-colors rounded-xs font-semibold whitespace-nowrap"
            >
              + Top Up Monthly Slots
            </Link>
          </div>
        </div>

        {/* Homeownership Journey Banner */}
        <div className="bg-forest-900/80 border-l-4 border-gold-400 p-6 rounded-r-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="label text-gold-400">Your Path to Homeownership</span>
            <span className="text-xs text-gold-300 font-mono">Target: {member.targetHouse} ({formatNaira(member.targetPrice)})</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-paper/80 font-medium">Ownership Progress</span>
              <span className="font-mono text-gold-300 font-bold">{member.ownershipProgress}%</span>
            </div>
            <div className="h-3 w-full bg-forest-950 rounded-full overflow-hidden border border-paper/10">
              <div
                className="h-full bg-gold-400 transition-all duration-500 rounded-full"
                style={{ width: `${member.ownershipProgress}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-1 text-xs text-paper/75 gap-2">
            <div>
              <strong className="text-paper">{formatNaira(member.depositGap)}</strong> more required to reach your 25% deposit threshold.
            </div>
            <div className="text-gold-300 font-mono">
              Projected Home-Ready Date: <strong>{member.projectedDate}</strong>
            </div>
          </div>
        </div>

        {/* Wealth & Capital KPI Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-forest-900 border border-paper/10 p-5 rounded-sm">
            <span className="label-sm text-paper/60">Total Contribution</span>
            <div className="font-display text-2xl text-paper mt-1">{formatNaira(member.totalContribution)}</div>
            <span className="text-[11px] text-paper/50 mt-1 block">Documented ledger equity</span>
          </div>

          <div className="bg-forest-900 border border-paper/10 p-5 rounded-sm">
            <span className="label-sm text-paper/60">Ownership Slots Held</span>
            <div className="font-display text-2xl text-gold-300 mt-1">{member.ownershipSlots.toLocaleString()} Slots</div>
            <span className="text-[11px] text-paper/50 mt-1 block">0.075% of cooperative pool</span>
          </div>

          <div className="bg-forest-900 border border-paper/10 p-5 rounded-sm">
            <span className="label-sm text-paper/60">Current Portfolio Value</span>
            <div className="font-display text-2xl text-emerald-400 mt-1">{formatNaira(member.portfolioValue)}</div>
            <span className="text-[11px] text-emerald-400/80 mt-1 block">+17.6% capital appreciation</span>
          </div>

          <div className="bg-forest-900 border border-paper/10 p-5 rounded-sm">
            <span className="label-sm text-paper/60">Total Dividends Earned</span>
            <div className="font-display text-2xl text-gold-300 mt-1">{formatNaira(member.dividendEarned)}</div>
            <span className="text-[11px] text-paper/50 mt-1 block">Auto-reinvested in slots</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gold-400/20 bg-forest-900/40 rounded-t-sm">
          {[
            { id: "overview", label: "My Real Estate Assets (3)" },
            { id: "credit", label: "AnchorScore™ Credit DNA" },
            { id: "transactions", label: "Ledger & Statements" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as "overview" | "projects" | "transactions" | "credit")}
              className={`label-sm px-6 py-3.5 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-gold-400 text-gold-300 font-bold bg-forest-900/60"
                  : "border-transparent text-paper/60 hover:text-paper"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Tab: Assets */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
            {[
              {
                title: "Anchor Gardens — Kuje",
                type: "Residential Co-ownership",
                slots: 400,
                progress: "74% Constructed",
                status: "Roofing & MEP Phase",
                dna: "FCDA R-of-O #KJ-2024",
              },
              {
                title: "Idu Logistics Hub Phase 1",
                type: "Commercial Warehousing Asset",
                slots: 250,
                progress: "100% Tenanted",
                status: "Yielding 21% Annual Net Rent",
                dna: "Certificate of Occupancy #ID-882",
              },
              {
                title: "Lugbe Smart Micro-Community",
                type: "Save-to-Own Allocated Unit",
                slots: 100,
                progress: "38% Site Preparation",
                status: "Earthworks underway",
                dna: "Cadastral Layout Approved",
              },
            ].map((proj, idx) => (
              <div key={idx} className="bg-forest-900 border border-gold-400/20 p-5 rounded-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] label text-gold-400">{proj.type}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {proj.progress}
                  </span>
                </div>
                <div>
                  <h4 className="font-display text-xl text-paper">{proj.title}</h4>
                  <p className="text-xs text-paper/60 mt-0.5">{proj.dna}</p>
                </div>
                <div className="bg-forest-950 p-3 rounded-xs border border-paper/10 text-xs flex justify-between">
                  <span className="text-paper/60">Your Stake:</span>
                  <span className="text-gold-300 font-mono font-bold">{proj.slots} Slots ({formatNaira(proj.slots * 5000)})</span>
                </div>
                <div className="text-xs text-paper/75 flex items-center justify-between pt-1">
                  <span>{proj.status}</span>
                  <a href="#property-dna" className="text-gold-400 hover:underline">
                    View DNA →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Active Tab: Credit DNA */}
        {activeTab === "credit" && (
          <div className="bg-forest-900 border border-gold-400/20 p-6 sm:p-8 rounded-sm space-y-6 animate-fadeIn">
            <h3 className="font-display text-2xl text-paper">Your AnchorScore™ Factor Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-forest-950 p-4 rounded-sm border border-paper/10 space-y-1">
                <span className="label-sm text-gold-400">Contribution Discipline (35% Weight)</span>
                <p className="text-sm font-semibold text-paper">100% On-Time (8 Consecutive Months)</p>
                <p className="text-xs text-paper/60">Regular ₦180,000 monthly debits processed without default.</p>
              </div>
              <div className="bg-forest-950 p-4 rounded-sm border border-paper/10 space-y-1">
                <span className="label-sm text-gold-400">Cooperative Social Collateral (25% Weight)</span>
                <p className="text-sm font-semibold text-paper">2 Vetted Guarantors Active</p>
                <p className="text-xs text-paper/60">Endorsed by Tier 1 Executive member and FCT cooperative trustee.</p>
              </div>
            </div>
          </div>
        )}

        {/* Active Tab: Transactions */}
        {activeTab === "transactions" && (
          <div className="bg-forest-900 border border-gold-400/20 p-6 rounded-sm space-y-4 animate-fadeIn">
            <h3 className="font-display text-2xl text-paper">Verified Society Ledger Entries</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-paper/80">
                <thead className="border-b border-paper/10 text-paper/50 label-sm">
                  <tr>
                    <th className="py-2.5">Date</th>
                    <th className="py-2.5">Description</th>
                    <th className="py-2.5">Slots</th>
                    <th className="py-2.5">Amount</th>
                    <th className="py-2.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-paper/5 font-mono">
                  <tr>
                    <td className="py-3">30 Aug 2026</td>
                    <td>Monthly Savings Allocation</td>
                    <td>+36 slots</td>
                    <td className="text-gold-300">₦180,000</td>
                    <td className="text-right text-emerald-400">Confirmed</td>
                  </tr>
                  <tr>
                    <td className="py-3">15 Aug 2026</td>
                    <td>Q2 2026 Asset Dividend Payout</td>
                    <td>+14 slots</td>
                    <td className="text-emerald-400">₦71,350</td>
                    <td className="text-right text-emerald-400">Reinvested</td>
                  </tr>
                  <tr>
                    <td className="py-3">30 Jul 2026</td>
                    <td>Monthly Savings Allocation</td>
                    <td>+36 slots</td>
                    <td className="text-gold-300">₦180,000</td>
                    <td className="text-right text-emerald-400">Confirmed</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Footer Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gold-400/20">
          <Link href="/" className="label-sm text-gold-400 hover:text-gold-300">
            ← Back to Anchor Public Portal
          </Link>
          <div className="flex items-center gap-4">
            <a href="#bulkbuy" className="label-sm text-paper/70 hover:text-paper">
              Anchor BulkBuy™
            </a>
            <a href="#exchange" className="label-sm text-paper/70 hover:text-paper">
              Property Exchange™
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
