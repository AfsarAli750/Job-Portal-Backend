import { Request, Response } from "express";
import asyncHandler from "express-async-handler"
import homeService from "../services/home.service";


const homeController = asyncHandler(async(req:Request, res:Response):Promise<any>=>{
    const obj = await homeService()
    res.status(200).json({success:true, data:obj})
})

export default homeController