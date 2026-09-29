"use client";

import { useState } from "react";
import Link from "next/link";
import { Accent, SectionHeading } from "../SectionHeading";
import { Button, buttonClass } from "../ui/Button";
import { cn, naira } from "../ui/cn";
import { Icon, type IconName } from "../ui/Icons";
import { Pill, card, type PillTone } from "../ui/primitives";

interface Answers {
  age: string;
  location: string;
  monthlyIncome: number;
  incomeType: string;
  savings: number;
  monthlyContribution: number;
  desiredProperty: string;
  propertyPrice: number;
  timeline: number; // months
}

type Option = {
  label: string;
  note?: string;
  meta?: string;
  patch: Partial<Answers>;
};

type Step = {
  short: string;
  question: string;
  help: string;
  columns: string;
  options: Option[];
};

const propertyOptions = [
  { id: "plot", name: "Serviced Residential Plot", price: 8000000, desc: "Titled land banking in developing FCT corridors" },
  { id: "starter", name: "1-Bed Urban Starter", price: 18000000, desc: "Compact modern studio/apartment for young professionals" },
  { id: "2bed", name: "2-Bed Smart Apartment", price: 28000000, desc: "Energy-efficient 2-bedroom home in planned community" },
  { id: "3bed", name: "3-Bed Family Terrace", price: 48000000, desc: "Multi-level family residence with solar standard" },
  { id: "villa", name: "4-Bed Detached Villa", price: 85000000, desc: "Executive home with private grounds & smart amenities" },
];

const steps: Step[] = [
  {
    short: "Age",
    question: "What is your age bracket?",
    help: "This helps calculate your eligible financing tenure and cooperative horizon.",
    columns: "grid-cols-2",
    options: ["18–29 years", "30–39 years", "40–49 years", "50+ years"].map((age) => ({
      label: age,
      patch: { age },
    })),
  },
  {
    short: "Location",
    question: "Where do you reside or wish to acquire?",
    help: "Anchor matches developments across prime and emerging FCT corridors.",
    columns: "sm:grid-cols-2",
    options: [
      "Lugbe / Airport Road Corridor",
      "Kuje / Gwagwalada Hub",
      "Life Camp / Kado / Gwarinpa",
      "Abuja Central (Maitama / Wuse / Guzape)",
      "Kubwa / Bwari District",
      "Nigerian Diaspora (Overseas)",
    ].map((location) => ({ label: location, patch: { location } })),
  },
  {
    short: "Income",
    question: "What is your estimated monthly income?",
    help: "Include average monthly take-home, business profits, or seasonal inflows.",
    columns: "sm:grid-cols-2",
    options: [
      { label: "₦150,000 – ₦350,000", val: 250000 },
      { label: "₦350,000 – ₦800,000", val: 550000 },
      { label: "₦800,000 – ₦1,800,000", val: 1200000 },
      { label: "₦1,800,000 – ₦4,000,000", val: 2500000 },
      { label: "₦4,000,000+", val: 5000000 },
    ].map((item) => ({ label: item.label, patch: { monthlyIncome: item.val } })),
  },
  {
    short: "Income type",
    question: "What is your income type?",
    help: "Anchor specialises in informal and non-traditional earners without conventional corporate payslips.",
    columns: "sm:grid-cols-2",
    options: [
      { type: "Trader / Small Business Owner", note: "Market merchant, shop owner, distributor" },
      { type: "Consultant / Tech / Freelancer", note: "Contract income, independent professional" },
      { type: "Artisan / Transport Operator", note: "Ride-hailing driver, builder, technician" },
      { type: "Corporate / Civil Servant", note: "Formal employer salary with payslip" },
      { type: "Diaspora Professional", note: "Earning in FX sending remittances home" },
    ].map((item) => ({ label: item.type, note: item.note, patch: { incomeType: item.type } })),
  },
  {
    short: "Savings",
    question: "How much existing liquid savings can you commit?",
    help: "Capital available right now for initial slot holding or deposit allocation.",
    columns: "sm:grid-cols-2",
    options: [
      { label: "Under ₦500,000", val: 300000 },
      { label: "₦500,000 – ₦2,000,000", val: 1200000 },
      { label: "₦2,000,000 – ₦6,000,000", val: 3500000 },
      { label: "₦6,000,000 – ₦15,000,000", val: 9000000 },
      { label: "₦15,000,000+", val: 20000000 },
    ].map((item) => ({ label: item.label, patch: { savings: item.val } })),
  },
  {
    short: "Contribution",
    question: "What monthly contribution can you comfortably afford?",
    help: "Regular cooperative savings that purchase ownership slots each month.",
    columns: "grid-cols-2 sm:grid-cols-3",
    options: [
      { label: "₦50,000 / mo", val: 50000 },
      { label: "₦100,000 / mo", val: 100000 },
      { label: "₦180,000 / mo", val: 180000 },
      { label: "₦300,000 / mo", val: 300000 },
      { label: "₦500,000 / mo", val: 500000 },
      { label: "₦1,000,000+ / mo", val: 1000000 },
    ].map((item) => ({ label: item.label, patch: { monthlyContribution: item.val } })),
  },
  {
    short: "Property",
    question: "Which property type matches your ambition?",
    help: "Select your desired target property type to benchmark your readiness.",
    columns: "sm:grid-cols-2",
    options: propertyOptions.map((prop) => ({
      label: prop.name,
      note: prop.desc,
      meta: naira(prop.price),
      patch: { desiredProperty: prop.name, propertyPrice: prop.price },
    })),
  },
  {
    short: "Horizon",
    question: "What is your preferred ownership horizon?",
    help: "When do you want the keys or deed handed over?",
    columns: "grid-cols-2",
    options: [
      { label: "12–18 months", val: 18 },
      { label: "2–3 years", val: 36 },
      { label: "3–5 years", val: 48 },
      { label: "5+ years", val: 60 },
    ].map((item) => ({ label: item.label, patch: { timeline: item.val } })),
  },
];

