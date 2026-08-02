import { Request } from "express";




import { getUserJobSkip } from "../utils/getUserJobSkip";
import { getApplication, getApplicationStatusDb, setApplied, getAppliedJob, getHiredApplicant, getHiredJob, getInterviewJob, setApplicant, getInterviewApplicant, jobApplicant, getProfile } from "../repository/applicant.db";
import { Id } from "../types/common";



//User
const getApplicationStatusService = async(req: Request)=>{
  const {userId} = await getUserJobSkip(req)
  const jobId = await req.params?.jobId as Id
  const status = await getApplicationStatusDb(jobId, userId)
  return status
}


const getAppliedService= async(req: Request)=>{
  const {userId} = await getUserJobSkip(req)
  const jobId = await req.params?.jobId as Id
  const status = await req.body?.status
  const applicant = await setApplied(jobId, userId, status)
  return applicant?.status
}

const getAppliedJobService = async(req: Request)=>{
  const {userId, skip , limit}= await getUserJobSkip(req) 

  const jobs = await getAppliedJob(userId, skip , limit)
  return jobs
}

const getHiredJobService = async(req: Request)=>{
  const {userId, skip , limit}= await getUserJobSkip(req) 

  const jobs = await getHiredJob(userId, skip , limit)
  return jobs
}


const getInterviewJobService = async(req: Request)=>{
  const {userId, skip , limit}= await getUserJobSkip(req) 

  const jobs = await getInterviewJob(userId, skip , limit)
  return jobs
}

//recruiter
const getProfileServices = async(req: Request)=>{
  const applicantId = req.params?.applicantId as Id
  const profile = await getProfile(applicantId)
  return profile
}
const setApplicantService = async(req: Request)=>{
  const {userId} = await getUserJobSkip(req)
  const status = req.body?.status
  console.log(status)
  const applicantId = req.params?.applicantId as Id
  const applicant = await setApplicant(userId, applicantId, status)
  return applicant?.status
}

const jobApplicantService= async(req: Request)=>{
  const {userId, skip, limit} = await getUserJobSkip(req)
  const applicant = await jobApplicant(userId, skip, limit)
  return applicant
}

const getApplicantService = async(req: Request)=>{
  const {userId, skip , limit}= await getUserJobSkip(req)
  const jobId = req.params?.jobId as Id
  console.log(userId, jobId, skip , limit) 

  const jobs = await getApplication(userId, jobId, skip , limit)
  return jobs
}

const getHiredService = async(req: Request)=>{
  const {userId, skip , limit}= await getUserJobSkip(req) 

  const jobs = await getHiredApplicant(userId, skip , limit)
  return jobs
}

const getInterviewService = async(req: Request)=>{
  const {userId, skip , limit}= await getUserJobSkip(req) 

  const jobs = await getInterviewApplicant(userId, skip , limit)
  return jobs
}

export {getAppliedJobService, getAppliedService, getHiredJobService, getInterviewJobService,
  getApplicantService, getHiredService, getInterviewService, getApplicationStatusService,
  setApplicantService, jobApplicantService, getProfileServices
} 

