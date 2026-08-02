import mongoose,{Document} from "mongoose";
export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  jobType: "Full-Time" | "Part-Time" | "Internship" | "Remote";
  description: string;
  requirements: string;
  salary: number;
  experience: "Fresher" | "1-2 Years" | "3-5 Years" | "5+ Years";
  skills: string[];
  deadline: Date;
  owner: mongoose.Types.ObjectId;
  isActive: boolean;
}