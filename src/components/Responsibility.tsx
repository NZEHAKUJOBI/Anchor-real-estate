import { Reveal } from "./Reveal";
import { Icon } from "./ui/Icons";
import { responsibility } from "@/lib/content";

export function Responsibility() {
  return (
    <section id="responsibility" className="bg-paper py-20 md:py-24">
      <div className="shell">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 rounded-3xl border border-forest-900/10 bg-ivory p-7 shadow-card sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
            <div className="lg:col-span-4">
              <span className="flex size-13 items-center justify-center rounded-2xl bg-clay-50 text-clay-600 ring-1 ring-clay-400/25 ring-inset">
                <Icon name="heart" className="size-6" />
              </span>
              <p className="eyebrow mt-6 flex items-center gap-3 text-gold-700">
                <span aria-hidden="true" className="h-px w-7 bg-current opacity-70" />
                Social impact
              </p>
              <h2 className="font-display mt-4 text-[1.875rem] leading-[1.15] tracking-[-0.015em] text-forest-900 sm:text-[2.25rem]">
                Corporate social responsibility
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p className="font-display text-[1.5rem] leading-[1.45] text-pretty text-forest-800 sm:text-[1.75rem]">
                {responsibility.lead}
              </p>
              <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.7] text-pretty text-ink-soft">
                {responsibility.body}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
