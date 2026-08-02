"use client";

const QUOTES = [
  {
    id: 1,
    quote:
      "Booked a car for a Lahore trip in under 5 minutes. The Honda Civic was spotless and the host was super responsive. No hidden charges whatsoever.",
    author: "Hamza Raza",
    role: "Renter, Islamabad",
    avatar: "https://i.pravatar.cc/80?img=3",
    stat: "4.9",
    statLabel: "average rating",
  },
  {
    id: 2,
    quote:
      "My Corolla was sitting idle for weeks. Listed it on Ceepii and earned PKR 45,000 in the first month alone. Payouts hit my account on time.",
    author: "Ayesha Malik",
    role: "Host, Karachi",
    avatar: "https://i.pravatar.cc/80?img=5",
    stat: "PKR 45K",
    statLabel: "earned in one month",
  },
  {
    id: 3,
    quote:
      "I've used other platforms but Ceepii is the only one where the photos match the actual car. Great experience from pick-up to drop-off.",
    author: "Bilal Ahmed",
    role: "Renter, Lahore",
    avatar: "https://i.pravatar.cc/80?img=8",
    stat: "50k+",
    statLabel: "verified reviews",
  },
];

export default function TrustSection() {
  return (
    <section className="py-32 md:py-40 bg-slate-950 text-white" data-purpose="trust-indicators">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <h2
            className="text-4xl md:text-5xl font-normal leading-tight text-white mb-4"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Why people <em className="italic font-normal">rely on us</em>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Renters get reliable cars. Hosts earn real money. Everyone gets honesty.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 mb-20 border-b border-slate-800 pb-16">
          {[
            { val: "PKR 2B+", label: "earned by hosts, all-time" },
            { val: "500K+", label: "trips completed" },
            { val: "4.8", label: "average renter rating" },
          ].map(({ val, label }) => (
            <div key={val}>
              <p
                className="text-4xl md:text-5xl font-normal text-white mb-1"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
              >
                {val}
              </p>
              <p className="text-slate-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUOTES.map((q) => (
            <div
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col gap-6 hover:border-slate-700 transition-colors"
            >
              <p className="text-slate-300 text-base leading-relaxed flex-1">
                {`\u201c${q.quote}\u201d`}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={q.avatar}
                  alt={q.author}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-700"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{q.author}</p>
                  <p className="text-slate-500 text-xs">{q.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row gap-4">
          <a
            href="/cars"
            className="inline-block bg-sky-600 hover:bg-sky-500 active:scale-[0.98] text-white font-semibold px-8 py-4 rounded-full transition-all text-sm"
          >
            Browse cars
          </a>
          <a
            href="/account?tab=listings"
            className="inline-block border border-slate-700 hover:border-slate-500 text-white font-semibold px-8 py-4 rounded-full transition-all text-sm"
          >
            Become a host
          </a>
        </div>
      </div>
    </section>
  );
}
