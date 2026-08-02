import { Request } from "express";

import { jobValid } from "../validators/job.validators";

import {
  deleteJobDb,
  getAllJobDb,
  jobEditDb,
  jobSetDb,
} from "../repository/recruiter.db";

import { validateRequest } from "../utils/extractData";
import { getUserJobSkip } from "../utils/getUserJobSkip";
import { NotFoundError } from "../utils/apiError";

const removeOwner = <T extends { owner: unknown }>(doc: T) => {
  const { owner, ...rest } = doc;
  return rest;
};

export const createJobService = async (req: Request) => {
  const { parsedData, userId } = await validateRequest(req, jobValid);

  const job = await jobSetDb(parsedData, userId);

  return removeOwner(job);
};

export const updateJobService = async (req: Request) => {
  const { parsedData, userId } = await validateRequest(req, jobValid);

  const { jobId } = await getUserJobSkip(req);

  if (!jobId) {
    throw new NotFoundError("Job ID is required");
  }

  const job = await jobEditDb(parsedData, userId, jobId);

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  return removeOwner(job);
};

export const deleteJobService = async (req: Request) => {
  const { userId, jobId } = await getUserJobSkip(req);

  if (!jobId) {
    throw new NotFoundError("Job ID is required");
  }

  const job = await deleteJobDb(jobId, userId);

  if (!job) {
    throw new NotFoundError(
      "Job not found, not owned, or already inactive"
    );
  }

  return removeOwner(job);
};

export const getAllJobService = async (req: Request) => {
  const { userId, skip,limit } = await getUserJobSkip(req);

  const jobs = await getAllJobDb(userId, skip, limit);

  return jobs.map((job) => removeOwner(job));
};