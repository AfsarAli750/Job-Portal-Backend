import { Request } from "express";
import { uploadFile } from "./uploadFile";
import { BadRequestError } from "./apiError";

export const uploadSingleFile = async (
  req: Request,
  fieldName: string,
  folder: string
) => {
  const files = req.files as {
    [key: string]: Express.Multer.File[];
  };

  console.log("All files:", files);

  const file = files?.[fieldName]?.[0];

  console.log(`${fieldName}:`, file);

  if (!file) {
    throw new BadRequestError(`${fieldName} is required`);
  }

  console.log(`Uploading ${fieldName} from path:`, file.path);

  const result = await uploadFile(file.path, folder);

  console.log(`${fieldName} uploaded:`, result);

  return {
    url: result.secure_url,
    file,
  };
};