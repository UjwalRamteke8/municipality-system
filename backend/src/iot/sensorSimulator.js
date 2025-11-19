// backend/src/iot/sensorSimulator.js
/**
 * Simple IoT sensor simulator that emits fake sensor data to Socket.io
 * and optionally saves to MongoDB using SensorData model.
 *
 * Usage:
 *   import { startSensorSimulator, stopSensorSimulator } from "./sensorSimulator.js";
 *   startSensorSimulator(io, { intervalMs: 5000 });
 */

import SensorData from "../models/SensorData.js";

let intervalHandle = null;

const randomFloat = (min, max) => Math.random() * (max - min) + min;

/**
 * Build random sensor payload
 */
const buildPayload = (sensorId) => {
  return {
    sensorId,
    temperature: Number(randomFloat(18, 40).toFixed(2)),
    humidity: Number(randomFloat(20, 90).toFixed(2)),
    battery: Number(randomFloat(20, 100).toFixed(0)),
    timestamp: new Date(),
    location: {
      lat: Number(randomFloat(19.0, 20.0).toFixed(6)),
      lng: Number(randomFloat(72.0, 73.0).toFixed(6)),
    },
  };
};

export const startSensorSimulator = (io, options = {}) => {
  const intervalMs = options.intervalMs || 5000;
  const sensorCount = options.sensorCount || 3;

  if (intervalHandle) clearInterval(intervalHandle);

  intervalHandle = setInterval(async () => {
    for (let i = 1; i <= sensorCount; i++) {
      const payload = buildPayload(`sensor-${i}`);

      // emit via socket.io channel 'sensorData'
      if (io) io.emit("sensorData", payload);

      // optionally persist
      try {
        await SensorData.create(payload);
      } catch (err) {
        // if DB write fails, log but keep simulator running
        console.error("Sensor simulator DB save error:", err.message || err);
      }
    }
  }, intervalMs);

  console.log(
    `Sensor simulator started (interval ${intervalMs}ms, sensors ${sensorCount})`
  );
};

export const stopSensorSimulator = () => {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    console.log("Sensor simulator stopped");
  }
};
