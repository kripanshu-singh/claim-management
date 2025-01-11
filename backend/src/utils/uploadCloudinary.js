import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localPath, isPdf = false) => {
  try {
    if (!localPath) return null;

    const uploadOptions = {
      folder: "claim-documents", // Optional: organize uploads in folders
    };

    // If it's a PDF, set resource_type to "raw"
    if (isPdf) {
      uploadOptions.resource_type = "raw";
    } else {
      uploadOptions.resource_type = "auto"; // Default for images and other types
    }

    const res = await cloudinary.uploader.upload(localPath, uploadOptions);

    fs.unlink(localPath, (err) => {
      if (err) {
        console.error("Error unlinking local file:", err);
      }
    });

    return res;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    if (localPath) {
      fs.unlink(localPath, (unlinkError) => {
        if (unlinkError) {
          console.error("Error unlinking local file:", unlinkError);
        }
      });
    }
    return null;
  }
};