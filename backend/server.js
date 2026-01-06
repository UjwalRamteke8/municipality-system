// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables FIRST
dotenv.config();

import connectDB from "./config/db.js";
import "./config/firebaseAdmin.js";
import apiRoutes from "./src/index.js";
import errorHandler from "./src/middleware/errorHandler.js";
import { initializeChat } from "./src/socket/chatSocket.js";
import { startSensorSimulator } from "./src/iot/sensorSimulator.js";

console.log("ENV PATH:", process.env.FIREBASE_SERVICE_ACCOUNT_JSON);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const allowedOrigins = ["https://municipality-system.vercel.app/"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Allows all origins for development
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRoutes);

app.use(errorHandler);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

initializeChat(io);

// CONNECT MONGODB ATLAS
connectDB();

startSensorSimulator(io, {
  intervalMs: 5000,
  sensorCount: 3,
});

// IMPORTANT: handle preflight
app.options("*", cors());

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Backend running on port 5000");
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  console.log("💬 Socket.IO ready");
  console.log("📡 IoT Sensor Simulator active");
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Municipality Backend",
    time: new Date().toISOString(),
  });
});
