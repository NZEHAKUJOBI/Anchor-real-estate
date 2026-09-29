import { Metadata } from "next";
import { MemberDashboard } from "@/components/dashboard/MemberDashboard";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "My Anchor — Personal Wealth Dashboard",
  description: "Personal wealth and homeownership operating dashboard for Anchor Real Estate Group members.",
};

export default function DashboardPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="min-h-screen flex-1 bg-paper">
        <MemberDashboard />
      </main>
      <SiteFooter />
    </>
  );
}
