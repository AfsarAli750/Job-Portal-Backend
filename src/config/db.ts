import mongoose from "mongoose"
import dotenv from"dotenv"


dotenv.config()
mongoose.set('strictQuery' , true)

const connectDB = async ()=>{
    try{
        const db_url = process.env.DB_URL
        if(!db_url){
            throw new Error("database url is not exist in .env file")
        }
        const conn = await mongoose.connect(db_url , {
        serverSelectionTimeoutMS : 5000
    })
    console.log(`Database is connected : ${conn.connection.host}`)
    }
    catch(error){
        if(error instanceof Error)
        {
            console.error(`Database connection failed : ${error.message}`)
        }
        else{
            console.error(`Database connection failed: ${error}`)
        }
        process.exit(1)
    }
}


export default connectDB;

