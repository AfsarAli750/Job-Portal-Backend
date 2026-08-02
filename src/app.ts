import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import {errorHandler}  from "./utils/errorHandler";
import authRouter from "./routes/auth.routes"
import profileRouter from "./routes/seekerProfile.routes"
import recruiterRouter from "./routes/recruiter.routes"
import applicantRouter from "./routes/applicant.routes"
import seekerJob from "./routes/seekerJob.routes"
import homeRouter from "./routes/home.routes"
import saveRouter from "./routes/saved.routes"
import recruiterProfile from "./routes/recruiterProfile.routes"
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      // Allow every browser origin
      callback(null, origin);
    },
    credentials: true,
  })
);
app.use(express.json())
app.use(cookieParser());
app.use("/api/home", homeRouter)
app.use("/api/auth", authRouter)

app.use("/api/profile",profileRouter)
app.use("/api/recruiter/profile", recruiterProfile)
app.use("/api/recruiter", recruiterRouter)
app.use("/api/applicant", applicantRouter)
app.use("/api/seekerJob", seekerJob)
app.use("/api/save/", saveRouter)

app.use(errorHandler)
app.listen(process.env.PORT || 5000, () => {
  console.log(`backend is n...  ${process.env.PORT}`);
});
