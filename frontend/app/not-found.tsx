import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found – Ceepii",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center">
      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-sky-100 opacity-60 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-sky-50 opacity-80 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Big 404 */}
        <p
          className="select-none text-[9rem] font-bold leading-none tracking-tight text-sky-100 sm:text-[12rem]"
          aria-hidden="true"
        >
          404
        </p>

        {/* Icon */}
        <div className="-mt-16 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 ring-8 ring-white shadow-lg">
          <svg
            className="h-9 w-9 text-sky-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
            />
          </svg>
        </div>

        {/* Heading */}
        <div className="max-w-md">
          <h1
            className="mb-3 text-4xl font-normal text-slate-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Lost on the road?
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has been
            moved. Let&rsquo;s get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-2 flex flex-col sm:flex-row gap-3">
          <Link
            id="not-found-home-btn"
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-all hover:bg-sky-700 active:scale-[0.98]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            id="not-found-browse-btn"
            href="/cars"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98]"
          >
            Browse Cars
          </Link>
        </div>

        {/* Brand */}
        <p className="mt-4 text-sm text-slate-400">
          <span
            className="font-bold text-sky-600"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Ceep<em className="italic">ii</em>.
          </span>{" "}
          — rent any car, anywhere.
        </p>
      </div>
    </div>
  );
}
