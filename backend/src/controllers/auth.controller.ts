import { type Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import * as authService from "../services/auth.service";

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json(user);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    res.json(user);
});
