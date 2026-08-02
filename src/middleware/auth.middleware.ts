import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UnauthorizedError } from "../utils/apiError";
import { accessTokenGenerate, verifyToken } from "../utils/auth";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Cookies:", req.cookies);
    let accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    let userPayload = null;

    if (accessToken) {
      userPayload = verifyToken(accessToken);
    }

    if (!userPayload && refreshToken) {
      const refreshPayload = verifyToken(refreshToken);

      if (refreshPayload) {
        const newPayload = { id: refreshPayload.id, role: refreshPayload.role };
        const newAccessToken = accessTokenGenerate(newPayload);

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        });
        userPayload = newPayload;
      }
    }
    if (!userPayload) {
      throw new UnauthorizedError("You are not logged in. Please login again.");
    }

    req.user = userPayload;
    next();
  },
);
