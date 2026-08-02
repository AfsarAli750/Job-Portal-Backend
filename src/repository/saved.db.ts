
import RecruiterProfile from "../models/recruiterProfile.model";
import Saved from "../models/saved.model";
import { Id } from "../types/common";




export const savedJobDb = async(userId: Id, jobId: Id)=>{
    const save = await Saved.findOne({jobId, seekerId:userId}).exec()
    console.log("savedJobDb",save)
    if(save) 
        {
            if(save.status)return save.status
            return await updateSavedJobDb(userId, jobId, true)}
        const obj = new Saved({
        jobId:jobId,
        seekerId: userId,
        status: true,
      
    })
    await obj.save()
    console.log(obj)
    return obj.toObject()  
}


export const updateSavedJobDb = async(userId: Id, jobId: Id, stat:boolean = false)=>{
    
        const save = await Saved.findOneAndUpdate({jobId, seekerId: userId}, {status: stat}, {returnDocument: "after"})
        console.log(save)
        const status = save?.status
    return status
}


export const getJobStatusDb = async(userId: Id, jobId: Id)=>{
   const save = await Saved.findOne({jobId, seekerId:userId,}).lean().exec()
   const status = save?.status
   return status
}


export const getJobDb = async (
  userId: Id,
  skip: number,
  limit: number
) => {
  const jobs = await Saved.find({
    seekerId: userId,
    status: true,
   
  })
    .select("status jobId")
    .populate({
      path: "jobId",
      select: "_id title company location skills createdAt owner",
    })
    .skip(skip)
    .limit(limit)
    .lean()
    .exec();

  const validJobs = jobs.filter((job: any) => job.jobId !== null);

  const perfectJobs = await Promise.all(
    validJobs.map(async (job: any) => {
      const { owner, ...jobWithoutOwner } = job.jobId;

      const logo = await RecruiterProfile.findOne({ owner })
        .select("companyLogo -_id")
        .lean();

      return {
        ...job,
        jobId: {
          ...jobWithoutOwner,
          companyLogo: logo?.companyLogo ?? null,
        },
      };
    })
  );

  const data = await perfectJobs.map((job)=>{
    const jobsSep = job.jobId
    const obj = {
      _id: jobsSep?._id,
      title: jobsSep?.title,
      company: jobsSep?.company,
      location: jobsSep?.location,
      skills: jobsSep?.skills,
      createdAt: jobsSep?.createdAt,
      companyLogo: jobsSep?.companyLogo,
      saved: job?.status
    }
    return obj
  })
  return data;
};



