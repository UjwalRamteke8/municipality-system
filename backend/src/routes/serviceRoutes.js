import express from "express";
import {
  createServiceRequest,
  listServiceRequests,
  getServiceRequest,
  getServiceRequestsByUser,
  updateServiceStatus,
} from "../controllers/serviceRequestController.js";

import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js"; // Remove strict admin check for status updates
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

const staffOrAdminMiddleware = (req, res, next) => {
  const role = req.user?.role || req.role;
  const isAdmin = req.isAdmin || role === "admin";

  if (isAdmin || role === "staff") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access denied. Staff or Admin only." });
  }
};

// 1. Create a Service Request
router.post(
  "/request",
  authMiddleware,
  upload.array("attachments", 5),
  createServiceRequest
);

// 2. List Service Requests
router.get("/", authMiddleware, listServiceRequests);

// 3. Get single service request by ID
router.get("/:id", authMiddleware, getServiceRequest);

// 4. Get all requests by specific user
router.get("/user/:userId", authMiddleware, getServiceRequestsByUser);

// 5. Update Service Status (Fixed to allow Staff)
router.patch(
  "/:id/status",
  authMiddleware,
  staffOrAdminMiddleware, // <--- Use the new flexible middleware here
  updateServiceStatus
);

export default router;
