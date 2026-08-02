"use client";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import PersonalInfo from "@/components/shadcn-studio/blocks/account-settings-01/content/personal-info";
import EmailPass from "@/components/shadcn-studio/blocks/account-settings-01/content/email-password";
import ConnectAccount from "@/components/shadcn-studio/blocks/account-settings-01/content/connect-account";
import SocialUrl from "@/components/shadcn-studio/blocks/account-settings-01/content/social-url";
import DangerZone from "@/components/shadcn-studio/blocks/account-settings-01/content/danger-zone";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "rentals", label: "My Rentals" },
  { id: "listings", label: "My Listings" },
  { id: "settings", label: "Settings" },
];

const MOCK_RENTALS = [
  { id: 1, car: "Nissan Rogue", location: "Los Angeles, CA", dates: "Jul 8 - Jul 11, 2026", status: "Completed", price: 267, image: "https://lh3.googleusercontent.com/aida/AP1WRLs4J3Qb761Pkm6T4w-nF3GYFIAaoEBwWPVB56cQMj4iT_hbEpITueiJRvpQIsExZjYkadANR1Y9Ho9YjJByLheLyS0I22uMvEIQaFZxbh5rd7tZgT_i0CutDK8cSfIwHEY6NMqgUzCsf5OuMWQOeheSeUkVvteXE5rQ6L2Fqo9JVaWbV1dll_KGJQB83eLvu8mhzEGSxJ3e4Xjc7dDs_1Q-VEnScISYWKCttvF5-Zapf2ynb7B9MX1RB7xl" },
  { id: 2, car: "Tesla Model 3", location: "Seattle, WA", dates: "Aug 2 - Aug 5, 2026", status: "Upcoming", price: 336, image: "https://lh3.googleusercontent.com/aida/AP1WRLuVokeoWVVYiqP0zjQP7SzdFdxq45V2XM7q6Nq6zeSW7TikYgoRkO2BdLbGLY4tMO4PI0-A8ePstZZhTDap88UXOJ_9btZLO_qH164Z9y0vhmUhAhTp96dxW6hngwSfpxiZvkT4DCmEcGgi6RIx6zFN0uU-x_g9Z9WjtnGn-YqZ-NYnhpKNSqvFr2gn1DQ1qIqmQw7yp1TTOJzKXRjgniZLkOEErffw9PyoR0YeIioI727i_ngGOmhCgfuW" },
];

const MOCK_LISTINGS = [
  { id: 1, car: "Toyota Camry 2022", price: 65, status: "Active", bookings: 12, earnings: 840, image: "https://lh3.googleusercontent.com/aida/AP1WRLtU7WwqDZ7QoZY00BfQvmDtawSKmGOlSi1r8FBQZt4O2sF5K9p7uWTCBL7ldkGDGC2NXsfD0vcZbFIuTL8YqBvVCUMBLCm7l69PL_gGY2I2lbA3DYLtx5Qxbh4N0wyrw-VbPH7CzlOveaMPOvxGifSN4NukzBPgikFI9umSRNfF58GF0RyQkhYobzr-vILy4QKXPJwRAZHGd_oM5zcvCFc-RgSXzR5iobyYBSscL7fl7wX9Eyu2Wz6JfTY" },
];

// ─── Types ───────────────────────────────────────────────────────────────────
interface UserProfile {
  id: string;
  fullName: string | null;
  email: string | null;
  profilePictureUrl: string | null;
  phoneNumber: string | null;
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────
function AvatarSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 p-6 mb-4 bg-slate-50 rounded-2xl border border-slate-100 animate-pulse">
      <div className="w-20 h-20 rounded-full bg-slate-200" />
      <div className="space-y-2 text-center">
        <div className="h-3.5 w-28 rounded bg-slate-200 mx-auto" />
        <div className="h-3 w-36 rounded bg-slate-100 mx-auto" />
      </div>
    </div>
  );
}

function AccountPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get("tab") ?? "profile";
  const [activeTab, setActiveTab] = useState(
    TABS.find((t) => t.id === initialTab) ? initialTab : "profile"
  );

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  // Live avatar — updated immediately when PersonalInfo saves a new photo
  const [liveAvatar, setLiveAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      // 1. Get the active Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Not logged in — redirect to login
        router.replace("/login");
        return;
      }

      // 2. Call the Express API with the JWT
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/users/me`,
          {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();
        const u = json.data;

        setProfile({
          id: u.id,
          fullName: u.fullName ?? null,
          email: u.email ?? session.user.email ?? null,
          profilePictureUrl: u.profilePictureUrl ?? null,
          phoneNumber: u.phoneNumber ?? null,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        // Fall back to Supabase session data
        setProfile({
          id: session.user.id,
          fullName: session.user.user_metadata?.full_name ?? null,
          email: session.user.email ?? null,
          profilePictureUrl: null,
          phoneNumber: null,
        });
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, [router]);

  const displayName = profile?.fullName ?? profile?.email?.split("@")[0] ?? "You";
  const displayEmail = profile?.email ?? "";
  // liveAvatar is set instantly after upload; falls back to saved URL, then DiceBear default
  const initials = encodeURIComponent((displayName ?? "User").slice(0, 2));
  const avatarSrc =
    liveAvatar ??
    profile?.profilePictureUrl ??
    `https://api.dicebear.com/9.x/initials/svg?seed=${initials}&backgroundColor=0ea5e9`;

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Left rail */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="flex flex-col gap-1">
              {/* Avatar */}
              {loadingProfile ? (
                <AvatarSkeleton />
              ) : (
                <div className="flex flex-col items-center gap-3 p-6 mb-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="relative">
                    <img
                      src={avatarSrc}
                      alt="Your avatar"
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md"
                    />
                    <button
                      className="absolute bottom-0 right-0 w-7 h-7 bg-sky-600 rounded-full flex items-center justify-center shadow-sm hover:bg-sky-700 transition-colors"
                      aria-label="Change avatar"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-slate-900 text-sm">{displayName}</p>
                    <p className="text-slate-400 text-xs">{displayEmail}</p>
                  </div>
                </div>
              )}

              {/* Nav items */}
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                    ? "bg-sky-50 text-sky-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  id={`account-tab-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Profile */}
            {activeTab === "profile" && (
              <div>
                <h1
                  className="text-3xl font-normal mb-8 text-slate-900"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
                >
                  Profile details
                </h1>
                <PersonalInfo onAvatarChange={(url) => setLiveAvatar(url)} />
                <Separator className="my-10" />
                <EmailPass />
                <Separator className="my-10" />
                <ConnectAccount />
                <Separator className="my-10" />
                <SocialUrl />
              </div>
            )}

            {/* My Rentals */}
            {activeTab === "rentals" && (
              <div>
                <h1
                  className="text-3xl font-normal mb-8 text-slate-900"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
                >
                  My rentals
                </h1>
                <div className="space-y-4">
                  {MOCK_RENTALS.map((r) => (
                    <div key={r.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-100 rounded-2xl hover:shadow-sm transition-shadow">
                      <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img src={r.image} alt={r.car} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-slate-900">{r.car}</p>
                            <p className="text-slate-400 text-sm">{r.location}</p>
                            <p className="text-slate-400 text-xs mt-1">{r.dates}</p>
                          </div>
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.status === "Completed" ? "bg-slate-100 text-slate-600" : "bg-sky-50 text-sky-700"
                            }`}>
                            {r.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="font-bold text-sky-600">${r.price} total</p>
                          <Link href={`/cars/${r.id}`} className="text-sm text-sky-600 font-medium hover:underline">
                            View details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* My Listings */}
            {activeTab === "listings" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h1
                    className="text-3xl font-normal text-slate-900"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
                  >
                    My listings
                  </h1>
                  <button
                    id="account-add-listing-btn"
                    className="bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add a car
                  </button>
                </div>
                <div className="space-y-4">
                  {MOCK_LISTINGS.map((l) => (
                    <div key={l.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-100 rounded-2xl hover:shadow-sm transition-shadow">
                      <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                        <img src={l.image} alt={l.car} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-slate-900">{l.car}</p>
                            <p className="text-sky-600 font-semibold text-sm mt-0.5">${l.price} / day</p>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">{l.status}</span>
                        </div>
                        <div className="flex items-center gap-6 mt-3 text-sm text-slate-500">
                          <span>{l.bookings} bookings</span>
                          <span className="font-semibold text-slate-700">${l.earnings} earned</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {MOCK_LISTINGS.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
                    <p className="text-base">No listings yet. Add your first car to start earning.</p>
                  </div>
                )}
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div>
                <h1
                  className="text-3xl font-normal mb-8 text-slate-900"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
                >
                  Settings
                </h1>
                <DangerZone />
              </div>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense>
      <AccountPageInner />
    </Suspense>
  );
}
