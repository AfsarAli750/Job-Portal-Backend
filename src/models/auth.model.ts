import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/auth.interface";



const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      lowercase: true,
      trim: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: {
        values: ["job-seeker", "recruiter", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "job-seeker",
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.index({ email: 1, isActive: 1 });
userSchema.index({_id:1, isActive:1})

const User = mongoose.model("User", userSchema);

export default User;
