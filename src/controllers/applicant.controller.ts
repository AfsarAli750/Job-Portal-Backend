import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { getApplicantService, getApplicationStatusService, getAppliedJobService, getAppliedService, getHiredJobService, getHiredService, getInterviewJobService, getInterviewService, getProfileServices, jobApplicantService, setApplicantService } from "../services/applicant.service";





// User Apply Job
const getApplicationStatusController= asyncHandler(async(req: Request, res: Response):Promise<any>=>{
  const status = await getApplicationStatusService(req)
  console.log(status)
  return res.status(200).json({success: true, data: status, message: "Successfully fetfch"})
})



const getAppliedController = asyncHandler(async(req: Request, res: Response):Promise<any>=>{
  const applicant = await getAppliedService(req)
  return res.status(200).json({success:true, data: applicant})
})

const getAppliedJobController = asyncHandler(async(req:Request, res: Response):Promise<any>=>{
  const jobs = await getAppliedJobService(req)
  return res.status(200).json({success: true, data:jobs})
})


const getHiredJobController = asyncHandler(async(req:Request, res: Response):Promise<any>=>{
  const jobs = await getHiredJobService(req)
  return res.status(200).json({success: true, data:jobs})
})

const getInterviewJobController = asyncHandler(async(req:Request, res: Response):Promise<any>=>{
  const jobs = await getInterviewJobService(req)
  return res.status(201).json({success: true, data:jobs})
})

//recruiter
const getProfileController = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
  const profile = await getProfileServices(req)
  res.status(200).json({success: true, data: profile, message: "Successfully fetch"})
})


const setApplicantController = asyncHandler(async(req: Request, res: Response):Promise<any>=>{
  const status = await setApplicantService(req)
  console.log(status)
  res.status(201).json({success: true, data: status, message: "Successful change status"})
})

const jobApplicantController = asyncHandler(async(req: Request, res: Response): Promise<any>=>{
  const applicant = await jobApplicantService(req)
  res.status(200).json({success: true, data: applicant, message: "Successfully fetch"})
})
const getApplicantController = asyncHandler(async(req:Request, res: Response):Promise<any>=>{
  const jobs = await getApplicantService(req)
  return res.status(200).json({success: true, data:jobs})
})

const getHiredController = asyncHandler(async(req:Request, res: Response):Promise<any>=>{
  const jobs = await getHiredService(req)
  return res.status(201).json({success: true, data:jobs})
})

const getInterviewController = asyncHandler(async(req:Request, res: Response):Promise<any>=>{
  const jobs = await getInterviewService(req)
  return res.status(201).json({success: true, data:jobs})
})

export {getAppliedJobController, getAppliedController, getHiredJobController, getInterviewJobController,
  getApplicantController, getHiredController, getInterviewController, getApplicationStatusController,
  setApplicantController, jobApplicantController, getProfileController
}