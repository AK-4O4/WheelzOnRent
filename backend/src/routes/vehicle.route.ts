import { Router } from "express";
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import * as vehicleController from '../controllers/vehicle.controller';

const router = Router();

router.get('/', vehicleController.getAllvehicles);
router.post('/', authenticate, requireRole('owner'), vehicleController.createVehicle);

export default router;
