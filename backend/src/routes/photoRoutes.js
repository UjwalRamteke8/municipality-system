import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { photoUpload } from "../middleware/photoUploadMiddleware.js";
import { getAllPhotos, uploadPhoto } from "../controllers/photoController.js";

const router = express.Router();

router.get("/all", getAllPhotos);
router.post(
  "/upload",
  authMiddleware,
  photoUpload.single("photo"),
  uploadPhoto
);

export default router;
