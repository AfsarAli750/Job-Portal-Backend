import mongoose, { Document } from "mongoose";

export interface ISaved extends Document{
    jobId: mongoose.Types.ObjectId,
    seekerId: mongoose.Types.ObjectId,
    status: boolean,
    
} 