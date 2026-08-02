import Application from "../models/applicant.model"
import Job from "../models/job.model"
import RecruiterProfile from "../models/recruiterProfile.model"
import { Id } from "../types/common"


const saveProfileDb = async(userId: Id,data : any, profileImage: string, logo:string)=>{
    console.log(data , profileImage , logo)
    const obj = new RecruiterProfile({
        name : data.name,
        description: data.description,
        companyName:data.companyName,
        profileImage: profileImage,
        companyLogo: logo,
        owner: userId
        
    })

    await obj.save()
    return obj.toObject()
}

const getRecruiterProfileDb = async(userId : Id)=>{
    const obj = await RecruiterProfile.findOne({owner:userId}).lean().exec()
    const {owner , ...profile} = obj
    return profile

}


const getCompanyLogo = async(userId : Id)=>{
    const obj = await RecruiterProfile.findOne({owner:userId}).lean().exec()
    const companyLogo = obj?.companyLogo
    return companyLogo

}


const getTotal = async(userId: Id)=>{
    const totalJob = await Job.countDocuments({owner: userId})
    const totalApplicant = await Application.countDocuments({recruiterId: userId})
    const totalHired = await Application.countDocuments({recruiterId: userId, status: "Hired"})
    const totalInterview = await Application.countDocuments({recruiterId: userId, status: "Interview"})
    const obj = {
        job : totalJob,
        hired: totalHired,
        applicant: totalApplicant,
        interview: totalInterview
    }
    console.log(obj)
    return obj
}

export { saveProfileDb, getRecruiterProfileDb, getCompanyLogo, getTotal}