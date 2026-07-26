"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: "Book your car",
    body: "Browse hundreds of verified vehicles and reserve in under two minutes.",
    image: "https://picsum.photos/seed/booking-calendar-car/800/500",
    filter: "contrast(1.05) saturate(0.85)",
    bg: "bg-sky-50",
    accent: "text-sky-600",
  },
  {
    title: "Smart checklist",
    body: "A pre-trip checklist lands in your inbox so nothing gets missed on collection day.",
    image: "https://picsum.photos/seed/checklist-road-plan/600/400",
    filter: "grayscale(0.2) contrast(1.1)",
    bg: "bg-slate-900",
    accent: "text-sky-400",
    dark: true,
  },
  {
    title: "Save with Ceepii",
    body: "No hidden fees. Price you see is the price you pay, including insurance.",
    image: "https://picsum.photos/seed/save-money-car-keys/600/400",
    filter: "contrast(1.05) saturate(0.9)",
    bg: "bg-slate-50",
    accent: "text-slate-700",
  },
  {
    title: "Drive, enjoy, return",
    body: "Pick up, explore freely, drop off at any supported location. Easy.",
    image: "https://picsum.photos/seed/road-trip-sunset-highway/800/500",
    filter: "contrast(1.1) saturate(0.8) brightness(0.95)",
    bg: "bg-sky-600",
    accent: "text-white",
    dark: true,
  },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.93,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 md:py-40 bg-white overflow-hidden" data-purpose="how-it-works">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h2
          className="text-4xl md:text-5xl font-normal text-slate-900 leading-tight max-w-md text-wrap-balance"
          style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
        >
          How <em className="italic font-normal">it</em> works
        </h2>
        <p className="mt-4 text-slate-500 max-w-[52ch] leading-relaxed">
          From search to keys in hand, the whole process takes minutes.
        </p>
      </div>

      {/* 4-cell bento — 3-col grid, 2 rows, 0 empty cells, grid-flow-dense */}
      <div
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 grid-flow-dense gap-4 mb-32"
      >
        {/* Row 1: col-span-2 + col-span-1 = 3 */}
        <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[280px] group">
          <img
            src={STEPS[0].image}
            alt={STEPS[0].title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ filter: STEPS[0].filter }}
          />
          <div className="absolute inset-0 bg-sky-900/60" />
          <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px]">
            <p className="text-xs font-semibold text-sky-200 uppercase tracking-widest mb-2">Step 1</p>
            <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>{STEPS[0].title}</h3>
            <p className="text-sky-100/80 text-sm leading-relaxed max-w-[40ch]">{STEPS[0].body}</p>
          </div>
        </div>

        <div className="md:col-span-1 relative rounded-2xl overflow-hidden min-h-[280px] bg-slate-900 group">
          <img
            src={STEPS[1].image}
            alt={STEPS[1].title}
            className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ filter: STEPS[1].filter }}
          />
          <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Step 2</p>
            <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>{STEPS[1].title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{STEPS[1].body}</p>
          </div>
        </div>

        {/* Row 2: col-span-1 + col-span-2 = 3 */}
        <div className="md:col-span-1 relative rounded-2xl overflow-hidden min-h-[280px] bg-slate-50 border border-slate-100 group">
          <img
            src={STEPS[2].image}
            alt={STEPS[2].title}
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ filter: STEPS[2].filter }}
          />
          <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Step 3</p>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>{STEPS[2].title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{STEPS[2].body}</p>
          </div>
        </div>

        <div className="md:col-span-2 relative rounded-2xl overflow-hidden min-h-[280px] group">
          <img
            src={STEPS[3].image}
            alt={STEPS[3].title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ filter: STEPS[3].filter }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 to-sky-700/40" />
          <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px]">
            <p className="text-xs font-semibold text-sky-200 uppercase tracking-widest mb-2">Step 4</p>
            <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}>{STEPS[3].title}</h3>
            <p className="text-sky-100/80 text-sm leading-relaxed max-w-[40ch]">{STEPS[3].body}</p>
          </div>
        </div>
      </div>

      {/* GSAP sticky-stack section (Section 5.A canonical skeleton) */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-6">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="stack-card sticky top-0 min-h-[60dvh] flex items-center justify-center py-16"
          >
            <div className={`w-full rounded-3xl p-12 ${step.bg} ${step.dark ? "text-white" : "text-slate-900"}`}>
              <div className="flex flex-col md:flex-row gap-10 items-center">
                <div className="flex-1">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${step.accent}`}>Step {i + 1}</p>
                  <h3
                    className="text-3xl font-normal leading-snug mb-4"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className={`text-base leading-relaxed max-w-[42ch] ${step.dark ? "text-white/70" : "text-slate-500"}`}>
                    {step.body}
                  </p>
                </div>
                <div className="w-full md:w-64 h-48 rounded-2xl overflow-hidden shrink-0">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    style={{ filter: step.filter }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
