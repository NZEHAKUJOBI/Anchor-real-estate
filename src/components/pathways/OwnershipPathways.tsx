"use client";

import { useState } from "react";
import Link from "next/link";

interface Pathway {
  id: string;
  name: string;
  tagline: string;
  targetAudience: string;
  entryRequirement: string;
  timeline: string;
  features: string[];
  ctaText: string;
  highlight?: boolean;
}

const pathways: Pathway[] = [
  {
    id: "start",
    name: "Anchor START™",
    tagline: "Save progressively towards your first property.",
    targetAudience: "Aspiring homeowners building initial capacity",
    entryRequirement: "From ₦10,000 / month savings",
    timeline: "12 – 36 months",
    features: [
      "Auto-allocation into ₦5,000 ownership slots",
      "Earn annual cooperative dividends while saving",
      "Progressive AnchorScore™ building",
      "Priority allocation in upcoming Anchor estates",
    ],
    ctaText: "Start Saving",
  },
  {
    id: "own",
    name: "Anchor OWN™",
    tagline: "For individuals ready for deposit + structured financing.",
    targetAudience: "Buyers with initial equity ready for construction",
    entryRequirement: "25% deposit threshold",
    timeline: "Immediate to 12 months",
    features: [
      "Verified FCDA / Area Council land titles",
      "Cooperative credit co-financing up to 10 years",
      "Fixed construction pricing — immune to inflation",
      "Transparent Property DNA™ project monitoring",
    ],
    ctaText: "Explore Properties",
    highlight: true,
  },
  {
    id: "live",
    name: "Anchor LIVE™",
    tagline: "Move in now. Convert your monthly rent into equity.",
    targetAudience: "Tenants wanting to stop paying dead rent in Abuja",
    entryRequirement: "First year rent + deposit credit",
    timeline: "3 – 7 years to full deed transfer",
    features: [
      "Occupancy granted after verified onboarding",
      "70% of monthly rental payments credited to ownership",
      "AnchorScore™ underwriting (no payslip barrier)",
      "Option to buy out equity ahead of schedule",
    ],
    ctaText: "Check Rent-to-Own",
  },
  {
    id: "grow",
    name: "Anchor GROW™",
    tagline: "Institutional real-estate wealth for passive investors.",
    targetAudience: "Wealth builders seeking inflation-hedged yields",
    entryRequirement: "Minimum 100 slots (₦500,000)",
    timeline: "Ongoing wealth distribution",
    features: [
      "Direct exposure to prime warehousing & commercial assets",
      "Annual dividend distribution & capital appreciation",
      "Secondary liquidity via Anchor Property Exchange",
      "Protected by statutory cooperative asset collateral",
    ],
    ctaText: "Invest in Slots",
  },
];

export function OwnershipPathways() {
  const [activePathway, setActivePathway] = useState("start");

  return (
    <section id="pathways" className="py-24 bg-forest-900 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-14">
          <p className="label text-gold-400">Pillar 07 · Consumer Simplification</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Four Distinct Ownership Pathways
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Where are you in this system? Rather than presenting eight unrelated services, Anchor organizes your journey into clear, structured milestones.
          </p>
        </div>

        {/* Pathway Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pathways.map((p) => {
            const isSelected = activePathway === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setActivePathway(p.id)}
                className={`cursor-pointer rounded-sm border p-6 flex flex-col justify-between transition-all duration-300 ${
                  p.highlight
                    ? "border-gold-400 bg-forest-950/90 shadow-2xl relative"
                    : isSelected
                    ? "border-gold-400/80 bg-forest-950/70"
                    : "border-paper/15 bg-forest-950/40 hover:border-gold-400/40 hover:bg-forest-950/60"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3 right-4 bg-gold-400 text-forest-950 text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-wider rounded-xs">
                    Popular Choice
                  </div>
                )}

                <div>
                  <span className="label text-gold-400 block mb-2">{p.name}</span>
                  <h3 className="font-display text-xl sm:text-2xl text-paper leading-snug mb-3">{p.tagline}</h3>
                  <p className="text-xs text-paper/60 mb-5">{p.targetAudience}</p>

                  <div className="border-t border-paper/10 pt-4 pb-4 space-y-3">
                    <div>
                      <span className="text-[10px] label text-paper/50 block">Entry Point</span>
                      <span className="text-sm font-medium text-gold-300">{p.entryRequirement}</span>
                    </div>
                    <div>
                      <span className="text-[10px] label text-paper/50 block">Timeline</span>
                      <span className="text-sm font-medium text-paper">{p.timeline}</span>
                    </div>
                  </div>

                  <div className="border-t border-paper/10 pt-4 space-y-2.5">
                    <span className="text-[10px] label text-gold-400 block mb-1">Key Advantages</span>
                    {p.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-paper/80">
                        <span className="text-gold-400 text-sm leading-none">✓</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-paper/10">
                  <Link
                    href={`/join?pathway=${p.id}`}
                    className={`label-sm block w-full text-center py-3 rounded-xs transition-colors ${
                      p.highlight
                        ? "bg-gold-400 text-forest-950 hover:bg-gold-300 font-semibold"
                        : "border border-paper/20 text-paper hover:border-gold-400 hover:text-gold-300"
                    }`}
                  >
                    {p.ctaText} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Ladder Explainer */}
        <div className="mt-12 bg-forest-950/60 border border-gold-400/20 p-6 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="label text-gold-400">The Housing Ladder Operating System</span>
            <p className="text-sm text-paper/80">
              You are never stuck in one tier. You can start with <strong>Anchor START™</strong>, graduate to <strong>Anchor OWN™</strong>, move into <strong>Anchor LIVE™</strong>, and trade up to larger assets while building equity with <strong>Anchor GROW™</strong>.
            </p>
          </div>
          <a
            href="#homepath"
            className="label-sm px-6 py-3 border border-gold-400 text-gold-300 hover:bg-gold-400 hover:text-forest-950 transition-colors whitespace-nowrap"
          >
            Find My Starting Point
          </a>
        </div>
      </div>
    </section>
  );
}
