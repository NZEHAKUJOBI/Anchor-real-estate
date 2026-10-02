import Link from "next/link";
import { BrandLockup } from "./BrandLockup";
import { ButtonLink } from "./ui/Button";
import { Icon } from "./ui/Icons";
import {
  bankers,
  email,
  offices,
  phones,
  siteNav,
  society,
  sourceNote,
  type NavLink,
} from "@/lib/content";

function menuItems(key: string): NavLink[] {
  const menu = siteNav.find((item) => item.type === "menu" && item.key === key);
  return menu && menu.type === "menu" ? menu.items : [];
}

const columns: { title: string; links: NavLink[] }[] = [
  {
    title: "Get started",
    links: [
      { id: "homepath", label: "HomePath™ assessment" },
      { id: "pathways", label: "Ownership pathways" },
      { id: "join", label: "How to join" },
    ],
  },
  { title: "Platform", links: menuItems("platform") },
  { title: "The Society", links: menuItems("about") },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_0%_0%,rgb(43_115_88/0.3),transparent_70%)]"
      />
      <div aria-hidden="true" className="h-px w-full bg-linear-to-r from-transparent via-gold-400/50 to-transparent" />

      <div className="shell relative pt-16 pb-10 md:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <BrandLockup href="/" size="lg" />
            <p className="font-display mt-7 max-w-xs text-[1.1875rem] leading-relaxed text-paper/70 italic">
              “{society.tagline}”
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/join/register" size="md" arrow>
                Become a member
              </ButtonLink>
              <ButtonLink href="/dashboard" size="md" variant="inverse">
                My Anchor
              </ButtonLink>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8 lg:pl-8">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-gold-400 uppercase">
                  {column.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={`/#${link.id}`}
                        className="text-[0.9375rem] text-paper/70 transition-colors duration-200 hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.label} className="flex gap-4">
              <Icon name="map-pin" className="mt-0.5 size-5 shrink-0 text-gold-400" />
              <div>
                <h2 className="text-[0.875rem] font-semibold text-paper">{office.label}</h2>
                <address className="mt-2 text-[0.9375rem] leading-relaxed text-paper/65 not-italic">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
            </div>
          ))}

          <div className="flex gap-4">
            <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-gold-400" />
            <div>
              <h2 className="text-[0.875rem] font-semibold text-paper">Contact</h2>
              <div className="mt-2 space-y-1">
                {phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="block text-[0.9375rem] text-paper/65 tnum transition-colors duration-200 hover:text-gold-300"
                  >
                    {phone}
                  </a>
                ))}
                <a
                  href={`mailto:${email.address}`}
                  className="block pt-1 text-[0.9375rem] break-all text-paper/65 transition-colors duration-200 hover:text-gold-300"
                >
                  {email.address}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 sm:flex-row sm:items-center">
          <h2 className="text-[0.8125rem] font-semibold tracking-[0.08em] text-paper/55 uppercase">Bankers</h2>
          <ul className="flex flex-col gap-x-6 gap-y-1.5 sm:flex-row sm:flex-wrap">
            {bankers.map((bank) => (
              <li key={bank.short} className="text-[0.9375rem] text-paper/75">
                {bank.name} <span className="text-paper/45">({bank.short})</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-[0.8125rem] leading-relaxed text-paper/50">{sourceNote}</p>
          <div className="mt-6 flex flex-col gap-3 text-[0.8125rem] text-paper/50 md:flex-row md:items-center md:justify-between">
            <p>
              © {society.established} {society.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              <Icon name="shield" className="size-4 text-gold-400/80" />
              {society.tier} · {society.bylaws} · {society.location}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
