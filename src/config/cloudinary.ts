import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary with retries and extended timeout.
 * @param filePath - Local path of the file to upload.
 * @param options - Cloudinary upload options (folder, public_id, etc.)
 * @param retries - Number of retry attempts (default 3).
 * @returns The upload result from Cloudinary.
 */
export async function uploadToCloudinary(
  filePath: string,
  options: any = {},
  retries: number = 3
): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        ...options,
        timeout: 180000,        // 3 minutes (adjust if needed)
        chunk_size: 60000,      // 60 KB chunks (default is 20 KB)
      });
      return result;
    } catch (error: any) {
      if (attempt === retries) {
        // Re-throw after all retries fail
        throw new Error(`Upload failed after ${retries} attempts: ${error.message}`);
      }
      const delay = 2000 * Math.pow(2, attempt - 1); // 2s, 4s, 8s...
      console.log(`Upload attempt ${attempt} failed. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

export default cloudinary;