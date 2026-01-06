import express from "express";

import authRoutes from "./routes/authRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import chatRoutes from "./routes/aiRoute.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import iotRoutes from "./routes/iotRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);
router.use("/services", serviceRoutes);
router.use("/announcements", announcementRoutes);
router.use("/ai", chatRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/iot", iotRoutes);
router.use("/photos", photoRoutes);

export default router;
