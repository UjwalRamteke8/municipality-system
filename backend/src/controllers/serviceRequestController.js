// Service request CRUD and payments
// backend/src/controllers/serviceRequestController.js
import ServiceRequest from "../models/ServiceRequest.js";
import asyncHandler from "express-async-handler";

/**
 * @route POST /api/services
 */
export const createServiceRequest = asyncHandler(async (req, res) => {
  const { serviceType, description, address, paymentRequired } = req.body;

  const isPaymentNeeded =
    paymentRequired === "true" || paymentRequired === true;
  if (!serviceType || !description || !address)
    return res.status(400).json({ message: "Missing fields." });

  const reqObj = await ServiceRequest.create({
    serviceType,
    description,
    address,
    attachments: req.files ? req.files.map((f) => f.path) : [],
    paymentRequired: isPaymentNeeded,
    user: req.userId, // Provided by your updated authMiddleware
    status: "pending",
  });

  res.status(201).json({ serviceRequest: reqObj });
});

/**
 * @route GET /api/services
 * Query: page, limit, status, serviceType
 */
export const listServiceRequests = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.serviceType) filter.serviceType = req.query.serviceType;
  if (!req.isAdmin) filter.user = req.userId;

  const [total, items] = await Promise.all([
    ServiceRequest.countDocuments(filter),
    ServiceRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email"),
  ]);

  res.json({ page, totalPages: Math.ceil(total / limit), total, items });
});

/**
 * @route GET /api/services/:id
 * Get single service request by ID
 */
export const getServiceRequest = asyncHandler(async (req, res) => {
  const item = await ServiceRequest.findById(req.params.id).populate(
    "user",
    "name email",
  );
  if (!item)
    return res.status(404).json({ message: "Service request not found." });
  res.json({ serviceRequest: item });
});

/**
 * @route GET /api/services/user/:userId
 */
export const getServiceRequestsByUser = asyncHandler(async (req, res) => {
  const items = await ServiceRequest.find({ user: req.params.userId }).sort({
    createdAt: -1,
  });
  res.json({ items });
});

/**
 * @route PATCH /api/services/:id/status
 */
/**
 * @route PATCH /api/services/:id/status
 */
export const updateServiceStatus = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remark } = req.body;

    const item = await ServiceRequest.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Service request not found." });
    }

    // Fix the string formatting to match Mongoose Enums
    if (status) {
      let formattedStatus = status.toLowerCase();
      // If frontend sends "In Progress", convert it to "in-progress"
      if (formattedStatus === "in progress") {
        formattedStatus = "in-progress";
      }
      item.status = formattedStatus;
    }

    if (remark) item.remark = remark;

    // Let Mongoose handle the updatedAt automatically if timestamps are enabled
    item.updatedAt = Date.now();

    await item.save();

    res.json({ success: true, item });
  } catch (error) {
    // This will print the EXACT reason for the crash in your Render logs
    console.error("CRASH IN updateServiceStatus:", error.message);
    res.status(500).json({
      message: "Server failed to update status",
      error: error.message,
    });
  }
});
