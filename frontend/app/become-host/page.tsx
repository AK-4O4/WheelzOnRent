// =============================================================================
// app/become-host/page.tsx
// /become-host route — composed from focused section components.
// All data is in data/placeholders/become-host.placeholders.ts
// All sections are in components/become-host/
// =============================================================================
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BecomeHostHero } from "@/components/become-host/BecomeHostHero";
import { PerksGrid } from "@/components/become-host/PerksGrid";
import { EarningsEstimator } from "@/components/become-host/EarningsEstimator";
import { HowItWorksHost } from "@/components/become-host/HowItWorksHost";
import { HostFAQ } from "@/components/become-host/HostFAQ";
import { HostCTA } from "@/components/become-host/HostCTA";

export const metadata = {
  title: "Become a Host – Ceepii",
  description:
    "Turn your parked car into a source of income. List on Ceepii and earn in PKR — free to join, insured every trip.",
};

export default function BecomeHostPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <BecomeHostHero />
      <PerksGrid />
      <EarningsEstimator />
      <HowItWorksHost />
      <HostFAQ />
      <HostCTA />
      <Footer />
    </div>
  );
}
