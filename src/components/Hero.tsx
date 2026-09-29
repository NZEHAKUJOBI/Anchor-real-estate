import { Crest } from "./Crest";
import { ButtonAnchor } from "./ui/Button";
import { cn } from "./ui/cn";
import { Icon, type IconName } from "./ui/Icons";
import { bankers, society } from "@/lib/content";

const credentials = [
  { label: "Registration", value: society.bylaws },
  { label: "Classification", value: society.tier },
  { label: "Established", value: `${society.established} · Abuja, FCT` },
];

const stages: {
  id: string;
  product: string;
  title: string;
  body: string;
  icon: IconName;
}[] = [
  {
    id: "start",
    product: "Anchor START™",
    title: "I want to start saving",
    body: "From ₦10,000 a month into ₦5,000 slots",
    icon: "coins",
  },
  {
    id: "own",
    product: "Anchor OWN™",
    title: "I'm ready to buy",
    body: "Deposit plus cooperative financing",
    icon: "key",
  },
  {
    id: "live",
    product: "Anchor LIVE™",
    title: "I want rent-to-own",
    body: "Convert lease payments into equity",
    icon: "home",
  },
  {
    id: "grow",
    product: "Anchor GROW™",
    title: "I want to grow wealth",
    body: "High-yield cooperative asset pooling",
    icon: "trending",
  },
];

function FloatingFigure({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute rounded-2xl border border-white/10 bg-forest-900/75 px-4 py-3 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.8)] backdrop-blur-md",
        className,
      )}
    >
      <p className="figure-num text-[1.375rem] leading-none text-gold-300">{value}</p>
      <p className="mt-1.5 text-[0.75rem] font-medium whitespace-nowrap text-paper/65">
        {label}
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-forest-950 text-paper">
      {/* Ground: forest glow from the upper left, warmth behind the seal, and
          fine ledger rules fading out toward the edges. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(110%_80%_at_8%_-5%,rgb(43_115_88/0.5),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(45%_45%_at_80%_42%,rgb(217_190_114/0.13),transparent_70%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgb(217 190 114 / 0.055) 1px, transparent 1px)",
            backgroundSize: "96px 100%",
            maskImage: "radial-gradient(90% 70% at 50% 30%, black, transparent 85%)",
            WebkitMaskImage: "radial-gradient(90% 70% at 50% 30%, black, transparent 85%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-gold-400/40 to-transparent" />
      </div>

      <div className="shell pt-28 pb-16 sm:pt-32 lg:pt-44 lg:pb-20">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-400/25 bg-white/[0.04] py-1.5 pr-4 pl-2.5 text-[0.75rem] font-semibold tracking-[0.12em] text-gold-300 uppercase">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold-400 opacity-50" />
                <span className="relative inline-flex size-2 rounded-full bg-gold-400" />
              </span>
              The housing &amp; wealth operating system
            </p>

            <h1 className="font-display mt-7 text-[2.625rem] leading-[1.02] font-normal tracking-[-0.03em] text-balance sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
              Your income shouldn&apos;t decide whether you can{" "}
              <em className="text-gold-300 italic">own a home.</em>
            </h1>

            <p className="mt-7 max-w-xl text-[1.125rem] leading-[1.6] text-pretty text-paper/85 sm:text-[1.25rem]">
              Anchor turns what you can afford today into a structured pathway to
              what you can own tomorrow.
            </p>
            <p className="mt-4 max-w-xl text-[1rem] leading-[1.7] text-pretty text-paper/60">
              You don&apos;t need to be wealthy, formally salaried or mortgage-ready to
              begin. Whether you are a market trader, artisan, consultant or corporate
              worker, Anchor builds your housing capacity progressively.
            </p>

            <div className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center">
              <ButtonAnchor href="#homepath" size="lg" arrow>
                Check my HomePath™
              </ButtonAnchor>
              <ButtonAnchor href="#pathways" size="lg" variant="inverse">
                Explore ownership pathways
              </ButtonAnchor>
            </div>

            <dl className="mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-5 border-t border-white/10 pt-7 xs:grid-cols-3">
              {credentials.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.75rem] font-medium tracking-[0.06em] text-paper/50 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] font-medium text-paper/90">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[26rem]">
              <div aria-hidden="true" className="absolute inset-0 rounded-full border border-gold-400/10" />
              <div aria-hidden="true" className="absolute inset-[9%] rounded-full border border-gold-400/15" />
              <div aria-hidden="true" className="absolute inset-[18%] rounded-full border border-dashed border-gold-400/20" />
              <div aria-hidden="true" className="absolute inset-[24%] rounded-full bg-gold-400/10 blur-3xl" />

              <div className="absolute inset-[22%] flex items-center justify-center">
                <Crest
                  size={240}
                  eager
                  className="size-full rounded-full shadow-[0_0_0_1px_rgb(217_190_114/0.35),0_30px_60px_-20px_rgb(0_0_0/0.8)]"
                />
              </div>

              <FloatingFigure value="₦5,000" label="Price per ownership slot" className="top-[6%] -left-1 sm:left-0" />
              <FloatingFigure value="1,000,000" label="Slots in the pool" className="right-0 bottom-[20%] sm:-right-2" />
              <FloatingFigure value="₦5.0bn" label="Mobilisation target" className="bottom-[2%] left-[6%]" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.8125rem] text-paper/55">
              <span className="font-medium tracking-[0.06em] uppercase">Bankers</span>
              {bankers.map((bank) => (
                <span
                  key={bank.short}
                  title={bank.name}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-semibold text-paper/80"
                >
                  {bank.short}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Where the visitor stands today — each routes to its pathway. */}
        <div className="mt-16 lg:mt-20">
          <div className="flex items-end justify-between gap-4">
            <h2 className="eyebrow text-gold-400">Choose where you are today</h2>
            <a
              href="#homepath"
              className="hidden items-center gap-1.5 text-[0.875rem] font-medium text-paper/65 transition-colors hover:text-paper sm:inline-flex"
            >
              Not sure? Take the assessment
              <Icon name="arrow-right" className="size-4" />
            </a>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage, index) => (
              <li key={stage.id}>
                <a
                  href={`#pathway-${stage.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold-400/45 hover:bg-white/[0.06]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300 ring-1 ring-gold-400/20 ring-inset">
                      <Icon name={stage.icon} className="size-5" />
                    </span>
                    <span className="text-[0.75rem] font-semibold tracking-[0.1em] text-paper/40 tnum">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-5 text-[0.75rem] font-semibold tracking-[0.1em] text-gold-400 uppercase">
                    {stage.product}
                  </p>
                  <p className="font-display mt-1.5 text-[1.3125rem] leading-snug text-paper">
                    {stage.title}
                  </p>
                  <p className="mt-1.5 text-[0.875rem] leading-snug text-paper/60">{stage.body}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[0.8125rem] font-semibold text-gold-300">
                    See the pathway
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
