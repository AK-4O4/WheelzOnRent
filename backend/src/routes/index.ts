import { Router } from "express";
import vehicleRoutes from "./vehicle.route";

const router = Router();

router.use("/vehicles", vehicleRoutes);

export default router;
