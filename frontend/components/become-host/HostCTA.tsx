// =============================================================================
// components/become-host/HostCTA.tsx
// Final call-to-action section for /become-host page.
// =============================================================================
import Link from "next/link";

export function HostCTA() {
  return (
    <section className="py-20 px-6 bg-sky-600">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-normal font-serif text-white mb-4">
          Ready to start earning?
        </h2>
        <p className="text-sky-100/80 mb-8">It takes less than 10 minutes to list your first car.</p>
        <Link
          href="/list-car"
          className="inline-block bg-white text-sky-700 hover:bg-sky-50 font-bold px-10 py-4 rounded-full text-sm transition-all shadow-xl"
          id="become-host-cta-footer"
        >
          List your car now →
        </Link>
      </div>
    </section>
  );
}
