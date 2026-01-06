import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import "./config/firebaseAdmin.js";
import apiRoutes from "./src/index.js";
import errorHandler from "./src/middleware/errorHandler.js";
import { initializeChat } from "./src/socket/chatSocket.js";
import { startSensorSimulator } from "./src/iot/sensorSimulator.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* -------------------- CORS (GLOBAL, SINGLE) -------------------- */
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* -------------------- ROUTES -------------------- */
app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* -------------------- ERROR HANDLER -------------------- */
app.use(errorHandler);

/* -------------------- SOCKET -------------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

initializeChat(io);

/* -------------------- DB & SERVICES -------------------- */
connectDB();
startSensorSimulator(io, { intervalMs: 5000, sensorCount: 3 });

/* -------------------- START -------------------- */
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
