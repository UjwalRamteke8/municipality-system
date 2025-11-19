// Main Express server (with Socket.io)
// backend/server.js (or backend/src/server.js)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import apiRoutes from "./src/routes/index.js";

import errorHandler from "./src/middleware/errorHandler.js";
import { initializeChat } from "./src/sockets/chatSocket.js";
import { startSensorSimulator } from "./src/iot/sensorSimulator.js";

dotenv.config();

// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder (static)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes (all combined in index.js)
app.use("/api", apiRoutes);

// Error handler
app.use(errorHandler);

// Create HTTP + Socket.io server
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// Initialize Chat Socket
initializeChat(io);

// Connect MongoDB
connectDB();

// Start IoT simulator
startSensorSimulator(io, {
  intervalMs: 5000,
  sensorCount: 3,
});

// Server listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("📡 Socket.io & IoT simulator running...");
});
