"use client";

import { useState } from "react";
import Link from "next/link";
import { Accent, SectionHeading } from "../SectionHeading";
import { buttonClass } from "../ui/Button";
import { cn, naira } from "../ui/cn";
import { Icon, type IconName } from "../ui/Icons";
import { IconTile, Pill, card } from "../ui/primitives";

interface BulkItem {
  id: string;
  category: string;
  name: string;
  retailPrice: number;
  memberPrice: number;
  partner: string;
  popular?: boolean;
}

const bulkCatalog: BulkItem[] = [
  {
    id: "solar-5kva",
    category: "Clean Power",
    name: "5kVA Smart Lithium Hybrid Solar System (5.1kWh Storage)",
    retailPrice: 4850000,
    memberPrice: 3580000,
    partner: "Anchor Clean Energy Consortium",
    popular: true,
  },
  {
    id: "cement-500",
    category: "Building Materials",
    name: "Portland Cement Grade 42.5R (Bulk 500-Bag Depot Order)",
    retailPrice: 4250000,
    memberPrice: 3400000,
    partner: "Direct Manufacturer Allocation",
  },
  {
    id: "porcelain-tiles",
    category: "Finishing",
    name: "Full-Body Vitrified Porcelain Floor Tiles (Whole-House 300sqm)",
    retailPrice: 3100000,
    memberPrice: 2350000,
    partner: "Prime Ceramic Importers",
  },
  {
    id: "security-doors",
    category: "Fittings",
    name: "Heavy-Gauge Armoured Turkish Security Doors (Front & Rear Pack)",
    retailPrice: 1600000,
    memberPrice: 1180000,
    partner: "SteelCore Systems Ltd",
  },
  {
    id: "smart-appliances",
    category: "Living",
    name: "Complete Inverter AC & Kitchen Appliance Bundle (4 Inverter ACs + Oven)",
    retailPrice: 3800000,
    memberPrice: 2950000,
    partner: "Haier / LG Corporate Channel",
    popular: true,
  },
  {
    id: "fiber-insurance",
    category: "Services",
    name: "Annual Comprehensive Home Insurance + 1Gbps Fiber Internet (12 Months)",
    retailPrice: 720000,
    memberPrice: 490000,
    partner: "Leadway Assurance & FibreOne",
  },
];

const categoryIcon: Record<string, IconName> = {
  "Clean Power": "zap",
  "Building Materials": "package",
  Finishing: "grid",
  Fittings: "lock",
  Living: "home",
  Services: "shield",
};

const categories = ["All", "Clean Power", "Building Materials", "Finishing", "Fittings", "Living", "Services"];

export function BulkBuySection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredItems =
    activeCategory === "All"
      ? bulkCatalog
      : bulkCatalog.filter((item) => item.category === activeCategory);

  return (
    <section id="bulkbuy" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <SectionHeading
          layout="split"
          eyebrow="Anchor BulkBuy™ · Member pricing"
          title={
            <>
              Membership that pays <Accent>after the keys.</Accent>
            </>
          }
          lead="Membership remains valuable long after acquiring your keys. We negotiate collective institutional pricing on cement, solar systems, sanitary ware, appliances, and maintenance."
        />

        <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 no-scrollbar sm:mx-0 sm:flex-wrap sm:px-0">
          {categories.map((cat) => {
            const on = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-[0.875rem] font-semibold transition-colors",
                  on
                    ? "border-forest-900 bg-forest-900 text-paper"
                    : "border-forest-900/15 bg-ivory text-ink-soft hover:border-forest-900/35 hover:text-forest-900",
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const saving = item.retailPrice - item.memberPrice;
            const pct = Math.round((saving / item.retailPrice) * 100);
            return (
              <li key={item.id} className={cn(card, "animate-fade-in flex flex-col rounded-3xl p-6 transition-shadow duration-300 hover:shadow-lift")}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <IconTile name={categoryIcon[item.category] ?? "package"} size="sm" />
                    <span className="text-[0.75rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                      {item.category}
                    </span>
                  </div>
                  {item.popular ? (
                    <Pill tone="solid" icon="star">
                      High demand
                    </Pill>
                  ) : null}
                </div>

                <h3 className="mt-5 text-[1.0625rem] leading-snug font-semibold text-forest-900">{item.name}</h3>
                <p className="mt-1.5 mb-6 text-[0.8125rem] text-ink-faint">Partner: {item.partner}</p>

                <div className="mt-auto rounded-2xl bg-paper/80 p-4 ring-1 ring-forest-900/[0.06]">
                  <div className="flex items-baseline justify-between text-[0.8125rem] text-ink-faint">
                    <span>Retail market price</span>
                    <span className="line-through tnum">{naira(item.retailPrice)}</span>
                  </div>
                  <div className="mt-2 flex items-end justify-between gap-3">
                    <div>
                      <p className="text-[0.8125rem] font-medium text-forest-700">Member price</p>
                      <p className="figure-num text-[1.75rem] leading-none text-forest-900">{naira(item.memberPrice)}</p>
                    </div>
                    <Pill tone="mint">Save {pct}%</Pill>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-[0.8125rem] font-medium text-mint-700">
                    <Icon name="check-circle" className="size-4" />
                    {naira(saving)} saved
                  </p>
                </div>

                <Link
                  href={`/join?bulkbuy=${item.id}`}
                  className={buttonClass("outline", "md", "mt-6 w-full")}
                >
                  Request bulk allocation
                  <Icon name="arrow-right" className="size-4" strokeWidth={2} />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-forest-900/10 bg-ivory px-5 py-4 text-[0.875rem] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2.5">
            <Icon name="package" className="size-5 shrink-0 text-forest-600" />
            Items delivered directly to your Anchor plot or residence with guaranteed manufacturer warranty.
          </span>
          <span className="font-semibold text-forest-800">Anchor Procurement Desk · Abuja FCT</span>
        </div>
      </div>
    </section>
  );
}
