// Service request CRUD and payments
// backend/src/controllers/serviceRequestController.js
import ServiceRequest from "../models/ServiceRequest.js";
import asyncHandler from "express-async-handler";

/**
 * @route POST /api/services
 */
export const createServiceRequest = asyncHandler(async (req, res) => {
  const { serviceType, description, address, paymentRequired } = req.body;
  const attachments = req.files ? req.files.map((f) => f.path) : [];

  if (!serviceType || !description || !address)
    return res.status(400).json({ message: "Missing fields." });

  const reqObj = await ServiceRequest.create({
    serviceType,
    description,
    address,
    attachments,
    paymentRequired: !!paymentRequired,
    user: req.userId,
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
    "name email"
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
export const updateServiceStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, remark } = req.body;

  const item = await ServiceRequest.findById(id);
  if (!item)
    return res.status(404).json({ message: "Service request not found." });

  item.status = status || item.status;
  if (remark) item.remark = remark;
  item.updatedAt = Date.now();

  await item.save();

  res.json({ item });
});
