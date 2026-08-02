import { Request } from "express";
import { BadRequestError, NotFoundError, UnauthorizedError } from "./apiError";
import { findActiveUserById } from "../repository/find.db";
import mongoose from "mongoose";

export const getUserJobSkip = async (req: Request) => {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedError();

    const user = await findActiveUserById(userId);
    if (!user) throw new NotFoundError("User not found");

    const page = Math.max(1, parseInt(req.query?.page as string) || 1);
    const limit = Math.max(1, parseInt(req.query?.limit as string) || 1);
    const skip = (page - 1) * 10;

    const jobId = req.params.jobId as string; // could be string | string[] | undefined

    if (jobId) {
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            throw new BadRequestError("Invalid job ID");
        }

        return { userId, skip, jobId , limit};
    }

    return { userId, skip,limit };
};
