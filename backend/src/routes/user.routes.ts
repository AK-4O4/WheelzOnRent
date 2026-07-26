import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import * as userController from "../controllers/user.controller";
import { updateProfileSchema } from "../validators/userValidators";

// ---------------------------------------------------------------------------
// User router
//
// All routes here require a valid Supabase JWT — requireAuth is applied to each.
// The base path (/api/users) is set when this router is mounted in app.ts.
// ---------------------------------------------------------------------------
const router = Router();

/**
 * GET /api/users
 * Returns all users — for dev testing and admin use.
 */
router.get("/", requireAuth, userController.getAllUsers);

/**
 * GET /api/users/me
 *
 * Middleware chain:
 *   requireAuth → verifies JWT, attaches req.user
 *   getMe       → fetches & returns the user's public.users row
 */
router.get("/me", requireAuth, userController.getMe);

/**
 * PATCH /api/users/me
 *
 * Middleware chain:
 *   requireAuth              → verifies JWT, attaches req.user
 *   validate(updateProfile)  → validates/sanitises the request body via Zod
 *   updateMe                 → applies partial update to public.users
 *
 * Example body:
 *   { "fullName": "Abdullah Khan", "phoneNumber": "+923001234567" }
 */
router.patch(
  "/me",
  requireAuth,
  validate(updateProfileSchema),
  userController.updateMe,
);

export default router;
