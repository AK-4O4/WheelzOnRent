import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createVehicleSchema, updateVehicleSchema } from "../validators/vehicleValidators";
import * as vehicleController from "../controllers/vehicle.controller";

const router = Router();

// Public routes 
router.get("/", vehicleController.getAllVehicles);
router.get("/:id", vehicleController.getVehicleById);

// Authenticated routes
router.get("/mine", requireAuth, vehicleController.getMyVehicles);
router.post("/", requireAuth, validate(createVehicleSchema), vehicleController.createVehicle);
router.patch("/:id", requireAuth, validate(updateVehicleSchema), vehicleController.updateVehicle);
router.delete("/:id", requireAuth, vehicleController.deleteVehicle);

export default router;
