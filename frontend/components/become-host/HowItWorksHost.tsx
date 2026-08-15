// =============================================================================
// components/become-host/HowItWorksHost.tsx
// "How it works" steps section for /become-host page.
// =============================================================================
import { HOST_STEPS } from "@/data/placeholders/become-host.placeholders";

export function HowItWorksHost() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-normal font-serif text-white text-center mb-14">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOST_STEPS.map((s) => (
            <div key={s.step} className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <p className="text-5xl font-bold font-serif text-slate-700 mb-4">{s.step}</p>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
