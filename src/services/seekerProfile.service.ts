import { Request } from "express";
import {
  jobSeekerProfileValid,
  skillsValid,
} from "../validators/jobSeekerProfile.validator";
import {
  getProfileDb,
  getSeekerDashboardDb,
  imageSetDb,
  profileSetDb,
  resumeSetDb,
  roleDb,
  skillSetDb,
} from "../repository/SeekerProfile.db";
import { validateRequest } from "../utils/extractData";
import { uploadSingleFile } from "../utils/uploadSingleFile";
import { getUserJobSkip } from "../utils/getUserJobSkip";
import { NotFoundError } from "../utils/apiError";
import { analyzeResume } from "./gemini.service";

export const getProfileService = async (req: Request) => {
  const {userId} = await getUserJobSkip(req)

  if (!userId) {
    throw new NotFoundError("User id is required");
  }

  const profile = await getProfileDb(userId);

  if (!profile) {
    throw new NotFoundError("Profile not found");
  }

  return profile;
};



// services/jobSeekerProfile.service.ts

export const profileSetService = async (req: Request) => {
  console.log("Step 1");

  const { parsedData, userId } = await validateRequest(
    req,
    jobSeekerProfileValid
  );

  console.log("Step 2", parsedData);

  // ✅ Sequential uploads – one after another (no Promise.all)
  console.log("Uploading profile image...");
  const profileUpload = await uploadSingleFile(req, "profileImage", "jobportal/profile");
  console.log("Profile image uploaded:", profileUpload.url);

  console.log("Uploading resume...");
  const resumeUpload = await uploadSingleFile(req, "resume", "jobportal/resume");
  console.log("Resume uploaded:", resumeUpload.url);

  const imageUrl = profileUpload.url;
  const resumeUrl = resumeUpload.url;
  const file = resumeUpload.file; // if you need the file object

  console.log("Step 3");
  console.log("Image URL:", imageUrl);
  console.log("Resume URL:", resumeUrl);
  console.log("File:", file);

  // Optionally analyze resume (uncomment when ready)
  // const roles = await analyzeResume(file.path);
  // await roleDb(roles, userId);

  // ✅ Save/update profile using upsert (no duplicate key errors)
  await profileSetDb(parsedData, userId, imageUrl, resumeUrl);

  console.log("Step 4");

  const profile = await getProfileDb(userId);
  console.log("Step 5", profile);

  if (!profile) {
    throw new NotFoundError("Profile not found");
  }

  return profile;
};





export const imageSetService = async (req: Request) => {
  const { userId } = await getUserJobSkip(req);

  const { url: imageUrl } = await uploadSingleFile(
    req,
    "profileImage",
    "jobportal/profile"
  );

  const updated = await imageSetDb(imageUrl, userId);

if (!updated) {
  throw new NotFoundError("Profile not found");
}

const { owner, ...profileObj } = updated.toObject();

return profileObj;
};

export const resumeSetService = async (req: Request) => {
  const { userId } = await getUserJobSkip(req);

  const { url: resumeUrl, file } = await uploadSingleFile(
    req,
    "resume",
    "jobportal/resume"
  );
  const roles = await analyzeResume(file.path);
  const updated = await resumeSetDb(resumeUrl, userId);

if (!updated) {
  throw new NotFoundError("Profile not found");
}

await roleDb(roles, userId);

const profile = await getProfileDb(userId);

if (!profile) {
  throw new NotFoundError("Profile not found");
}

return profile;
};

export const addSkillsService = async (req: Request) => {
  const { parsedData, userId } = await validateRequest(req, skillsValid);

  const updated = await skillSetDb(parsedData.skills, userId);

  if (!updated) {
    throw new NotFoundError("Profile not found");
  }

  return updated;
};


//seeker dashboard
export const getSeekerDashboardService = async(req: Request)=>{
  const {userId} =await  getUserJobSkip(req)
  const data = await getSeekerDashboardDb(userId)
  return data
}