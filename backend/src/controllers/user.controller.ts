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
 * Passes email from the JWT so the service can auto-create the row
 * if it doesn't exist yet (first-login race condition).
 */
export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.getUserById(
      req.user!.id,
      req.user!.email,
    );
    return res.json({ data: user });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/users/me
 *
 * Updates the current user's editable profile fields.
 * Request body is pre-validated by the validate(updateProfileSchema) middleware.
 * Passes email/name from JWT so the service can upsert the row if missing.
 */
export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const updated = await userService.updateUserById(
      req.user!.id,
      req.body,
      req.user!.email,          // fallback email for upsert
      req.body.fullName,        // preferred name comes from body
    );
    return res.json({ data: updated });
  } catch (err) {
    next(err);
  }
}
