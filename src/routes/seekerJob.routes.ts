import {Router} from "express"
import { isAuthenticated } from "../middleware/auth.middleware"
import { getAllJob, getExperienceJob, getJobTypeJob, getSingleJob, getTitleJob } from "../controllers/seekerJob.controller"


const router = Router()

router.get("/", isAuthenticated, getAllJob)
router.get("/title/", isAuthenticated, getTitleJob)
router.get("/jobType/", isAuthenticated, getJobTypeJob)
router.get("/experience/", isAuthenticated, getExperienceJob)
router.get("/:jobId", isAuthenticated, getSingleJob)

export default router