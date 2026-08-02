import { Request } from "express"
import { getUserJobSkip } from "../utils/getUserJobSkip"
import {getJobDb, savedJobDb, updateSavedJobDb} from "../repository/saved.db"





export const saveService= async(req: Request)=>{
    const {jobId} = req.params 
    const {userId} = await getUserJobSkip(req)
    const obj = await savedJobDb(userId, jobId)
    const status = obj?.status
    return status
}

export const updateSaveService = async(req: Request)=>{
    const {jobId} = req.params
    const {userId} = await getUserJobSkip(req)
    const obj = await updateSavedJobDb(userId, jobId)
    return obj
}


export const getJobService = async(req: Request)=>{
    const {userId , skip , limit} = await getUserJobSkip(req)
    const jobs = await getJobDb(userId, skip , limit)
    return jobs
}