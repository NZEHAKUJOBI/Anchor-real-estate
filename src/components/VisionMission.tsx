import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Icon, type IconName } from "./ui/Icons";
import { Pill } from "./ui/primitives";
import { mission, values, vision } from "@/lib/content";

const statements: { heading: string; body: string; icon: IconName }[] = [
  { ...vision, icon: "eye" },
  { ...mission, icon: "target" },
];

export function VisionMission() {
  return (
    <section id="vision" className="bg-paper-alt py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            layout="split"
            eyebrow="Vision & values"
            title="What the Society stands for"
            lead="The statements below were drafted at the strategic meeting of 15 August 2026 and are recorded here as proposed. They carry no force until the Board formally adopts them."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-5 md:grid-cols-2">
            {statements.map((statement) => (
              <article
                key={statement.heading}
                className="relative flex flex-col overflow-hidden rounded-3xl border border-forest-900/10 bg-ivory p-7 shadow-card sm:p-9"
              >
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -top-8 right-6 text-[10rem] leading-none text-gold-400/20"
                >
                  &ldquo;
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-forest-900 text-gold-300">
                    <Icon name={statement.icon} className="size-5" />
                  </span>
                  <h3 className="eyebrow text-gold-700">{statement.heading}</h3>
                </div>
                <p className="font-display relative mt-7 text-[1.3125rem] leading-[1.55] text-pretty text-forest-900 sm:text-[1.5rem]">
                  {statement.body}
                </p>
                <div className="mt-auto pt-8">
                  <Pill tone="gold" icon="clock">
                    Proposed — pending Board ratification
                  </Pill>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-16 md:mt-20">
            <div className="flex items-center gap-4">
              <h3 className="font-display text-[1.75rem] leading-tight text-forest-900">Core values</h3>
              <span aria-hidden="true" className="h-px flex-1 bg-forest-900/10" />
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <li
                  key={value.title}
                  className="group rounded-2xl border border-forest-900/10 bg-ivory/70 p-6 transition-colors duration-300 hover:bg-ivory"
                >
                  <span className="figure-num text-[1.5rem] leading-none text-gold-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="mt-4 text-[1.0625rem] leading-snug font-semibold text-forest-900">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{value.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
