// =============================================================================
// hooks/use-list-car-form.ts
// Manages the multi-step list-car form state and logic.
// Extracted from app/list-car/page.tsx to keep UI purely declarative.
// =============================================================================

"use client";

import { useState } from "react";
import type { ListCarFormData } from "@/types";

const INITIAL: ListCarFormData = {
  make: "", model: "", year: "", plateNumber: "",
  transmission: "", fuelType: "", seats: "",
  city: "", address: "", dailyRate: "", minDays: "1",
  photos: [], registration: null, insurance: null,
  rules: "", noSmoking: false, noPets: false, instantBook: false,
};

export function useListCarForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ListCarFormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  function set<K extends keyof ListCarFormData>(key: K, value: ListCarFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
    setPhotoUrls((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  }

  function removePhoto(i: number) {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }));
    setPhotoUrls((prev) => prev.filter((_, j) => j !== i));
  }

  function next() { if (step < 4) setStep((s) => s + 1); }
  function back() { if (step > 1) setStep((s) => s - 1); }

  function reset() {
    setForm(INITIAL);
    setPhotoUrls([]);
    setStep(1);
    setSubmitted(false);
  }

  return {
    step, setStep,
    form, set,
    submitted, setSubmitted,
    photoUrls,
    handlePhotoChange,
    removePhoto,
    next, back, reset,
  };
}
