// backend/src/controllers/complaintController.js
import Complaint from "../models/Complaint.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js"; // <--- ADD THIS LINE
/**
/**
 * @route POST /api/complaints
 */
export const createComplaint = asyncHandler(async (req, res) => {
  const { title, category, description, location } = req.body;
  const image = req.file ? req.file.path : undefined;

  if (!title || !category || !description) {
    return res
      .status(400)
      .json({ message: "title, category and description required." });
  }

  const complaint = await Complaint.create({
    title,
    category,
    description,
    image,
    location,
    user: req.userId,
    status: "pending",
  });

  res.status(201).json({ complaint });
});

/**
 * @route GET /api/complaints
 * List complaints (query params: page, limit, status, category, search)
 */
export const listComplaints = asyncHandler(async (req, res) => {
  const filter = {};

  const currentUser = await User.findById(req.userId);
  const userRole = currentUser?.role || "";

  // If not staff/admin, only show user's own complaints
  if (userRole !== "admin" && userRole !== "staff") {
    filter.user = req.userId;
  }

  // Handle status filter from query params (needed for the 'pending' count)
  if (req.query.status) {
    filter.status = req.query.status;
  }

  // Count and Find in parallel
  const [total, complaints] = await Promise.all([
    Complaint.countDocuments(filter),
    Complaint.find(filter)
      .sort({ createdAt: -1 })
      .populate("user", "name email"),
  ]);

  // This response matches EXACTLY what DashboardPage.jsx expects
  res.json({
    total,
    complaints,
  });
});
// ... (keep getByUser as is) ...

/**
 * @route PATCH /api/complaints/:id/status
 */
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, remark } = req.body;

  const complaint = await Complaint.findById(id);
  if (!complaint)
    return res.status(404).json({ message: "Complaint not found." });

  // Fix case sensitivity (e.g., "Pending" -> "pending")
  if (status) {
    complaint.status = status.toLowerCase();
  }

  if (remark) complaint.remark = remark;
  complaint.updatedAt = Date.now();

  await complaint.save();

  res.json({ success: true, complaint });
});

/**
 * @route GET /api/complaints/user/:userId
 */
export const getByUser = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({ user: req.params.userId }).sort({
    createdAt: -1,
  });
  res.json({ complaints });
});

/**
 * @route PATCH /api/complaints/:id/status
 */
