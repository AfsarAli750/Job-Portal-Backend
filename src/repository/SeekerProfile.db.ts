import Application from "../models/applicant.model";
import Saved from "../models/saved.model";
import jobSeekerProfile from "../models/seekerProfile.model";
import {Id , Url} from "../types/common"


//create first time profile
export const profileSetDb = async (
    data:  any,
    id: Id,
    imageUrl: Url,
    resumeUrl:Url
) => {
    const profile = new jobSeekerProfile({
        name: data.name,
        profile_img: imageUrl,
        description: data.description,
        resume_url:resumeUrl,
        skills: data.skills,
        owner: id,
    });

    await profile.save();
    return profile.toObject();
};


//update profile
export const imageSetDb = async (
    url: Url,
    id: Id
) => {
    const updated = await jobSeekerProfile.findOneAndUpdate(
        { owner: id },
        { profile_img: url },
        { new: true, runValidators: true },
    ).lean().exec();

    return updated;
};

export const resumeSetDb = async (
    url: Url,
    id: Id
) => {
    const updated = await jobSeekerProfile.findOneAndUpdate(
        { owner: id },
        { resume_url: url },
        { new: true, runValidators: true },
    ).lean().exec();

    return updated;
};

export const skillSetDb = async (
    newSkills: string[],
    id: Id
) => {
    const updated = await jobSeekerProfile.findOneAndUpdate(
        { owner: id },
        { $addToSet: { skills: { $each: newSkills } } },
        { new: true, runValidators: true },
    ).lean().exec();

    return updated;
};

export const getProfileDb = async (userId: Id) => {
    const profile = await jobSeekerProfile
        .findOne({ owner: userId })
        .lean()
        .exec();
        
    const { owner, ...newProfile } = profile;
    return newProfile;
};


export const roleDb = async (
    roles: string[],
    id: Id
) => {
    const updated = await jobSeekerProfile.findOneAndUpdate(
        { owner: id },
        { $addToSet: { roles: { $each: roles } } },
        { new: true, runValidators: true },
    ).lean().exec();

    return updated;
};

//seeker dashboard
export const getSeekerDashboardDb = async(userId: Id)=>{
    const applied = await Application.countDocuments({seekerId: userId, status:"Applied"})
    const interview = await Application.countDocuments({seekerId: userId, status: "Interview"})
    const hired = await Application.countDocuments({seekerId: userId, status: "Hired"})
    const save = await Saved.countDocuments({seekerId:userId, status:true})
    const obj = {
        Applied: applied,
        Interview: interview,
        Hired: hired,
        Save: save,
    }
    return obj
}