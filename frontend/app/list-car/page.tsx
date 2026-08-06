"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ─────────────────────────────────────────────────────────────────
interface FormData {
  // Step 1 — Car details
  make: string;
  model: string;
  year: string;
  plateNumber: string;
  transmission: string;
  fuelType: string;
  seats: string;
  // Step 2 — Location & pricing
  city: string;
  address: string;
  dailyRate: string;
  minDays: string;
  // Step 3 — Photos & docs
  photos: File[];
  registration: File | null;
  insurance: File | null;
  // Step 4 — Rules & availability
  rules: string;
  noSmoking: boolean;
  noPets: boolean;
  instantBook: boolean;
}

const INITIAL: FormData = {
  make: "", model: "", year: "", plateNumber: "",
  transmission: "", fuelType: "", seats: "",
  city: "", address: "", dailyRate: "", minDays: "1",
  photos: [], registration: null, insurance: null,
  rules: "", noSmoking: false, noPets: false, instantBook: false,
};

const STEPS = [
  { id: 1, label: "Car details",      icon: "🚗" },
  { id: 2, label: "Location & price", icon: "📍" },
  { id: 3, label: "Photos & docs",    icon: "📸" },
  { id: 4, label: "Rules",            icon: "📋" },
];

const PAKISTAN_CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Peshawar",
  "Multan", "Faisalabad", "Quetta", "Sialkot", "Gujranwala",
];

const MAKES = ["Toyota", "Honda", "Suzuki", "Hyundai", "KIA", "Daihatsu", "Mitsubishi", "Nissan", "Mercedes", "BMW"];

