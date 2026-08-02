
import Job from "../models/job.model";
import { jobValid } from "../validators/job.validators";
import z from "zod";
import { Id } from "../types/common";

type JobInput = z.infer<typeof jobValid>;

// recruiter create job
export const jobSetDb = async (
    data: JobInput,
    id: Id
) => {
    const job = new Job({
        title: data.title,
        company: data.company,
        location: data.location,
        jobType: data.jobType,
        description: data.description,
        requirements: data.requirements,
        salary: data.salary,
        experience: data.experience,
        skills: data.skills,
        deadline: data.deadline,
        owner: id,
    });

    await job.save();
    return job.toObject();
};

// recruiter edit the job
export const jobEditDb = async (
    data: JobInput,
    id: Id,
    jobId: Id
) => {
    const update = Job.findByIdAndUpdate(
        { _id: jobId, owner: id, isActive: true },
        {
            title: data.title,
            company: data.company,
            location: data.location,
            jobType: data.jobType,
            description: data.description,
            requirements: data.requirements,
            salary: data.salary,
            experience: data.experience,
            skills: data.skills,
            deadline: data.deadline,
        },
        { new: true, runValidators: true },
    ).lean().exec();
    return update;
};

//recruiter delete the job
export const deleteJobDb = async (
    jobId: Id,
    ownerId: Id
) => {
    const deleteJob = Job.findOneAndUpdate(
        { _id: jobId, owner: ownerId, isActive: true },
        {
            isActive: false,
        },
        { new: true, runValidators: true },
    ).lean().exec();
    return deleteJob;
};

//get all job by recruiter
export const getAllJobDb = async (userId: Id, skip: number, limit:number) => {
    const filter = { owner: userId, isActive: true };
    const sort = { createdAt: -1 as const };
    const jobs = await Job.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();
    return jobs;
};
