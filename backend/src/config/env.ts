import "dotenv/config";

function required(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const env = {
  port: process.env.PORT || 5000,
  databaseUrl: required("DATABASE_URL"),

  // Supabase project URL — Dashboard → Settings → API → Project URL
  supabaseUrl: required("SUPABASE_URL"),

  // JWKS endpoint — used to verify JWTs using Supabase's public signing keys (RS256)
  // New Supabase projects use asymmetric signing (RS256 + JWKS), not a shared secret
  // Typically: https://<project-ref>.supabase.co/auth/v1/.well-known/jwks.json
  supabaseJwksUrl: required("SUPABASE_JWKS_URL"),

  // Comma-separated list of allowed CORS origins.
  // Dev example:    http://localhost:3000,http://localhost:8081
  // Prod example:   https://wheelzonrent.com,https://app.wheelzonrent.com
  // Leave empty to block all browser-originated cross-origin requests.
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean),

  nodeEnv: process.env.NODE_ENV || "development",
};
