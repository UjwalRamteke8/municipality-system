import Complaint from "../models/Complaint.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose"; // <--- CRITICAL: This was missing
/**
 * @route GET /api/complaints
 * Updated to allow Staff to see all complaints
 */
export const listComplaints = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;

  // --- LOGIC TO SHOW ALL COMPLAINTS FOR STAFF/ADMIN ---
  const currentUser = await User.findById(req.userId);
  const userRole = currentUser?.role || "";

  const canViewAll =
    req.isAdmin || userRole === "admin" || userRole === "staff";

  // If user is just a citizen, only show their own
  if (!canViewAll) {
    filter.user = req.userId;
  }

  const [total, complaints] = await Promise.all([
    Complaint.countDocuments(filter),
    Complaint.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email"),
  ]);

  res.json({ page, totalPages: Math.ceil(total / limit), total, complaints });
});

/**
 * @route PATCH /api/complaints/:id/status
 */
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, remark } = req.body;

  const complaint = await Complaint.findById(id);
  if (!complaint)
    return res.status(404).json({ message: "Complaint not found." });

  if (status) complaint.status = status.toLowerCase();
  if (remark) complaint.remark = remark;

  await complaint.save();
  res.json({ complaint });
});

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, sparse: true },
    name: { type: String, required: false, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    role: {
      type: String,
      enum: ["citizen", "staff", "admin"],
      default: "citizen",
    },
    department: {
      type: String,
      required: false,
      default: "general",
    },
    address: { type: String },
    password: { type: String, required: false },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
