import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import * as vehicleController from "../controllers/vehicle.controller";

const router = Router();

router.get("/", requireAuth, vehicleController.getAllVehicles);
router.get("/:id", requireAuth, vehicleController.getVehicleById);

export default router;
