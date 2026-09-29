import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Icon, type IconName } from "@/components/ui/Icons";
import { email, joinSteps, offices, phones } from "@/lib/content";
import { EnquiryForm } from "./EnquiryForm";

export const metadata: Metadata = {
  title: "Register Your Interest",
  description:
    "Register your interest in membership of Anchor Real Estate Group, a multipurpose cooperative society limited in Abuja. Ownership slots of ₦5,000, from 100 to 10,000 per member.",
};

const facts: { icon: IconName; label: string; value: string }[] = [
  { icon: "idcard", label: "Registration fee", value: "₦20,000 one-time" },
  { icon: "grid", label: "Holding band", value: "100 – 10,000 slots" },
  { icon: "lock", label: "Today", value: "No payment taken" },
];

export default function JoinPage() {
  return (
    <>
      <SiteHeader />

      <header className="relative isolate overflow-hidden bg-forest-950 text-paper">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_10%_0%,rgb(43_115_88/0.5),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold-400/40 to-transparent" />
        </div>

        <div className="shell pt-28 pb-14 md:pt-40 md:pb-16">
          <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-paper/55">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-paper">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron-right" className="size-3.5" />
              </li>
              <li aria-current="page" className="text-paper/85">
                Register interest
              </li>
            </ol>
          </nav>

          <h1 className="font-display mt-6 max-w-3xl text-[2.375rem] leading-[1.05] tracking-[-0.025em] text-balance sm:text-[3.25rem]">
            Register your interest in <em className="text-gold-300 italic">membership</em>
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-pretty text-paper/70">
            The Society is constituting a founding cohort of two hundred members. Tell us how to
            reach you and what kind of membership suits you, and the Secretariat will take it from
            there.
          </p>

          <dl className="mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                <Icon name={fact.icon} className="size-5 shrink-0 text-gold-400" />
                <div>
                  <dt className="text-[0.75rem] font-medium text-paper/55">{fact.label}</dt>
                  <dd className="text-[0.9375rem] font-semibold text-paper">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <main id="main" className="flex-1 bg-paper py-14 md:py-20">
        <div className="shell">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-forest-900/10 bg-ivory p-6 shadow-card sm:p-9">
                <EnquiryForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-5 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-forest-900/10 bg-paper-alt/60 p-6 sm:p-7">
                  <h2 className="eyebrow flex items-center gap-3 text-gold-700">
                    <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
                    What happens next
                  </h2>
                  <ol className="mt-6 space-y-6">
                    {joinSteps.map((step, index) => (
                      <li key={step.title} className="flex gap-4">
                        <span className="figure-num flex size-9 shrink-0 items-center justify-center rounded-full bg-forest-900 text-[1rem] text-gold-300">
                          {index + 1}
                        </span>
                        <span>
                          <span className="block text-[1rem] leading-snug font-semibold text-forest-900">
                            {step.title}
                          </span>
                          <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-soft">
                            {step.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="rounded-3xl bg-forest-950 p-6 text-paper sm:p-7">
                  <h3 className="text-[1rem] font-semibold">Prefer to speak to someone?</h3>
                  <div className="mt-4 space-y-2.5">
                    {phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-[0.9375rem] text-paper/85 tnum transition-colors hover:text-gold-300"
                      >
                        <Icon name="phone" className="size-4 text-gold-400" />
                        {phone}
                      </a>
                    ))}
                    <a
                      href={`mailto:${email.address}`}
                      className="flex items-center gap-3 text-[0.9375rem] break-all text-paper/85 transition-colors hover:text-gold-300"
                    >
                      <Icon name="mail" className="size-4 shrink-0 text-gold-400" />
                      {email.address}
                    </a>
                  </div>
                  <p className="mt-5 flex gap-3 border-t border-white/10 pt-5 text-[0.875rem] leading-relaxed text-paper/60">
                    <Icon name="map-pin" className="mt-0.5 size-4 shrink-0 text-gold-400" />
                    {offices[0].lines.join(", ")}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
