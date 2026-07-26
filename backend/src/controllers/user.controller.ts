import type { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";

// ---------------------------------------------------------------------------
// userController
//
// Responsible only for HTTP plumbing:
//   - reading from req (user, body, params)
//   - calling the appropriate service function
//   - sending the response
//
// No database logic here — that all lives in userService.ts
// ---------------------------------------------------------------------------

/**
 * GET /api/users
 *
 * Returns all users. Useful for dev testing and admin dashboards.
 * In production you'd want to add pagination and restrict to admins only.
 */
export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userService.getAllUsers();
    return res.json({ data: users, count: users.length });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/users/me
 *
 * Returns the full profile of the currently authenticated user.
 * requireAuth middleware must run before this, which populates req.user.
 */
export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    // req.user is guaranteed by requireAuth — safe to assert non-null
    const user = await userService.getUserById(req.user!.id);
    return res.json({ data: user });
  } catch (err) {
    next(err); // forward to errorHandler middleware
  }
}

/**
 * PATCH /api/users/me
 *
 * Updates the current user's editable profile fields.
 * Request body is pre-validated by the validate(updateProfileSchema) middleware.
 */
export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const updated = await userService.updateUserById(req.user!.id, req.body);
    return res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}
