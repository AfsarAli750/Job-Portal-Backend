import mongoose from "mongoose";

export type Id = string | mongoose.Types.ObjectId;

export type Url = string | null;

export type JobType = "Full-Time" | "Part-Time" | "Internship";
export type Experience = "Fresher" | "1-2 Years" | "3-5 Years" | "5+ Years";
export type Status = "Applied" | "Shortlisted" | "Rejected" | "Interview" | "Hired";
export type Role = "recruiter" | "job-seeker"