// Complaint CRUD and status updates\nmodule.exports = {};
// backend/src/controllers/complaintController.js
import Complaint from "../../models/Complaint.js";
import asyncHandler from "express-async-handler";

/**
 * @route POST /api/complaints
 * Create a new complaint
 */
export const createComplaint = asyncHandler(async (req, res) => {
  const { title, category, description, location } = req.body;
  const image = req.file ? req.file.path : undefined; // if using multer

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
    location, // { lat, lng, address }
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
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;
  if (req.query.search) filter.$text = { $search: req.query.search };

  // non-admin users: show only their complaints unless explicitly allowed by role middleware
  if (!req.isAdmin) {
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
 * Body: { status: 'in-progress' | 'completed' | 'rejected' }
 */
export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, remark } = req.body;

  const complaint = await Complaint.findById(id);
  if (!complaint)
    return res.status(404).json({ message: "Complaint not found." });

  complaint.status = status || complaint.status;
  if (remark) complaint.remark = remark;
  complaint.updatedAt = Date.now();

  await complaint.save();

  res.json({ complaint });
});
