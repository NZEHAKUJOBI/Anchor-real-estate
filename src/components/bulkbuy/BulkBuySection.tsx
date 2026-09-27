"use client";

import { useState } from "react";

interface BulkItem {
  id: string;
  category: string;
  name: string;
  retailPrice: string;
  memberPrice: string;
  savings: string;
  partner: string;
  popular?: boolean;
}

const bulkCatalog: BulkItem[] = [
  {
    id: "solar-5kva",
    category: "Clean Power",
    name: "5kVA Smart Lithium Hybrid Solar System (5.1kWh Storage)",
    retailPrice: "₦4,850,000",
    memberPrice: "₦3,580,000",
    savings: "₦1,270,000 Saved (26%)",
    partner: "Anchor Clean Energy Consortium",
    popular: true,
  },
  {
    id: "cement-500",
    category: "Building Materials",
    name: "Portland Cement Grade 42.5R (Bulk 500-Bag Depot Order)",
    retailPrice: "₦4,250,000",
    memberPrice: "₦3,400,000",
    savings: "₦850,000 Saved (20%)",
    partner: "Direct Manufacturer Allocation",
  },
  {
    id: "porcelain-tiles",
    category: "Finishing",
    name: "Full-Body Vitrified Porcelain Floor Tiles (Whole-House 300sqm)",
    retailPrice: "₦3,100,000",
    memberPrice: "₦2,350,000",
    savings: "₦750,000 Saved (24%)",
    partner: "Prime Ceramic Importers",
  },
  {
    id: "security-doors",
    category: "Fittings",
    name: "Heavy-Gauge Armoured Turkish Security Doors (Front & Rear Pack)",
    retailPrice: "₦1,600,000",
    memberPrice: "₦1,180,000",
    savings: "₦420,000 Saved (26%)",
    partner: "SteelCore Systems Ltd",
  },
  {
    id: "smart-appliances",
    category: "Living",
    name: "Complete Inverter AC & Kitchen Appliance Bundle (4 Inverter ACs + Oven)",
    retailPrice: "₦3,800,000",
    memberPrice: "₦2,950,000",
    savings: "₦850,000 Saved (22%)",
    partner: "Haier / LG Corporate Channel",
    popular: true,
  },
  {
    id: "fiber-insurance",
    category: "Services",
    name: "Annual Comprehensive Home Insurance + 1Gbps Fiber Internet (12 Months)",
    retailPrice: "₦720,000",
    memberPrice: "₦490,000",
    savings: "₦230,000 Saved (32%)",
    partner: "Leadway Assurance & FibreOne",
  },
];

export function BulkBuySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Clean Power", "Building Materials", "Finishing", "Fittings", "Living", "Services"];

  const filteredItems = activeCategory === "All"
    ? bulkCatalog
    : bulkCatalog.filter((item) => item.category === activeCategory);

  return (
    <section id="bulkbuy" className="py-24 bg-forest-900 text-paper border-b border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Pillar 12 · Post-Purchase Economic Power</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Anchor BulkBuy™
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Membership remains valuable long after acquiring your keys. We negotiate collective institutional pricing on cement, solar systems, sanitary ware, appliances, and maintenance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`label-sm px-4 py-2 rounded-xs border transition-colors ${
                activeCategory === cat
                  ? "border-gold-400 bg-gold-400 text-forest-950 font-bold"
                  : "border-paper/20 text-paper/75 hover:border-gold-400/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-forest-950 border border-gold-400/25 p-6 rounded-sm flex flex-col justify-between hover:border-gold-400/60 transition-all duration-300 relative"
            >
              {item.popular && (
                <div className="absolute top-4 right-4 bg-gold-400 text-forest-950 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-xs">
                  High Demand
                </div>
              )}

              <div>
                <span className="text-[10px] label text-paper/50 block mb-1">{item.category}</span>
                <h3 className="font-display text-lg text-paper leading-snug mb-2 pr-12">{item.name}</h3>
                <span className="text-xs text-gold-400/80 block mb-4">Partner: {item.partner}</span>

                <div className="bg-forest-900/80 p-3.5 rounded-sm border border-paper/10 space-y-1 mb-4">
                  <div className="flex justify-between text-xs text-paper/50">
                    <span>Retail Market Price:</span>
                    <span className="line-through">{item.retailPrice}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="label-sm text-gold-300">Member Price:</span>
                    <span className="font-mono text-xl font-bold text-emerald-400">{item.memberPrice}</span>
                  </div>
                </div>

                <div className="text-xs text-emerald-400 font-medium flex items-center gap-1.5 mb-4">
                  <span>✓</span>
                  <span>{item.savings}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-paper/10">
                <button
                  type="button"
                  className="w-full label-sm bg-forest-900 border border-gold-400/40 text-gold-300 py-2.5 hover:bg-gold-400 hover:text-forest-950 transition-colors"
                >
                  Request Bulk Allocation
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-forest-950/60 border border-gold-400/20 p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/70">
          <span>Items delivered directly to your Anchor plot or residence with guaranteed manufacturer warranty.</span>
          <span className="font-mono text-gold-400">Anchor Procurement Desk · Abuja FCT</span>
        </div>
      </div>
    </section>
  );
}
