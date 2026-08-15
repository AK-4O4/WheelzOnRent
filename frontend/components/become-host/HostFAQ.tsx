// =============================================================================
// components/become-host/HostFAQ.tsx
// FAQ accordion section for /become-host page.
// =============================================================================
import { HOST_FAQS } from "@/data/placeholders/become-host.placeholders";

export function HostFAQ() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-normal font-serif text-slate-900 mb-12 text-center">
          Host FAQs
        </h2>
        <div className="divide-y divide-slate-100">
          {HOST_FAQS.map((faq) => (
            <div key={faq.q} className="py-6">
              <p className="font-semibold text-slate-900 mb-2">{faq.q}</p>
              <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
