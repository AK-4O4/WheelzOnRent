import type { Request, Response, NextFunction } from "express";

// Throw this from services/controllers for expected, client-facing errors
export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Mount this LAST in app.ts, after all routes
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  // Log the full error server-side regardless of environment
  console.error("[Unhandled Error]", err);

  // In development, expose the real error message in the response for easier debugging.
  // In production, always return a generic message so internals are never leaked.
  const isDev = process.env.NODE_ENV !== "production";

  if (isDev && err instanceof Error) {
    // Also expose the root cause (e.g. the PostgresError nested inside DrizzleQueryError)
    const cause =
      (err as any).cause instanceof Error
        ? (err as any).cause.message
        : undefined;
    return res.status(500).json({ error: err.message, cause });
  }

  return res.status(500).json({ error: "Internal server error" });
}
