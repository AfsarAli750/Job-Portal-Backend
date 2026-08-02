import mongoose , {Schema } from "mongoose"
import { IJobSeekerProfile } from "../interface/seekerProfile.interface"



const SeekerProfileSchema = new Schema<IJobSeekerProfile>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3 , 'minimum 3 character required'],
        set : (value: string): string=>{
            if(value)
            {
                return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
            }
            return value
        }
    },
    profile_img: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [10 , 'minimum explain in 10 character']
    },
    resume_url:{
        type: String,
        trim:true

    },
    skills: {
        type: [String],
        required:true,
        validate: {
            validator: (skills: string[])=> skills.length >= 1,
            message: 'Provide at least one skill'
        },
        set : (skills : string[])=> skills.map(skill => skill.trim())
    },
    roles: {
        type: [String],
        default:[],
        set : (roles : string[])=> roles.map(role => role.trim())
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true,
        unique:true
    }
},
{
    timestamps: true
})



const jobSeekerProfile = mongoose.model("jobSeeker" , SeekerProfileSchema)

export default jobSeekerProfile