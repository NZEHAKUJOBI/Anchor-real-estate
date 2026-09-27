"use client";

import { useState } from "react";

export function PropertyDnaSection() {
  const [activeTab, setActiveTab] = useState<"construction" | "land" | "developer" | "financial" | "standards">("construction");

  return (
    <section id="property-dna" className="py-24 bg-forest-950 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Pillars 04, 13 & 14 · Radical Transparency Engine</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Property DNA™: Productising Trust
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Nigerian real estate suffers from a trust deficit. Anchor solves this not with empty slogans, but with institutional verification for every land parcel, cost item, and construction milestone.
          </p>
        </div>

        {/* Featured Property Card */}
        <div className="bg-forest-900/90 border border-gold-400/30 rounded-sm overflow-hidden shadow-2xl">
          {/* Header Bar */}
          <div className="bg-forest-950 px-6 sm:px-8 py-5 border-b border-gold-400/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="label text-gold-400">Flagship Development</span>
                <span className="label-sm px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xs">
                  Anchor Verified
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl text-paper mt-1">Anchor Gardens — Kuje</h3>
              <p className="text-xs text-paper/60 mt-0.5">Plot 408 Cadastral Zone E24, Kuje District, Abuja FCT</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="label-sm text-paper/60 block">Verified Progress</span>
                <span className="font-display text-2xl sm:text-3xl text-gold-300">74% Complete</span>
              </div>
              <div className="text-right hidden sm:block border-l border-paper/15 pl-6">
                <span className="label-sm text-paper/60 block">Last Audit</span>
                <span className="text-sm font-medium text-paper">21 Sep 2026</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gold-400/20 bg-forest-950/60 overflow-x-auto">
            {[
              { id: "construction", label: "01 · Construction Tracker" },
              { id: "land", label: "02 · Land & Title Diligence" },
              { id: "developer", label: "03 · Developer Audit" },
              { id: "financial", label: "04 · Cost Transparency" },
              { id: "standards", label: "05 · Green & Inclusive Specs" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as "construction" | "land" | "developer" | "financial" | "standards")}
                className={`label-sm px-6 py-4 whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-gold-400 text-gold-300 bg-forest-900/60 font-semibold"
                    : "border-transparent text-paper/60 hover:text-paper hover:bg-forest-900/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="p-6 sm:p-10">
            {/* 01. Construction Tracker */}
            {activeTab === "construction" && (
              <div className="space-y-8 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display text-2xl text-paper">Live Milestone Progress</h4>
                    <p className="text-sm text-paper/70 mt-1">
                      Independently audited by certified structural engineers with monthly drone logs.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs label text-gold-300 bg-forest-950 px-4 py-2 border border-gold-400/20 rounded-xs">
                    <span>COREN Cert #CN-8841-26</span>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { milestone: "Foundation & Piling", pct: 100, status: "Completed & Certified" },
                    { milestone: "Reinforced Concrete Superstructure", pct: 100, status: "Completed & Certified" },
                    { milestone: "Roofing & Water-tight Envelope", pct: 100, status: "Completed & Certified" },
                    { milestone: "MEP (Mechanical, Electrical, Solar Wiring)", pct: 61, status: "Underway — Phase 2 Conduit Piping" },
                    { milestone: "Finishing, Screeding, Tiles & Doors", pct: 38, status: "Active Installation — BulkBuy Tier" },
                    { milestone: "External Paving, Landscaping & Solar Streetlights", pct: 25, status: "Scheduled for Q4 2026" },
                  ].map((m, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${m.pct === 100 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40" : "bg-gold-400/20 text-gold-300 border border-gold-400/40"}`}>
                            {m.pct === 100 ? "✓" : "•"}
                          </span>
                          <span className="font-medium text-paper text-sm">{m.milestone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-paper/50 hidden sm:inline">{m.status}</span>
                          <span className="font-mono text-gold-300 font-bold">{m.pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-forest-950 rounded-full overflow-hidden border border-paper/10">
                        <div
                          className={`h-full transition-all duration-500 ${m.pct === 100 ? "bg-emerald-500" : "bg-gold-400"}`}
                          style={{ width: `${m.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-forest-950 p-4 rounded-sm border border-paper/10 flex items-center justify-between text-xs text-paper/70">
                  <span>Site imagery & drone orthomosaic maps refreshed every 14 days.</span>
                  <button type="button" className="text-gold-400 hover:underline font-mono">
                    View Verification Log (PDF) →
                  </button>
                </div>
              </div>
            )}

            {/* 02. Land & Title Diligence */}
            {activeTab === "land" && (
              <div className="space-y-6 animate-fadeIn">
                <h4 className="font-display text-2xl text-paper">Legal Land Diligence</h4>
                <p className="text-sm text-paper/70">
                  Every parcel held by the Society undergoes five-layer verification before a single Naira of member funds is deployed.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Statutory Title", detail: "FCDA Right of Occupancy (R-of-O) File No. KJ/2024/9918. Verified clean title, free of government encumbrance or ancestral claims." },
                    { title: "Cadastral Survey", detail: "Beacon No. FCT-1092/KJ authenticated by FCDA Survey Department. Perimeter beacon coordinates sealed." },
                    { title: "Planning Approval", detail: "FCT Urban & Regional Planning Development Permit Ref: AGIS-DP-2025-014 for mixed-density residential scheme." },
                    { title: "Geographical Coordinates", detail: "Latitude 8.8872° N, Longitude 7.2284° E. High-elevation flood-free zone with natural drainage gradient." },
                    { title: "Legal Search Certificate", detail: "Conducted at Abuja Geographic Information Systems (AGIS) registry by Society Legal Counsel, ratified 12 July 2026." },
                    { title: "Community Gazette & MoU", detail: "Signed tripartite agreement with host community leaders guaranteeing unhindered site operations." },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-forest-950/70 border border-paper/10 p-5 rounded-sm">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs label">
                        <span>✓ Verified</span>
                      </div>
                      <h5 className="font-display text-lg text-paper mt-1 mb-2">{item.title}</h5>
                      <p className="text-xs text-paper/75 leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 03. Developer Audit */}
            {activeTab === "developer" && (
              <div className="space-y-6 animate-fadeIn">
                <h4 className="font-display text-2xl text-paper">Developer Due Diligence</h4>
                <p className="text-sm text-paper/70">
                  Anchor does not outsource to unvetted contractors. All builders are evaluated on solvency, past completion rate, and engineering certifications.
                </p>

                <div className="bg-forest-950 p-6 rounded-sm border border-paper/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper/10 pb-4">
                    <div>
                      <span className="label-sm text-gold-400">Lead Contractor</span>
                      <h5 className="font-display text-xl text-paper">Apex Shelter Infrastructures Ltd</h5>
                      <p className="text-xs text-paper/60">CAC Reg: RC-1194021 · 14 Years in Abuja Construction</p>
                    </div>
                    <span className="label-sm px-3 py-1 bg-forest-800 text-gold-300 border border-gold-400/30 rounded-xs self-start sm:self-auto">
                      Tier 1 Accredited
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <span className="text-[10px] label text-paper/50">Delivered Units in FCT</span>
                      <p className="font-display text-xl text-paper mt-1">240+ Units</p>
                      <p className="text-[11px] text-paper/60">Across Guzape, Lugbe, and Jahi</p>
                    </div>
                    <div>
                      <span className="text-[10px] label text-paper/50">Engineering Compliance</span>
                      <p className="font-display text-xl text-paper mt-1">COREN / CORBON</p>
                      <p className="text-[11px] text-paper/60">Registered resident engineers on site</p>
                    </div>
                    <div>
                      <span className="text-[10px] label text-paper/50">Defect Liability Period</span>
                      <p className="font-display text-xl text-gold-300 mt-1">18 Months</p>
                      <p className="text-[11px] text-paper/60">Bank-guaranteed defect warranty</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 04. Financial Breakdown */}
            {activeTab === "financial" && (
              <div className="space-y-6 animate-fadeIn">
                <h4 className="font-display text-2xl text-paper">Open-Book Cost Breakdown</h4>
                <p className="text-sm text-paper/70">
                  Every Naira spent is accounted for transparently. Members see exactly how construction capital is allocated across the estate.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { label: "Land Acquisition", amount: "₦220M", pct: "22%", desc: "Direct purchase & registry" },
                    { label: "Infrastructure", amount: "₦180M", pct: "18%", desc: "Roads, drains, solar grids" },
                    { label: "Civil Construction", amount: "₦420M", pct: "42%", desc: "Foundations to roofing" },
                    { label: "Professional Fees", amount: "₦80M", pct: "8%", desc: "Engineers, architects, legal" },
                    { label: "Contingency Fund", amount: "₦100M", pct: "10%", desc: "Escrow buffer for pricing shifts" },
                  ].map((cost, idx) => (
                    <div key={idx} className="bg-forest-950 p-4 rounded-sm border border-paper/10 text-center">
                      <span className="label-sm text-gold-400 block">{cost.pct}</span>
                      <div className="font-display text-xl text-paper mt-1">{cost.amount}</div>
                      <div className="text-xs font-medium text-paper/90 mt-1">{cost.label}</div>
                      <div className="text-[10px] text-paper/50 mt-1">{cost.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-forest-950/80 p-4 border border-gold-400/20 text-xs text-paper/75 flex items-center justify-between">
                  <span>Total Project Capitalization: <strong>₦1,000,000,000</strong> (Fully ringfenced in project escrow)</span>
                  <span className="text-gold-400 font-mono">Zero Speculative Debt</span>
                </div>
              </div>
            )}

            {/* 05. Green & Inclusive Specs */}
            {activeTab === "standards" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* GreenHome Standard */}
                  <div className="bg-forest-950 p-6 rounded-sm border border-gold-400/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="label text-emerald-400">Pillar 13 Standard</span>
                      <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded">
                        Grade A Efficiency
                      </span>
                    </div>
                    <h5 className="font-display text-2xl text-paper">Anchor GreenHome™ Standard</h5>
                    <p className="text-xs text-paper/70 leading-relaxed">
                      Built for resilience against grid failures and extreme heat while reducing long-term household utility bills.
                    </p>

                    <div className="space-y-2.5 text-xs text-paper/85 pt-2">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span><strong>3.5kWp Hybrid Solar:</strong> Dedicated rooftop solar + lithium storage per unit.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span><strong>Natural Thermal Envelope:</strong> High thermal-mass bricks & cross ventilation.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span><strong>Rainwater Harvesting:</strong> 5,000L underground storage for irrigation.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400">✓</span>
                        <span><strong>Estimated Energy Savings:</strong> ~₦65,000/month saved on diesel/NEPA.</span>
                      </div>
                    </div>
                  </div>

                  {/* InclusiveHome Standard */}
                  <div className="bg-forest-950 p-6 rounded-sm border border-gold-400/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="label text-gold-400">Pillar 14 Standard</span>
                      <span className="text-xs px-2 py-0.5 bg-gold-500/10 text-gold-300 border border-gold-500/30 rounded">
                        Universal Access
                      </span>
                    </div>
                    <h5 className="font-display text-2xl text-paper">Anchor InclusiveHome™ Standard</h5>
                    <p className="text-xs text-paper/70 leading-relaxed">
                      Accessibility is an integral structural standard, not an afterthought CSR checklist.
                    </p>

                    <div className="space-y-2.5 text-xs text-paper/85 pt-2">
                      <div className="flex items-start gap-2">
                        <span className="text-gold-400">✓</span>
                        <span><strong>Zero-Threshold Step-Free Entrance:</strong> Seamless access from parking to doorway.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gold-400">✓</span>
                        <span><strong>900mm Wide Doorways:</strong> Full wheelchair and assistive mobility clearance.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gold-400">✓</span>
                        <span><strong>Adaptable Ground-Floor Bathrooms:</strong> Reinforced walls for grab bars.</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-gold-400">✓</span>
                        <span><strong>Elderly-Friendly Ergonomics:</strong> Anti-slip textured porcelain floor tiles.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
