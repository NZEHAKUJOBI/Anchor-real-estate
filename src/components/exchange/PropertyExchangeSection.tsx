"use client";

import { useState } from "react";

export function PropertyExchangeSection() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [slotUnits, setSlotUnits] = useState(250);

  const pricePerSlot = 5000;
  const totalValue = slotUnits * pricePerSlot;

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val).replace("NGN", "₦");
  };

  return (
    <section id="exchange" className="py-24 bg-forest-950 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Pillar 06 · Secondary Liquidity Mechanism</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Anchor Property Exchange™
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            A cooperative member needing liquidity should not have to sacrifice their hard-earned equity. We provide an internal, peer-to-peer liquidity facility for verified members to transfer or acquire slots safely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Exchange Order Interface */}
          <div className="lg:col-span-6 bg-forest-900 border border-gold-400/25 p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex border-b border-paper/10 pb-4">
              <button
                type="button"
                onClick={() => setMode("buy")}
                className={`label-sm flex-1 py-2.5 text-center border-b-2 transition-colors ${
                  mode === "buy"
                    ? "border-emerald-400 text-emerald-400 font-bold"
                    : "border-transparent text-paper/50 hover:text-paper"
                }`}
              >
                Acquire Additional Slots
              </button>
              <button
                type="button"
                onClick={() => setMode("sell")}
                className={`label-sm flex-1 py-2.5 text-center border-b-2 transition-colors ${
                  mode === "sell"
                    ? "border-gold-400 text-gold-300 font-bold"
                    : "border-transparent text-paper/50 hover:text-paper"
                }`}
              >
                Transfer / Liquidate My Slots
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs label text-paper/70 block mb-2">Number of ₦5,000 Slots</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="50"
                    max="5000"
                    step="50"
                    value={slotUnits}
                    onChange={(e) => setSlotUnits(Math.max(50, Number(e.target.value)))}
                    className="w-full bg-forest-950 border border-paper/20 rounded-xs p-3 text-lg font-mono font-bold text-paper focus:border-gold-400 focus:outline-none"
                  />
                  <div className="flex gap-2">
                    {[100, 250, 500, 1000].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSlotUnits(preset)}
                        className={`text-xs px-2.5 py-2 rounded border ${
                          slotUnits === preset
                            ? "border-gold-400 bg-gold-400/20 text-gold-300"
                            : "border-paper/20 text-paper/60 hover:border-paper/40"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-forest-950 p-4 rounded-sm border border-paper/10 space-y-2">
                <div className="flex justify-between text-xs text-paper/60">
                  <span>Standard Slot Par Value:</span>
                  <span className="font-mono text-paper">₦5,000.00 / slot</span>
                </div>
                <div className="flex justify-between text-xs text-paper/60">
                  <span>Exchange Escrow Processing:</span>
                  <span className="text-emerald-400">0.5% (Internal Transfer)</span>
                </div>
                <div className="border-t border-paper/10 pt-2 flex justify-between items-baseline">
                  <span className="label-sm text-gold-400">Total Settlement:</span>
                  <span className="font-display text-2xl font-bold text-paper">{formatNaira(totalValue)}</span>
                </div>
              </div>

              <button
                type="button"
                className={`w-full label py-4 rounded-xs transition-colors ${
                  mode === "buy"
                    ? "bg-emerald-600 text-paper hover:bg-emerald-500"
                    : "bg-gold-400 text-forest-950 hover:bg-gold-300"
                }`}
              >
                {mode === "buy" ? "Submit Bid to Acquire Slots" : "List Slots on Internal Liquidity Board"}
              </button>
            </div>
          </div>

          {/* Live Internal Order Book & Regulatory Note */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-forest-900 border border-gold-400/25 p-6 rounded-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="label-sm text-gold-400">Live Internal Match Queue</span>
                <span className="text-[11px] text-emerald-400">● 100% Capital Guaranteed</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { type: "WANT TO BUY", user: "Member #AK-2041", slots: "500 slots", val: "₦2,500,000", time: "12 mins ago" },
                  { type: "TRANSFER OFFER", user: "Member #AK-1109", slots: "300 slots", val: "₦1,500,000", time: "44 mins ago" },
                  { type: "WANT TO BUY", user: "Member #AK-4902", slots: "1,000 slots", val: "₦5,000,000", time: "2 hours ago" },
                  { type: "TRANSFER OFFER", user: "Member #AK-0883", slots: "200 slots", val: "₦1,000,000", time: "5 hours ago" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-forest-950/70 p-3 rounded-xs border border-paper/10 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] label-sm px-2 py-0.5 rounded ${item.type === "WANT TO BUY" ? "bg-emerald-500/15 text-emerald-400" : "bg-gold-400/15 text-gold-300"}`}>
                        {item.type}
                      </span>
                      <span className="font-mono text-paper/80">{item.user}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-medium text-paper block">{item.val} ({item.slots})</span>
                      <span className="text-[10px] text-paper/40">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Notice as noted in document */}
            <div className="bg-forest-900/40 border-l-2 border-gold-400 p-4 text-xs text-paper/70 space-y-1">
              <span className="label-sm text-gold-400 block">Regulatory & Bye-Laws Notice</span>
              <p>
                All slot transfers are conducted strictly within the Anchor Multipurpose Cooperative membership under statutory bye-laws (FCTA By-Laws No. R11913). Not an open public securities exchange. Transfers require biometric identification and cooperative committee counter-signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
