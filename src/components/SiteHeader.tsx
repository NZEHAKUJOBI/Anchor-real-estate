"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrandLockup } from "./BrandLockup";
import { ButtonLink } from "./ui/Button";
import { cn } from "./ui/cn";
import { Icon, type IconName } from "./ui/Icons";
import { IconTile } from "./ui/primitives";
import { email, phones, siteNav, society, type NavMenu } from "@/lib/content";

const ICONS: Record<string, IconName> = {
  anchorscore: "gauge",
  "property-dna": "dna",
  "pool-visualizer": "grid",
  circles: "users",
  marketplace: "gavel",
  bulkbuy: "package",
  exchange: "exchange",
  "at-a-glance": "chart",
  vision: "eye",
  governance: "landmark",
  membership: "idcard",
  services: "layers",
  outlook: "target",
};

const MENU_CTA: Record<string, { label: string; id: string }> = {
  platform: { label: "Take the HomePath™ assessment", id: "homepath" },
  about: { label: "How to join the Society", id: "join" },
};

/** Section id → the top-level entry that owns it, for the active marker. */
const OWNER: Record<string, string> = Object.fromEntries(
  siteNav.flatMap((item) =>
    item.type === "link"
      ? [[item.id, item.id]]
      : item.items.map((sub) => [sub.id, item.key]),
  ),
);

/**
 * Same-page hash links stay plain anchors so they scroll smoothly in place;
 * from any other route they become `/#id` links that navigate home first.
 */
