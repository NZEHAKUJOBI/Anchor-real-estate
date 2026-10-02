import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Icon, type IconName } from "@/components/ui/Icons";
import { REGISTRATION_FEE_KOBO } from "@/lib/constants";
import { registrationSociety } from "@/lib/content";
import { formatNaira } from "@/lib/money";
import { ContactCard } from "../ContactCard";
import { RegistrationForm } from "./RegistrationForm";

export const metadata: Metadata = {
  title: "Membership Registration Form",
  description: `Apply for membership of ${registrationSociety.name} ${registrationSociety.descriptor}. Complete the membership registration form online with a passport photograph, next of kin and bank details.`,
};

const facts: { icon: IconName; label: string; value: string }[] = [
  {
    icon: "idcard",
    label: "Registration fee",
    value: `${formatNaira(REGISTRATION_FEE_KOBO)}, non-refundable`,
  },
  { icon: "user", label: "You will need", value: "A passport photograph" },
  { icon: "clock", label: "Takes about", value: "10 minutes" },
];

const checklist = [
  "A recent passport photograph, on your phone or computer",
  "Your office address and department",
  "Your next of kin's name, address and phone number",
  "The monthly amount to be deducted from your salary",
  "Your bank name and 10-digit account number",
];

export default function RegisterPage() {
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
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-paper">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron-right" className="size-3.5" />
              </li>
              <li>
                <Link href="/join" className="transition-colors hover:text-paper">
                  Join
                </Link>
              </li>
              <li aria-hidden="true">
                <Icon name="chevron-right" className="size-3.5" />
              </li>
              <li aria-current="page" className="text-paper/85">
                Membership registration
              </li>
            </ol>
          </nav>

          <h1 className="font-display mt-6 max-w-3xl text-[2.375rem] leading-[1.05] tracking-[-0.025em] text-balance sm:text-[3.25rem]">
            Apply for <em className="text-gold-300 italic">membership</em>
          </h1>
          <p className="mt-5 max-w-2xl text-[1.0625rem] leading-[1.7] text-pretty text-paper/70">
            This is the Society&rsquo;s membership registration form, to fill in online. Once you
            submit it, the Secretariat reviews it and contacts you.
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
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-forest-900/10 bg-ivory p-6 shadow-card sm:p-10">
                <RegistrationForm />
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-5 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-forest-900/10 bg-paper-alt/60 p-6 sm:p-7">
                  <h2 className="eyebrow flex items-center gap-3 text-gold-700">
                    <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
                    Before you start
                  </h2>
                  <ul className="mt-5 space-y-3.5">
                    {checklist.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-ink-soft">
                        <Icon name="check-circle" className="mt-px size-5 shrink-0 text-forest-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-forest-900/10 bg-ivory p-6 sm:p-7">
                  <h2 className="text-[1rem] font-semibold text-forest-900">Not ready to apply?</h2>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    Register your interest instead. It takes a minute and commits you to nothing.
                  </p>
                  <Link
                    href="/join"
                    className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-forest-900 underline decoration-forest-900/25 underline-offset-4 transition-colors hover:decoration-forest-900"
                  >
                    Register interest
                    <Icon name="arrow-right" className="size-4" strokeWidth={2} />
                  </Link>
                </div>

                <ContactCard />
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
