import type { Request, Response, NextFunction } from "express";
import * as bookingService from "../services/booking.service";

// ---------------------------------------------------------------------------
// booking.controller.ts — HTTP plumbing for booking routes
// ---------------------------------------------------------------------------

type IdParam = { id: string };

/** GET /api/bookings — admin list with optional ?status=&search=&page= */
export async function listBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, search, page, limit } = req.query;
    const rows = await bookingService.getAllBookings({
      status:  status  as string | undefined,
      search:  search  as string | undefined,
      page:    page  ? Number(page)  : 1,
      limit:   limit ? Number(limit) : 20,
    });
    return res.json({ data: rows, count: rows.length });
  } catch (err) { next(err); }
}

/** GET /api/bookings/stats — counts per status */
export async function bookingStats(req: Request, res: Response, next: NextFunction) {
  try {
    const stats = await bookingService.getBookingStats();
    return res.json({ data: stats });
  } catch (err) { next(err); }
}

/** GET /api/bookings/kpis — full admin KPI block */
export async function adminKpis(req: Request, res: Response, next: NextFunction) {
  try {
    const kpis = await bookingService.getAdminKpis();
    return res.json({ data: kpis });
  } catch (err) { next(err); }
}

/** GET /api/bookings/activity — recent activity feed */
export async function recentActivity(req: Request, res: Response, next: NextFunction) {
  try {
    const feed = await bookingService.getRecentActivity();
    return res.json({ data: feed });
  } catch (err) { next(err); }
}

/** GET /api/bookings/monthly — monthly counts for area chart */
export async function monthlyBookings(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await bookingService.getMonthlyBookings();
    return res.json({ data: rows });
  } catch (err) { next(err); }
}

/** PATCH /api/bookings/:id/status — update booking status */
export async function updateStatus(req: Request<IdParam>, res: Response, next: NextFunction) {
  try {
    const { status } = req.body as { status: string };
    if (!status) return res.status(400).json({ error: "status is required" });
    const updated = await bookingService.updateBookingStatus(req.params.id, status);
    return res.json({ data: updated });
  } catch (err) { next(err); }
}

/** GET /api/bookings/cashflow — monthly income vs expenses */
export async function cashflow(req: Request, res: Response, next: NextFunction) {
  try {
    const rows = await bookingService.getCashflow();
    return res.json({ data: rows });
  } catch (err) { next(err); }
}
