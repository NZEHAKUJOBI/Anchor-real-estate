import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { cn } from "./ui/cn";
import { Icon } from "./ui/Icons";
import {
  boardOfTrustees,
  executive,
  executiveSecond,
  executiveThird,
  governanceNote,
  type Office,
} from "@/lib/content";

const LINE = "bg-forest-900/15";

/** Initials without honorifics — "Dr. Adeoye Adegboye" → "AA". */
function initials(name: string) {
  return name
    .replace(/^(dr\.?|tpl|prof\.?|engr\.?|arc\.?|mr\.?|mrs\.?|ms\.?)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function OfficeCard({ office, holder, vacant, lead }: Office & { lead?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full items-center gap-4 rounded-2xl p-4 sm:p-5",
        vacant
          ? "border border-dashed border-forest-900/25"
          : lead
            ? "bg-forest-950 text-paper shadow-lift"
            : "border border-forest-900/10 bg-ivory shadow-card",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-display flex size-12 shrink-0 items-center justify-center rounded-full text-[1.0625rem]",
          vacant
            ? "border border-dashed border-forest-900/25 text-ink-faint"
            : lead
              ? "bg-gold-400 text-forest-950"
              : "bg-forest-700/10 text-forest-800",
        )}
      >
        {vacant ? <Icon name="user" className="size-5" /> : initials(holder)}
      </span>
      <div className="min-w-0">
        <p
          className={cn(
            "text-[0.75rem] font-semibold tracking-[0.08em] uppercase",
            vacant ? "text-ink-faint" : lead ? "text-gold-400" : "text-gold-700",
          )}
        >
          {office}
        </p>
        <p
          className={cn(
            "font-display mt-1 text-[1.125rem] leading-snug",
            vacant ? "text-ink-faint italic" : lead ? "text-paper" : "text-forest-900",
          )}
        >
          {holder}
        </p>
      </div>
    </div>
  );
}

/** Vertical drop from a single box down to the bus below. */
function Drop() {
  return (
    <div aria-hidden="true" className="flex h-7 justify-center">
      <span className={`block w-px ${LINE}`} />
    </div>
  );
}

/** Horizontal bus spanning the centres of three columns, with three drops. */
function Bus() {
  return (
    <div aria-hidden="true" className="relative h-7">
      <span className={`absolute top-0 right-[16.666%] left-[16.666%] h-px ${LINE}`} />
      <div className="grid h-full grid-cols-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className={`mx-auto block w-px ${LINE}`} />
        ))}
      </div>
    </div>
  );
}

export function Governance() {
  const stacked = [...executive, ...executiveSecond, ...executiveThird];

  return (
    <section id="governance" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHeading
            layout="split"
            eyebrow="Governance & leadership"
            title="Accountable people, on the record."
            lead="A cooperative is only as sound as the people accountable for it. The executive committee below is the structure of record as at 20 August 2026; two offices are not yet filled, and are shown as such."
          />
        </Reveal>

        <Reveal delay={80}>
          {/* Full chart — from the medium breakpoint up. */}
          <div className="hidden md:block">
            <div className="mx-auto max-w-sm">
              <OfficeCard {...executive[0]} lead />
            </div>
            <Drop />
            <Bus />
            <div className="grid grid-cols-3 gap-5">
              {executiveSecond.map((person) => (
                <OfficeCard key={person.office} {...person} />
              ))}
            </div>
            <Drop />
            <Bus />
            <div className="grid grid-cols-3 gap-5">
              {executiveThird.map((person) => (
                <OfficeCard key={person.office} {...person} />
              ))}
            </div>
          </div>

          {/* Compact list — a single spine instead of a chart. */}
          <ol className="space-y-3 border-l border-forest-900/15 pl-5 md:hidden">
            {stacked.map((person, index) => (
              <li key={person.office} className="relative">
                <span aria-hidden="true" className={`absolute top-1/2 -left-5 h-px w-3.5 ${LINE}`} />
                <OfficeCard {...person} lead={index === 0} />
              </li>
            ))}
          </ol>

          <p className="mt-6 flex items-center gap-2 text-[0.8125rem] text-ink-faint">
            <Icon name="info" className="size-4" />
            {governanceNote}
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative mt-14 overflow-hidden rounded-3xl bg-forest-950 p-7 text-paper sm:p-10 lg:p-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(70%_90%_at_0%_0%,rgb(43_115_88/0.45),transparent_60%)]"
            />
            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/25 ring-inset">
                  <Icon name="landmark" className="size-6" />
                </span>
                <h3 className="font-display mt-5 text-[1.75rem] leading-tight">{boardOfTrustees.title}</h3>
              </div>
              <div className="lg:col-span-8">
                <p className="font-display text-[1.25rem] leading-[1.55] text-pretty text-paper/90 sm:text-[1.5rem]">
                  {boardOfTrustees.body}
                </p>
                <p className="mt-6 flex items-center gap-2 text-[0.875rem] text-paper/60">
                  <Icon name="clock" className="size-4 text-gold-400" />
                  {boardOfTrustees.tenure}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
