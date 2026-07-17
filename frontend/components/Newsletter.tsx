"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-32 md:py-40 bg-white" data-purpose="newsletter-signup">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-sky-600 py-20 px-12 text-center text-white">
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
            src="https://picsum.photos/seed/open-highway-aerial/1920/600"
          />
          <div className="relative z-10 max-w-xl mx-auto">
            <h2
              className="text-3xl md:text-4xl mb-4 leading-tight"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              Get deals before anyone else.
            </h2>
            <p className="text-sky-100/80 text-base mb-10">
              New listings, weekly price drops, and host tips in your inbox.
            </p>

            {submitted ? (
              <p className="text-white font-semibold text-lg">You are on the list.</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email) setSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white text-slate-900 px-5 py-3.5 rounded-full border-none focus:ring-4 focus:ring-white/30 outline-none placeholder-slate-400 text-sm"
                />
                <button
                  type="submit"
                  className="bg-slate-900 text-white px-6 py-3.5 rounded-full hover:bg-black active:scale-[0.97] transition-all text-sm font-semibold whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="mt-5 text-xs text-sky-100/60">
              No spam, ever. Read our{" "}
              <a className="underline hover:text-white transition-colors" href="#">
                privacy policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
