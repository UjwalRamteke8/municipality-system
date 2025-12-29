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

console.log("ENV PATH:", process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ai-chat-eosin-rho.vercel.app"],
    credentials: true,
  })
);
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  // You will add your Vercel domain here later, e.g., "https://pmc-system.vercel.app"
];

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
app.use(cors()); // Allows all origins for development
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRoutes);

app.use(errorHandler);

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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  console.log("💬 Socket.IO ready");
  console.log("📡 IoT Sensor Simulator active");
});
