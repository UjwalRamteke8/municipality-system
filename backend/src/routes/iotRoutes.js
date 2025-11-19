// /api/iot/* endpoints
import express from "express";
import SensorData from "../models/SensorData.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get latest sensor data
router.get("/latest", authMiddleware, async (req, res) => {
  const data = await SensorData.find().sort({ createdAt: -1 }).limit(20);
  res.json({ data });
});

// Get sensor data by sensorId
router.get("/:sensorId", authMiddleware, async (req, res) => {
  const { sensorId } = req.params;
  const data = await SensorData.find({ sensorId })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json({ data });
});

// Admin can delete all sensor logs (optional)
router.delete("/", authMiddleware, adminMiddleware, async (req, res) => {
  await SensorData.deleteMany();
  res.json({ message: "All sensor data cleared." });
});

export default router;
