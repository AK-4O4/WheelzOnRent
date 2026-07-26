import { eq } from "drizzle-orm";
import db from "../db";
import { users } from "../db/schema";
import { AppError } from "../middleware/errorHandler.middleware";

// ---------------------------------------------------------------------------
// userService
//
// Pure data-access functions — no Express types in here.
// Controllers call these and handle the HTTP response layer.
// ---------------------------------------------------------------------------

/**
 * Fetch the public profile for a given user ID.
 *
 * @param userId - The UUID from req.user.id (mirrors public.users.id)
 * @throws AppError(404) if the user row doesn't exist in public.users yet
 */
export async function getUserById(userId: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    // This can happen if Supabase auth.users has the user but the DB trigger
    // hasn't created the public.users row yet (race condition on first login).
    throw new AppError("User profile not found", 404);
  }

  return user;
}

/**
 * Fetch all users — admin / dev use only.
 * Returns every row in public.users ordered newest first.
 */
export async function getAllUsers() {
  const allUsers = await db.select().from(users).orderBy(users.createdAt);

  return allUsers;
}

/**
 * Update mutable profile fields for a given user.
 * Only the fields explicitly passed are changed — undefined keys are ignored.
 *
 * @param userId     - UUID of the user to update
 * @param updateData - Partial set of fields to change
 */
export async function updateUserById(
  userId: string,
  updateData: Partial<{
    fullName: string;
    phoneNumber: string;
    profilePictureUrl: string;
  }>,
) {
  const [updated] = await db
    .update(users)
    .set({
      ...updateData,
      updatedAt: new Date(), // keep updatedAt fresh
    })
    .where(eq(users.id, userId))
    .returning(); // returns the full updated row

  if (!updated) {
    throw new AppError("User not found", 404);
  }

  return updated;
}
