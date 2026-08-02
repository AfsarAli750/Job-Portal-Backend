import {Document} from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "job-seeker" | "recruiter" | "admin";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}