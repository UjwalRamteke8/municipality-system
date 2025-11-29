// IoT data handling (e.g., sensor mocks)
// backend/src/controllers/iotController.js
import SensorData from "../models/SensorData.js";
import asyncHandler from "express-async-handler";

/**
 * @route GET /api/iot/sensors
 * Get latest sensor data
 */
export const getSensors = asyncHandler(async (req, res) => {
  const { sensorId, limit = 20 } = req.query;
  const filter = {};
  if (sensorId) filter.sensorId = sensorId;

  const data = await SensorData.find(filter)
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.json({ data });
});

/**
 * @route GET /api/iot/sensors/:sensorId
 * Get sensor data by sensorId
 */
export const getSensorById = asyncHandler(async (req, res) => {
  const { sensorId } = req.params;
  const { limit = 50 } = req.query;

  const data = await SensorData.find({ sensorId })
    .sort({ createdAt: -1 })
    .limit(Number(limit));

  res.json({ data });
});
