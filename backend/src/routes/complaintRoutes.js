import express from "express";
import {
  createComplaint,
  listComplaints,
  updateStatus,
  getByUser,
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 1. Citizen creates a complaint
router.post("/", authMiddleware, upload.single("image"), createComplaint);

// 2. List complaints
// (Logic in controller should handle: Admin sees all, Citizen sees only theirs)
router.get("/", authMiddleware, listComplaints);

// 3. Get complaints by user ID
router.get("/user/:userId", authMiddleware, getByUser);

// 4. Admin/Staff updates complaint status
router.patch("/:id/status", authMiddleware, adminMiddleware, updateStatus);

export default router;
