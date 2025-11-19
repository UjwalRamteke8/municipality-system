// /api/services/* endpoints
import express from "express";
import {
  createServiceRequest,
  listServiceRequests,
  getServiceRequestsByUser,
  updateServiceStatus,
} from "../controllers/serviceRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Citizen/service request
router.post(
  "/",
  authMiddleware,
  upload.array("attachments", 5),
  createServiceRequest
);

// List all service requests (admin) or user's own (citizen)
router.get("/", authMiddleware, listServiceRequests);

// Get all service requests by a specific user
router.get("/user/:userId", authMiddleware, getServiceRequestsByUser);

// Update status (Admin/Staff)
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateServiceStatus
);

export default router;
