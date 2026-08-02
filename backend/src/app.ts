import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.ts";
import { errorHandler } from "./middleware/errorHandler.middleware.ts";
import { userRoutes, vehicleRoutes } from "./routes";

export const app = express();

// ---------------------------------------------------------------------------
// Security headers (helmet)
// Must come before routes. Sets X-Content-Type-Options, HSTS, hides
// X-Powered-By, and several other protective HTTP headers.
// ---------------------------------------------------------------------------
app.use(helmet());

// ---------------------------------------------------------------------------
// CORS — Cross-Origin Resource Sharing
//
// Who needs CORS and why:
//   - Next.js (browser)   → makes fetch() from http://localhost:3000 → your API
//   - Expo web (browser)  → makes fetch() from http://localhost:8081
//   - Expo native (iOS/Android) → does NOT trigger CORS (no browser, no origin)
//   - Postman             → does NOT trigger CORS (not a browser)
//
// So CORS only matters for browser-based clients. We whitelist allowed origins
// via the ALLOWED_ORIGINS env var so production locks down correctly.
//
// In development (ALLOWED_ORIGINS not set), we fall back to allowing all
// origins so you can test freely. Tighten this before going to production.
// ---------------------------------------------------------------------------
app.use(
  cors({
    // If allowedOrigins is empty (env var not set), allow everything in dev.
    // In production, always set ALLOWED_ORIGINS to your real domains.
    origin:
      env.allowedOrigins.length > 0
        ? (origin, callback) => {
          // Allow requests with no origin (mobile native, Postman, curl)
          if (!origin) return callback(null, true);
          // Allow whitelisted browser origins
          if (env.allowedOrigins.includes(origin))
            return callback(null, true);
          // Block anything else
          callback(new Error(`CORS: origin ${origin} not allowed`));
        }
        : true, // true = mirror whatever origin is sent (dev-only permissive mode)

    // Allow the Authorization header so our Bearer tokens pass through
    allowedHeaders: ["Content-Type", "Authorization"],

    // Expose no extra headers to the browser beyond defaults
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    // Allow credentials (cookies, Authorization headers) in cross-origin requests
    credentials: true,
  }),
);

// ---------------------------------------------------------------------------
// Body parsing
// parse JSON request bodies — required before any route reads req.body
// ---------------------------------------------------------------------------
app.use(express.json());

// ---------------------------------------------------------------------------
// Health check
// No auth required. Used by deployment platforms (Railway, Render, etc.) to
// confirm the server is up. Also handy to smoke-test after deploy.
// ---------------------------------------------------------------------------
app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// API Routes
// Each sub-router is mounted at its own base path.
// Authentication is enforced inside each router — not globally here —
// so we can mix public and protected routes within the same router file.
// ---------------------------------------------------------------------------
app.use("/api/users",    userRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Add new routers here as you build them out:
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/reviews',  reviewRoutes);
// app.use('/api/messages', messageRoutes);

// ---------------------------------------------------------------------------
// Global error handler
// MUST be the last middleware registered. Catches any error forwarded via
// next(err) from controllers or middleware above.
// ---------------------------------------------------------------------------
app.use(errorHandler);
