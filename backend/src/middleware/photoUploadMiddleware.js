// backend/src/middleware/photoUploadMiddleware.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "municipality_photos", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    // resource_type: "auto",
  },
});

export const photoUpload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
});

export default photoUpload;
