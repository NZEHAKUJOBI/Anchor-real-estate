"use client";

import { useState } from "react";
import Link from "next/link";

export function SlotPoolVisualizer() {
  const TOTAL_SLOTS = 1000000;
  const SLOT_PRICE = 5000;
  const ALLOCATED_SLOTS = 284621;
  const AVAILABLE_SLOTS = TOTAL_SLOTS - ALLOCATED_SLOTS;
  const MOBILISED_CAPITAL = ALLOCATED_SLOTS * SLOT_PRICE; // ₦1,423,105,000

  const [selectedSlots, setSelectedSlots] = useState(1000);

  const memberCapital = selectedSlots * SLOT_PRICE;
  const poolPercentage = ((selectedSlots / TOTAL_SLOTS) * 100).toFixed(3);
  const estimatedAnnualDividend = Math.round(memberCapital * 0.185); // 18.5% annualized target yield on active asset deployment

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val).replace("NGN", "₦");
  };

  const allocatedPercentage = ((ALLOCATED_SLOTS / TOTAL_SLOTS) * 100).toFixed(1);

  return (
    <section id="pool-visualizer" className="py-24 bg-forest-950 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Pillar 05 · Transparent Capitalization</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Every ₦5,000 Slot Made Visible
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Anchor’s capitalization is governed by a capped pool of 1,000,000 ownership slots at ₦5,000 each. No hidden dilution, no behind-closed-doors equity.
          </p>
        </div>

        {/* Global Pool Progress Visualizer */}
        <div className="bg-forest-900/80 border border-gold-400/25 rounded-sm p-6 sm:p-10 mb-12 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="label text-gold-400">Anchor Ownership Pool</span>
              <h3 className="font-display text-2xl sm:text-3xl text-paper mt-1">1,000,000 Total Slots</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="label-sm text-paper/60 block">Mobilised Member Capital</span>
              <span className="font-display text-2xl sm:text-3xl text-gold-300">{formatNaira(MOBILISED_CAPITAL)}</span>
            </div>
          </div>

          {/* Segmented Pool Bar */}
          <div className="relative">
            <div className="h-6 w-full bg-forest-950 rounded-sm border border-gold-400/20 overflow-hidden flex">
              <div 
                className="bg-gold-400 transition-all duration-500 relative group flex items-center justify-end pr-2 text-[10px] font-bold text-forest-950"
                style={{ width: `${allocatedPercentage}%` }}
              >
                {allocatedPercentage}%
              </div>
              <div 
                className="bg-forest-800/80 transition-all duration-500 flex items-center pl-2 text-[10px] text-paper/60"
                style={{ width: `${100 - Number(allocatedPercentage)}%` }}
              >
                Available
              </div>
            </div>

            {/* Sub-label indicators */}
            <div className="grid grid-cols-2 gap-4 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-gold-400" />
                <span className="text-paper/90 font-medium">
                  <strong>{ALLOCATED_SLOTS.toLocaleString()}</strong> slots allocated
                </span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                <span className="h-2.5 w-2.5 rounded-full bg-forest-700 border border-paper/30" />
                <span className="text-paper/70">
                  <strong>{AVAILABLE_SLOTS.toLocaleString()}</strong> slots available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Member Stake Simulator */}
        <div className="bg-forest-900 border border-gold-400/30 rounded-sm p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <span className="label text-gold-400">Interactive Holding Calculator</span>
            <h3 className="font-display text-2xl sm:text-3xl text-paper mt-1">
              Simulate Your Cooperative Equity Stake
            </h3>
            <p className="text-sm text-paper/75 mt-2">
              Move the slider to configure your ownership slot holding (minimum 100 slots, maximum statutory cap of 10,000 slots per member).
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between label text-paper/90 mb-3">
                <span>Holdings: <strong className="text-gold-300 text-base">{selectedSlots.toLocaleString()} Slots</strong></span>
                <span className="text-paper/60">₦5,000 per slot</span>
              </div>

              <input
                type="range"
                min="100"
                max="10000"
                step="50"
                value={selectedSlots}
                onChange={(e) => setSelectedSlots(Number(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer h-2 bg-forest-950 rounded-lg"
              />

              <div className="flex justify-between text-[11px] label-sm text-paper/50 mt-2">
                <span>100 slots (₦500,000 min)</span>
                <span>2,500 slots</span>
                <span>5,000 slots</span>
                <span>10,000 slots (₦50m max)</span>
              </div>
            </div>

            {/* Simulated Return Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gold-400/20">
              <div className="bg-forest-950/70 border border-paper/10 p-4 rounded-sm">
                <span className="label-sm text-paper/60">Your Contribution</span>
                <p className="font-display text-xl sm:text-2xl text-gold-300 mt-1">{formatNaira(memberCapital)}</p>
                <p className="text-[11px] text-paper/60 mt-1">Documented cooperative capital</p>
              </div>

              <div className="bg-forest-950/70 border border-paper/10 p-4 rounded-sm">
                <span className="label-sm text-paper/60">Percentage of Slot Pool</span>
                <p className="font-display text-xl sm:text-2xl text-paper mt-1">{poolPercentage}%</p>
                <p className="text-[11px] text-paper/60 mt-1">Direct proportional voting equity</p>
              </div>

              <div className="bg-forest-950/70 border border-paper/10 p-4 rounded-sm">
                <span className="label-sm text-paper/60">Est. Annual Project Dividend</span>
                <p className="font-display text-xl sm:text-2xl text-emerald-400 mt-1">{formatNaira(estimatedAnnualDividend)}/yr</p>
                <p className="text-[11px] text-paper/60 mt-1">Target 18.5% yield on active projects</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <div className="text-xs text-paper/60 max-w-lg">
                Subject to final Society bye-laws, audit, and applicable Nigerian cooperative regulation. Slot holdings are legally deeded with digital membership credentials.
              </div>
              <Link
                href={`/join?slots=${selectedSlots}`}
                className="w-full sm:w-auto label bg-gold-400 text-forest-950 px-8 py-3.5 text-center hover:bg-gold-300 transition-colors whitespace-nowrap"
              >
                Acquire {selectedSlots.toLocaleString()} Slots
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
