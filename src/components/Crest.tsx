/**
 * Society crest — a double ring enclosing a rooftop chevron over an anchor.
 * Drawn as stroked geometry so it stays crisp at masthead and footer sizes.
 */
export function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Anchor Real Estate Group crest"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    >
      {/* Outer and inner rings */}
      <circle cx="50" cy="50" r="46.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="0.7" opacity="0.65" />

      {/* Rooftop */}
      <path d="M32 26.5 L50 15.5 L68 26.5" stroke="currentColor" strokeWidth="1.9" />

      {/* Anchor: ring, shank, stock, crown */}
      <circle cx="50" cy="35.5" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M50 39.2 V 70.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M38.5 46 H 61.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M35 59 C 35 69.5 41.5 75 50 75 C 58.5 75 65 69.5 65 59"
        stroke="currentColor"
        strokeWidth="1.9"
      />
      <path d="M35 59 L 30.5 55.5 M65 59 L 69.5 55.5" stroke="currentColor" strokeWidth="1.6" />

      {/* Flanking pips */}
      <circle cx="22.5" cy="50" r="1.5" fill="currentColor" />
      <circle cx="77.5" cy="50" r="1.5" fill="currentColor" />
    </svg>
  );
}
