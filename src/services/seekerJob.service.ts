import { Request } from "express";
import { Experience, Id, JobType } from "../types/common";
import { getUserJobSkip } from "../utils/getUserJobSkip";

import {
  getAllJobDb,
  getExperienceJobDb,
  getJobTypeJobDb,
  getSingleDb,
  getTitleJobDb,
} from "../repository/seekerJob.db";
import { getCompanyLogo} from "../repository/recruiterProfile.db";
import {getJobStatusDb} from "../repository/saved.db"

const removeOwner = <T extends { owner: unknown }>(jobs: T[]) => {
  return jobs.map(({ owner, ...rest }) => rest);
};


export const getSingleService= async(req : Request)=>{
  const jobId = await req.params?.jobId as Id
  const res = await getSingleDb(jobId)
  return res
}

export const getAllJobService = async (req: Request) => {
  const { userId, skip, limit } = await getUserJobSkip(req);

  const jobs = await getAllJobDb(skip, limit);

  const newJobs = await Promise.all(
    jobs.map(async (job) => {
      const { _id, owner } = job;

      const saved = await getJobStatusDb(userId, _id);
      const logo = await getCompanyLogo(owner);

      return {
        ...job,
        saved,
        logo,
      };
    })
  );

  return removeOwner(newJobs);
};

export const getTitleJobService = async (req: Request) => {
  const title = req.query.title as string;

  const { skip } = await getUserJobSkip(req);

  const jobs = await getTitleJobDb(title, skip);

  return removeOwner(jobs);
};

export const getJobTypeJobService = async (req: Request) => {
  const jobType = req.query.jobType as JobType;

  const { skip } = await getUserJobSkip(req);

  const jobs = await getJobTypeJobDb(jobType, skip);

  return removeOwner(jobs);
};

export const getExperienceJobService = async (req: Request) => {
  const experience = req.query.experience as Experience;

  const { skip } = await getUserJobSkip(req);

  const jobs = await getExperienceJobDb(experience, skip);

  return removeOwner(jobs);
};