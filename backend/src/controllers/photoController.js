import path from "path";
import exifr from "exifr";
import Photo from "../models/Photo.js";
import cloudinary from "../../config/Cloudinary.js"; // LOWERCASE c correct

const parseCoordinate = (value) => {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const extractExif = async (filePath) => {
  try {
    const data = await exifr.parse(filePath, {
      pick: ["latitude", "longitude", "DateTimeOriginal"],
    });
    return {
      latitude: data?.latitude,
      longitude: data?.longitude,
      dateTime: data?.DateTimeOriginal
        ? new Date(data.DateTimeOriginal)
        : undefined,
    };
  } catch {
    return {};
  }
};

export const uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const exif = await extractExif(req.file.path);

    const upload = await cloudinary.uploader.upload(req.file.path, {
      folder: "municipality_photos",
    });

    const photo = await Photo.create({
      url: upload.secure_url,
      storage: "cloudinary",
      s3Key: upload.public_id,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      dateTime: req.body.dateTime ? new Date(req.body.dateTime) : exif.dateTime,
      latitude: parseCoordinate(req.body.latitude) ?? exif.latitude,
      longitude: parseCoordinate(req.body.longitude) ?? exif.longitude,
      locationLabel: req.body.locationLabel,
      uploadedBy: req.user?._id,
    });

    return res
      .status(201)
      .json({ message: "Photo uploaded successfully", photo });
  } catch (err) {
    next(err);
  }
};

export const getAllPhotos = async (_req, res, next) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 }).lean();
    res.json(photos);
  } catch (err) {
    next(err);
  }
};
