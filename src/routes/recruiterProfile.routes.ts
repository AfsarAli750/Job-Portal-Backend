import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import upload from "../middleware/multer.middleware";
import { getProfileController, getTotalController, profileSet } from "../controllers/recruiterProfile.controller";



const router = Router();
router.get("/", isAuthenticated, getProfileController)
router.get("/dashboard", isAuthenticated, getTotalController)

router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "companyLogo", maxCount: 1 },
  ]),
  profileSet
);



export default router