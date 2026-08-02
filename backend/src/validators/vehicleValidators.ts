import { z } from "zod";

// ---------------------------------------------------------------------------
// vehicleValidators.ts
// Zod schemas for vehicle-related request bodies and query strings.
// ---------------------------------------------------------------------------

/**
 * Schema for POST /api/vehicles — creating a new listing.
 */
export const createVehicleSchema = z.object({
  make:         z.string().min(1).max(60),
  model:        z.string().min(1).max(60),
  year:         z.number().int().min(1980).max(new Date().getFullYear() + 1),
  plateNumber:  z.string().min(2).max(20),
  transmission: z.enum(["manual", "automatic"]),
  fuelType:     z.enum(["gasoline", "diesel", "electric", "hybrid"]),
  seats:        z.number().int().min(1).max(20),
  city:         z.string().min(1).max(100),
  dailyRate:    z.number().positive().max(100_000),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;

/**
 * Schema for PATCH /api/vehicles/:id — updating an existing listing.
 * All fields are optional — only provided ones are changed.
 */
export const updateVehicleSchema = createVehicleSchema.partial();

export type UpdateVehicleInput = z.infer<typeof updateVehicleSchema>;

/**
 * Schema for GET /api/vehicles query string params.
 */
export const vehicleQuerySchema = z.object({
  city:         z.string().optional(),
  transmission: z.enum(["manual", "automatic"]).optional(),
  fuelType:     z.enum(["gasoline", "diesel", "electric", "hybrid"]).optional(),
  minPrice:     z.coerce.number().positive().optional(),
  maxPrice:     z.coerce.number().positive().optional(),
  seats:        z.coerce.number().int().positive().optional(),
  page:         z.coerce.number().int().min(1).default(1),
  limit:        z.coerce.number().int().min(1).max(50).default(20),
});

export type VehicleQueryInput = z.infer<typeof vehicleQuerySchema>;
