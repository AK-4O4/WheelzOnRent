import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createVehicleSchema, updateVehicleSchema } from "../validators/vehicleValidators";
import * as vehicleController from "../controllers/vehicle.controller";

const router = Router();

// ── Public routes ─────────────────────────────────────────────────────────────
router.get("/", vehicleController.getAllVehicles);
router.get("/stats", vehicleController.vehicleTypeStats); // type breakdown — public

// ── Authenticated routes (static segments MUST come before /:id) ──────────────
// IMPORTANT: /mine must be registered before /:id — otherwise Express treats
// the literal string "mine" as an :id parameter and calls getVehicleById("mine").
router.get("/mine", requireAuth, vehicleController.getMyVehicles);
router.post("/", requireAuth, validate(createVehicleSchema), vehicleController.createVehicle);

// ── Dynamic-segment routes ────────────────────────────────────────────────────
router.get("/:id", vehicleController.getVehicleById);
router.patch("/:id", requireAuth, validate(updateVehicleSchema), vehicleController.updateVehicle);
router.delete("/:id", requireAuth, vehicleController.deleteVehicle);
router.post("/:id/images", requireAuth, vehicleController.addVehicleImage);

export default router;
