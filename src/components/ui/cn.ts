/** Joins class names, dropping falsy entries. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Naira, whole units, in the en-NG grouping — ₦1,250,000. */
export function naira(value: number) {
  return `₦${Math.round(value).toLocaleString("en-NG")}`;
}

/** Custom-property style for a `.range` input's filled track. */
export function rangeFill(value: number, min: number, max: number) {
  const pct = max === min ? 0 : ((value - min) / (max - min)) * 100;
  return { "--fill": `${Math.min(100, Math.max(0, pct))}%` } as React.CSSProperties;
}
