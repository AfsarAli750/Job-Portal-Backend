import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { roleValid, userValid } from "../validators/user.validator";
import { userValidateRequest } from "../utils/userExtract";
import { validateRequest } from "../utils/extractData";
import { UnauthorizedError } from "../utils/apiError";

import {
  registerService,
  loginService,
  roleService,
  deleteUserService,
} from "../services/auth.service";
import { getUserJobSkip } from "../utils/getUserJobSkip";

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "none" as const,
    path: "/",
  };

  const authRegistration = async(res : Response ,accessToken: string, refreshToken: string)=>{
  res.cookie("accessToken", accessToken, {
    ...cookieOption,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    ...cookieOption,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  }

// Signup
export const register = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const { email, password } = await userValidateRequest(req, userValid);

  await registerService(email, password);
  const { accessToken, refreshToken,role } = await loginService(
    email,
    password
  );

  await authRegistration(res, accessToken, refreshToken)
  

  return res.status(201).json({
    success: true,
    message: "Signup successfully",
    role: role
  });
});

// Login
export const login = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const { email, password } = await userValidateRequest(req, userValid);

  const { accessToken, refreshToken, role } = await loginService(
    email,
    password
  );

   await authRegistration(res, accessToken, refreshToken)

  return res.status(200).json({
    success: true,
    message: "Successfully login",
    role:role,
  });
});

// Change Role
export const role = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  console.log("Cookies:", req.cookies);
  const { parsedData, userId } = await validateRequest(req, roleValid);

  await roleService(userId, parsedData.role);

  return res.status(200).json({
    success: true,
    message: "Successfully changed role",
    role: parsedData.role,
  });
});

// Delete Account
export const deleteUser = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const {userId} = await getUserJobSkip(req)

  if (!userId) {
    throw new UnauthorizedError();
  }

  await deleteUserService(userId);

  return res.status(200).json({
    success: true,
    message: "Successfully deleted account",
  });
});


export const logout = asyncHandler(
  async (req: Request, res: Response):Promise<any> => {
    res.clearCookie("accessToken", cookieOption);

    res.clearCookie("refreshToken", cookieOption);

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  }
);