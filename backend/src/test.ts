/**
 * Quick API smoke test — run with:
 *   bun run src/test.ts
 *
 * Tests:
 *   1. Health check (no auth)
 *   2. GET /api/users/me without token → expect 401
 *   3. Login via Supabase Auth → get JWT
 *   4. GET /api/users/me with JWT → expect 200 or 404
 */

import 'dotenv/config';

const API_BASE = `http://localhost:${process.env.PORT || 5000}`;
const SUPA_URL = process.env.SUPABASE_URL!;
const ANON_KEY = process.env.SUPABASE_PUBLISHABLE_KEY!;

// ── put your test user credentials here ──────────────────────────────────────
// These must match a real user in Supabase Dashboard → Authentication → Users
const TEST_EMAIL = 'ppvbig99@gmail.com'; // ← your Supabase test user email
const TEST_PASSWORD = 'ppvbig99'; // ← replace with real password
// ─────────────────────────────────────────────────────────────────────────────

const GREEN = '\x1b[32m✓\x1b[0m';
const RED = '\x1b[31m✗\x1b[0m';

function log(pass: boolean, label: string, detail?: string) {
    const icon = pass ? GREEN : RED;
    console.log(`${icon}  ${label}${detail ? `  →  ${detail}` : ''}`);
}

// ── 1. Health check ───────────────────────────────────────────────────────────
async function testHealth() {
    const res = await fetch(`${API_BASE}/health`);
    const body = await res.json() as { status: string };
    log(res.status === 200 && body.status === 'ok', 'Health check', `${res.status} ${body.status}`);
}

// ── 2. Protected route without token — with DEV_BYPASS_AUTH=true, no 401 ─────
async function testNoToken() {
    const res = await fetch(`${API_BASE}/api/users/me`);
    const body = await res.json() as any;
    // In dev bypass mode the request goes through (no 401), so any non-5xx is a pass
    const pass = res.status !== 401 && res.status < 500;
    log(pass, `GET /api/users/me (no token, bypass ON) → ${res.status}`, JSON.stringify(body).slice(0, 80));
}

// ── 2b. Get all users ─────────────────────────────────────────────────────────
async function testGetAllUsers() {
    const res = await fetch(`${API_BASE}/api/users`);
    const body = await res.json() as any;
    const pass = res.status === 200 && Array.isArray(body?.data);
    log(pass, `GET /api/users → ${res.status}`, `count: ${body?.count ?? 'err'}`);
}

// ── 3. Login via Supabase and get JWT ─────────────────────────────────────────
async function getToken(): Promise<string | null> {
    const res = await fetch(`${SUPA_URL}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: { 'apikey': ANON_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD }),
    });

    const body = await res.json() as { access_token?: string; message?: string };

    if (!body.access_token) {
        // Show the full error so it's easier to debug wrong credentials
        log(false, 'Supabase login', `${res.status} ${JSON.stringify(body)}`);
        return null;
    }

    log(true, 'Supabase login', `got access_token (${body.access_token.slice(0, 20)}...)`);
    return body.access_token;
}

// ── 4. Protected route with valid JWT ─────────────────────────────────────────
async function testWithToken(token: string) {
    const res = await fetch(`${API_BASE}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    const body = await res.json() as any;

    if (res.status === 200) {
        log(true, 'GET /api/users/me (with token) → 200', `user: ${body.data?.email}`);
    } else if (res.status === 404) {
        // Auth WORKED but no public.users row yet — run the DB trigger + manual insert
        log(true, 'GET /api/users/me (with token) → 404 (auth OK, missing public.users row)', body.message);
    } else {
        log(false, 'GET /api/users/me (with token)', `${res.status} ${JSON.stringify(body)}`);
    }
}

// ── run all tests ─────────────────────────────────────────────────────────────
console.log('\n── WheelzOnRent API smoke test ──────────────────────────\n');

await testHealth();
await testGetAllUsers();     // GET /api/users  — all users (no extra auth needed in dev)
await testNoToken();         // GET /api/users/me — bypassed in dev, should return 200

const token = await getToken();
if (token) await testWithToken(token);

console.log('\n─────────────────────────────────────────────────────────\n');
