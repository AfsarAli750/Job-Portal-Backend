import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  createJobService,
  updateJobService,
  deleteJobService,
  getAllJobService,
} from "../services/recruiter.service";

export const createJob = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const job = await createJobService(req);

  return res.status(201).json({
    success: true,
    data: job,
    message: "Successfully job created",
  });
});

export const updateJob = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const job = await updateJobService(req);

  return res.status(200).json({
    success: true,
    data: job,
    message: "Successfully job updated",
  });
});

export const jobDelete = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const job = await deleteJobService(req);

  return res.status(200).json({
    success: true,
    data: job,
    message: "Job deleted successfully",
  });
});

export const getAllJob = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const jobs = await getAllJobService(req);

  return res.status(200).json({
    success: true,
    data: jobs,
    message: "Successfully fetch",
  });
});