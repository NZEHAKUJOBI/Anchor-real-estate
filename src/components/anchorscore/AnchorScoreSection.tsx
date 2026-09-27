"use client";

import { useState } from "react";
import Link from "next/link";

export function AnchorScoreSection() {
  const [consistencyMonths, setConsistencyMonths] = useState(12);
  const [monthlyTurnover, setMonthlyTurnover] = useState(750000);
  const [rentHistoryGood, setRentHistoryGood] = useState(true);
  const [guarantorActive, setGuarantorActive] = useState(true);

  // Dynamic score computation
  const baseScore = 580;
  const consistencyBonus = Math.min(110, consistencyMonths * 9);
  const turnoverBonus = Math.min(75, Math.round((monthlyTurnover / 1000000) * 60));
  const rentBonus = rentHistoryGood ? 45 : 0;
  const guarantorBonus = guarantorActive ? 32 : 0;

  const totalScore = Math.min(850, baseScore + consistencyBonus + turnoverBonus + rentBonus + guarantorBonus);

  const getTier = (score: number) => {
    if (score >= 740) return { label: "Home Finance Ready", color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/10", tier: "Tier 1 Prime" };
    if (score >= 680) return { label: "Cooperative Credit Approved", color: "text-gold-300", border: "border-gold-400/40", bg: "bg-gold-500/10", tier: "Tier 2 Qualified" };
    return { label: "Building Capacity", color: "text-amber-300", border: "border-amber-400/40", bg: "bg-amber-500/10", tier: "Tier 3 Accelerating" };
  };

  const status = getTier(totalScore);

  return (
    <section id="anchorscore" className="py-24 bg-forest-950 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <span className="label text-gold-400">Pillar 02 & 08 · Inclusive Credit Underwriting</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-paper leading-tight">
              How do people without payslips become mortgageable?
            </h2>
            <p className="text-paper/80 leading-relaxed text-base sm:text-lg">
              Conventional banking cannot see informal income. If you earn as a trader, artisan, consultant, Uber driver, contractor, or diaspora entrepreneur, traditional mortgages shut the door.
            </p>

            <div className="bg-forest-900 border-l-2 border-gold-400 p-5 rounded-r-sm space-y-2">
              <span className="label-sm text-gold-400 block">Real-World Case Study</span>
              <p className="text-paper text-sm italic font-display">
                “Mama Nkechi has run a retail provisions store for 12 years. She earns ₦600,000–₦900,000 monthly. But she has no HR letter, no corporate pension, and no conventional payslip. Traditional banks turn her away.”
              </p>
              <p className="text-xs text-gold-300/90 font-medium pt-1">
                Anchor turns her documented cash flow and regular cooperative contributions into an unassailable credit profile: AnchorScore™.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="border-t border-gold-400/20 pt-3">
                <span className="label-sm text-paper/60">Underwritten On</span>
                <p className="text-sm font-medium text-paper mt-1">Cooperative discipline & turnover</p>
              </div>
              <div className="border-t border-gold-400/20 pt-3">
                <span className="label-sm text-paper/60">Aligned With</span>
                <p className="text-sm font-medium text-paper mt-1">Renewed Hope Housing Mandate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive AnchorScore™ Simulator */}
          <div className="lg:col-span-6">
            <div className="bg-forest-900/90 border border-gold-400/30 rounded-sm p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-gold-400/20 pb-4">
                <div>
                  <span className="label text-gold-400">Proprietary Underwriting</span>
                  <h3 className="font-display text-2xl text-paper">AnchorScore™ Simulator</h3>
                </div>
                <div className={`px-4 py-2 rounded-sm border ${status.border} ${status.bg} text-right`}>
                  <div className={`font-display text-3xl font-bold ${status.color}`}>
                    {totalScore}
                  </div>
                  <div className="text-[10px] label text-paper/75">{status.tier}</div>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3 rounded-sm border ${status.border} ${status.bg} flex items-center justify-between`}>
                <span className="text-sm font-medium text-paper">{status.label}</span>
                <span className="text-xs text-paper/70">Max 850</span>
              </div>

              {/* Interactive Controls */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-xs label text-paper/80 mb-2">
                    <span>Consecutive Contribution Months</span>
                    <span className="text-gold-300 font-bold">{consistencyMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="24"
                    value={consistencyMonths}
                    onChange={(e) => setConsistencyMonths(Number(e.target.value))}
                    className="w-full accent-gold-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-paper/50 mt-1">
                    <span>3 months</span>
                    <span>12 months</span>
                    <span>24 months</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs label text-paper/80 mb-2">
                    <span>Average Monthly Cash Flow / Turnover</span>
                    <span className="text-gold-300 font-bold">₦{(monthlyTurnover).toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="3000000"
                    step="50000"
                    value={monthlyTurnover}
                    onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
                    className="w-full accent-gold-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-paper/50 mt-1">
                    <span>₦200,000</span>
                    <span>₦1,500,000</span>
                    <span>₦3,000,000+</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <label className="flex items-center gap-3 p-3 border border-paper/15 rounded-sm cursor-pointer hover:border-gold-400/40">
                    <input
                      type="checkbox"
                      checked={rentHistoryGood}
                      onChange={(e) => setRentHistoryGood(e.target.checked)}
                      className="accent-gold-400 h-4 w-4"
                    />
                    <span className="text-xs text-paper/90">Verified Rent/Utility Payment History (+45 pts)</span>
                  </label>

                  <label className="flex items-center gap-3 p-3 border border-paper/15 rounded-sm cursor-pointer hover:border-gold-400/40">
                    <input
                      type="checkbox"
                      checked={guarantorActive}
                      onChange={(e) => setGuarantorActive(e.target.checked)}
                      className="accent-gold-400 h-4 w-4"
                    />
                    <span className="text-xs text-paper/90">Cooperative Guarantor Endorsement (+32 pts)</span>
                  </label>
                </div>
              </div>

              {/* AnchorScore Factor Breakdown */}
              <div className="border-t border-gold-400/20 pt-4 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-forest-950/60 rounded">
                  <div className="text-[10px] label text-paper/60">Discipline</div>
                  <div className="text-sm font-semibold text-gold-300">35% Weight</div>
                </div>
                <div className="p-2 bg-forest-950/60 rounded">
                  <div className="text-[10px] label text-paper/60">Cash Flow</div>
                  <div className="text-sm font-semibold text-gold-300">25% Weight</div>
                </div>
                <div className="p-2 bg-forest-950/60 rounded">
                  <div className="text-[10px] label text-paper/60">Tenure & Trust</div>
                  <div className="text-sm font-semibold text-gold-300">40% Weight</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/join?score=true"
                  className="label block w-full text-center bg-gold-400 text-forest-950 py-3.5 hover:bg-gold-300 transition-colors"
                >
                  Apply to Build My AnchorScore™
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
