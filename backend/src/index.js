import express from "express";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import chatRouter from "./routes/chatRoutes.js"; // correct import
import analyticsRoutes from "./routes/analyticsRoutes.js";
import iotRoutes from "./routes/iotRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);
router.use("/services", serviceRoutes);
router.use("/announcements", announcementRoutes);
router.use("/chat", chatRouter);
router.use("/analytics", analyticsRoutes);
router.use("/iot", iotRoutes);
router.use("/photos", photoRoutes);

export default router;
