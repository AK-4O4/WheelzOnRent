import { eq, desc, asc } from "drizzle-orm";
import db from "../db";
import { adminReminders } from "../db/schema";
import { AppError } from "../middleware/errorHandler.middleware";

// ---------------------------------------------------------------------------
// reminder.service.ts — admin reminders CRUD
// ---------------------------------------------------------------------------

export async function getReminders() {
  return db
    .select()
    .from(adminReminders)
    .where(eq(adminReminders.isDone, false))
    .orderBy(asc(adminReminders.scheduledAt))
    .limit(10);
}

export async function createReminder(userId: string, data: {
  title: string;
  scheduledAt: string;
  icon?: string;
}) {
  const [row] = await db
    .insert(adminReminders)
    .values({
      title:       data.title,
      scheduledAt: new Date(data.scheduledAt),
      icon:        data.icon ?? "wrench",
      createdBy:   userId,
    })
    .returning();
  if (!row) throw new AppError("Failed to create reminder", 500);
  return row;
}

export async function markReminderDone(id: string) {
  const [row] = await db
    .update(adminReminders)
    .set({ isDone: true })
    .where(eq(adminReminders.id, id))
    .returning();
  if (!row) throw new AppError("Reminder not found", 404);
  return row;
}
