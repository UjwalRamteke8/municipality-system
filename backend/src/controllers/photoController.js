// backend/src/controllers/photoController.js
import Photo from "../models/Photo.js";
import exifr from "exifr";

const parseCoordinate = (value) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

// Helper to try extracting EXIF from the Cloudinary URL
const extractExifFromUrl = async (url) => {
  try {
    // exifr can parse remote URLs
    const data = await exifr.parse(url, {
      pick: ["latitude", "longitude", "DateTimeOriginal"],
    });
    return {
      latitude: data?.latitude,
      longitude: data?.longitude,
      dateTime: data?.DateTimeOriginal
        ? new Date(data.DateTimeOriginal)
        : undefined,
    };
  } catch (err) {
    console.log("EXIF extraction failed or no data:", err.message);
    return {};
  }
};

export const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // 1. The file is ALREADY uploaded to Cloudinary by the middleware.
    // req.file.path contains the Cloudinary URL.
    // req.file.filename contains the Cloudinary Public ID.

    const cloudUrl = req.file.path;

    // 2. Try to get EXIF data from the URL (Fallback if frontend didn't send GPS)
    const exif = await extractExifFromUrl(cloudUrl);

    // 3. Create Database Record
    const photo = await Photo.create({
      url: cloudUrl,
      storage: "cloudinary",
      s3Key: req.file.filename, // This is the Cloudinary Public ID
      fileName: req.file.originalname, // Original user filename
      originalName: req.file.originalname,

      // Prefer Frontend data, fallback to EXIF
      dateTime: req.body.dateTime ? new Date(req.body.dateTime) : exif.dateTime,
      latitude: parseCoordinate(req.body.latitude) ?? exif.latitude,
      longitude: parseCoordinate(req.body.longitude) ?? exif.longitude,

      locationLabel: req.body.locationLabel,
      uploadedBy: req.user?._id, // Ensure your authMiddleware populates this
    });

    return res.status(201).json({
      message: "Photo uploaded successfully",
      photo,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllPhotos = async (_req, res, next) => {
  try {
    const photos = await Photo.find()
      .populate("uploadedBy", "name email") // Optional: show who uploaded it
      .sort({ createdAt: -1 })
      .lean();
    res.json(photos);
  } catch (err) {
    next(err);
  }
};