function SectionLink({
  id,
  onHome,
  className,
  onClick,
  current,
  children,
}: {
  id: string;
  onHome: boolean;
  className?: string;
  onClick?: () => void;
  current?: boolean;
  children: ReactNode;
}) {
  const shared = {
    className,
    onClick,
    "aria-current": current ? ("true" as const) : undefined,
  };
  return onHome ? (
    <a href={`#${id}`} {...shared}>
      {children}
    </a>
  ) : (
    <Link href={`/#${id}`} {...shared}>
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [active, setActive] = useState("");

  const closeTimer = useRef<number | undefined>(undefined);
  const hoverOpened = useRef(false);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});

  // Condense once the page moves: the utility bar slides away, the bar fills.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section holds the middle of the viewport.
  useEffect(() => {
    if (!onHome) return;
    const ids = ["top", ...Object.keys(OWNER)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) setActive(OWNER[hit.target.id] ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHome]);

  // An open dropdown closes on Escape (returning focus) or an outside press.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      triggers.current[openMenu]?.focus();
      setOpenMenu(null);
    };
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      const owner = triggers.current[openMenu]?.closest("li");
      if (owner && !owner.contains(target)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  // The mobile sheet owns the viewport while open.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const mq = window.matchMedia("(min-width: 64rem)");
    const onWide = () => mq.matches && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onWide);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onWide);
    };
  }, [mobileOpen]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };
  const hoverOpen = (key: string) => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    cancelClose();
    if (openMenu !== key) hoverOpened.current = true;
    setOpenMenu(key);
  };
  const toggle = (key: string) => {
    cancelClose();
    // A click on a menu the pointer already opened pins it instead of closing.
    if (openMenu === key && !hoverOpened.current) {
      setOpenMenu(null);
      return;
    }
    hoverOpened.current = false;
    setOpenMenu(key);
  };
  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const solid = !onHome || scrolled || mobileOpen || openMenu !== null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[translate] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        scrolled && !mobileOpen && "lg:-translate-y-10",
      )}
    >
      {/* Utility bar — registration and contact, the first things a cautious
          member checks. Slides away once the page scrolls. */}
      <div className="hidden h-10 border-b border-white/[0.07] bg-forest-950 text-paper/65 lg:block">
        <div className="shell flex h-full items-center justify-between gap-6 text-[0.8125rem]">
          <p className="flex items-center gap-2">
            <Icon name="shield" className="size-4 text-gold-400" />
            <span>
              Registered {society.tier} · {society.bylaws}
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${phones[0].replace(/\s/g, "")}`}
              className="flex items-center gap-2 tnum transition-colors hover:text-paper"
            >
              <Icon name="phone" className="size-3.5" />
              {phones[0]}
            </a>
            <a
              href={`mailto:${email.address}`}
              className="hidden items-center gap-2 transition-colors hover:text-paper xl:flex"
            >
              <Icon name="mail" className="size-3.5" />
              {email.address}
            </a>
            <span aria-hidden="true" className="h-4 w-px bg-white/15" />
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-medium text-gold-300 transition-colors hover:text-gold-200"
            >
              <Icon name="user" className="size-4" />
              My Anchor
            </Link>
          </div>
        </div>
      </div>

      {/* Main bar. Dropdown panels are positioned against this box. */}
      <div
        className={cn(
          "relative border-b transition-[background-color,border-color,box-shadow] duration-300",
          solid
            ? "border-white/[0.08] bg-forest-950/95 shadow-[0_12px_32px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="shell flex h-16 items-center justify-between gap-4 lg:h-18">
          <BrandLockup href={onHome ? "#top" : "/"} eager onClick={closeAll} />

          <nav aria-label="Primary" className="hidden self-stretch lg:block">
            <ul className="flex h-full items-stretch">
              {siteNav.map((item) => {
                if (item.type === "link") {
                  const current = active === item.id;
                  return (
                    <li key={item.id} className="flex items-center">
                      <SectionLink
                        id={item.id}
                        onHome={onHome}
                        current={current}
                        onClick={closeAll}
                        className={cn(
                          "relative rounded-full px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-200 xl:px-4 xl:text-[0.9375rem]",
                          current ? "text-gold-300" : "text-paper/80 hover:text-paper",
                        )}
                      >
                        {item.label}
                        <ActiveBar on={current} />
                      </SectionLink>
                    </li>
                  );
                }

                const open = openMenu === item.key;
                const current = active === item.key;
                return (
                  <li
                    key={item.key}
                    className="flex items-center"
                    onMouseEnter={() => hoverOpen(item.key)}
                    onMouseLeave={scheduleClose}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                        setOpenMenu((value) => (value === item.key ? null : value));
                      }
                    }}
                  >
                    <button
                      ref={(node) => {
                        triggers.current[item.key] = node;
                      }}
                      type="button"
                      aria-expanded={open}
                      aria-controls={`menu-${item.key}`}
                      onClick={() => toggle(item.key)}
                      className={cn(
                        "relative flex items-center gap-1 rounded-full px-2.5 py-2 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-200 xl:px-4 xl:text-[0.9375rem]",
                        open
                          ? "bg-white/[0.08] text-paper"
                          : current
                            ? "text-gold-300"
                            : "text-paper/80 hover:text-paper",
                      )}
                    >
                      {item.label}
                      <Icon
                        name="chevron-down"
                        className={cn(
                          "size-4 opacity-70 transition-transform duration-200",
                          open && "rotate-180",
                        )}
                        strokeWidth={2}
                      />
                      <ActiveBar on={current && !open} />
                    </button>

                    <MegaPanel
                      menu={item}
                      open={open}
                      onHome={onHome}
                      onNavigate={closeAll}
                    />
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink
              href="/join/register"
              size="sm"
              className="max-sm:hidden lg:h-10 lg:px-4 lg:text-[0.875rem] xl:px-5"
            >
              Become a member
              {/* The arrow returns once the bar has room for it. */}
              <Icon name="arrow-right" className="size-4 lg:hidden xl:block" strokeWidth={2} />
            </ButtonLink>

            <button
              type="button"
              onClick={() => {
                setOpenMenu(null);
                setMobileOpen((value) => !value);
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              className="-mr-2 flex size-11 items-center justify-center rounded-full text-paper transition-colors hover:bg-white/[0.08] lg:hidden"
            >
              <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
              <Icon name={mobileOpen ? "close" : "menu"} className="size-6" strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      {/* Compact navigation — a full-height sheet below the bar. */}
      <div id="mobile-nav" hidden={!mobileOpen}>
        <div className="fixed inset-x-0 top-16 bottom-0 overflow-y-auto overscroll-contain border-t border-white/[0.08] bg-forest-950 lg:hidden">
          <nav aria-label="Primary (compact)" className="shell animate-fade-in pt-4 pb-10">
            <ul className="divide-y divide-white/[0.08]">
              {siteNav.map((item) =>
                item.type === "link" ? (
                  <li key={item.id}>
                    <SectionLink
                      id={item.id}
                      onHome={onHome}
                      onClick={closeAll}
                      className="flex items-center justify-between py-4 text-[1.0625rem] font-medium text-paper"
                    >
                      {item.label}
                      <Icon name="arrow-right" className="size-4 text-gold-400" />
                    </SectionLink>
                  </li>
                ) : (
                  <li key={item.key}>
                    <details className="group/details">
                      <summary className="flex list-none items-center justify-between py-4 text-[1.0625rem] font-medium text-paper [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <Icon
                          name="chevron-down"
                          className="size-5 text-gold-400 transition-transform duration-200 group-open/details:rotate-180"
                        />
                      </summary>
                      <ul className="grid gap-1 pb-4 sm:grid-cols-2">
                        {item.items.map((sub) => (
                          <li key={sub.id}>
                            <SectionLink
                              id={sub.id}
                              onHome={onHome}
                              onClick={closeAll}
                              className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.05]"
                            >
                              <IconTile name={ICONS[sub.id] ?? "info"} tone="dark" size="sm" />
                              <span>
                                <span className="block text-[0.9375rem] font-medium text-paper">
                                  {sub.label}
                                </span>
                                <span className="mt-0.5 block text-[0.8125rem] leading-snug text-paper/55">
                                  {sub.description}
                                </span>
                              </span>
                            </SectionLink>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ),
              )}
            </ul>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/join/register" size="lg" arrow onClick={closeAll}>
                Become a member
              </ButtonLink>
              <ButtonLink href="/dashboard" size="lg" variant="inverse" onClick={closeAll}>
                <Icon name="user" className="size-4" />
                My Anchor
              </ButtonLink>
            </div>

            <div className="mt-10 space-y-3 border-t border-white/[0.08] pt-6 text-[0.875rem] text-paper/65">
              {phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 tnum"
                >
                  <Icon name="phone" className="size-4 text-gold-400" />
                  {phone}
                </a>
              ))}
              <a href={`mailto:${email.address}`} className="flex items-center gap-3 break-all">
                <Icon name="mail" className="size-4 text-gold-400" />
                {email.address}
              </a>
              <p className="flex items-center gap-3 pt-2 text-paper/50">
                <Icon name="shield" className="size-4 text-gold-400" />
                {society.tier} · {society.bylaws}
              </p>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

function ActiveBar({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gold-400 transition-[width,opacity] duration-300",
        on ? "w-5 opacity-100" : "w-0 opacity-0",
      )}
    />
  );
}

function MegaPanel({
  menu,
  open,
  onHome,
  onNavigate,
}: {
  menu: NavMenu;
  open: boolean;
  onHome: boolean;
  onNavigate: () => void;
}) {
  const cta = MENU_CTA[menu.key];
  return (
    // Positioned against the main bar, not the list item, so the panel spans
    // the page gutter; it stays in the item's DOM for tab order and hover.
    <div id={`menu-${menu.key}`} hidden={!open} className="absolute inset-x-0 top-full">
      <div className="shell pt-2.5">
        <div className="grid animate-dropdown grid-cols-12 overflow-hidden rounded-2xl bg-ivory shadow-panel ring-1 ring-black/5">
          <div className="col-span-4 flex flex-col bg-paper-alt/70 p-7 xl:p-8">
            <p className="eyebrow text-gold-700">{menu.label}</p>
            <p className="font-display mt-3 text-[1.625rem] leading-tight tracking-[-0.015em] text-forest-900">
              {menu.title}
            </p>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              {menu.summary}
            </p>
            {cta ? (
              <SectionLink
                id={cta.id}
                onHome={onHome}
                onClick={onNavigate}
                className="group/cta mt-auto inline-flex items-center gap-2 pt-8 text-[0.875rem] font-semibold text-forest-700 hover:text-forest-900"
              >
                {cta.label}
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                  strokeWidth={2}
                />
              </SectionLink>
            ) : null}
          </div>

          <ul className="col-span-8 grid grid-cols-2 content-start gap-1 p-3 xl:p-4">
            {menu.items.map((sub) => (
              <li key={sub.id}>
                <SectionLink
                  id={sub.id}
                  onHome={onHome}
                  onClick={onNavigate}
                  className="group/item flex items-start gap-3.5 rounded-xl p-3.5 transition-colors hover:bg-forest-900/[0.045]"
                >
                  <IconTile
                    name={ICONS[sub.id] ?? "info"}
                    size="sm"
                    className="transition-colors group-hover/item:bg-forest-700 group-hover/item:text-gold-300"
                  />
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-forest-900">
                      {sub.label}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-faint">
                      {sub.description}
                    </span>
                  </span>
                </SectionLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