const TOTAL = steps.length;

const outcomes: { icon: IconName; text: string }[] = [
  { icon: "home", text: "Your housing capacity today" },
  { icon: "clock", text: "How long until your 25% deposit" },
  { icon: "key", text: "The ownership pathway that fits you" },
  { icon: "gauge", text: "A projected AnchorScore™" },
];

function isSelected(answers: Answers, option: Option) {
  return Object.entries(option.patch).every(
    ([key, value]) => answers[key as keyof Answers] === value,
  );
}

export function HomePathCalculator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Answers>({
    age: "30–39 years",
    location: "Lugbe / Airport Road Corridor",
    monthlyIncome: 550000,
    incomeType: "Trader / Small Business Owner",
    savings: 1200000,
    monthlyContribution: 180000,
    desiredProperty: "2-Bed Smart Apartment",
    propertyPrice: 28000000,
    timeline: 36,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, TOTAL + 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Calculations for HomePath Engine
  const targetPrice = data.propertyPrice;
  const depositRequired = targetPrice * 0.25; // 25% equity threshold
  const savingsGap = Math.max(0, depositRequired - data.savings);
  const monthsToDeposit =
    data.monthlyContribution > 0 ? Math.ceil(savingsGap / data.monthlyContribution) : 0;

  // Housing capacity estimate: savings plus 36 months of contributions with the cooperative credit multiplier
  const housingCapacity = Math.round(data.savings + data.monthlyContribution * 36 * 1.35);

  // Recommended Pathway logic
  let recommendedPathway = "Anchor START™ (Save-to-Own + Cooperative Credit)";
  let pathwayReason =
    "Build your initial equity progressively while earning cooperative dividends on your contributions.";
  let alternativePathway = "Anchor LIVE™ (Rent-to-Own)";

  if (data.savings >= depositRequired) {
    recommendedPathway = "Anchor OWN™ (Deposit + Cooperative Financing)";
    pathwayReason =
      "You have met the required equity deposit. You are eligible for immediate plot/unit allocation and developer co-financing.";
    alternativePathway = "Anchor GROW™ (Cooperative Slot Wealth)";
  } else if (data.monthlyIncome >= 800000 && monthsToDeposit <= 18) {
    recommendedPathway = "Anchor LIVE™ (Rent-to-Own Pathway)";
    pathwayReason =
      "Move in sooner by converting your monthly rental payments directly into homeownership equity.";
    alternativePathway = "Anchor START™ (Save-to-Own)";
  }

  // Estimated AnchorScore preview
  const estimatedAnchorScore = Math.min(
    820,
    Math.max(
      620,
      Math.round(
        600 +
          (data.savings > 2000000 ? 50 : 20) +
          (data.monthlyContribution > 100000 ? 60 : 30) +
          (data.incomeType.includes("Trader") || data.incomeType.includes("Freelancer") ? 45 : 55),
      ),
    ),
  );
  const scoreBand: { label: string; tone: PillTone } =
    estimatedAnchorScore >= 740
      ? { label: "Home finance ready", tone: "mint-dark" }
      : estimatedAnchorScore >= 680
        ? { label: "Credit qualified", tone: "gold-dark" }
        : { label: "Building capacity", tone: "clay-dark" };

  const current = steps[step - 1];
  const done = step > TOTAL;
  const [pathwayName, pathwayDetail] = recommendedPathway.split(" (");

  return (
    <section id="homepath" className="relative bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="HomePath™ assessment"
                title={
                  <>
                    Can I <Accent>own a home?</Accent>
                  </>
                }
                lead="Answer eight short questions to see your housing capacity, how long until you are deposit-ready, and the ownership pathway that fits you."
                className="mb-10 md:mb-10"
              />

              <p className="text-[0.8125rem] font-semibold tracking-[0.08em] text-ink-faint uppercase">
                What you will learn
              </p>
              <ul className="mt-4 grid gap-3 xs:grid-cols-2 lg:grid-cols-1">
                {outcomes.map((item) => (
                  <li key={item.text} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-forest-700/[0.08] text-forest-700">
                      <Icon name={item.icon} className="size-[1.125rem]" />
                    </span>
                    {item.text}
                  </li>
                ))}
              </ul>

              <p className="mt-8 flex items-center gap-2 text-[0.8125rem] text-ink-faint">
                <Icon name="lock" className="size-4" />
                About two minutes. Your answers are not stored.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className={cn(card, "overflow-hidden")}>
              {/* Progress */}
              <div className="border-b border-forest-900/[0.08] px-6 pt-6 pb-5 sm:px-8">
                <div className="flex items-center justify-between text-[0.8125rem]">
                  <span className="font-semibold text-forest-900">
                    {done ? "Your HomePath™ result" : `Question ${step} of ${TOTAL}`}
                  </span>
                  <span className="text-ink-faint">
                    {done ? "Complete" : current.short}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-8 gap-1.5" aria-hidden="true">
                  {steps.map((s, index) => (
                    <span
                      key={s.short}
                      className={cn(
                        "h-1.5 rounded-full transition-colors duration-300",
                        index + 1 < step || done
                          ? "bg-forest-700"
                          : index + 1 === step
                            ? "bg-gold-500"
                            : "bg-forest-900/10",
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="px-6 py-7 sm:px-8 sm:py-8">
                {!done ? (
                  <div key={step} className="animate-fade-in">
                    <h3 className="font-display text-[1.5rem] leading-snug tracking-[-0.01em] text-forest-900 sm:text-[1.75rem]">
                      {current.question}
                    </h3>
                    <p className="mt-2 text-[0.9375rem] text-ink-soft">{current.help}</p>

                    <div className={cn("mt-6 grid gap-3", current.columns)}>
                      {current.options.map((option) => {
                        const selected = isSelected(data, option);
                        return (
                          <button
                            key={option.label}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => {
                              setData({ ...data, ...option.patch });
                              nextStep();
                            }}
                            className={cn(
                              "group flex items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-[border-color,background-color,box-shadow] duration-200",
                              selected
                                ? "border-forest-700 bg-forest-50 shadow-[0_0_0_1px_var(--color-forest-700)]"
                                : "border-forest-900/15 bg-ivory hover:border-forest-900/35 hover:bg-white",
                            )}
                          >
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-0.5 flex size-[1.125rem] shrink-0 items-center justify-center rounded-full border transition-colors",
                                selected
                                  ? "border-forest-700 bg-forest-700 text-ivory"
                                  : "border-forest-900/25 group-hover:border-forest-900/45",
                              )}
                            >
                              {selected ? <Icon name="check" className="size-3" strokeWidth={3} /> : null}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                <span className="text-[0.9375rem] leading-snug font-semibold text-forest-900">
                                  {option.label}
                                </span>
                                {option.meta ? (
                                  <span className="text-[0.875rem] font-semibold text-gold-700 tnum">
                                    {option.meta}
                                  </span>
                                ) : null}
                              </span>
                              {option.note ? (
                                <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-faint">
                                  {option.note}
                                </span>
                              ) : null}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-forest-900/[0.08] pt-6">
                      {step > 1 ? (
                        <Button variant="outline" size="md" onClick={prevStep}>
                          <Icon name="arrow-left" className="size-4" strokeWidth={2} />
                          Back
                        </Button>
                      ) : (
                        <span />
                      )}
                      <Button variant="dark" size="md" arrow onClick={nextStep}>
                        {step === TOTAL ? "See my HomePath™" : "Next"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-fade-in space-y-7">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="eyebrow text-gold-700">Personal assessment</p>
                        <h3 className="font-display mt-2 text-[1.75rem] leading-tight text-forest-900 sm:text-[2rem]">
                          Your Anchor HomePath™
                        </h3>
                        <p className="mt-1.5 text-[0.9375rem] text-ink-soft">
                          {data.incomeType} · {data.location}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-4 rounded-2xl bg-forest-900 px-5 py-4 text-paper">
                        <div>
                          <p className="text-[0.75rem] font-medium text-paper/60">
                            Projected AnchorScore™
                          </p>
                          <p className="figure-num mt-0.5 text-[2rem] leading-none text-gold-300">
                            {estimatedAnchorScore}
                          </p>
                        </div>
                        <Pill tone={scoreBand.tone}>{scoreBand.label}</Pill>
                      </div>
                    </div>

                    <dl className="grid gap-px overflow-hidden rounded-2xl bg-forest-900/10 ring-1 ring-forest-900/10 sm:grid-cols-2">
                      {[
                        {
                          label: "Target property",
                          value: naira(targetPrice),
                          note: data.desiredProperty,
                        },
                        {
                          label: "Current housing capacity",
                          value: naira(housingCapacity),
                          note: "Savings plus 36 months of contributions",
                        },
                        {
                          label: "Monthly contribution",
                          value: naira(data.monthlyContribution),
                          note: `${(data.monthlyContribution / 5000).toLocaleString()} ownership slots a month`,
                        },
                        {
                          label: "Deposit readiness",
                          value: monthsToDeposit === 0 ? "Ready now" : `${monthsToDeposit} months`,
                          note: `To the 25% equity threshold of ${naira(depositRequired)}`,
                        },
                      ].map((metric) => (
                        <div key={metric.label} className="bg-ivory p-5">
                          <dt className="text-[0.8125rem] font-medium text-ink-faint">{metric.label}</dt>
                          <dd>
                            <p className="figure-num mt-1.5 text-[1.5rem] leading-tight text-forest-900">
                              {metric.value}
                            </p>
                            <p className="mt-1 text-[0.8125rem] leading-snug text-ink-faint">
                              {metric.note}
                            </p>
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="relative overflow-hidden rounded-2xl bg-forest-950 p-6 text-paper sm:p-7">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_0%,rgb(217_190_114/0.14),transparent_60%)]"
                      />
                      <div className="relative">
                        <p className="eyebrow text-gold-400">Recommended pathway</p>
                        <p className="font-display mt-3 text-[1.625rem] leading-tight">
                          {pathwayName}
                        </p>
                        {pathwayDetail ? (
                          <p className="mt-1 text-[0.9375rem] text-gold-300">
                            {pathwayDetail.replace(/\)$/, "")}
                          </p>
                        ) : null}
                        <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-paper/75">
                          {pathwayReason}
                        </p>
                        <p className="mt-4 text-[0.8125rem] text-paper/55">
                          Alternative: {alternativePathway}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-forest-900/[0.08] pt-6 xs:flex-row">
                      <Link
                        href={`/join?pathway=${encodeURIComponent(recommendedPathway)}&slots=${Math.max(100, Math.round(data.savings / 5000))}`}
                        className={buttonClass("primary", "md")}
                      >
                        Start my HomePath™
                        <Icon name="arrow-right" className="size-4" strokeWidth={2} />
                      </Link>
                      <Button variant="outline" size="md" onClick={() => setStep(1)}>
                        Recalculate
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
