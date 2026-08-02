import mongoose, { Schema} from "mongoose";
import { IJob } from "../interface/job.interface";



const jobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Minimum 3 character required"],
    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Minimum 3 character required"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, "Minimum 5 character required"],
    },
    jobType: {
      type: String,
      enum: {
        values: ["Full-Time", "Part-Time", "Internship"],
        message: "{VALUE} is not a valid job type",
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [20, "Minimum 20 character required"],
    },
    requirements: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, "Minimum 10 character required"],
    },
    salary: {
      type: Number,
      required: true,
      min: [100000, "Salary must be at least 1,00,000"],
      max: [100000000, "Salary cannot exceed 10,00,00,000"],
    },
    experience: {
      type: String,
      enum: {
        values: ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"],
        message: "{VALUE} is not a valid experience",
      },
      required: true,
    },
    skills: {
      type: [String], 
      required: [true, "At least one skill is required"],
      validate: {
        validator: (skills: string[]) => skills && skills.length >= 1,
        message: "Please provide at least one skill",
      },
      set: (skills: string[]) => {
        if (!skills) return skills;
        return skills.map((skill) => skill.trim());
      },
    },
    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
      validate: {
        validator: (date: Date) => date > new Date(),
        message: "Deadline must be in the future",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
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

jobSchema.index({ company: 1, isActive: 1 });
jobSchema.index({ location: 1 });
jobSchema.index({ skills: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
