import mongoose from "mongoose";

const sensorSchema = new mongoose.Schema(
  {
    sensorId: { type: String, required: true },
    temperature: Number,
    humidity: Number,
    battery: Number,
    timestamp: { type: Date, default: Date.now },
    location: {
      lat: Number,
      lng: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SensorData", sensorSchema);
