import { eq, and, desc, count, sum, sql, ilike } from "drizzle-orm";
import db from "../db";
import { bookings, vehicles, users, vehicleImages, payments } from "../db/schema";
import { AppError } from "../middleware/errorHandler.middleware";

// ---------------------------------------------------------------------------
// booking.service.ts — data-access for bookings (admin + renter views)
// ---------------------------------------------------------------------------

export interface BookingFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

/** Admin: all bookings with renter + vehicle info, filterable + paginated */
export async function getAllBookings(filters: BookingFilters) {
  const { status, search, page = 1, limit = 20 } = filters;
  const offset = (page - 1) * limit;

  const rows = await db
    .select({
      id:           bookings.id,
      startDate:    bookings.startDate,
      endDate:      bookings.endDate,
      totalAmount:  bookings.totalAmount,
      status:       bookings.status,
      pickupAddress: bookings.pickupAddress,
      createdAt:    bookings.createdAt,
      renterName:   users.fullName,
      renterEmail:  users.email,
      vehicleMake:  vehicles.make,
      vehicleModel: vehicles.model,
      vehicleYear:  vehicles.year,
      plateNumber:  vehicles.plateNumber,
    })
    .from(bookings)
    .innerJoin(users,    eq(users.id,    bookings.renterId))
    .innerJoin(vehicles, eq(vehicles.id, bookings.vehicleId))
    .where(
      and(
        status ? eq(bookings.status, status as "pending" | "confirmed" | "ongoing" | "completed" | "cancelled") : undefined,
        search ? ilike(users.fullName, `%${search}%`) : undefined,
      )
    )
    .orderBy(desc(bookings.createdAt))
    .limit(limit)
    .offset(offset);

  return rows;
}

/** Admin: booking status counts (for stat cards) */
export async function getBookingStats() {
  const rows = await db
    .select({
      status: bookings.status,
      count:  count(),
    })
    .from(bookings)
    .groupBy(bookings.status);

  const base = { pending: 0, confirmed: 0, ongoing: 0, completed: 0, cancelled: 0 };
  for (const r of rows) {
    base[r.status as keyof typeof base] = Number(r.count);
  }
  return base;
}

/** Admin: update booking status */
export async function updateBookingStatus(bookingId: string, status: string) {
  const validStatuses = ["pending", "confirmed", "ongoing", "completed", "cancelled"];
  if (!validStatuses.includes(status)) throw new AppError("Invalid status", 400);

  const [updated] = await db
    .update(bookings)
    .set({
      status: status as "pending" | "confirmed" | "ongoing" | "completed" | "cancelled",
      updatedAt: new Date(),
    })
    .where(eq(bookings.id, bookingId))
    .returning();

  if (!updated) throw new AppError("Booking not found", 404);
  return updated;
}

/** Admin: total revenue from completed payments */
export async function getTotalRevenue() {
  const [row] = await db
    .select({ total: sum(payments.amount) })
    .from(payments)
    .where(eq(payments.status, "completed"));
  return Number(row?.total ?? 0);
}

/** Admin: KPI numbers */
export async function getAdminKpis() {
  const [revenue, bookingStats, vehicleStats] = await Promise.all([
    getTotalRevenue(),
    getBookingStats(),
    db.select({
      total:    count(),
      rented:   sql<number>`count(*) filter (where status = 'active')`,
    }).from(vehicles),
  ]);

  const totalVehicles = Number(vehicleStats[0]?.total ?? 0);
  const rented = await db
    .select({ c: count() })
    .from(bookings)
    .where(eq(bookings.status, "ongoing"));

  return {
    totalRevenue: revenue,
    newBookings:  bookingStats.pending + bookingStats.confirmed,
    rentedUnits:  Number(rented[0]?.c ?? 0),
    available:    totalVehicles - Number(rented[0]?.c ?? 0),
    bookingStats,
  };
}

