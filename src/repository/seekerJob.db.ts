import Job from "../models/job.model";
import { JobType, Experience, Id } from "../types/common";



export const getSingleDb = async (jobId: Id) => {
  const job = await Job.findById(jobId);
  if (!job) return null;
  const { owner, ...newJob } = job.toObject();
  return newJob;
};


//get all job for seeker
export const getAllJobDb = async ( skip: number, limit:number) => {
    const filter = { isActive: true };
    const sort = { createdAt: -1 as const };
    const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    return jobs;
};


//get job according to title
export const getTitleJobDb = async (title:string, skip: number) => {
    const filter = {
  title: {
    $regex: String(title),
    $options: "i"
  },
  isActive: true
};
    const sort = { createdAt: -1 as const };
    const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(10)
        .lean()
        .exec();
    return jobs;
};

//get job according to jobType
export const getJobTypeJobDb = async (jobType:JobType, skip: number) => {
    const filter = {
  jobType: {
    $regex: String(jobType),
    $options: "i"
  },
  isActive: true
};
    const sort = { createdAt: -1 as const };
    const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(10)
        .lean()
        .exec();
    return jobs;
};


//get job according to experience
export const getExperienceJobDb = async (experience:Experience, skip: number) => {
    const filter = {
  experience: {
    $regex: String(experience),
    $options: "i"
  },
  isActive: true
};
    const sort = { createdAt: -1 as const };
    const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(10)
        .lean()
        .exec();
    return jobs;
};