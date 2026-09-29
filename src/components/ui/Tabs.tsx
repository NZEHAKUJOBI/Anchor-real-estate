"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "./cn";

export type TabItem<T extends string> = { id: T; label: string };

/**
 * Tab list following the WAI-ARIA tabs pattern: roving tabindex, arrow keys
 * move and select, Home/End jump. Panels are rendered by the caller with
 * `tabPanelProps`, so each section keeps control of its own layout.
 */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  idBase,
  label,
  variant = "pill",
  tone = "light",
  className,
}: {
  tabs: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  idBase: string;
  label: string;
  variant?: "pill" | "underline";
  tone?: "light" | "dark";
  className?: string;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const dark = tone === "dark";

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = -1;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next === -1) return;
    event.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(
        variant === "pill"
          ? cn(
              "inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 no-scrollbar",
              dark ? "bg-white/[0.06] ring-1 ring-white/10" : "bg-forest-900/[0.06]",
            )
          : cn(
              "flex max-w-full gap-6 overflow-x-auto border-b no-scrollbar sm:gap-8",
              dark ? "border-white/10" : "border-forest-900/10",
            ),
        className,
      )}
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="tab"
            id={`${idBase}-tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`${idBase}-panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "shrink-0 text-[0.875rem] font-semibold whitespace-nowrap transition-colors duration-200",
              variant === "pill"
                ? cn(
                    "rounded-full px-4 py-2",
                    selected
                      ? dark
                        ? "bg-gold-400 text-forest-950"
                        : "bg-ivory text-forest-900 shadow-[0_1px_3px_rgb(7_31_23/0.12)]"
                      : dark
                        ? "text-paper/65 hover:text-paper"
                        : "text-ink-soft hover:text-forest-900",
                  )
                : cn(
                    "-mb-px border-b-2 pt-1 pb-3.5",
                    selected
                      ? dark
                        ? "border-gold-400 text-gold-300"
                        : "border-forest-700 text-forest-900"
                      : dark
                        ? "border-transparent text-paper/60 hover:text-paper"
                        : "border-transparent text-ink-faint hover:text-forest-900",
                  ),
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export function tabPanelProps(idBase: string, id: string) {
  return {
    role: "tabpanel" as const,
    id: `${idBase}-panel-${id}`,
    "aria-labelledby": `${idBase}-tab-${id}`,
    tabIndex: 0,
  };
}
