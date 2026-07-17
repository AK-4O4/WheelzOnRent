import { type Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as vehicleService from "../services/vehicle.service"

export const getAllvehicles = asyncHandler(async (req: Request, res: Response) => {
  const vehicle = await vehicleService.findAll(req.query);
  res.json(vehicle);
})

export const createVehicle = asyncHandler(async (req: Request, res: Response) => {
  const vehicle = await vehicleService.create(req.body, req.user!.id);
  res.status(201).json(vehicle);
});
