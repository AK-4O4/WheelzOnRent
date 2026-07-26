import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import DestinationShowcase from "@/components/home/DestinationsRow";
import BaliDeals from "@/components/home/PopularCarRental";
import TrustSection from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import FAQSection from "@/components/home/FAQ";
import Newsletter from "@/components/home/Newsletter";
import Footer from "@/components/layout/Footer";

// Social proof bar — extracted from Hero per Section 11.C
// (pills and stats are banned inside hero, moved below)
function SocialProofBar() {
  return (
    <div className="border-b border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {["img=3", "img=5", "img=8"].map((seed) => (
              <img
                key={seed}
                alt="Host"
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                src={`https://i.pravatar.cc/40?${seed}`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-500 font-medium">1M+ hosts signed up</span>
        </div>
        <div className="h-4 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <span className="text-amber-400">★</span>
          <span className="text-sm font-semibold text-slate-700">4.9</span>
          <span className="text-sm text-slate-500">average rating · 25K+ reviews</span>
        </div>
        <div className="h-4 w-px bg-slate-200 hidden sm:block" aria-hidden="true" />
        <span className="text-sm text-slate-500 font-medium">Zero hidden fees</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="text-slate-900 bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProofBar />
      <DestinationShowcase />
      <BaliDeals />
      <TrustSection />
      <HowItWorks />
      <FAQSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
