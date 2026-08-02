import mongoose,{Document} from "mongoose";

export interface IApplication extends Document {
    jobId: mongoose.Types.ObjectId;
    recruiterId: mongoose.Types.ObjectId;
    seekerId: mongoose.Types.ObjectId;
    status: "Applied" | "Shortlisted" | "Rejected" | "Interview" | "Hired" | "Selected";
    createdAt: Date;
    updatedAt: Date;
}
