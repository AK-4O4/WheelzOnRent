import type { Request, Response, NextFunction } from 'express';

// Throw this from services/controllers for expected, client-facing errors
export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Mount this LAST in app.ts, after all routes
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
}