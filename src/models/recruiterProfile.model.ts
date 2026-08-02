import mongoose, { Schema } from "mongoose";
import { IRecruiterProfile } from "../interface/recruiterProfile";

const ProfileSchema = new Schema<IRecruiterProfile>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Minimum 3 characters required"],
      maxlength: [50, "Maximum 50 characters allowed"],
      set: (value: string): string => {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      },
    },

    profileImage: {
      type: String,
      trim: true,
      default: "",
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: [10, "Minimum 10 characters required"],
      maxlength: [1000, "Maximum 1000 characters allowed"],
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    companyLogo: {
      type: String,
      trim: true,
      default: "",
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
  },
  {
    timestamps: true,
  }
);

const RecruiterProfile = mongoose.model<IRecruiterProfile>(
  "RecruiterProfile",
  ProfileSchema
);

export default RecruiterProfile;