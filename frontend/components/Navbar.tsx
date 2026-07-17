"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
            : "bg-transparent"
        }`}
        data-purpose="main-navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 shrink-0"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', serif",
              letterSpacing: "-0.02em",
            }}
          >
            Ceep<em className="italic not-italic text-sky-600">ii</em>.
          </Link>

          {/* Center nav pill */}
          <nav className="hidden md:flex items-center gap-0.5 bg-slate-50 border border-slate-200 rounded-full px-2 py-1.5 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className={`px-5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                isActive("/")
                  ? "bg-white shadow-sm text-slate-900"
                  : "hover:bg-white hover:shadow-sm"
              }`}
            >
              Home
            </Link>
            <button className="px-5 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all whitespace-nowrap flex items-center gap-1">
              Travelers
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </button>
            <button className="px-5 py-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all whitespace-nowrap flex items-center gap-1">
              Explore
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              </svg>
            </button>
            <Link
              href="/cars"
              className={`px-5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                isActive("/cars")
                  ? "bg-white shadow-sm text-slate-900"
                  : "hover:bg-white hover:shadow-sm"
              }`}
            >
              Search
            </Link>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              href="/account?tab=listings"
              className="hidden sm:block text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors whitespace-nowrap"
            >
              List your property
            </Link>

            {/* Globe */}
            <button
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
              aria-label="Language"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
            </button>

            {/* User / auth trigger */}
            <button
              onClick={() => setAuthOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-slate-600 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-600 transition-all"
              aria-label="Sign in or create account"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" fillRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
