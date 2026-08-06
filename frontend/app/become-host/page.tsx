"use client";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const PERKS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Earn in PKR",
    desc: "Get paid directly to your bank account. Hosts in Karachi earn up to PKR 60,000 per month.",
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Full insurance coverage",
    desc: "Every trip is covered with comprehensive insurance so you rent with total peace of mind.",
    bg: "bg-sky-50",
    color: "text-sky-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Verified renters only",
    desc: "Every renter is CNIC-verified and licence-checked before they can book your car.",
    bg: "bg-violet-50",
    color: "text-violet-600",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "24/7 support",
    desc: "Our team is available around the clock to help you with any issue during a trip.",
    bg: "bg-amber-50",
    color: "text-amber-600",
  },
];

const STEPS = [
  {
    step: "01",
    title: "List your car",
    desc: "Add photos, set your availability, and choose your daily rate. Takes under 10 minutes.",
  },
  {
    step: "02",
    title: "We review your listing",
    desc: "Our team verifies your car's documents. Most listings are approved within 24 hours.",
  },
  {
    step: "03",
    title: "Accept booking requests",
    desc: "Renters send requests. You review their profile and confirm or decline.",
  },
  {
    step: "04",
    title: "Get paid",
    desc: "Money hits your bank account after each completed trip. No chasing, no delays.",
  },
];

const FAQS = [
  {
    q: "Do I need to be present during the handover?",
    a: "Yes, we recommend meeting the renter in person to hand over the keys and do a quick vehicle check. This protects both parties.",
  },
  {
    q: "What if the renter damages my car?",
    a: "All trips include damage protection. If damage occurs, file a claim through the app and our team handles it — including contacting insurance if needed.",
  },
  {
    q: "Can I block dates when I need my car?",
    a: "Absolutely. Your availability calendar is fully in your control. Block any dates and renters won't be able to request those periods.",
  },
  {
    q: "Is there a minimum rental period?",
    a: "The minimum is 1 day. You set your own rules — some hosts prefer 3-day minimum bookings to reduce turnover.",
  },
];

export default function BecomeHostPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      {/* Hero */}
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
          <h1
            className="text-5xl md:text-6xl font-normal text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
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
              List your car — it's free
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

      {/* Perks */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-normal text-center mb-14 text-slate-900"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Why host on <em className="italic font-normal">Ceepii?</em>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <div className={`w-12 h-12 rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-5`}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings estimator (static) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-4xl font-normal text-slate-900 mb-5"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
              >
                Estimate your <em className="italic font-normal">monthly earnings</em>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Based on average utilisation in your city. Even renting out 10 days a month makes a real difference.
              </p>
              <div className="space-y-4">
                {[
                  { city: "Karachi", rate: "PKR 4,500/day", monthly: "PKR 45,000" },
                  { city: "Lahore", rate: "PKR 5,000/day", monthly: "PKR 50,000" },
                  { city: "Islamabad", rate: "PKR 4,000/day", monthly: "PKR 40,000" },
                ].map((row) => (
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
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=700&q=80"
                alt="Happy host with car keys"
                className="w-full h-96 object-cover rounded-3xl"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg">
                <p className="text-xs text-slate-400 mb-1">This month's earnings · Ayesha, Karachi</p>
                <p className="text-2xl font-bold text-emerald-600">PKR 52,000</p>
                <p className="text-xs text-slate-400 mt-1">12 trips completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl font-normal text-white text-center mb-14"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STEPS.map((s, i) => (
              <div key={s.step} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <p className="text-5xl font-bold text-slate-700 mb-4" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>
                  {s.step}
                </p>
                <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-4xl font-normal text-slate-900 mb-12 text-center"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Host FAQs
          </h2>
          <div className="divide-y divide-slate-100">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-6">
                <p className="font-semibold text-slate-900 mb-2">{faq.q}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-sky-600">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-4xl font-normal text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
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

      <Footer />
    </div>
  );
}
