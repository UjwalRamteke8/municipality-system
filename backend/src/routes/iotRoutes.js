// /api/iot/* endpoints
import express from "express";
import { getSensors, getSensorById } from "../controllers/iotController.js";
import SensorData from "../models/SensorData.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Get latest sensor data
router.get("/sensors", authMiddleware, getSensors);

// Get sensor data by sensorId
router.get("/sensors/:sensorId", authMiddleware, getSensorById);

// Admin can delete all sensor logs (optional)
router.delete("/", authMiddleware, adminMiddleware, async (req, res) => {
  await SensorData.deleteMany();
  res.json({ message: "All sensor data cleared." });
});

export default router;
