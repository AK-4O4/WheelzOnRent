"use client";
import { useState, useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={tab === "login" ? "Log in" : "Create account"}
        style={{ animation: "slideInRight 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
          <span
            className="text-2xl font-bold text-sky-600"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Ceep<em className="italic">ii</em>.
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 mx-8 mt-6 p-1 bg-slate-100 rounded-full">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              tab === "login"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            id="auth-tab-login"
          >
            Log in
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              tab === "signup"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            id="auth-tab-signup"
          >
            Create account
          </button>
        </div>

        {/* Form */}
        <form
          className="flex flex-col gap-5 px-8 pt-8 pb-10 flex-1"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <p
              className="text-2xl leading-tight mb-1"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              {tab === "login" ? "Welcome back" : "Join Ceepii"}
            </p>
            <p className="text-sm text-slate-500">
              {tab === "login"
                ? "Sign in to manage your bookings and listings."
                : "Create a free account to start renting or hosting."}
            </p>
          </div>

          {tab === "signup" && (
            <div>
              <label htmlFor="auth-name" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Full name
              </label>
              <input
                id="auth-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jordan Mercer"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-600 mb-1.5">
              Email address
            </label>
            <input
              id="auth-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="auth-password" className="text-xs font-semibold text-slate-600">
                Password
              </label>
              {tab === "login" && (
                <button type="button" className="text-xs text-sky-600 hover:text-sky-700">
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                id="auth-password"
                name="password"
                type={showPass ? "text" : "password"}
                autoComplete={tab === "login" ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id={tab === "login" ? "auth-login-btn" : "auth-signup-btn"}
            className="w-full bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white font-semibold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-sky-200"
          >
            {tab === "login" ? "Log in" : "Create account"}
          </button>

          {tab === "signup" && (
            <p className="text-xs text-slate-400 text-center leading-relaxed">
              By creating an account you agree to our{" "}
              <a href="#" className="text-sky-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-sky-600 hover:underline">Privacy Policy</a>.
            </p>
          )}

          <div className="relative flex items-center gap-3 my-1">
            <hr className="flex-1 border-slate-200" />
            <span className="text-xs text-slate-400">or</span>
            <hr className="flex-1 border-slate-200" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>
        </form>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
