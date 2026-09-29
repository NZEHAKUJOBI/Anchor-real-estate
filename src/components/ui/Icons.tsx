/**
 * Interface icons for the public site. One 24-unit box, one stroke weight and
 * round joins, so every mark reads as part of the same drawn set as the
 * service icons.
 */
const paths = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-left": <path d="M19 12H5M11 6l-6 6 6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  "chevron-right": <path d="m9 6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.3 2.8 2.8L16 9.9" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  phone: (
    <path d="M5.5 4h3l1.8 4.5-2.3 1.4a10.5 10.5 0 0 0 6.1 6.1l1.4-2.3 4.5 1.8v3a2 2 0 0 1-2.1 2A16 16 0 0 1 3.5 6.1 2 2 0 0 1 5.5 4Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-6.1-7-11.4A7 7 0 0 1 19 9.6C19 14.9 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 19 6v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  landmark: (
    <path d="M3 9.5 12 4l9 5.5M4 21h16M5 18h14M6.5 10.5V18M10 10.5V18M14 10.5V18M17.5 10.5V18" />
  ),
  home: <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5M10 20v-5h4v5" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m10.8 12.2 8.2-8.2M16 7l2.5 2.5M13.5 9.5 15.5 11.5" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" />
    </>
  ),
  trending: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
  gauge: (
    <>
      <path d="M4.5 17a8 8 0 1 1 15 0" />
      <path d="m12 15.5 3.5-5" />
      <circle cx="12" cy="16" r="1.3" />
    </>
  ),
  dna: (
    <path d="M8 3c0 5 8 4.5 8 9s-8 4-8 9M16 3c0 5-8 4.5-8 9s8 4 8 9M9 6.5h6M9 17.5h6M10.2 12h3.6" />
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5M16 4.6a3.5 3.5 0 0 1 0 6.8M18 13.8c2.1.7 3.5 3 3.5 5.7" />
    </>
  ),
  gavel: (
    <>
      <rect x="11" y="2.5" width="6" height="10" rx="1" transform="rotate(45 14 7.5)" />
      <path d="M11.2 11.8 4 19M12 21h8" />
    </>
  ),
  package: (
    <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9ZM3.5 7.5 12 12l8.5-4.5M12 12v9M7.8 5.2l8.5 4.6" />
  ),
  exchange: <path d="M4 8h15l-3.5-3.5M20 16H5l3.5 3.5" />,
  chart: <path d="M5 20v-8M11 20V5M17 20v-5M3 20h18" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  idcard: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2.2" />
      <path d="M5.8 16c.5-1.5 1.7-2.4 3.2-2.4s2.7.9 3.2 2.4M15 10h3.5M15 13.5h3.5" />
    </>
  ),
  layers: <path d="M12 3.5 21 8l-9 4.5L3 8l9-4.5ZM3 12.5l9 4.5 9-4.5M3 16.5l9 4.5 9-4.5" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.3" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  ),
  "user-plus": (
    <>
      <circle cx="9" cy="8" r="3.8" />
      <path d="M2.5 20.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5M19 8v6M16 11h6" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
    </>
  ),
  leaf: <path d="M5 19C5 11 10 5.5 19.5 5 19 14.5 13.5 19 5 19ZM5 19l7.5-7.5" />,
  access: (
    <>
      <circle cx="12" cy="4.8" r="1.8" />
      <path d="m5 8.5 7 1.5 7-1.5M12 10v4.2M12 14.2 8.8 20.5M12 14.2l3.2 6.3" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 7.8v.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  building: (
    <path d="M4.5 21V5.5L12 3.5V21M12 8.5h7.5V21M3 21h18M7.5 8.5h1.5M7.5 12h1.5M7.5 15.5h1.5M15 12h1.5M15 15.5h1.5" />
  ),
  file: (
    <path d="M14 3H6.5v18h11V6.5L14 3ZM14 3v3.5h3.5M9 12h6M9 15.5h6" />
  ),
  scale: (
    <path d="M12 4v16M8 20h8M5 7h14M5 7l-3 6.2a3.2 3.2 0 0 0 6 0L5 7ZM19 7l-3 6.2a3.2 3.2 0 0 0 6 0L19 7Z" />
  ),
  hardhat: <path d="M3.5 18h17M5.5 18v-2.5a6.5 6.5 0 0 1 13 0V18M10 9.2V6h4v3.2" />,
  map: (
    <path d="M9 4 3.5 6.3v13.5L9 17.5l6 2.5 5.5-2.3V4.2L15 6.5 9 4ZM9 4v13.5M15 6.5V20" />
  ),
  star: (
    <path d="m12 3.8 2.5 5.1 5.6.8-4 4 1 5.6L12 16.7l-5.1 2.6 1-5.6-4-4 5.6-.8L12 3.8Z" />
  ),
  zap: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />,
  sparkle: (
    <path d="M12 3.5c.6 4 2.5 6 6.5 6.5-4 .6-5.9 2.5-6.5 6.5-.6-4-2.5-5.9-6.5-6.5 4-.5 5.9-2.5 6.5-6.5ZM18.5 15.5c.3 1.6 1 2.3 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.2 2.2-.9 2.5-2.5Z" />
  ),
  quote: (
    <path d="M9.5 7C6.5 8 4.5 10.5 4.5 14v3.5H10V12H7.3c.3-1.6 1.2-2.7 2.8-3.4L9.5 7ZM18.5 7c-3 1-5 3.5-5 7v3.5H19V12h-2.7c.3-1.6 1.2-2.7 2.8-3.4L18.5 7Z" />
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.7,
  title,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
