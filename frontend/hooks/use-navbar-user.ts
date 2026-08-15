// =============================================================================
// hooks/use-navbar-user.ts
// Manages the authenticated user state for the Navbar.
// Returns null while loading or when user is not logged in.
// =============================================================================

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { API_BASE } from "@/data/constants/app.constants";
import { dicebearInitials } from "@/data/constants/app.constants";
import type { NavUser } from "@/types";

export function useNavbarUser() {
  const [navUser, setNavUser] = useState<NavUser | null>(null);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setNavUser(null);
        return;
      }

      // Try backend first for richest data (profile picture URL etc.)
      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        const json = await res.json();
        const u = json.data;

        const name =
          u.fullName ||
          session.user.user_metadata?.full_name ||
          session.user.email?.split("@")[0] ||
          "You";
        const email = u.email || session.user.email || "";
        const initials = name
          .split(" ")
          .map((p: string) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        const avatar = u.profilePictureUrl || dicebearInitials(initials);

        setNavUser({ name, email, avatar, initials });
      } catch {
        // Fall back to Supabase session metadata
        const meta = session.user.user_metadata;
        const name =
          meta?.full_name || session.user.email?.split("@")[0] || "You";
        const email = session.user.email || "";
        const initials = name
          .split(" ")
          .map((p: string) => p[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        setNavUser({ name, email, avatar: dicebearInitials(initials), initials });
      }
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return navUser;
}
