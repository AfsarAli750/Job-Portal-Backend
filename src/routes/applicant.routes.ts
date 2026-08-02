import {Router} from "express"
import { isAuthenticated } from "../middleware/auth.middleware"
import { getApplicantController, getApplicationStatusController, getAppliedController, getAppliedJobController, getHiredController, getHiredJobController, getInterviewController, getInterviewJobController, getProfileController, jobApplicantController, setApplicantController} from "../controllers/applicant.controller"


const router = Router()


//recruiter
router.get("/", isAuthenticated, jobApplicantController)
router.get("/recruiter/hired/", isAuthenticated, getHiredController)
router.get("/recruiter/interview", isAuthenticated, getInterviewController)

//seeker
router.get("/applied", isAuthenticated, getAppliedJobController)
router.get("/hired", isAuthenticated, getHiredJobController)
router.get("/interview", isAuthenticated, getInterviewJobController)

//recruiter
router.get("/:applicantId", isAuthenticated, getProfileController)
router.get("/recruiter/applied/:jobId", isAuthenticated, getApplicantController)
router.get("/status/:jobId", isAuthenticated, getApplicationStatusController)
//seeker


router.patch("/:applicantId", isAuthenticated, setApplicantController)
router.post("/applied/:jobId", isAuthenticated, getAppliedController)




export default router