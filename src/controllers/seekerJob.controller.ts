import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import {
  getAllJobService,
  getTitleJobService,
  getJobTypeJobService,
  getExperienceJobService,
  getSingleService,
} from "../services/seekerJob.service";


export const getSingleJob= asyncHandler(async(req: Request, res: Response):Promise<any>=>{
  const response = await getSingleService(req)

  return res.status(200).json({success:true, data:response, message: "Successfully fetch"})
})

export const getAllJob = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const jobs = await getAllJobService(req);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  }
);

export const getTitleJob = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const jobs = await getTitleJobService(req);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  }
);

export const getJobTypeJob = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const jobs = await getJobTypeJobService(req);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  }
);

export const getExperienceJob = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const jobs = await getExperienceJobService(req);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  }
);