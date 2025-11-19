// Admin dashboard metrics\nmodule.exports = {};
// backend/src/controllers/analyticsController.js
import Complaint from "../models/Complaint.js";
import ServiceRequest from "../models/ServiceRequest.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

/**
 * @route GET /api/analytics/summary
 * returns counts for complaints, services, pending etc.
 */
export const getSummary = asyncHandler(async (req, res) => {
  const complaintsCount = await Complaint.countDocuments();
  const servicesCount = await ServiceRequest.countDocuments();
  const pendingComplaints = await Complaint.countDocuments({
    status: "pending",
  });
  const pendingServices = await ServiceRequest.countDocuments({
    status: "pending",
  });

  res.json({
    complaintsCount,
    servicesCount,
    pendingComplaints,
    pendingServices,
  });
});

/**
 * @route GET /api/analytics/complaints-by-status
 * aggregated counts by status
 */
export const complaintsByStatus = asyncHandler(async (req, res) => {
  const agg = await Complaint.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  const result = agg.reduce((acc, cur) => {
    acc[cur._id] = cur.count;
    return acc;
  }, {});
  res.json(result);
});

/**
 * @route GET /api/analytics/monthly-complaints?months=6
 * returns monthly counts for last N months
 */
export const monthlyComplaints = asyncHandler(async (req, res) => {
  const months = Number(req.query.months) || 6;
  const start = new Date();
  start.setMonth(start.getMonth() - months + 1);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  const agg = await Complaint.aggregate([
    { $match: { createdAt: { $gte: start } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  // map to ordered array { year, month, count }
  const series = agg.map((item) => ({
    year: item._id.year,
    month: item._id.month,
    count: item.count,
  }));

  res.json({ series });
});
