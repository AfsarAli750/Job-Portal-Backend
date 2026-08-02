import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  getProfileService,
  profileSetService,
  imageSetService,
  resumeSetService,
  addSkillsService,
  getSeekerDashboardService,
} from "../services/seekerProfile.service";


export const getProfile = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const profile = await getProfileService(req);

  return res.status(200).json({
    success: true,
    data: profile,
  });
});

export const profileSet = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const profile = await profileSetService(req);


  return res.status(201).json({
    success: true,
    data: profile,
    message: "Successfully profile uploaded",
  });
});

export const imageSet = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const profile = await imageSetService(req);

  return res.status(200).json({
    success: true,
    data: profile,
  });
});

export const updateResumeUrl = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const profile = await resumeSetService(req);

  return res.status(200).json({
    success: true,
    data: profile,
  });
});

export const addSkills = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  const profile = await addSkillsService(req);

  return res.status(200).json({
    success: true,
    data: profile,
    message: "New unique skills added successfully",
  });
});


//seeker
export const getSeekerDashboard = asyncHandler(async(req:Request, res: Response):Promise<any> =>{
  
  const data = await getSeekerDashboardService(req)
  console.log(data)
  res.status(200).json({
    success:true,
    data: data,
    message: "Successfully fetch"
  })
})