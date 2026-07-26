import type { Request, Response, NextFunction } from "express";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { env } from "../config/env";

// ---------------------------------------------------------------------------
// Type augmentation — teaches TypeScript that req.user is available on every
// Express Request object after this middleware runs.
// ---------------------------------------------------------------------------
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string; // Supabase auth.users UUID — mirrors public.users.id
        email?: string; // Email from JWT claim
        role?: string; // 'authenticated' | 'anon' | custom role
      };
    }
  }
}

// ---------------------------------------------------------------------------
// JWKS — Supabase signs JWTs with RS256 (asymmetric).
// We fetch and cache the public keys from Supabase's JWKS endpoint.
// ---------------------------------------------------------------------------
const JWKS = createRemoteJWKSet(new URL(env.supabaseJwksUrl));

// ---------------------------------------------------------------------------
// Dev bypass — set DEV_BYPASS_AUTH=true in .env to skip JWT verification.
//
// WHY: During early development you often want to hit API endpoints from
// Postman or curl without going through the Supabase auth flow every time.
// Set DEV_USER_ID to the UUID of an existing public.users row.
//
// SAFETY: Guarded by TWO conditions that must BOTH be true:
//   1. DEV_BYPASS_AUTH=true must be explicitly set in .env
//   2. NODE_ENV must NOT be "production"
// A single misconfigured env var in production won't open this.
// ---------------------------------------------------------------------------
const DEV_BYPASS =
  env.nodeEnv !== "production" && process.env.DEV_BYPASS_AUTH === "true";
const DEV_USER_ID = process.env.DEV_USER_ID ?? "";

if (DEV_BYPASS) {
  console.warn(
    "\n⚠️  [auth] DEV_BYPASS_AUTH is ON — JWT verification is DISABLED.",
  );
  console.warn("⚠️  [auth] Never deploy with this enabled!\n");
  if (!DEV_USER_ID) {
    console.warn(
      "⚠️  [auth] DEV_USER_ID is not set — set it to a valid public.users UUID.\n",
    );
  }
}

// ---------------------------------------------------------------------------
// requireAuth middleware
//
// Attach to any route that needs a logged-in user:
//   router.get('/me', requireAuth, userController.getMe)
// ---------------------------------------------------------------------------
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // ── Dev bypass: inject a fake user and skip all JWT logic ─────────────────
  if (DEV_BYPASS) {
    req.user = { id: DEV_USER_ID, email: "dev@local", role: "authenticated" };
    return next();
  }

  // ── Normal path: verify Supabase JWT ─────────────────────────────────────
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized",
        message:
          "Missing or malformed Authorization header. Expected: Bearer <token>",
      });
    }

    const token = authHeader.slice(7);

    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `${env.supabaseUrl}/auth/v1`, // prevents tokens from other projects
      audience: "authenticated", // rejects anon tokens
    });

    req.user = {
      id: payload.sub!, // sub = the user's UUID
      email: payload.email as string | undefined,
      role: payload.role as string | undefined,
    };

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Token is invalid or has expired. Please log in again.",
    });
  }
}
