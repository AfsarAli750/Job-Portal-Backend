import Application from "../models/applicant.model";
import Job from "../models/job.model";
import jobSeekerProfile from "../models/seekerProfile.model";

import { Id, Status } from "../types/common";
import { BadRequestError } from "../utils/apiError";

//User
const getApplicationStatusDb = async (jobId: Id, userId: Id) => {
  const status = await Application.findOne({
    jobId: jobId,
    seekerId: userId,
  }).select("status");
  console.log(status?.status);
  return status?.status;
};

const setApplied = async (jobId: Id, userId: Id, status: Status) => {
  console.log(jobId);
  const job = await Job.findOne({
    _id: jobId,
    isActive: true,
  }).select("owner");

  console.log(job);
  if (!job) {
    throw new Error("Job not found");
  }

  const oldApplication = await Application.findOne({
    jobId: jobId,
    seekerId: userId,
  });
  console.log(oldApplication);
  if (oldApplication) throw new BadRequestError("already applied");

  const application = new Application({
    jobId: jobId,
    seekerId: userId,
    status: status,
    recruiterId: job.owner,
  });

  await application.save();

  console.log(application);

  return application;
};

const getAppliedJob = async (userId: Id, skip: number, limit: number) => {
  console.log(userId)
  const jobs = await Application.find({ seekerId: userId, status: "Applied" })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("status jobId createdAt")
    .populate("jobId")
    .select("title company location skills createdAt")
    .lean()
    .exec();

  return jobs;
};

const getHiredJob = async (userId: Id, skip: number, limit: number) => {
  const jobs = await Application.find({ seekerId: userId, status: "Hired" })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("status jobId createdAt")
    .populate("jobId")
    .select("title company location skills createdAt")
    .lean()
    .exec();

  return jobs;
};

const getInterviewJob = async (userId: Id, skip: number, limit: number) => {
  console.log(userId);
  const jobs = await Application.find({ seekerId: userId, status: "Interview" })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("status jobId createdAt")
    .populate("jobId")
    .select("title company location skills createdAt")
    .lean()
    .exec();
  console.log(jobs);
  return jobs;
};

//recruiter
const getProfile = async(applicantId: Id)=>{
  const application = await Application.findById(applicantId).select("seekerId status");
   if (!application) {
      throw new Error("Application not found");
    }
  const profile = await jobSeekerProfile.findOne({ owner: application.seekerId })
      .select("name profile_img description resume_url skills roles").lean();

  const newProfile= {
    ...profile,
    status: application.status,
  };
  console.log(newProfile)
  return newProfile
}
const setApplicant = async (userId: Id, applicantId: Id, status: Status) => {
  console.log(userId, applicantId, status);
  const aspplicant = await Application.findById(applicantId);

console.log(aspplicant);
  const applicant = await Application.findOneAndUpdate(
    { _id: applicantId, recruiterId: userId },
    { status: status },
    { returnDocument: "after" },
  );
  console.log(applicant);
  return applicant;
};

const jobApplicant = async (userId: Id, skip: number, limit: number) => {
  const jobs = await Application.find({ recruiterId: userId })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("jobId")
    .populate({
      path: "jobId",
      select: "title company location skills createdAt",
    })
    .lean()
    .exec();

  const uniqueJobs = [
    ...new Map(
      jobs.map((item) => [item.jobId._id.toString(), item])
    ).values(),
  ];

  return uniqueJobs;
};

const getApplication = async (
  userId: Id,
  jobId: Id,
  skip: number,
  limit: number,
) => {
  const applicant = await Application.find({
    recruiterId: userId,
    jobId,
  })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("_id status seekerId")
    .lean()
    .exec();

  const profile = await Promise.all(
    applicant.map(async (app) => {
      const pro = await jobSeekerProfile
        .findOne({
          owner: app.seekerId,
        })
        .select("name profile_img resume")
        .lean()
        .exec();

      return {
        ...pro,
        applicationId: app._id,
        status: app.status,
      };
    }),
  );

  console.log(profile);

  return profile;
};

const getHiredApplicant = async (
  userId: Id,
  skip: number,
  limit: number,
) => {
  const applicant = await Application.find({
    recruiterId: userId,
    status: "Hired"
  })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("_id status seekerId")
    .lean()
    .exec();

  const profile = await Promise.all(
    applicant.map(async (app) => {
      const pro = await jobSeekerProfile
        .findOne({
          owner: app.seekerId,
        })
        .select("name profile_img resume")
        .lean()
        .exec();

      return {
        ...pro,
        applicationId: app._id,
        status: app.status,
      };
    }),
  );

  console.log(profile);

  return profile;
};

const getInterviewApplicant = async (
  userId: Id,
  skip: number,
  limit: number,
) => {
  const applicant = await Application.find({
    recruiterId: userId,
    status: "Interview"
  })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .select("_id status seekerId")
    .lean()
    .exec();

  const profile = await Promise.all(
    applicant.map(async (app) => {
      const pro = await jobSeekerProfile
        .findOne({
          owner: app.seekerId,
        })
        .select("name profile_img resume")
        .lean()
        .exec();

      return {
        ...pro,
        applicationId: app._id,
        status: app.status,
      };
    }),
  );

  console.log(profile);

  return profile;
};

export {
  getAppliedJob,
  setApplied,
  getHiredJob,
  getInterviewJob,
  getApplication,
  getHiredApplicant,
  getInterviewApplicant,
  getApplicationStatusDb,
  setApplicant,
  jobApplicant,
  getProfile
};
