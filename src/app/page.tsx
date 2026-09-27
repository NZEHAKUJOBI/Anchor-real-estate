import { AtAGlance } from "@/components/AtAGlance";
import { Governance } from "@/components/Governance";
import { Hero } from "@/components/Hero";
import { HowToJoin } from "@/components/HowToJoin";
import { Membership } from "@/components/Membership";
import { Responsibility } from "@/components/Responsibility";
import { Services } from "@/components/Services";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TargetMarket } from "@/components/TargetMarket";
import { VisionMission } from "@/components/VisionMission";
import { HomePathCalculator } from "@/components/homepath/HomePathCalculator";
import { OwnershipPathways } from "@/components/pathways/OwnershipPathways";
import { AnchorScoreSection } from "@/components/anchorscore/AnchorScoreSection";
import { PropertyDnaSection } from "@/components/property-dna/PropertyDnaSection";
import { SlotPoolVisualizer } from "@/components/pool/SlotPoolVisualizer";
import { OwnershipCircles } from "@/components/circles/OwnershipCircles";
import { DeveloperMarketplace } from "@/components/marketplace/DeveloperMarketplace";
import { BulkBuySection } from "@/components/bulkbuy/BulkBuySection";
import { PropertyExchangeSection } from "@/components/exchange/PropertyExchangeSection";
import { email, phones, society } from "@/lib/content";

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: society.name,
  alternateName: `${society.name} ${society.kind}`,
  slogan: "The Housing & Wealth Operating System",
  foundingDate: society.established,
  address: {
    "@type": "PostalAddress",
    streetAddress: "124 Sherifat Adenusi Crescent, ACO Estate, Life Camp",
    addressLocality: "Abuja",
    addressRegion: "Federal Capital Territory",
    addressCountry: "NG",
  },
  telephone: phones[0].replace(/\s/g, ""),
  email: email.address,
  identifier: society.bylaws,
};

export default function Home() {
  return (
    <>
      <a
        href="#homepath"
        className="label sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-forest-950"
      >
        Skip to content
      </a>

      <SiteHeader />

      <main className="flex-1">
        {/* Pillar 15: Transformed Homepage & Stage Selectors */}
        <Hero />

        {/* Pillar 01: "Can I Own a Home?" 8-Question Engine */}
        <HomePathCalculator />

        {/* Pillar 07: The Four Distinct Ownership Pathways (START, OWN, LIVE, GROW) */}
        <OwnershipPathways />

        {/* Pillars 02 & 08: AnchorScore™ & The Unmortgageable Nigerian Engine */}
        <AnchorScoreSection />

        {/* Pillars 04, 13 & 14: Property DNA™, GreenHome™ & InclusiveHome™ Standards */}
        <PropertyDnaSection />

        {/* Pillar 05: Transparent 1,000,000 Slot Pool Visualizer */}
        <SlotPoolVisualizer />

        {/* Pillar 09: Ownership Circles (Collaborative Syndication) */}
        <OwnershipCircles />

        {/* Pillars 10 & 11: Developer Marketplace & Reverse Property Bidding */}
        <DeveloperMarketplace />

        {/* Pillar 12: Anchor BulkBuy™ Cooperative Ecosystem */}
        <BulkBuySection />

        {/* Pillar 06: Anchor Property Exchange Secondary Liquidity */}
        <PropertyExchangeSection />

        {/* Core Institutional Society Sections */}
        <AtAGlance />
        <VisionMission />
        <Governance />
        <Membership />
        <Services />
        <TargetMarket />
        <Responsibility />
        <HowToJoin />
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
    </>
  );
}
