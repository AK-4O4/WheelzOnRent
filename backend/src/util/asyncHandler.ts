import type { Request, Response, NextFunction, RequestHandler } from "express";

// Wraps async controller functions so thrown errors reach errorHandler
// instead of crashing the process or needing try/catch everywhere.
export const asyncHandler =
  (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
  ): RequestHandler =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
