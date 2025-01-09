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

// ! USE 1
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadOnCloudinary = async (buffer, folder = "uploads") => {
//   try {
//     if (!buffer) return null;

//     const res = await cloudinary.uploader.upload_stream({
//       folder,
//       resource_type: "auto", // Automatically detect file type
//     });

//     const stream = cloudinary.uploader.upload_stream(
//       { folder, resource_type: "auto" },
//       (error, result) => {
//         if (error) {
//           throw error;
//         }
//         return result;
//       },
//     );
//     stream.end(buffer);
//   } catch (error) {
//     throw new Error("Error uploading file to Cloudinary.");
//   }
// };

//!  USE 2
// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs/promises"; // Use fs.promises for async/await

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadOnCloudinary = async (localPath) => {
//   try {
//     if (!localPath) return null;
//     const res = await cloudinary.uploader.upload(localPath, {
//       resource_type: "auto",
//       folder: "claim-documents", // Optional: organize uploads in folders
//     });
//     await fs.unlink(localPath); // Use async fs.unlink
//     return res;
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     if (localPath) {
//       try {
//         await fs.unlink(localPath); // Attempt to delete local file even if upload fails
//       } catch (unlinkError) {
//         console.error("Error unlinking local file:", unlinkError);
//       }
//     }
//     return null;
//   }
// };

// export const deleteFromCloudinary = async (publicId) => {
//   try {
//     if (!publicId) return null; // Handle cases where publicId is null/undefined
//     const response = await cloudinary.uploader.destroy(publicId);
//     return response;
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//     return null; // Return null on error instead of throwing
//   }
// };

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadOnCloudinary = async (localPath) => {
//     try {
//         if (!localPath) return null;
//         const res = await cloudinary.uploader.upload(localPath, {
//             resource_type: "auto",
//         });
//         fs.unlinkSync(localPath);
//         return res;
//     } catch (error) {
//         fs.unlinkSync(localPath);
//         return null;
//     }
// };

// export { uploadOnCloudinary };
