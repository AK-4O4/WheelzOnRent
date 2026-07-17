// import { Request, Response, NextFunction, RequestHandler } from "express";

// export const asyncHandler = (
//   fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
// ) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     return fn(req, res, next).catch(next);
//   };
// };

import { type Request, type Response, type NextFunction, type RequestHandler } from "express";

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) =>
      Promise.resolve(fn(req, res, next)).catch(next);
  