// =============================================================================
// components/become-host/BecomeHostHero.tsx
// Hero section for the /become-host page.
// =============================================================================
import Link from "next/link";

export function BecomeHostHero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 px-6">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #0ea5e9 0%, transparent 60%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <span className="inline-block bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
          For car owners in Pakistan
        </span>
        <h1 className="text-5xl md:text-6xl font-normal font-serif text-white leading-tight mb-6">
          Turn your parked car
          <br />
          into <em className="italic font-normal text-sky-400">real income.</em>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Join thousands of Pakistani car owners earning on Ceepii. List once, earn every trip.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/list-car"
            className="bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white font-semibold px-8 py-4 rounded-full text-sm transition-all shadow-lg shadow-sky-600/20"
            id="become-host-cta-primary"
          >
            List your car &mdash; it&apos;s free
          </Link>
          <a
            href="#how-it-works"
            className="border border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-full text-sm transition-all"
          >
            How it works
          </a>
        </div>
        {/* Social proof */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          <span>✓ Free to list</span>
          <span className="text-slate-700">·</span>
          <span>✓ PKR payouts</span>
          <span className="text-slate-700">·</span>
          <span>✓ Insured every trip</span>
          <span className="text-slate-700">·</span>
          <span>✓ No upfront cost</span>
        </div>
      </div>
    </section>
  );
}
