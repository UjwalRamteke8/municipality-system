import express from "express";
import {
  createServiceRequest,
  listServiceRequests,
  getServiceRequest,
  getServiceRequestsByUser,
  updateServiceStatus,
} from "../controllers/serviceRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 1. Create a Service Request
router.post(
  "/",
  authMiddleware,
  upload.array("attachments", 5),
  createServiceRequest
);

// 2. List Service Requests
// (Logic in controller should handle: Admin sees all, Citizen sees only theirs)
router.get("/", authMiddleware, listServiceRequests);

// 3. Get single service request by ID
router.get("/:id", authMiddleware, getServiceRequest);

// 4. Get all requests by specific user
router.get("/user/:userId", authMiddleware, getServiceRequestsByUser);

// 5. Update Service Status (Admin/Staff only)
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateServiceStatus
);

export default router;
