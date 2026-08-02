import { eq, and, gte, lte, sql } from "drizzle-orm";
import db from "../db";
import { vehicles, vehicleImages, users } from "../db/schema";
import { AppError } from "../middleware/errorHandler.middleware";
import type { CreateVehicleInput, UpdateVehicleInput, VehicleQueryInput } from "../validators/vehicleValidators";

// ---------------------------------------------------------------------------
// vehicle.service.ts
// Pure data-access functions. No Express types — controllers handle HTTP.
// ---------------------------------------------------------------------------

/**
 * Fetch a paginated, filtered list of ACTIVE vehicles.
 * Joins the primary image for each vehicle.
 * Public — no auth required.
 */
export async function getVehicles(filters: VehicleQueryInput) {
  const { city, transmission, fuelType, minPrice, maxPrice, seats, page, limit } = filters;
  const offset = (page - 1) * limit;

  const conditions = [eq(vehicles.status, "active")];

  if (city) conditions.push(sql`lower(${vehicles.city}) = lower(${city})`);
  if (transmission) conditions.push(eq(vehicles.transmission, transmission));
  if (fuelType) conditions.push(eq(vehicles.fuelType, fuelType));
  if (seats) conditions.push(eq(vehicles.seats, seats));
  if (minPrice) conditions.push(gte(vehicles.dailyRate, String(minPrice)));
  if (maxPrice) conditions.push(lte(vehicles.dailyRate, String(maxPrice)));

  const rows = await db
    .select({
      id: vehicles.id,
      make: vehicles.make,
      model: vehicles.model,
      year: vehicles.year,
      transmission: vehicles.transmission,
      fuelType: vehicles.fuelType,
      seats: vehicles.seats,
      city: vehicles.city,
      dailyRate: vehicles.dailyRate,
      status: vehicles.status,
      createdAt: vehicles.createdAt,
      ownerId: vehicles.ownerId,
      primaryImage: vehicleImages.imageUrl,
    })
    .from(vehicles)
    .leftJoin(
      vehicleImages,
      and(
        eq(vehicleImages.vehicleId, vehicles.id),
        eq(vehicleImages.isPrimary, true),
      ),
    )
    .where(and(...conditions))
    .limit(limit)
    .offset(offset)
    .orderBy(vehicles.createdAt);

  return rows;
}

/**
 * Fetch a single vehicle with all its images and owner info.
 * Public — no auth required.
 */
export async function getVehicleById(id: string) {
  const [vehicle] = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, id))
    .limit(1);

  if (!vehicle) throw new AppError("Vehicle not found", 404);

  const images = await db
    .select()
    .from(vehicleImages)
    .where(eq(vehicleImages.vehicleId, id))
    .orderBy(vehicleImages.displayOrder);

  const [owner] = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      profilePictureUrl: users.profilePictureUrl,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, vehicle.ownerId))
    .limit(1);

  return { ...vehicle, images, owner: owner ?? null };
}

/**
 * Return all vehicles owned by a specific user (their "My listings").
 * Includes the primary image for each.
 */
export async function getMyVehicles(ownerId: string) {
  const rows = await db
    .select({
      id: vehicles.id,
      make: vehicles.make,
      model: vehicles.model,
      year: vehicles.year,
      transmission: vehicles.transmission,
      fuelType: vehicles.fuelType,
      seats: vehicles.seats,
      city: vehicles.city,
      dailyRate: vehicles.dailyRate,
      status: vehicles.status,
      createdAt: vehicles.createdAt,
      plateNumber: vehicles.plateNumber,
      primaryImage: vehicleImages.imageUrl,
    })
    .from(vehicles)
    .leftJoin(
      vehicleImages,
      and(
        eq(vehicleImages.vehicleId, vehicles.id),
        eq(vehicleImages.isPrimary, true),
      ),
    )
    .where(eq(vehicles.ownerId, ownerId))
    .orderBy(vehicles.createdAt);

  return rows;
}

/**
 * Create a new vehicle listing owned by the authenticated user.
 * Status defaults to "under_review" (set in schema).
 */
export async function createVehicle(ownerId: string, data: CreateVehicleInput) {
  const [created] = await db
    .insert(vehicles)
    .values({
      ownerId,
      make: data.make,
      model: data.model,
      year: data.year,
      plateNumber: data.plateNumber,
      transmission: data.transmission,
      fuelType: data.fuelType,
      seats: data.seats,
      city: data.city,
      dailyRate: String(data.dailyRate),
    })
    .returning();

  return created;
}

/**
 * Update a vehicle. Only the owner can update their own listing.
 * Throws 403 if ownership check fails, 404 if vehicle doesn't exist.
 */
export async function updateVehicle(
  id: string,
  ownerId: string,
  data: UpdateVehicleInput,
) {
  const [existing] = await db
    .select({ ownerId: vehicles.ownerId })
    .from(vehicles)
    .where(eq(vehicles.id, id))
    .limit(1);

  if (!existing) throw new AppError("Vehicle not found", 404);
  if (existing.ownerId !== ownerId) throw new AppError("Forbidden", 403);

  const updatePayload: Record<string, unknown> = { updatedAt: new Date() };
  if (data.make) updatePayload.make = data.make;
  if (data.model) updatePayload.model = data.model;
  if (data.year) updatePayload.year = data.year;
  if (data.plateNumber) updatePayload.plateNumber = data.plateNumber;
  if (data.transmission) updatePayload.transmission = data.transmission;
  if (data.fuelType) updatePayload.fuelType = data.fuelType;
  if (data.seats) updatePayload.seats = data.seats;
  if (data.city) updatePayload.city = data.city;
  if (data.dailyRate) updatePayload.dailyRate = String(data.dailyRate);

  const [updated] = await db
    .update(vehicles)
    .set(updatePayload)
    .where(eq(vehicles.id, id))
    .returning();

  return updated;
}

/**
 * Soft-delete a vehicle by setting status = "suspended".
 * Only the owner can remove their own listing.
 */
export async function deleteVehicle(id: string, ownerId: string) {
  const [existing] = await db
    .select({ ownerId: vehicles.ownerId })
    .from(vehicles)
    .where(eq(vehicles.id, id))
    .limit(1);

  if (!existing) throw new AppError("Vehicle not found", 404);
  if (existing.ownerId !== ownerId) throw new AppError("Forbidden", 403);

  await db
    .update(vehicles)
    .set({ status: "suspended", updatedAt: new Date() })
    .where(eq(vehicles.id, id));
}
