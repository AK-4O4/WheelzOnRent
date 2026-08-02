import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Supabase Browser Client (singleton)
//
// Use this in any "use client" component that needs:
//   - supabase.auth.signInWithPassword()
//   - supabase.auth.signUp()
//   - supabase.auth.signOut()
//   - supabase.auth.getSession()
//
// The anon key is safe to expose publicly — it only allows what your RLS
// policies permit. Never use the service role key client-side.
// ---------------------------------------------------------------------------
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
