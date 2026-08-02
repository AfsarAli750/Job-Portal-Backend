import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import upload from "../middleware/multer.middleware";
import {
    addSkills,
    getProfile,
    getSeekerDashboard,
    imageSet,
    profileSet,
    updateResumeUrl,
} from "../controllers/seekerProfile.controller";

const router = Router();

router.get("/", isAuthenticated, getProfile);
router.get("/seeker/dashboard", isAuthenticated, getSeekerDashboard)

router.post(
    "/",
    isAuthenticated,
    upload.fields([{ name: "profileImage", maxCount: 1 },{ name: "resume", maxCount: 1 },]),
    profileSet,
);

router.patch(
    "/image",
    isAuthenticated,
    upload.fields([{ name: "profileImage", maxCount: 1 }]),
    imageSet,
);
router.patch(
    "/resume",
    isAuthenticated,
    upload.fields([{ name: "resume", maxCount: 1 }]),
    updateResumeUrl,
);
router.patch("/skills", isAuthenticated, addSkills);

export default router;