/** Admin: recent activity feed — last 10 booking events */
export async function getRecentActivity() {
  const rows = await db
    .select({
      bookingId:   bookings.id,
      status:      bookings.status,
      createdAt:   bookings.createdAt,
      renterName:  users.fullName,
      renterAvatar: users.profilePictureUrl,
      make:        vehicles.make,
      model:       vehicles.model,
      plateNumber: vehicles.plateNumber,
    })
    .from(bookings)
    .innerJoin(users,    eq(users.id,    bookings.renterId))
    .innerJoin(vehicles, eq(vehicles.id, bookings.vehicleId))
    .orderBy(desc(bookings.createdAt))
    .limit(10);

  return rows.map((r) => ({
    who:    r.renterName,
    avatar: r.renterAvatar ?? `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(r.renterName?.slice(0, 2) ?? "U")}`,
    what:   statusToAction(r.status, `${r.make} ${r.model} (${r.plateNumber})`),
    time:   timeAgo(r.createdAt),
  }));
}

function statusToAction(status: string, car: string) {
  if (status === "completed") return `completed a booking for ${car}.`;
  if (status === "ongoing")   return `is on a trip with ${car}.`;
  if (status === "cancelled") return `cancelled a booking for ${car}.`;
  return `created a new booking for ${car}.`;
}

function timeAgo(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  return `${Math.floor(h / 24)} day${Math.floor(h / 24) > 1 ? "s" : ""} ago`;
}

/** Monthly booking counts for area chart (last 12 months) */
export async function getMonthlyBookings() {
  const result = await db.execute(sql`
    SELECT
      to_char(created_at, 'Mon') AS month,
      extract(month from created_at)::int AS month_num,
      extract(year  from created_at)::int AS year,
      count(*)::int AS count
    FROM bookings
    WHERE created_at >= now() - interval '12 months'
    GROUP BY month, month_num, year
    ORDER BY year, month_num
  `);
  return (result as unknown as { rows: { month: string; month_num: number; year: number; count: number }[] }).rows ?? result as unknown as { month: string; month_num: number; year: number; count: number }[];
}

/** Monthly income (payments) vs expenses — last 8 months — for Cashflow chart */
export async function getCashflow() {
  const incomeResult = await db.execute(sql`
    SELECT
      to_char(created_at, 'Mon') AS month,
      extract(month from created_at)::int AS month_num,
      coalesce(sum(amount), 0)::numeric AS income
    FROM payments
    WHERE status = 'completed'
      AND created_at >= now() - interval '8 months'
    GROUP BY month, month_num
    ORDER BY month_num
  `);

  const expenseResult = await db.execute(sql`
    SELECT
      to_char(expense_date::date, 'Mon') AS month,
      extract(month from expense_date::date)::int AS month_num,
      coalesce(sum(amount), 0)::numeric AS expense
    FROM expenses
    WHERE expense_date::date >= now() - interval '8 months'
    GROUP BY month, month_num
    ORDER BY month_num
  `);

  type IncomeRow   = { month: string; month_num: number; income: number };
  type ExpenseRow  = { month: string; month_num: number; expense: number };

  const incomeRows  = ((incomeResult  as unknown as { rows: IncomeRow[]  }).rows  ?? incomeResult  as unknown as IncomeRow[]);
  const expenseRows = ((expenseResult as unknown as { rows: ExpenseRow[] }).rows ?? expenseResult as unknown as ExpenseRow[]);

  // Merge by month_num
  const merged: Record<number, { month: string; income: number; expense: number }> = {};
  for (const r of incomeRows)  merged[r.month_num] = { month: r.month, income: Number(r.income), expense: 0 };
  for (const r of expenseRows) {
    const existing = merged[r.month_num];
    if (existing) existing.expense = Number(r.expense);
    else merged[r.month_num] = { month: r.month, income: 0, expense: Number(r.expense) };
  }

  // Numeric sort by month_num key
  return Object.entries(merged)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([, v]) => v);
}
