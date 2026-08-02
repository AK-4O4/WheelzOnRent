"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ProfileDropdown from "@/components/shadcn-studio/blocks/dropdown-profile";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const DEFAULT_AVATAR = (seed: string) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundColor=0ea5e9`;

interface NavUser {
  name: string;
  email: string;
  avatar: string;
  initials: string;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navUser, setNavUser] = useState<NavUser | null>(null); // null = not logged in / loading
  const pathname = usePathname();

  // ── Scroll shadow ─────────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Fetch real user on mount & subscribe to auth changes ─────────────────
  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setNavUser(null); return; }

      // Try backend first for the richest data (profile picture URL etc.)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/users/me`,
          { headers: { Authorization: `Bearer ${session.access_token}` } }
        );
        const json = await res.json();
        const u = json.data;

        const name = u.fullName || session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "You";
        const email = u.email || session.user.email || "";
        const initials = name.split(" ").map((p: string) => p[0]).join("").slice(0, 2).toUpperCase();
        const avatar = u.profilePictureUrl || DEFAULT_AVATAR(initials);

        setNavUser({ name, email, avatar, initials });
      } catch {
        // Fall back to Supabase session metadata
        const meta = session.user.user_metadata;
        const name = meta?.full_name || session.user.email?.split("@")[0] || "You";
        const email = session.user.email || "";
        const initials = name.split(" ").map((p: string) => p[0]).join("").slice(0, 2).toUpperCase();
        setNavUser({ name, email, avatar: DEFAULT_AVATAR(initials), initials });
      }
    }

    loadUser();

    // Re-run whenever the auth state changes (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  const isActive = (href: string) => pathname === href;

  // ── Avatar trigger button ─────────────────────────────────────────────────
  const avatarTrigger = (
    <button
      className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-200 bg-slate-100 hover:bg-sky-50 hover:border-sky-300 transition-all overflow-hidden"
      aria-label="Open account menu"
      id="navbar-profile-trigger"
    >
      <Avatar size="default">
        <AvatarImage src={navUser?.avatar ?? ""} alt={navUser?.name ?? "User"} />
        <AvatarFallback className="text-xs font-semibold">
          {navUser?.initials ?? "?"}
        </AvatarFallback>
      </Avatar>
    </button>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
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
              className={`px-5 py-1.5 rounded-full transition-all whitespace-nowrap ${isActive("/") ? "bg-white shadow-sm text-slate-900" : "hover:bg-white hover:shadow-sm"
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
              className={`px-5 py-1.5 rounded-full transition-all whitespace-nowrap ${isActive("/cars") ? "bg-white shadow-sm text-slate-900" : "hover:bg-white hover:shadow-sm"
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
              Become a host
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

            {/* Profile dropdown (logged in) or Login / Sign-up buttons */}
            {navUser ? (
              <ProfileDropdown trigger={avatarTrigger} align="end" user={navUser} />
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-full border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50 p-4"
                >
                  <Link href="/login">Log in</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="rounded-full p-4"
                >
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

    </>
  );
}
