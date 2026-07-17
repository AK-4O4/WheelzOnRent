"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="bg-white pt-16 pb-10 border-t border-slate-100"
      data-purpose="site-footer"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              className="text-2xl font-bold text-sky-600 block mb-5"
              style={{
                fontFamily: "var(--font-playfair), 'Playfair Display', serif",
                letterSpacing: "-0.02em",
              }}
              href="/"
            >
              Ceep<em className="italic">ii</em>.
            </Link>
            <p className="text-slate-500 max-w-xs mb-7 text-sm leading-relaxed">
              Car rental that works for renters and owners alike. No hidden fees, no surprises.
            </p>
            <div className="flex gap-3">
              {["FB", "IG", "TW", "GH"].map((s) => (
                <a
                  key={s}
                  className="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-500 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all"
                  href="#"
                  aria-label={s}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Renters */}
          <div>
            <h4 className="font-semibold mb-5 text-slate-900 text-sm">Renters</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><Link className="hover:text-sky-600 transition-colors" href="/cars">Browse cars</Link></li>
              <li><Link className="hover:text-sky-600 transition-colors" href="/account">My bookings</Link></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Insurance options</a></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Help center</a></li>
            </ul>
          </div>

          {/* Hosts */}
          <div>
            <h4 className="font-semibold mb-5 text-slate-900 text-sm">Hosts</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><Link className="hover:text-sky-600 transition-colors" href="/account?tab=listings">List your car</Link></li>
              <li><Link className="hover:text-sky-600 transition-colors" href="/account">Host dashboard</Link></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Pricing guide</a></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Host support</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-5 text-slate-900 text-sm">Company</h4>
            <ul className="space-y-3 text-slate-500 text-sm">
              <li><a className="hover:text-sky-600 transition-colors" href="#">About</a></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Blog</a></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-sky-600 transition-colors" href="#">Press</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>2026 Ceepii. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-sky-600 transition-colors" href="#">Terms of service</a>
            <a className="hover:text-sky-600 transition-colors" href="#">Privacy policy</a>
            <a className="hover:text-sky-600 transition-colors" href="#">Cookie settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
