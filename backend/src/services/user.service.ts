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
 * If the row doesn't exist yet in public.users (race condition on first login
 * before the DB trigger fired), returns null instead of throwing.
 *
 * @param userId  - The UUID from req.user.id (mirrors public.users.id)
 * @param email   - Optional: used to auto-create the row if it's missing
 * @param fullName - Optional: used to auto-create the row if it's missing
 */
export async function getUserById(
  userId: string,
  email?: string,
  fullName?: string,
) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    // Auto-create the row if we have enough data (first-login race condition)
    if (email) {
      const name = fullName || email.split("@")[0];
      const [created] = await db
        .insert(users)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .values({ id: userId, email, fullName: name } as any)
        .onConflictDoNothing()
        .returning();
      return created ?? null;
    }
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
 * Uses an UPSERT so it gracefully creates the row if it doesn't exist yet
 * (handles the case where the DB trigger hasn't fired after sign-up).
 *
 * @param userId     - UUID of the user to update
 * @param updateData - Partial set of fields to change
 * @param email      - Fallback email for upsert if row is missing
 * @param fullName   - Fallback full name for upsert if row is missing
 */
export async function updateUserById(
  userId: string,
  updateData: Partial<{
    fullName: string;
    phoneNumber: string;
    profilePictureUrl: string;
  }>,
  email?: string,
  fullName?: string,
) {
  // Try a plain UPDATE first (fast path — row already exists)
  const [updated] = await db
    .update(users)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  if (updated) return updated;

  // Slow path: row missing — upsert it now so the update lands
  const fallbackEmail    = email    ?? `${userId}@unknown.local`;
  const fallbackFullName = updateData.fullName ?? fullName ?? fallbackEmail.split("@")[0];

  const [upserted] = await db
    .insert(users)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .values({
      id:              userId,
      email:           fallbackEmail,
      fullName:        fallbackFullName,
      phoneNumber:     updateData.phoneNumber,
      profilePictureUrl: updateData.profilePictureUrl,
    } as any)
    .onConflictDoUpdate({
      target: users.id,
      set: {
        ...updateData,
        updatedAt: new Date(),
      },
    })
    .returning();

  if (!upserted) throw new AppError("Failed to create/update user profile", 500);
  return upserted;
}
