"use client";

import { useState } from "react";

interface CoOwner {
  name: string;
  relation: string;
  share: number; // percentage
}

export function OwnershipCircles() {
  const [propertyPrice, setPropertyPrice] = useState(35000000);
  const [owners, setOwners] = useState<CoOwner[]>([
    { name: "Dayo", relation: "Lead / Sibling 1", share: 30 },
    { name: "Tunde", relation: "Sibling 2", share: 20 },
    { name: "Amina", relation: "Sibling 3", share: 20 },
    { name: "Bola", relation: "Sibling 4", share: 15 },
    { name: "Grace", relation: "Sibling 5", share: 15 },
  ]);

  const totalShare = owners.reduce((acc, curr) => acc + curr.share, 0);

  const updateShare = (index: number, newShare: number) => {
    const updated = [...owners];
    updated[index].share = newShare;
    setOwners(updated);
  };

  const addOwner = () => {
    if (owners.length >= 8) return;
    setOwners([...owners, { name: `Partner ${owners.length + 1}`, relation: "Co-Buyer", share: 10 }]);
  };

  const removeOwner = (idx: number) => {
    if (owners.length <= 2) return;
    setOwners(owners.filter((_, i) => i !== idx));
  };

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val).replace("NGN", "₦");
  };

  return (
    <section id="circles" className="py-24 bg-forest-900 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Pillar 09 · Collaborative Syndication</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Create an Ownership Circle™
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Five siblings buying a home for their parents. Four colleagues co-investing in rental real estate. A diaspora association acquiring 20 homes. Anchor’s legal technology makes group ownership seamless and fully documented.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Circle Configurator */}
          <div className="lg:col-span-7 bg-forest-950 border border-gold-400/25 p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper/10 pb-4">
              <div>
                <span className="label-sm text-gold-400">Circle Target Asset</span>
                <div className="font-display text-2xl text-paper mt-0.5">{formatNaira(propertyPrice)}</div>
              </div>
              <div className="flex items-center gap-2">
                {[25000000, 35000000, 50000000, 80000000].map((price) => (
                  <button
                    key={price}
                    type="button"
                    onClick={() => setPropertyPrice(price)}
                    className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                      propertyPrice === price
                        ? "border-gold-400 bg-gold-400/20 text-gold-300"
                        : "border-paper/20 text-paper/70 hover:border-paper/40"
                    }`}
                  >
                    ₦{price / 1000000}m
                  </button>
                ))}
              </div>
            </div>

            {/* Members List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs label text-paper/60">
                <span>Circle Members & Proportional Allocation</span>
                <span className={totalShare === 100 ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  Total: {totalShare}% {totalShare !== 100 && "(Must equal 100%)"}
                </span>
              </div>

              {owners.map((owner, idx) => {
                const individualCost = Math.round((propertyPrice * owner.share) / 100);
                const monthlyPayment = Math.round(individualCost / 36); // 36-month timeline

                return (
                  <div key={idx} className="bg-forest-900/80 border border-paper/10 p-4 rounded-sm space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="h-6 w-6 rounded-full bg-forest-800 text-gold-400 font-mono text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <input
                            type="text"
                            value={owner.name}
                            onChange={(e) => {
                              const updated = [...owners];
                              updated[idx].name = e.target.value;
                              setOwners(updated);
                            }}
                            className="bg-transparent border-b border-paper/20 text-sm font-semibold text-paper focus:outline-none focus:border-gold-400 py-0.5"
                          />
                          <span className="text-xs text-paper/50 block">{owner.relation}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-sm font-mono font-bold text-gold-300">{formatNaira(individualCost)}</span>
                          <span className="text-[11px] text-paper/60 block">~{formatNaira(monthlyPayment)}/mo (36 mos)</span>
                        </div>
                        {owners.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOwner(idx)}
                            className="text-paper/40 hover:text-red-400 text-sm px-1"
                            title="Remove member"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Share Slider */}
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="5"
                        max="80"
                        value={owner.share}
                        onChange={(e) => updateShare(idx, Number(e.target.value))}
                        className="w-full accent-gold-400 h-1.5 bg-forest-950 rounded cursor-pointer"
                      />
                      <span className="font-mono text-xs font-bold text-gold-300 w-10 text-right">{owner.share}%</span>
                    </div>
                  </div>
                );
              })}

              {owners.length < 8 && (
                <button
                  type="button"
                  onClick={addOwner}
                  className="w-full py-2.5 border border-dashed border-gold-400/40 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10 text-xs label rounded-sm transition-colors"
                >
                  + Add Member to Circle
                </button>
              )}
            </div>
          </div>

          {/* Legal Framework & Execution */}
          <div className="lg:col-span-5 bg-forest-950 border border-gold-400/30 p-6 sm:p-8 rounded-sm space-y-6">
            <span className="label text-gold-400">Institutional Governance</span>
            <h3 className="font-display text-2xl text-paper">Co-Tenancy Legal Deed</h3>
            <p className="text-xs text-paper/75 leading-relaxed">
              Every Ownership Circle is backed by an automated <strong>Tenancy-in-Common (TIC) Agreement</strong> registered with the High Court and Anchor Cooperative Trustees.
            </p>

            <div className="space-y-3 pt-2">
              <div className="bg-forest-900 p-3.5 rounded-sm border border-paper/10 text-xs text-paper/85">
                <span className="font-semibold text-gold-300 block mb-1">✓ Proportionate Deeded Title</span>
                Each member’s name and exact percentage is recorded on the sub-lease and cooperative share registry.
              </div>
              <div className="bg-forest-900 p-3.5 rounded-sm border border-paper/10 text-xs text-paper/85">
                <span className="font-semibold text-gold-300 block mb-1">✓ Buyout & Succession Rules</span>
                If one co-buyer encounters financial changes, existing members enjoy right-of-first-refusal, or Anchor liquidity kicks in.
              </div>
              <div className="bg-forest-900 p-3.5 rounded-sm border border-paper/10 text-xs text-paper/85">
                <span className="font-semibold text-gold-300 block mb-1">✓ Transparent Split Billing</span>
                Each member receives dedicated payment links and statements for their exact portion.
              </div>
            </div>

            <div className="pt-4 border-t border-paper/10 space-y-3">
              <button
                type="button"
                className="w-full label bg-gold-400 text-forest-950 py-3.5 hover:bg-gold-300 transition-colors"
              >
                Generate Ownership Circle Link
              </button>
              <p className="text-[11px] text-center text-paper/50">
                Share with siblings or co-investors to begin collaborative onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
