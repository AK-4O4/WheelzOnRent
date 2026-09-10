// =============================================================================
// hooks/use-list-car-form.ts
// Manages the multi-step list-car form state, validation, and submission.
// Submission flow:
//   1. Get Supabase session → verify auth
//   2. Upload each photo to Supabase Storage (vehicle-images bucket)
//   3. POST /api/vehicles with JSON metadata → receive vehicleId
//   4. POST /api/vehicles/:id/images for each photo URL
//   5. Redirect to /account?tab=listings&submitted=1
// =============================================================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createVehicle, addVehicleImage } from "@/lib/api";
import type { ListCarFormData } from "@/types";

const INITIAL: ListCarFormData = {
  make: "", model: "", year: "", plateNumber: "",
  transmission: "", fuelType: "", seats: "",
  city: "", address: "", dailyRate: "", minDays: "1",
  photos: [], registration: null, insurance: null,
  rules: "", noSmoking: false, noPets: false, instantBook: false,
};

// ── Field-level validation ──────────────────────────────────────────────────

export type FormErrors = Partial<Record<keyof ListCarFormData, string>>;

function validateStep(step: number, form: ListCarFormData): FormErrors {
  const errors: FormErrors = {};
  if (step === 1) {
    if (!form.make.trim()) errors.make = "Make is required";
    if (!form.model.trim()) errors.model = "Model is required";
    const yr = Number(form.year);
    if (!form.year || isNaN(yr) || yr < 1980 || yr > new Date().getFullYear() + 1)
      errors.year = `Year must be between 1980 and ${new Date().getFullYear() + 1}`;
    if (!form.plateNumber.trim()) errors.plateNumber = "Plate number is required";
    if (!form.transmission) errors.transmission = "Select a transmission type";
    if (!form.fuelType) errors.fuelType = "Select a fuel type";
    if (!form.seats || Number(form.seats) < 1) errors.seats = "Select number of seats";
  }
  if (step === 2) {
    if (!form.city.trim()) errors.city = "City is required";
    const rate = Number(form.dailyRate);
    if (!form.dailyRate || isNaN(rate) || rate <= 0) errors.dailyRate = "Enter a valid daily rate";
  }
  if (step === 3) {
    if (form.photos.length === 0) errors.photos = "Upload at least one photo";
  }
  return errors;
}

// ── Storage helper ──────────────────────────────────────────────────────────

const STORAGE_BUCKET = "vehicle-images";

/**
 * Upload a file to Supabase Storage and return its public URL.
 * Files are stored as: vehicle-images/<userId>/<timestamp>-<filename>
 */
async function uploadPhoto(file: File, userId: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { upsert: false, contentType: file.type });

  if (error) throw new Error(`Photo upload failed: ${error.message}`);

  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useListCarForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ListCarFormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  function set<K extends keyof ListCarFormData>(key: K, value: ListCarFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear the error for that field as the user types
    if (errors[key]) setErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    setForm((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
    setPhotoUrls((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    if (errors.photos) setErrors((prev) => { const next = { ...prev }; delete next.photos; return next; });
  }

  function removePhoto(i: number) {
    setForm((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }));
    setPhotoUrls((prev) => prev.filter((_, j) => j !== i));
  }

  function next() {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    if (step < 4) setStep((s) => s + 1);
  }

  function back() {
    setErrors({});
    if (step > 1) setStep((s) => s - 1);
  }

  function reset() {
    setForm(INITIAL);
    setPhotoUrls([]);
    setStep(1);
    setSubmitted(false);
    setSubmitError(null);
    setErrors({});
  }

  async function submitListing() {
    // Validate final step
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      // 1. Ensure user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const userId = session.user.id;

      // 2. Upload photos to Supabase Storage (in parallel)
      let uploadedUrls: string[] = [];
      if (form.photos.length > 0) {
        uploadedUrls = await Promise.all(
          form.photos.map((file) => uploadPhoto(file, userId))
        );
      }

      // 3. Create the vehicle record
      const vehicleRes = await createVehicle({
        make: form.make.trim(),
        model: form.model.trim(),
        year: Number(form.year),
        plateNumber: form.plateNumber.trim().toUpperCase(),
        transmission: form.transmission as "manual" | "automatic",
        fuelType: form.fuelType as "gasoline" | "diesel" | "electric" | "hybrid",
        seats: Number(form.seats),
        city: form.city.trim(),
        dailyRate: Number(form.dailyRate),
      });

      const vehicleId = (vehicleRes as { data: { id: string } }).data.id;

      // 4. Attach image records (first one is primary)
      if (uploadedUrls.length > 0) {
        await Promise.all(
          uploadedUrls.map((url, i) =>
            addVehicleImage(vehicleId, url, i === 0, i)
          )
        );
      }

      // 5. Success — redirect to account listings tab
      setSubmitted(true);
      router.push("/account?tab=listings&submitted=1");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(msg);
      console.error("[submitListing]", err);
    } finally {
      setSubmitting(false);
    }
  }

  return {
    step, setStep,
    form, set,
    errors,
    submitted, setSubmitted,
    submitting,
    submitError,
    photoUrls,
    handlePhotoChange,
    removePhoto,
    next, back, reset,
    submitListing,
  };
}
