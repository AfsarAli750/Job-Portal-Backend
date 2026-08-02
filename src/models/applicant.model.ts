import mongoose, { Schema } from "mongoose";
import { IApplication } from "../interface/applicant.interface";



const applicationSchema = new Schema<IApplication>(
    {
        jobId: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
        recruiterId:{
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seekerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: {
                values: ["Applied", "Shotlisted", "Rejected", "InterView", "Hired", "Selected"],
                message: "{VALUE} is not valid status",
            },
            default: "Applied",
        },
    },
    { timestamps: true },
);
applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });
applicationSchema.index({ jobId: 1, status: 1 });
applicationSchema.index({ jobId: 1, recruiterId: 1});
applicationSchema.index({ seekerId: 1, status: 1 });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
