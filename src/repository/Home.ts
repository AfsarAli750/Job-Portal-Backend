import Application from "../models/applicant.model"
import User from "../models/auth.model"
import Job from "../models/job.model"


const getHomeDB = async()=>{
    const jobs = await Job.countDocuments({isActive:true})
    const recruiter = await User.countDocuments({role:"recruiter",isActive:true})
    const seeker = await User.countDocuments({role: "job-seeker",isActive:true})
    const hired  = await Application.countDocuments({status: "Hired"})

    const obj = {
        activeJobs: jobs,
        recruiter: recruiter,
        seeker: seeker,
        hired: hired
    }
    return obj
}

export default getHomeDB