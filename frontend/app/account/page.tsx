"use client";
// =============================================================================
// app/account/page.tsx
// Account settings & profile page — UI only, logic in useAccountPage hook.
// =============================================================================
import { Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Separator } from "@/components/ui/separator";
import PersonalInfo from "@/components/shadcn-studio/blocks/account-settings-01/content/personal-info";
import EmailPass from "@/components/shadcn-studio/blocks/account-settings-01/content/email-password";
import ConnectAccount from "@/components/shadcn-studio/blocks/account-settings-01/content/connect-account";
import SocialUrl from "@/components/shadcn-studio/blocks/account-settings-01/content/social-url";
import DangerZone from "@/components/shadcn-studio/blocks/account-settings-01/content/danger-zone";
import { useAccountPage } from "@/hooks/use-account-page";
import { ACCOUNT_TABS } from "@/data/constants/vehicles.constants";
import { MOCK_RENTALS } from "@/data/placeholders/account.placeholders";
import { dicebearShapes } from "@/data/constants/app.constants";
import { PlusIcon, CarIcon } from "@/assets/svg";
import type { MyListing } from "@/types";

// ── Skeleton ──────────────────────────────────────────────────────────────────

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

// ── Status badge ──────────────────────────────────────────────────────────────

function statusClass(status: string) {
  if (status === "active") return "bg-emerald-50 text-emerald-700";
  if (status === "under_review") return "bg-amber-50 text-amber-700";
  return "bg-slate-100 text-slate-600";
}

// ── Inner page (needs Suspense for useSearchParams) ───────────────────────────

function AccountPageInner() {
  const {
    activeTab, setActiveTab,
    profile, loadingProfile,
    listings, loadingListings,
    setLiveAvatar,
    displayName, displayEmail, avatarSrc,
  } = useAccountPage();

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── Left rail ── */}
          <aside className="w-full lg:w-56 shrink-0">
            <div className="flex flex-col gap-1">
              {/* Avatar card */}
              {loadingProfile ? (
                <AvatarSkeleton />
              ) : (
                <div className="flex flex-col items-center gap-3 p-6 mb-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="relative">
                    <img src={avatarSrc} alt="Your avatar" className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-md" />
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

              {/* Nav tabs */}
              {ACCOUNT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === tab.id
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

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Profile */}
            {activeTab === "profile" && (
              <div>
                <h1 className="text-3xl font-normal font-serif mb-8 text-slate-900">Profile details</h1>
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
                <h1 className="text-3xl font-normal font-serif mb-8 text-slate-900">My rentals</h1>
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
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            r.status === "Completed" ? "bg-slate-100 text-slate-600" : "bg-sky-50 text-sky-700"
                          }`}>
                            {r.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="font-bold text-sky-600">PKR {r.price.toLocaleString()} total</p>
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
                  <h1 className="text-3xl font-normal font-serif text-slate-900">My listings</h1>
                  <Link
                    href="/list-car"
                    id="account-add-listing-btn"
                    className="bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-2"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Add a car
                  </Link>
                </div>

                {loadingListings ? (
                  <div className="space-y-4">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="flex gap-4 p-4 border border-slate-100 rounded-2xl animate-pulse">
                        <div className="w-32 h-24 rounded-xl bg-slate-100 shrink-0" />
                        <div className="flex-1 space-y-3 pt-1">
                          <div className="h-4 bg-slate-100 rounded w-1/3" />
                          <div className="h-3 bg-slate-100 rounded w-1/4" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : listings.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
                    <CarIcon className="w-12 h-12 opacity-25" />
                    <p className="text-base font-medium text-slate-600">No listings yet.</p>
                    <p className="text-sm">Add your first car to start earning.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map((l: MyListing) => (
                      <div key={l.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-100 rounded-2xl hover:shadow-sm transition-shadow">
                        <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                          <img
                            src={l.primaryImage ?? dicebearShapes(l.id)}
                            alt={`${l.year} ${l.make} ${l.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-semibold text-slate-900">{l.year} {l.make} {l.model}</p>
                              <p className="text-slate-400 text-sm">{l.city}</p>
                              <p className="text-sky-600 font-semibold text-sm mt-0.5">
                                PKR {Number.isFinite(parseFloat(l.dailyRate)) ? parseFloat(l.dailyRate).toLocaleString() : "—"} / day
                              </p>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusClass(l.status)}`}>
                              {l.status.replaceAll("_", " ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-3">
                            <Link href={`/cars/${l.id}`} className="text-sm text-sky-600 font-medium hover:underline">View listing</Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Settings */}
            {activeTab === "settings" && (
              <div>
                <h1 className="text-3xl font-normal font-serif mb-8 text-slate-900">Settings</h1>
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

// ── Default export (wrapped in Suspense for useSearchParams) ──────────────────

export default function AccountPage() {
  return (
    <Suspense>
      <AccountPageInner />
    </Suspense>
  );
}
