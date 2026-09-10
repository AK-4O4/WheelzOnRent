import type { Request, Response, NextFunction } from "express";
import * as vehicleService from "../services/vehicle.service";
import { vehicleQuerySchema } from "../validators/vehicleValidators";

// ---------------------------------------------------------------------------
// vehicle.controller.ts
// HTTP plumbing only — reads req, calls service, sends response.
// ---------------------------------------------------------------------------

// Typed convenience — stops noUncheckedIndexedAccess from widening req.params.id
type IdParam = { id: string };

/** GET /api/vehicles/stats — vehicle type distribution for Car Types chart */
export async function vehicleTypeStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await vehicleService.getVehicleTypeStats();
    return res.json({ data: stats });
  } catch (err) { next(err); }
}

/** GET /api/vehicles — public browsing with optional filters */
export async function getAllVehicles(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = vehicleQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid query params", details: parsed.error.flatten() });
    }
    const vehicles = await vehicleService.getVehicles(parsed.data);
    return res.json({ data: vehicles, count: vehicles.length });
  } catch (err) {
    next(err);
  }
}

/** GET /api/vehicles/mine — authenticated user's own listings */
export async function getMyVehicles(req: Request, res: Response, next: NextFunction) {
  try {
    const vehicles = await vehicleService.getMyVehicles(req.user!.id);
    return res.json({ data: vehicles, count: vehicles.length });
  } catch (err) {
    next(err);
  }
}

/** GET /api/vehicles/:id — public vehicle detail */
export async function getVehicleById(req: Request<IdParam>, res: Response, next: NextFunction) {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    return res.json({ data: vehicle });
  } catch (err) {
    next(err);
  }
}

/** POST /api/vehicles — authenticated: create a new listing */
export async function createVehicle(req: Request, res: Response, next: NextFunction) {
  try {
    const vehicle = await vehicleService.createVehicle(req.user!.id, req.body);
    return res.status(201).json({ data: vehicle });
  } catch (err) {
    next(err);
  }
}

/** PATCH /api/vehicles/:id — authenticated: edit own listing */
export async function updateVehicle(req: Request<IdParam>, res: Response, next: NextFunction) {
  try {
    const vehicle = await vehicleService.updateVehicle(req.params.id, req.user!.id, req.body);
    return res.json({ data: vehicle });
  } catch (err) {
    next(err);
  }
}

/** DELETE /api/vehicles/:id — authenticated: soft-remove own listing */
export async function deleteVehicle(req: Request<IdParam>, res: Response, next: NextFunction) {
  try {
    await vehicleService.deleteVehicle(req.params.id, req.user!.id);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/vehicles/:id/images — authenticated: attach an image URL to a vehicle.
 *
 * The client uploads the file to Supabase Storage first, then sends the public URL here.
 * Body: { imageUrl: string, isPrimary?: boolean, displayOrder?: number }
 */
export async function addVehicleImage(req: Request<IdParam>, res: Response, next: NextFunction) {
  try {
    const { imageUrl, isPrimary = false, displayOrder = 0 } = req.body;
    if (!imageUrl || typeof imageUrl !== "string") {
      return res.status(400).json({ error: "imageUrl is required" });
    }
    const image = await vehicleService.addVehicleImage(
      req.params.id,
      req.user!.id,
      { imageUrl, isPrimary: Boolean(isPrimary), displayOrder: Number(displayOrder) },
    );
    return res.status(201).json({ data: image });
  } catch (err) {
    next(err);
  }
}
