// /api/analytics/* endpoints
import express from "express";
import {
  getSummary,
  complaintsByStatus,
  monthlyComplaints,
} from "../controllers/analyticsController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Summary (admin)
router.get("/summary", authMiddleware, adminMiddleware, getSummary);

// Complaints by status chart
router.get(
  "/complaints/status",
  authMiddleware,
  adminMiddleware,
  complaintsByStatus
);

// Monthly complaints chart
router.get(
  "/complaints/monthly",
  authMiddleware,
  adminMiddleware,
  monthlyComplaints
);

export default router;
