// /api/complaints/* endpoints
import express from "express";
import {
  createComplaint,
  listComplaints,
  updateStatus,
  getByUser,
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // multer

const router = express.Router();

// Citizen creates complaint
router.post("/", authMiddleware, upload.single("image"), createComplaint);

// List complaints (admin gets all, citizen gets only theirs)
router.get("/", authMiddleware, listComplaints);

// Get complaints by user
router.get("/user/:userId", authMiddleware, getByUser);

// Admin updates complaint status
router.patch("/:id/status", authMiddleware, adminMiddleware, updateStatus);

export default router;
