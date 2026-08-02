import cloudinary from "../config/cloudinary";
import util from "util"; // for deep logging

export const uploadFile = async (
  filePath: string,
  folder: string,
  retries = 3
): Promise<any> => {
  // ✅ Verify Cloudinary config is set
  if (!cloudinary.config().cloud_name || !cloudinary.config().api_key) {
    throw new Error("Cloudinary is not configured properly");
  }
  
  let lastError: any;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Uploading to Cloudinary (attempt ${attempt}):`, filePath);
      const result = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: "auto",
        timeout: 180000,
        chunk_size: 300000,
      });
      console.log("Cloudinary upload success:", result.secure_url);
      return result;
    } catch (error: any) {
      // ✅ Log the FULL error (stack, constructor, etc.)
      console.error(`Attempt ${attempt} failed:`);
      console.error(util.inspect(error, { showHidden: false, depth: null }));
      // ✅ Also log the error as a string (for simple cases)
      console.error(`Stringified error: ${String(error)}`);
      // ✅ Save it for the final throw
      lastError = error;
      if (attempt < retries) {
        const delay = 2000 * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // ✅ Throw a meaningful error using JSON.stringify if needed
  throw new Error(
    `Upload failed after ${retries} attempts: ${lastError?.message || lastError || "Unknown error"}`
  );
};