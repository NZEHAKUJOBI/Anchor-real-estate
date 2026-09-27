"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
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

const propertyOptions = [
  { id: "plot", name: "Serviced Residential Plot", price: 8000000, desc: "Titled land banking in developing FCT corridors" },
  { id: "starter", name: "1-Bed Urban Starter", price: 18000000, desc: "Compact modern studio/apartment for young professionals" },
  { id: "2bed", name: "2-Bed Smart Apartment", price: 28000000, desc: "Energy-efficient 2-bedroom home in planned community" },
  { id: "3bed", name: "3-Bed Family Terrace", price: 48000000, desc: "Multi-level family residence with solar standard" },
  { id: "villa", name: "4-Bed Detached Villa", price: 85000000, desc: "Executive home with private grounds & smart amenities" },
];

export function HomePathCalculator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    age: "30-39",
    location: "Lugbe / Airport Road",
    monthlyIncome: 650000,
    incomeType: "Trader / Small Business Owner",
    savings: 2500000,
    monthlyContribution: 180000,
    desiredProperty: "2-Bed Smart Apartment",
    propertyPrice: 28000000,
    timeline: 36,
  });

  const nextStep = () => setStep((s) => Math.min(s + 1, 9));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Calculations for HomePath Engine
  const targetPrice = data.propertyPrice;
  const depositRequired = targetPrice * 0.25; // 25% equity threshold
  const savingsGap = Math.max(0, depositRequired - data.savings);
  const monthsToDeposit = data.monthlyContribution > 0 ? Math.ceil(savingsGap / data.monthlyContribution) : 0;
  
  // Housing capacity estimate: (Savings * 1.5) + (Monthly Contribution * 48 months) + Cooperative Credit Multiplier
  const housingCapacity = Math.round(data.savings + (data.monthlyContribution * 36) * 1.35);

  // Recommended Pathway logic
  let recommendedPathway = "Anchor START™ (Save-to-Own + Cooperative Credit)";
  let pathwayReason = "Build your initial equity progressively while earning cooperative dividends on your contributions.";
  let alternativePathway = "Anchor LIVE™ (Rent-to-Own)";

  if (data.savings >= depositRequired) {
    recommendedPathway = "Anchor OWN™ (Deposit + Cooperative Financing)";
    pathwayReason = "You have met the required equity deposit. You are eligible for immediate plot/unit allocation and developer co-financing.";
    alternativePathway = "Anchor GROW™ (Cooperative Slot Wealth)";
  } else if (data.monthlyIncome >= 800000 && monthsToDeposit <= 18) {
    recommendedPathway = "Anchor LIVE™ (Rent-to-Own Pathway)";
    pathwayReason = "Move in sooner by converting your monthly rental payments directly into homeownership equity.";
    alternativePathway = "Anchor START™ (Save-to-Own)";
  }

  // Estimated AnchorScore preview
  const estimatedAnchorScore = Math.min(820, Math.max(620, Math.round(
    600 + (data.savings > 2000000 ? 50 : 20) + (data.monthlyContribution > 100000 ? 60 : 30) + (data.incomeType.includes("Trader") || data.incomeType.includes("Freelancer") ? 45 : 55)
  )));

  const formatNaira = (val: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(val).replace("NGN", "₦");
  };

  return (
    <div id="homepath" className="relative bg-forest-900 text-paper py-20 border-y border-gold-500/30">
      <div className="shell">
        <div className="max-w-3xl mb-12">
          <p className="label text-gold-400">Anchor Proprietary Engine</p>
          <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-paper">
            Can I Own a Home?
          </h2>
          <p className="mt-4 text-paper/75 text-lg">
            Answer 8 short questions to determine your housing capacity, estimated deposit readiness timeline, and tailored ownership pathway.
          </p>
        </div>

        <div className="bg-forest-950/80 border border-gold-400/25 rounded-sm p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs label text-gold-400 mb-2">
              <span>{step <= 8 ? `Question ${step} of 8` : "Your HomePath™ Assessment"}</span>
              <span>{step <= 8 ? `${Math.round((step / 8) * 100)}% Complete` : "Ready"}</span>
            </div>
            <div className="h-1.5 w-full bg-forest-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gold-400 transition-all duration-300"
                style={{ width: `${Math.min(100, (step / 8) * 100)}%` }}
              />
            </div>
          </div>

          {/* Form Step Carousel */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">1. What is your age bracket?</h3>
              <p className="text-paper/70 text-sm">This helps calculate your eligible financing tenure and cooperative horizon.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {["18–29 years", "30–39 years", "40–49 years", "50+ years"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setData({ ...data, age: opt }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.age === opt ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">2. Where do you reside or wish to acquire?</h3>
              <p className="text-paper/70 text-sm">Anchor matches developments across prime and emerging FCT corridors.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  "Lugbe / Airport Road Corridor",
                  "Kuje / Gwagwalada Hub",
                  "Life Camp / Kado / Gwarinpa",
                  "Abuja Central (Maitama / Wuse / Guzape)",
                  "Kubwa / Bwari District",
                  "Nigerian Diaspora (Overseas)",
                ].map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => { setData({ ...data, location: loc }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.location === loc ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">3. What is your estimated monthly income?</h3>
              <p className="text-paper/70 text-sm">Include average monthly take-home, business profits, or seasonal inflows.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: "₦150,000 – ₦350,000", val: 250000 },
                  { label: "₦350,000 – ₦800,000", val: 550000 },
                  { label: "₦800,000 – ₦1,800,000", val: 1200000 },
                  { label: "₦1,800,000 – ₦4,000,000", val: 2500000 },
                  { label: "₦4,000,000+", val: 5000000 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setData({ ...data, monthlyIncome: item.val }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.monthlyIncome === item.val ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">4. What is your income type?</h3>
              <p className="text-paper/70 text-sm">Anchor specializes in informal and non-traditional earners without conventional corporate payslips.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { type: "Trader / Small Business Owner", note: "Market merchant, shop owner, distributor" },
                  { type: "Consultant / Tech / Freelancer", note: "Contract income, independent professional" },
                  { type: "Artisan / Transport Operator", note: "Ride-hailing driver, builder, technician" },
                  { type: "Corporate / Civil Servant", note: "Formal employer salary with payslip" },
                  { type: "Diaspora Professional", note: "Earning in FX sending remittances home" },
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => { setData({ ...data, incomeType: item.type }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.incomeType === item.type ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    <div className="font-medium text-paper">{item.type}</div>
                    <div className="text-xs text-paper/60 mt-1">{item.note}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">5. How much existing liquid savings can you commit?</h3>
              <p className="text-paper/70 text-sm">Capital available right now for initial slot holding or deposit allocation.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: "Under ₦500,000", val: 300000 },
                  { label: "₦500,000 – ₦2,000,000", val: 1200000 },
                  { label: "₦2,000,000 – ₦6,000,000", val: 3500000 },
                  { label: "₦6,000,000 – ₦15,000,000", val: 9000000 },
                  { label: "₦15,000,000+", val: 20000000 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setData({ ...data, savings: item.val }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.savings === item.val ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">6. What monthly contribution can you comfortably afford?</h3>
              <p className="text-paper/70 text-sm">Regular cooperative savings that purchase ownership slots each month.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { label: "₦50,000 / mo", val: 50000 },
                  { label: "₦100,000 / mo", val: 100000 },
                  { label: "₦180,000 / mo", val: 180000 },
                  { label: "₦300,000 / mo", val: 300000 },
                  { label: "₦500,000 / mo", val: 500000 },
                  { label: "₦1,000,000+ / mo", val: 1000000 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setData({ ...data, monthlyContribution: item.val }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.monthlyContribution === item.val ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">7. Which property type matches your ambition?</h3>
              <p className="text-paper/70 text-sm">Select your desired target property type to benchmark your readiness.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {propertyOptions.map((prop) => (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => {
                      setData({ ...data, desiredProperty: prop.name, propertyPrice: prop.price });
                      nextStep();
                    }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.desiredProperty === prop.name ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium text-paper">{prop.name}</span>
                      <span className="label-sm text-gold-400">{formatNaira(prop.price)}</span>
                    </div>
                    <p className="text-xs text-paper/60 mt-1">{prop.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <h3 className="font-display text-2xl text-gold-300">8. What is your preferred ownership horizon?</h3>
              <p className="text-paper/70 text-sm">When do you want the keys or deed handed over?</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  { label: "12–18 Months", val: 18 },
                  { label: "2–3 Years", val: 36 },
                  { label: "3–5 Years", val: 48 },
                  { label: "5+ Years", val: 60 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setData({ ...data, timeline: item.val }); nextStep(); }}
                    className={`p-4 border text-left rounded-sm transition-all ${
                      data.timeline === item.val ? "border-gold-400 bg-gold-400/10 text-gold-300 font-semibold" : "border-paper/15 text-paper/80 hover:border-gold-400/50"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: RESULTS CALCULATION */}
          {step === 9 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="border-b border-gold-400/30 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="label text-gold-400">Personal Assessment Result</span>
                  <h3 className="font-display text-3xl text-paper mt-1">Your Anchor HomePath™</h3>
                  <p className="text-sm text-paper/70 mt-1">
                    Structured pathway for {data.incomeType} in {data.location}
                  </p>
                </div>
                <div className="bg-forest-900 border border-gold-400/40 px-5 py-3 rounded-sm flex items-center gap-4">
                  <div>
                    <span className="label-sm text-gold-400 block">Projected AnchorScore™</span>
                    <span className="font-display text-2xl text-paper">{estimatedAnchorScore}</span>
                  </div>
                  <span className="label-sm px-2.5 py-1 bg-forest-700 text-gold-300 rounded border border-gold-400/30">
                    Finance Ready
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-forest-900/90 border border-paper/10 p-5 rounded-sm">
                  <span className="label-sm text-paper/60">Target Property</span>
                  <p className="font-display text-xl text-gold-300 mt-2">{formatNaira(targetPrice)}</p>
                  <p className="text-xs text-paper/70 mt-1">{data.desiredProperty}</p>
                </div>

                <div className="bg-forest-900/90 border border-paper/10 p-5 rounded-sm">
                  <span className="label-sm text-paper/60">Current Housing Capacity</span>
                  <p className="font-display text-xl text-gold-300 mt-2">{formatNaira(housingCapacity)}</p>
                  <p className="text-xs text-paper/70 mt-1">Savings + 36mo contribution multiplier</p>
                </div>

                <div className="bg-forest-900/90 border border-paper/10 p-5 rounded-sm">
                  <span className="label-sm text-paper/60">Suggested Monthly Contribution</span>
                  <p className="font-display text-xl text-gold-300 mt-2">{formatNaira(data.monthlyContribution)}</p>
                  <p className="text-xs text-paper/70 mt-1">{(data.monthlyContribution / 5000).toLocaleString()} slots/mo</p>
                </div>

                <div className="bg-forest-900/90 border border-paper/10 p-5 rounded-sm">
                  <span className="label-sm text-paper/60">Estimated Deposit Readiness</span>
                  <p className="font-display text-xl text-gold-300 mt-2">{monthsToDeposit} Months</p>
                  <p className="text-xs text-paper/70 mt-1">To reach 25% equity threshold ({formatNaira(depositRequired)})</p>
                </div>
              </div>

              {/* Recommended Pathway */}
              <div className="bg-forest-900 border-l-4 border-gold-400 p-6 rounded-r-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="label text-gold-400">Recommended Pathway</span>
                  <span className="text-xs text-paper/60">Alternative: {alternativePathway}</span>
                </div>
                <h4 className="font-display text-2xl text-paper">{recommendedPathway}</h4>
                <p className="text-sm text-paper/80 leading-relaxed">{pathwayReason}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gold-400/20">
                <Link
                  href={`/join?pathway=${encodeURIComponent(recommendedPathway)}&slots=${Math.max(100, Math.round(data.savings / 5000))}`}
                  className="w-full sm:w-auto label bg-gold-400 px-8 py-4 text-forest-950 text-center hover:bg-gold-300 transition-colors"
                >
                  Start My HomePath™
                </Link>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto label border border-paper/30 px-6 py-4 text-paper hover:bg-paper/5 transition-colors"
                >
                  Recalculate Assessment
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step <= 8 && (
            <div className="mt-8 pt-6 border-t border-gold-400/20 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="label-sm border border-paper/20 px-5 py-2.5 text-paper/80 hover:text-paper hover:border-paper/50 transition-colors"
                >
                  ← Back
                </button>
              ) : <div />}
              <button
                type="button"
                onClick={nextStep}
                className="label-sm bg-gold-400 text-forest-950 px-6 py-2.5 hover:bg-gold-300 transition-colors"
              >
                {step === 8 ? "Compute My HomePath™ →" : "Next →"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
