import User from "../models/auth.model";
import { Id } from "../types/common";

//find by email
export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

//account active or not
export const findActiveUserByEmail = async (email: string) => {
  return await User.findOne({ email, isActive: true });
};

//find by id
export const findUserById = async (id: Id) => {
  return await User.findById(id);
};

//find active user by id
export const findActiveUserById = async (id: Id) => {
  return await User.findOne({ _id: id, isActive: true });
};
