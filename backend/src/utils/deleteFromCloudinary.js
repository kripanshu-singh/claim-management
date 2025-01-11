import { v2 as cloudinary } from "cloudinary";
import { ApiError } from "../utils/ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null; // Handle cases where publicId is null/undefined
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return null; // Return null on error instead of throwing
  }
};

export default deleteFromCloudinary;
