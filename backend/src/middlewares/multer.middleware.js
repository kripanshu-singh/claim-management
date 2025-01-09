import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type. Only PDF, JPEG, and PNG are allowed."),
      false,
    );
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter,
});

// ! USE 0
// import multer from "multer";

// const storage = multer.memoryStorage(); // Stores files in memory

// const fileFilter = (req, file, cb) => {
//   // Accept only certain file types
//   const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Unsupported file type. Only PDF, JPEG, and PNG are allowed."),
//       false,
//     );
//   }
// };

// export const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
//   fileFilter,
// });

// ! USE 1
// import multer from "multer";
// import path from "path"; // Import the path module

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public/temp")); // Use path.join for cross-platform compatibility
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
//     ); // Add original extension
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedMimeTypes = [
//     "image/jpeg",
//     "image/png",
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ]; // Add allowed MIME types
//   if (allowedMimeTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Invalid file type. Only JPEG, PNG, PDF, and DOC/DOCX files are allowed.",
//       ),
//       false,
//     );
//   }
// };

// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//   },
// });

//! USE 2
// import multer from "multer";

// const storage = multer.memoryStorage(); // Stores files in memory

// const fileFilter = (req, file, cb) => {
//   // Accept only certain file types
//   const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error("Unsupported file type. Only PDF, JPEG, and PNG are allowed."),
//       false,
//     );
//   }
// };

// export const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
//   fileFilter,
// });
