import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { ITokenPayload } from "../interface/TokenPayload.interface";

dotenv.config()



const secret = process.env.SECRET_KEY
    if (!secret) {
        throw new Error("Secret key is not available in .env file")
    }

export const accessTokenGenerate = (payload: ITokenPayload): string => {

    const token = jwt.sign(payload, secret, { expiresIn: '15m', algorithm: "HS256" })
    return token;


}


export const refreshTokenGenerate = (payload: ITokenPayload): string => {

    const token = jwt.sign(payload, secret, { expiresIn: '7d', algorithm: "HS256" })
    return token;


}

export const verifyToken= (data: string): ITokenPayload | null=>{
    try{
        const payload = jwt.verify(data , secret) as ITokenPayload
        return payload;
    }
    catch(error){
        return null
    }
}