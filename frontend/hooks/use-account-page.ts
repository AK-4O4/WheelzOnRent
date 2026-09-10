// =============================================================================
// hooks/use-account-page.ts
// Manages profile fetch, listings fetch, tab state, and avatar for /account.
// Extracted from app/account/page.tsx to keep UI purely declarative.
// =============================================================================

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { API_BASE } from "@/data/constants/app.constants";
import { dicebearInitials } from "@/data/constants/app.constants";
import { ACCOUNT_TABS } from "@/data/constants/vehicles.constants";
import type { UserProfile, MyListing, AccountTabId } from "@/types";

export function useAccountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get("tab") ?? "profile";
  const justSubmitted = searchParams?.get("submitted") === "1";

  const [activeTab, setActiveTab] = useState<AccountTabId>(
    ACCOUNT_TABS.find((t) => t.id === initialTab) ? (initialTab as AccountTabId) : "profile"
  );

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [listings, setListings] = useState<MyListing[]>([]);
  const [loadingListings, setLoadingListings] = useState(false);
  const [liveAvatar, setLiveAvatar] = useState<string | null>(null);

  // Fetch profile on mount — redirect to /login if no session
  useEffect(() => {
    async function fetchProfile() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/login"); return; }

      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
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

  // Fetch listings when "listings" tab becomes active
  useEffect(() => {
    if (activeTab !== "listings") return;
    async function fetchListings() {
      setLoadingListings(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        const res = await fetch(`${API_BASE}/api/vehicles/mine`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (!res.ok) throw new Error(`${res.status}`);
        const json = await res.json();
        setListings(json.data ?? []);
      } catch (e) {
        console.error("Failed to load listings", e);
      } finally {
        setLoadingListings(false);
      }
    }
    fetchListings();
  }, [activeTab]);

  // Derived display values
  const displayName = profile?.fullName ?? profile?.email?.split("@")[0] ?? "You";
  const displayEmail = profile?.email ?? "";
  const initials = encodeURIComponent((displayName ?? "User").slice(0, 2));
  const avatarSrc =
    liveAvatar ??
    profile?.profilePictureUrl ??
    dicebearInitials(initials);

  return {
    activeTab, setActiveTab,
    profile,
    loadingProfile,
    listings,
    loadingListings,
    liveAvatar, setLiveAvatar,
    // Derived
    displayName, displayEmail, avatarSrc,
    // Flags
    justSubmitted,
  };
}
