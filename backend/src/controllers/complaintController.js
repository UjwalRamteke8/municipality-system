// backend/src/controllers/complaintController.js
import Complaint from "../models/Complaint.js";
import asyncHandler from "express-async-handler";
import User from "../models/User.js"; // <--- ADD THIS LINE

/**
 * @route POST /api/complaints
 */
export const createComplaint = asyncHandler(async (req, res) => {
  try {
    const { title, category, description, location } = req.body;
    const image = req.file ? req.file.path : undefined;

    if (!title || !category || !description) {
      return res
        .status(400)
        .json({ message: "title, category and description required." });
    }

    // Safety Check 1: Ensure auth middleware successfully attached the user ID
    if (!req.userId) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Missing user ID." });
    }

    // Safety Check 2: Fix Mongoose Location CastError
    // If the frontend sends a simple string like "123 Main St", we convert it to the object Mongoose expects
    let formattedLocation = location;
    if (typeof location === "string") {
      try {
        formattedLocation = JSON.parse(location); // In case frontend sent a stringified JSON object
      } catch (e) {
        formattedLocation = { address: location }; // If it's just normal text, assign it to address
      }
    }

    const complaint = await Complaint.create({
      title,
      category,
      description,
      image,
      location: formattedLocation, // Use the formatted location
      user: req.userId,
      status: "pending",
    });

    res.status(201).json({ complaint });
  } catch (error) {
    // This will catch Mongoose validation errors and print them to your Render logs!
    console.error("CRASH IN createComplaint:", error.message);
    res.status(500).json({
      message: "Server failed to create complaint",
      error: error.message,
    });
  }
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
