import mongoose,{Document} from "mongoose";

export interface IRecruiterProfile extends Document{
    name: string,
    description: string,
    profileImage: string,
    companyName: string,
    companyLogo: string
    owner: mongoose.Types.ObjectId
}