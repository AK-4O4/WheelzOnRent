import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../config/env";

// Log which host/port we're connecting to at startup (never logs the password)
const dbUrl = new URL(env.databaseUrl);
console.log(
    `[DB] Connecting to ${dbUrl.hostname}:${dbUrl.port} as ${dbUrl.username}`,
);

const url = new URL(env.databaseUrl);

console.log({
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port,
    username: url.username,
    pathname: url.pathname,
});

// Supabase session-mode pooler works on port 5432.
// Transaction-mode pooler works on port 6543 but requires prepare:false.
// We keep prepare:false to be safe with both modes.
const client = postgres(env.databaseUrl, {
    prepare: false,
    ssl: 'require',
    connect_timeout: 15, // fail fast if Supabase is unreachable
});

const db = drizzle({ client });

export default db;
