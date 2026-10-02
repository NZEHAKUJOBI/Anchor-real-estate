import Link from "next/link";
import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icons";
import { email, joinCaveat, joinSteps, phones } from "@/lib/content";

export function HowToJoin() {
  return (
    <section id="join" className="bg-paper-alt py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            layout="split"
            eyebrow="How to join"
            title={
              <>
                From interest to <Accent>membership.</Accent>
              </>
            }
            lead="Four steps, in order. The Society is at the point of constituting its founding cohort of two hundred members."
          />
        </Reveal>

        <Reveal delay={80}>
          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {/* Connecting rule behind the step markers on wide screens. */}
            <span
              aria-hidden="true"
              className="absolute top-[2.75rem] right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-gold-500/60 via-gold-500/30 to-gold-500/60 lg:block"
            />
            {joinSteps.map((step, index) => (
              <li key={step.title} className="relative rounded-3xl border border-forest-900/10 bg-ivory p-6 lg:text-center">
                <span className="figure-num relative flex size-11 items-center justify-center rounded-full bg-forest-900 text-[1.125rem] text-gold-300 ring-4 ring-paper-alt lg:mx-auto">
                  {index + 1}
                </span>
                <h3 className="mt-5 text-[1.0625rem] leading-snug font-semibold text-forest-900">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-6 flex max-w-3xl items-start gap-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            <Icon name="info" className="mt-0.5 size-5 shrink-0 text-gold-700" />
            <span>
              {joinCaveat}{" "}
              <Link
                href="/join"
                className="font-medium text-forest-900 underline underline-offset-4 hover:text-forest-700"
              >
                Register interest
              </Link>
            </span>
          </p>
        </Reveal>

        <Reveal delay={180}>
          <div className="relative mt-14 overflow-hidden rounded-[2rem] bg-forest-950 text-paper">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(70%_100%_at_0%_0%,rgb(43_115_88/0.55),transparent_60%),radial-gradient(50%_80%_at_100%_100%,rgb(217_190_114/0.14),transparent_70%)]"
            />
            <div className="relative grid grid-cols-1 gap-10 p-7 sm:p-12 lg:grid-cols-12 lg:items-center lg:gap-12 lg:p-14">
              <div className="lg:col-span-7">
                <p className="eyebrow text-gold-400">Founding cohort now forming</p>
                <h3 className="font-display mt-4 text-[2rem] leading-[1.1] tracking-[-0.02em] text-balance sm:text-[2.75rem]">
                  Complete the membership registration form
                </h3>
                <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-paper/70">
                  Fill it in online in about ten minutes. Have a passport photograph, your next of
                  kin&rsquo;s details and your bank account number to hand.
                </p>
                <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                  <ButtonLink href="/join/register" size="lg" arrow>
                    Apply for membership
                  </ButtonLink>
                  <ButtonLink href="/dashboard" size="lg" variant="inverse">
                    Explore My Anchor
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5">
                <dl className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <dt className="flex items-center gap-2 text-[0.8125rem] font-medium text-paper/55">
                      <Icon name="phone" className="size-4 text-gold-400" />
                      Telephone
                    </dt>
                    <dd className="mt-2 space-y-1">
                      {phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block text-[1.0625rem] font-medium text-paper tnum transition-colors hover:text-gold-300"
                        >
                          {phone}
                        </a>
                      ))}
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <dt className="flex items-center gap-2 text-[0.8125rem] font-medium text-paper/55">
                      <Icon name="mail" className="size-4 text-gold-400" />
                      Email
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={`mailto:${email.address}`}
                        className="block text-[1.0625rem] font-medium break-all text-paper transition-colors hover:text-gold-300"
                      >
                        {email.address}
                      </a>
                      {email.provisional ? (
                        <span className="mt-1 block text-[0.8125rem] text-paper/55">Interim address</span>
                      ) : null}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
