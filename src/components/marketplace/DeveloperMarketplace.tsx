"use client";

import { useState } from "react";

export function DeveloperMarketplace() {
  const [activeTab, setActiveTab] = useState<"reverse-bidding" | "developer-intake">("reverse-bidding");

  return (
    <section id="marketplace" className="py-24 bg-forest-950 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Pillars 10 & 11 · Aggregated Purchasing & Bidding</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Reverse Property Bidding & Developer Market
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Instead of individual buyers begging developers for discounts, Anchor pools collective demand so developers bid against each other to build for our members.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gold-400/20 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("reverse-bidding")}
            className={`label-sm pb-4 px-6 border-b-2 transition-colors ${
              activeTab === "reverse-bidding"
                ? "border-gold-400 text-gold-300 font-semibold"
                : "border-transparent text-paper/60 hover:text-paper"
            }`}
          >
            Live Reverse Bidding Pools (Member Power)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("developer-intake")}
            className={`label-sm pb-4 px-6 border-b-2 transition-colors ${
              activeTab === "developer-intake"
                ? "border-gold-400 text-gold-300 font-semibold"
                : "border-transparent text-paper/60 hover:text-paper"
            }`}
          >
            Build With Anchor (Developer Accreditation)
          </button>
        </div>

        {/* Active Reverse Bidding Demand Pool */}
        {activeTab === "reverse-bidding" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-forest-900 border border-gold-400/30 rounded-sm p-6 sm:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gold-400/20 pb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="label-sm px-2.5 py-0.5 bg-gold-400/10 text-gold-300 border border-gold-400/30 rounded-xs">
                      Syndicate Pool #ABJ-04
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">● Tender Open for Bids</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl text-paper mt-2">
                    500 Verified Buyers Seeking 2-Bedroom Homes in Lugbe
                  </h3>
                  <p className="text-xs text-paper/70 mt-1">
                    Airport Road Growth Corridor · Target Delivery: Q4 2028
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-left lg:text-right">
                    <span className="label-sm text-paper/60 block">Combined Deposit Capacity</span>
                    <span className="font-display text-2xl sm:text-3xl text-gold-300">₦4.8 Billion</span>
                  </div>
                </div>
              </div>

              {/* Pool Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-paper/10">
                <div className="p-3 bg-forest-950/60 rounded">
                  <span className="text-[10px] label text-paper/50">Verified Member Backers</span>
                  <div className="font-display text-xl text-paper mt-1">500 Buyers</div>
                  <div className="text-[10px] text-emerald-400">AnchorScore &gt; 700</div>
                </div>
                <div className="p-3 bg-forest-950/60 rounded">
                  <span className="text-[10px] label text-paper/50">Target Price Window</span>
                  <div className="font-display text-xl text-gold-300 mt-1">₦25m – ₦30m</div>
                  <div className="text-[10px] text-paper/60">Sub-market negotiated</div>
                </div>
                <div className="p-3 bg-forest-950/60 rounded">
                  <span className="text-[10px] label text-paper/50">Active Developer Bids</span>
                  <div className="font-display text-xl text-paper mt-1">4 Tenders</div>
                  <div className="text-[10px] text-gold-300">Under technical audit</div>
                </div>
                <div className="p-3 bg-forest-950/60 rounded">
                  <span className="text-[10px] label text-paper/50">Tender Closing Date</span>
                  <div className="font-display text-xl text-paper mt-1">31 Oct 2026</div>
                  <div className="text-[10px] text-amber-400">Final evaluation</div>
                </div>
              </div>

              {/* Developer Bids Table */}
              <div className="pt-4">
                <h4 className="label-sm text-gold-400 mb-3">Live Developer Tender Submissions</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-paper/80">
                    <thead className="border-b border-paper/10 text-paper/50 label-sm">
                      <tr>
                        <th className="py-2.5">Developer</th>
                        <th className="py-2.5">Proposed Delivery</th>
                        <th className="py-2.5">Proposed Price / Unit</th>
                        <th className="py-2.5">Green Standard</th>
                        <th className="py-2.5 text-right">Anchor Diligence Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-paper/5">
                      <tr>
                        <td className="py-3 font-medium text-paper">Primeworth Construction Ltd</td>
                        <td className="py-3">Q3 2028 (24 mos)</td>
                        <td className="py-3 text-gold-300 font-mono font-bold">₦26,500,000</td>
                        <td className="py-3 text-emerald-400">EDGE Certified Solar</td>
                        <td className="py-3 text-right text-emerald-400 font-mono">✓ Passed BOQ Audit</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-paper">Urban Haven Infrastructure</td>
                        <td className="py-3">Q4 2028 (28 mos)</td>
                        <td className="py-3 text-gold-300 font-mono font-bold">₦25,800,000</td>
                        <td className="py-3 text-emerald-400">Solar + Smart Water</td>
                        <td className="py-3 text-right text-gold-300 font-mono">Under Site Inspection</td>
                      </tr>
                      <tr>
                        <td className="py-3 font-medium text-paper">Sahara Keystone Properties</td>
                        <td className="py-3">Q1 2029 (32 mos)</td>
                        <td className="py-3 text-gold-300 font-mono font-bold">₦27,200,000</td>
                        <td className="py-3 text-paper/60">Standard Grid Hybrid</td>
                        <td className="py-3 text-right text-paper/50 font-mono">Initial Review</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Developer Intake Form */}
        {activeTab === "developer-intake" && (
          <div className="bg-forest-900 border border-gold-400/30 rounded-sm p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="max-w-2xl">
              <span className="label text-gold-400">Accredited Partner Program</span>
              <h3 className="font-display text-2xl sm:text-3xl text-paper mt-1">Build With Anchor</h3>
              <p className="text-sm text-paper/75 mt-2">
                Developers gain instant off-taker security and de-risked milestone payments backed by cooperative escrow. In return, you must meet Anchor’s stringent audit and open-book pricing standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs label text-paper/70">Development Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Apex Civil Works Ltd"
                  className="w-full bg-forest-950 border border-paper/20 rounded-xs p-3 text-sm text-paper focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs label text-paper/70">Proposed Site Location / District</label>
                <input
                  type="text"
                  placeholder="e.g. Lugbe, Kuje, Life Camp"
                  className="w-full bg-forest-950 border border-paper/20 rounded-xs p-3 text-sm text-paper focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs label text-paper/70">Land Title Status</label>
                <select className="w-full bg-forest-950 border border-paper/20 rounded-xs p-3 text-sm text-paper focus:border-gold-400 focus:outline-none">
                  <option>FCDA Certificate of Occupancy (C-of-O)</option>
                  <option>Right of Occupancy (R-of-O) with AGIS recertification</option>
                  <option>Gazetted Customary Title under FCT Area Council</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs label text-paper/70">Unit Capacity Proposed</label>
                <input
                  type="text"
                  placeholder="e.g. 120 Units (2-Bed & 3-Bed Terraces)"
                  className="w-full bg-forest-950 border border-paper/20 rounded-xs p-3 text-sm text-paper focus:border-gold-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-paper/10">
              <p className="text-xs text-paper/60">
                Developers must attach BOQ, architectural permits, and tax clearance upon formal invitation.
              </p>
              <button
                type="button"
                className="w-full sm:w-auto label bg-gold-400 text-forest-950 px-8 py-3.5 hover:bg-gold-300 transition-colors whitespace-nowrap"
              >
                Submit Project For Anchor Due Diligence
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