export default function ListCarPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
    setPhotoUrls((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  }

  function removePhoto(i: number) {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }));
    setPhotoUrls((prev) => prev.filter((_, j) => j !== i));
  }

  function next() { if (step < 4) setStep((s) => s + 1); }
  function back() { if (step > 1) setStep((s) => s - 1); }

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1
            className="text-4xl font-normal text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            Listing submitted!
          </h1>
          <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
            Your <strong>{form.year} {form.make} {form.model}</strong> is under review. We typically approve listings within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/manage-listings"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-7 py-3 rounded-full text-sm transition-all"
            >
              View my listings
            </Link>
            <button
              onClick={() => { setForm(INITIAL); setPhotoUrls([]); setStep(1); setSubmitted(false); }}
              className="border border-slate-200 text-slate-700 font-semibold px-7 py-3 rounded-full text-sm hover:bg-slate-50 transition-all"
            >
              List another car
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link href="/become-host" className="text-sm text-sky-600 hover:underline mb-3 inline-flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Become a host
          </Link>
          <h1
            className="text-4xl font-normal text-slate-900"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
          >
            List your car
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  step === s.id
                    ? "text-sky-700"
                    : s.id < step
                    ? "text-emerald-600 cursor-pointer"
                    : "text-slate-400"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    step === s.id
                      ? "border-sky-600 bg-sky-600 text-white"
                      : s.id < step
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-slate-300 text-slate-400 bg-white"
                  }`}
                >
                  {s.id < step ? "✓" : s.id}
                </span>
                <span className="hidden sm:block">{s.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 rounded-full mx-1 ${s.id < step ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">

          {/* ── STEP 1: Car details ───────────────────────────────────────── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Car details</h2>
                <p className="text-slate-400 text-sm">Tell us about your vehicle.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Make</label>
                  <select
                    value={form.make}
                    onChange={(e) => set("make", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 bg-white"
                    id="list-car-make"
                  >
                    <option value="">Select make</option>
                    {MAKES.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Model</label>
                  <Input
                    placeholder="e.g. Corolla, Civic, Alto"
                    value={form.model}
                    onChange={(e) => set("model", e.target.value)}
                    id="list-car-model"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Year</label>
                  <Input
                    type="number"
                    placeholder="e.g. 2022"
                    min="1990"
                    max={new Date().getFullYear() + 1}
                    value={form.year}
                    onChange={(e) => set("year", e.target.value)}
                    id="list-car-year"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Plate number</label>
                  <Input
                    placeholder="e.g. KHI-2201"
                    value={form.plateNumber}
                    onChange={(e) => set("plateNumber", e.target.value.toUpperCase())}
                    id="list-car-plate"
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Transmission</label>
                  <div className="flex gap-2">
                    {["manual", "automatic"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => set("transmission", t)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${
                          form.transmission === t
                            ? "bg-sky-600 text-white border-sky-600"
                            : "border-slate-200 text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Fuel type</label>
                  <select
                    value={form.fuelType}
                    onChange={(e) => set("fuelType", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 bg-white"
                    id="list-car-fuel"
                  >
                    <option value="">Select</option>
                    <option value="gasoline">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Seats</label>
                  <select
                    value={form.seats}
                    onChange={(e) => set("seats", e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 bg-white"
                    id="list-car-seats"
                  >
                    <option value="">Select</option>
                    {[2, 4, 5, 6, 7, 8].map((n) => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Location & pricing ────────────────────────────────── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Location & pricing</h2>
                <p className="text-slate-400 text-sm">Where is the car based? How much per day?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                <select
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 bg-white"
                  id="list-car-city"
                >
                  <option value="">Select your city</option>
                  {PAKISTAN_CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pickup address / neighbourhood</label>
                <Input
                  placeholder="e.g. DHA Phase 5, Lahore"
                  value={form.address}
                  onChange={(e) => set("address", e.target.value)}
                  id="list-car-address"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Daily rate (PKR)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">PKR</span>
                    <Input
                      type="number"
                      placeholder="e.g. 4500"
                      value={form.dailyRate}
                      onChange={(e) => set("dailyRate", e.target.value)}
                      id="list-car-daily-rate"
                      className="rounded-xl pl-12"
                    />
                  </div>
                  {form.dailyRate && (
                    <p className="text-xs text-slate-400 mt-1.5">
                      Estimated monthly (10 days): <span className="text-emerald-600 font-semibold">PKR {(parseFloat(form.dailyRate) * 10).toLocaleString()}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Minimum days</label>
                  <div className="flex gap-2">
                    {["1", "2", "3"].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => set("minDays", d)}
                        className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                          form.minDays === d
                            ? "bg-sky-600 text-white border-sky-600"
                            : "border-slate-200 text-slate-600 hover:border-slate-400"
                        }`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Market comparison hint */}
              {form.city && (
                <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
                  <p className="text-xs font-semibold text-sky-700 mb-1">💡 Market rates in {form.city}</p>
                  <p className="text-xs text-sky-600">
                    Similar cars typically rent for{" "}
                    <strong>PKR 3,500 – PKR 6,000 / day</strong>. Your price is competitive.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3: Photos & docs ─────────────────────────────────────── */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Photos & documents</h2>
                <p className="text-slate-400 text-sm">Clear photos get 3× more bookings. At least 3 required.</p>
              </div>

              {/* Photo upload */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Car photos</label>
                <label
                  htmlFor="list-car-photos"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-8 cursor-pointer hover:border-sky-400 hover:bg-sky-50/30 transition-all group"
                >
                  <svg className="w-10 h-10 text-slate-300 group-hover:text-sky-400 mb-3 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm font-medium text-slate-600 group-hover:text-sky-600">Click to upload photos</p>
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG · Max 10MB each</p>
                  <input
                    id="list-car-photos"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>

                {/* Preview grid */}
                {photoUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {photoUrls.map((url, i) => (
                      <div key={i} className="relative group aspect-video rounded-xl overflow-hidden bg-slate-100">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-2 left-2 bg-sky-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(i)}
                          className="absolute top-2 right-2 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Documents */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: "registration" as const, label: "Vehicle registration", icon: "📄" },
                  { key: "insurance" as const, label: "Insurance document", icon: "🛡️" },
                ].map(({ key, label, icon }) => (
                  <label
                    key={key}
                    htmlFor={`list-car-${key}`}
                    className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-all ${
                      form[key]
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-slate-200 hover:border-sky-400 hover:bg-sky-50/30"
                    }`}
                  >
                    <span className="text-2xl mb-2">{form[key] ? "✅" : icon}</span>
                    <p className="text-xs font-medium text-center text-slate-600">
                      {form[key] ? (form[key] as File).name : label}
                    </p>
                    <input
                      id={`list-car-${key}`}
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="hidden"
                      onChange={(e) => set(key, e.target.files?.[0] ?? null)}
                    />
                  </label>
                ))}
              </div>
              <p className="text-xs text-slate-400">Documents are verified by our team and never shown to renters.</p>
            </div>
          )}

          {/* ── STEP 4: Rules & preferences ──────────────────────────────── */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">Rules & preferences</h2>
                <p className="text-slate-400 text-sm">Set your house rules so renters know what to expect.</p>
              </div>

              {/* Quick toggles */}
              <div className="space-y-3">
                {[
                  { key: "noSmoking" as const, label: "No smoking", desc: "Renters may not smoke inside the car" },
                  { key: "noPets" as const,    label: "No pets",    desc: "Pets are not allowed in the vehicle" },
                  { key: "instantBook" as const, label: "Instant booking", desc: "Allow renters to book without waiting for approval" },
                ].map(({ key, label, desc }) => (
                  <div
                    key={key}
                    onClick={() => set(key, !form[key])}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      form[key] ? "border-sky-200 bg-sky-50" : "border-slate-200 hover:border-slate-300 bg-white"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{label}</p>
                      <p className="text-xs text-slate-400">{desc}</p>
                    </div>
                    <div
                      className={`w-10 h-6 rounded-full transition-all flex items-center px-0.5 ${
                        form[key] ? "bg-sky-600" : "bg-slate-200"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                          form[key] ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Custom rules */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional rules (optional)</label>
                <textarea
                  placeholder="e.g. Return with a full tank. No long-distance trips without prior notice."
                  value={form.rules}
                  onChange={(e) => set("rules", e.target.value)}
                  rows={4}
                  id="list-car-rules"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-400 resize-none"
                />
              </div>

              {/* Summary preview */}
              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Listing summary</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Car</span>
                    <span className="font-medium">{[form.year, form.make, form.model].filter(Boolean).join(" ") || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plate</span>
                    <span className="font-medium">{form.plateNumber || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">City</span>
                    <span className="font-medium">{form.city || "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Daily rate</span>
                    <span className="font-semibold text-sky-700">
                      {form.dailyRate ? `PKR ${parseInt(form.dailyRate).toLocaleString()}` : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Photos</span>
                    <span className="font-medium">{form.photos.length} uploaded</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-slate-100">
            <button
              onClick={back}
              disabled={step === 1}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-medium disabled:opacity-30 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>

            {step < 4 ? (
              <Button
                onClick={next}
                className="rounded-full bg-sky-600 hover:bg-sky-700 text-white px-8"
                id={`list-car-next-step-${step}`}
              >
                Continue
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            ) : (
              <Button
                onClick={() => setSubmitted(true)}
                className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                id="list-car-submit"
              >
                Submit listing
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
