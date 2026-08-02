import { Request } from "express";
import {
  getRecruiterProfileDb,
  getTotal,
  saveProfileDb,
} from "../repository/recruiterProfile.db";

import { recruiterProfileValid } from "../validators/recruiter.validators";
import { validateRequest } from "../utils/extractData";
import { getUserJobSkip } from "../utils/getUserJobSkip";
import { uploadSingleFile } from "../utils/uploadSingleFile";

const getProfileService = async (req: Request) => {
  const { userId } = await getUserJobSkip(req);
  const profile = getRecruiterProfileDb(userId);
  return profile;
};

const saveProfileService = async (req: Request) => {
  try {
    const { parsedData, userId } = await validateRequest(
      req,
      recruiterProfileValid,
    );

    // ✅ GOOD – one after another
    const profileUpload = await uploadSingleFile(
      req,
      "profileImage",
      "jobportal/profile",
    );
    const logoUpload = await uploadSingleFile(
      req,
      "companyLogo",
      "jobportal/companylogo",
    );

    const imageUrl = profileUpload.url;
    const logoUrl = logoUpload.url;

    console.log(parsedData, imageUrl, logoUrl);

    const profile = await saveProfileDb(userId, parsedData, imageUrl, logoUrl);

    const { owner, ...newProfile } = profile;
    return newProfile;
  } catch (err) {
    console.error("saveProfileService Error:", err);
    throw err;
  }
};

const getTotalService = async (req: Request) => {
  const { userId } = await getUserJobSkip(req);
  const total = await getTotal(userId);
  console.log(total);
  return total;
};
export { getProfileService, saveProfileService, getTotalService };
