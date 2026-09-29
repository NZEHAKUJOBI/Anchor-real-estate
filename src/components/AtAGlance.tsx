import { Reveal } from "./Reveal";
import { Accent, SectionHeading } from "./SectionHeading";
import { glanceFigures, headlineFigure } from "@/lib/content";

export function AtAGlance() {
  return (
    <section id="at-a-glance" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            layout="split"
            eyebrow="The Society at a glance"
            title={
              <>
                A large target, reached in <Accent>small, equal parts.</Accent>
              </>
            }
            lead="The Society's mobilization is deliberately granular: a large target reached through small, equally priced units, so that a founding cohort of two hundred can hold it between them without any one member dominating."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="relative flex min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl bg-forest-950 p-7 text-paper sm:p-9 lg:col-span-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(100%_80%_at_100%_0%,rgb(217_190_114/0.18),transparent_60%)]"
              />
              <p className="eyebrow relative text-gold-400">{headlineFigure.label}</p>
              <div className="relative">
                <p className="figure-num text-[4rem] leading-none text-gold-300 sm:text-[4.75rem]">
                  {headlineFigure.value}
                </p>
                <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-paper/65">
                  {headlineFigure.note}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-forest-900/10 ring-1 ring-forest-900/10 sm:grid-cols-3 lg:col-span-8">
              {glanceFigures.map((figure) => (
                <div key={figure.label} className="flex flex-col-reverse justify-end bg-ivory p-5 sm:p-7">
                  <dt className="mt-3 text-[0.875rem] leading-snug text-ink-faint">{figure.label}</dt>
                  <dd className="figure-num text-[1.5rem] leading-none text-forest-900 sm:text-[2rem]">
                    {figure.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
