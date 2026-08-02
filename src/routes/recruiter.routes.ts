import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
    jobDelete,
    getAllJob,
    updateJob,
    createJob,
} from "../controllers/recruiter.controller";

const router = Router();

router.get("/", isAuthenticated, getAllJob);
router.post("/job", isAuthenticated, createJob);
router.put("/:jobId", isAuthenticated, updateJob);
router.delete("/:jobId", isAuthenticated, jobDelete);


export default router;
