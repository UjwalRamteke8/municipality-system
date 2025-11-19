// /api/announcements/* endpoints
import express from "express";
import {
  createAnnouncement,
  listAnnouncements,
  getAnnouncement,
} from "../controllers/announcementController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Admin creates announcement
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createAnnouncement
);

// Public list
router.get("/", listAnnouncements);

// Get single announcement
router.get("/:id", getAnnouncement);

export default router;
