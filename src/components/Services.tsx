import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ServiceIcon } from "./ServiceIcons";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="services" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            layout="split"
            eyebrow="Products & services"
            title="Multipurpose by design."
            lead="The Society is multipurpose by design. Member capital is not confined to residential housing — it is deployed across eight lines, so that no single market cycle determines the whole portfolio."
          />
        </Reveal>

        <Reveal delay={80}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li
                key={service.title}
                className="group relative flex flex-col rounded-3xl border border-forest-900/10 bg-ivory p-6 transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-forest-900/20 hover:shadow-lift"
              >
                <div className="flex items-start justify-between">
                  <span className="flex size-13 items-center justify-center rounded-2xl bg-forest-900 text-gold-300 transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-forest-950">
                    <ServiceIcon name={service.icon} className="size-7" />
                  </span>
                  <span className="text-[0.8125rem] font-semibold text-ink-faint/70 tnum">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.0625rem] leading-snug font-semibold text-forest-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{service.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
