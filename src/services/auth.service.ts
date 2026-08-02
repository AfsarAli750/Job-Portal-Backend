import bcrypt from "bcryptjs";

import {
  findActiveUserByEmail,
  findActiveUserById,
  findUserByEmail,
} from "../repository/find.db";

import {
  roleSave,
  saveDb,
  userDelete,
} from "../repository/auth.db";

import {
  accessTokenGenerate,
  refreshTokenGenerate,
} from "../utils/auth";

import {
  BadRequestError,
  NotFoundError,
} from "../utils/apiError";

import { Id, Role } from "../types/common";

// Signup
export const registerService = async (
  email: string,
  password: string
) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new BadRequestError("Account already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await saveDb(email, hashedPassword);
};

// Login
export const loginService = async (
  email: string,
  password: string
) => {
  const user = await findActiveUserByEmail(email);

  if (!user) {
    throw new BadRequestError("Invalid email or password");
  }

  const match = await bcrypt.compare(
    password,
    user.password
  );

  if (!match) {
    throw new BadRequestError("Invalid email or password");
  }

  const payload = {
    id: String(user._id),
    role: String(user.role),
  };

  return {
    accessToken: accessTokenGenerate(payload),
    refreshToken: refreshTokenGenerate(payload),
    role: user.role,
  };
};

// Change Role
export const roleService = async (
  userId: Id,
  role: Role
) => {
  const updated = await roleSave(userId, role);

  if (!updated) {
    throw new NotFoundError("User not found");
  }

  return updated;
};

// Delete Account
export const deleteUserService = async (
  userId: Id
) => {
  const user = await findActiveUserById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  await userDelete(userId);
};