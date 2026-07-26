"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Is my place right for Ceepii?",
    a: "Many travelers choose accommodations near downtown West Palm Beach, in the historic districts, or around Northwood Village for a local experience.",
    defaultOpen: true,
  },
  {
    q: "What are Ceepii's fees?",
    a: "Information about service fees and booking costs.",
    defaultOpen: false,
  },
  {
    q: "Baggage delay or loss?",
    a: "Support policies for travel incidents.",
    defaultOpen: false,
  },
  {
    q: "How do I get started?",
    a: "Step-by-step guide to hosting.",
    defaultOpen: false,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white" data-purpose="faq">
      <div className="container mx-auto px-4">
        <div className="flex flex-col content-center items-center lg:flex-row gap-20">
          {/* Left: Image with floating cards */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Arch-shaped image */}
              <div
                className="overflow-hidden shadow-xl"
                style={{
                  borderRadius: "50% 50% 0 0 / 35% 35% 0 0",
                  borderBottomLeftRadius: "1.5rem",
                  borderBottomRightRadius: "1.5rem",
                }}
              >
                <img
                  alt="FAQ decorative - colorful building with flowers"
                  className="w-full h-[850px] object-cover"
                  src="https://lh3.googleusercontent.com/aida/AP1WRLtMzD8eIgavZVOhzxbrjQP542HXU5rlP9vlEj7yVdJAWR3Ml45TSb8C65HSTc6hBb-QFCi3DW2UVNZYFbs9XbkoMoEusHn_Xkm8McIg5dTyQ73nWdLnCFReHOcPtanFPrmnMA86j1sHgzczMFYERhrYGtlQz8_lckkixXNA3YV5Xd4Qese6hlS8NZoGocr1hM-coriZXVn-2GHN8BQKme1BzZJTo9hy945aePK6u60Ro832TaEA8wBxCRnT"
                />
              </div>

              {/* Floating Service Cards — overlaid on lower portion */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                {/* Security */}
                <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-md flex items-center gap-3 border border-gray-100">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#fde8ef,#fdd5e4)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e0547a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      Security
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">
                      Your security is our top priority
                    </p>
                  </div>
                </div>

                {/* 24/7 Support */}
                <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-md flex items-center gap-3 border border-gray-100 ml-6">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#dff0ff,#c7e3ff)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4a9fe0"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.05 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      24/7 Support
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">
                      Our support team is available 24/7
                    </p>
                  </div>
                </div>

                {/* Easy Booking */}
                <div className="bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-md flex items-center gap-3 border border-gray-100 ml-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg,#e8f5e9,#d0eddc)",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4caf7d"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 leading-tight">
                      Easy Booking
                    </p>
                    <p className="text-xs text-gray-400 leading-tight">
                      Booking a stay has never been easier
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: FAQ + CTA */}
          <div className="lg:w-1/2 pt-4">
            <h2
              className="text-4xl font-normal mb-10 leading-tight"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                color: "#1a1a1a",
              }}
            >
              Frequently asked <br />
              <span
                className="italic"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                }}
              >
                questions
              </span>
            </h2>

            <div className="divide-y divide-gray-200">
              {faqs.map((faq, i) => (
                <div key={i} className="py-5">
                  <button
                    className="w-full flex justify-between items-center cursor-pointer text-left group"
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  >
                    <span className="text-base font-medium text-gray-800 group-hover:text-gray-600 transition-colors pr-4">
                      {faq.q}
                    </span>
                    <span className="text-xl font-light text-gray-500 shrink-0 w-6 text-center select-none">
                      {openIndex === i ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === i && (
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed pr-8">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button className="mt-10 bg-gray-900 text-white px-7 py-3.5 rounded-full text-sm font-medium flex items-center gap-2.5 hover:bg-black transition-all shadow-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Get contact support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
