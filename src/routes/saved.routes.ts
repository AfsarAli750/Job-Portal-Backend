
import { Router } from "express";
import {getJob, saveJob , updateSave}from "../controllers/save.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router = Router()

router.get("/" ,isAuthenticated, getJob)
router.post("/:jobId", isAuthenticated, saveJob)
router.patch("/:jobId", isAuthenticated, updateSave)


export default router