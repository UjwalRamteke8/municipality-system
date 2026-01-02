import express from "express";
import {
  createComplaint,
  listComplaints,
  updateStatus,
  getByUser,
} from "../controllers/complaintController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Custom Middleware: Allow Staff OR Admin
const allowStaffOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const role = user?.role || "";

    if (req.isAdmin || role === "admin" || role === "staff") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access denied. Staff or Admin only." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error checking permissions" });
  }
};

// 1. Citizen creates a complaint
router.post("/", authMiddleware, upload.single("image"), createComplaint);

// 2. List complaints (Controller now handles the Staff logic)
router.get("/", authMiddleware, listComplaints);

// 3. Get complaints by user ID
router.get("/user/:userId", authMiddleware, getByUser);

// 4. Update status (Uses new middleware to allow Staff)
// Replace your update route with this
// Allow both Admin and Staff to update status
router.patch(
  "/:id/status",
  authMiddleware,
  async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (user?.role === "admin" || user?.role === "staff") {
      next();
    } else {
      res.status(403).json({ message: "Access denied. Staff only." });
    }
  },
  updateStatus
);
export default router;
