import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {getJobService, saveService, updateSaveService }from "../services/save.service";

export const saveJob = asyncHandler(async(req:Request, res:Response):Promise<any>=>{
    
    const stat = await saveService(req)
    console.log(stat)
    res.status(200).json({success:true, data: stat})
})

export const updateSave= asyncHandler(async(req:Request, res: Response)=>{
    const status = updateSaveService(req)
    res.status(200).json({success:true, data:status})
})

export const getJob = asyncHandler(async(req: Request, res:Response):Promise<any>=>{
    const jobs  = await getJobService(req)
    res.status(200).json({success:true, data:jobs})
})


