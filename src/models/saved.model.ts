import mongoose, { Schema } from "mongoose"
import { ISaved } from "../interface/saved.interface"


const SavedSchema = new Schema<ISaved>({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required:true
    },
    seekerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
},
{timestamps:true})

SavedSchema.index({jobId: 1, seekerId: 1}, {unique:true})
SavedSchema.index({jobId:1})

const Saved = mongoose.model("Saved", SavedSchema)
export default Saved