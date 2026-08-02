import { Request, Response } from "express";
import asyncHandler from "express-async-handler"
import {getProfileService, getTotalService, saveProfileService} from "../services/recruiterProfile.service"


export const profileSet = asyncHandler(async (req: Request, res: Response):Promise<any> => {
  console.log("Body:", req.body);
console.log("Files:", req.files);
  const profile = await saveProfileService(req);

  return res.status(201).json({
    success: true,
    data: profile,
    message: "Successfully profile uploaded",
  });
});


export const getProfileController = asyncHandler(async(req: Request , res: Response):Promise<any>=>{
  const profile = await getProfileService(req);
  return res.status(200).json({
    success: true,
    data: profile,
    message: "Successfully profile get"
  })
})

export const getTotalController = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
  const total = await getTotalService(req)
  return res.status(200).json({success: true, data: total, message: "Successfully fetch"})
})