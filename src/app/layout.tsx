import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";

/*
  Source Serif carries the display voice — with its optical-size axis, so large
  headlines get the finer display cut — Inter the running text and interface,
  and Plex Mono the ledger references in the admin area.
*/
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "A member-owned multipurpose cooperative society limited in Abuja, FCT. Ownership slots of ₦5,000, a ₦5 billion mobilisation target, and member capital deployed across housing, tourism, warehousing and financial inclusion.";

export const metadata: Metadata = {
  metadataBase: new URL("https://anchorrealestategroup.ng"),
  title: {
    default: "Anchor Real Estate Group — Multipurpose Cooperative Society Limited",
    template: "%s · Anchor Real Estate Group",
  },
  description,
  applicationName: "Anchor Real Estate Group",
  keywords: [
    "cooperative society limited Abuja",
    "real estate cooperative Nigeria",
    "multipurpose cooperative FCT",
    "property ownership Abuja",
    "rent to own Abuja",
    "Anchor Real Estate Group",
  ],
  authors: [{ name: "Anchor Real Estate Group" }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Anchor Real Estate Group",
    title: "Anchor Real Estate Group — Multipurpose Cooperative Society Limited",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Anchor Real Estate Group — Multipurpose Cooperative Society Limited",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#071f17",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-NG"
      data-scroll-behavior="smooth"
      className={`${sourceSerif.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Scroll reveals start transparent; without JS they must not stay so. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
