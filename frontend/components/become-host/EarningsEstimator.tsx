// =============================================================================
// components/become-host/EarningsEstimator.tsx
// Static earnings estimator section for /become-host page.
// =============================================================================
import { EARNINGS_BY_CITY } from "@/data/placeholders/become-host.placeholders";

export function EarningsEstimator() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-normal font-serif text-slate-900 mb-5">
              Estimate your <em className="italic font-normal">monthly earnings</em>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Based on average utilisation in your city. Even renting out 10 days a month makes a real difference.
            </p>
            <div className="space-y-4">
              {EARNINGS_BY_CITY.map((row) => (
                <div key={row.city} className="flex items-center justify-between py-4 border-b border-slate-100">
                  <div>
                    <p className="font-semibold text-slate-900">{row.city}</p>
                    <p className="text-slate-400 text-xs">Avg daily rate: {row.rate}</p>
                  </div>
                  <p className="font-bold text-emerald-600">{row.monthly}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-4">* Estimates based on 10 rental days/month.</p>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=700&q=80"
              alt="Happy host with car keys"
              className="w-full h-96 object-cover rounded-3xl"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
              <p className="text-xs text-slate-400 mb-1">This month&apos;s earnings · Ayesha, Karachi</p>
              <p className="text-2xl font-bold text-emerald-600">PKR 52,000</p>
              <p className="text-xs text-slate-400 mt-1">12 trips completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
