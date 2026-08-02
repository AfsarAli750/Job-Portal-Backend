import mongoose,{Document} from "mongoose"
export interface IJobSeekerProfile extends Document{
    name: string,
    profile_img: string,
    description: string,
    resume_url: string,
    skills: [string],
    roles: [string],
    owner: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}