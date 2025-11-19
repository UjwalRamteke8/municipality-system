import express from "express";

import authRoutes from "./authRoutes.js";
import complaintRoutes from "./complaintRoutes.js";
import serviceRoutes from "./serviceRoutes.js";
import announcementRoutes from "./announcementRoutes.js";
import chatRoutes from "./chatRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import iotRoutes from "./iotRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/complaints", complaintRoutes);
router.use("/services", serviceRoutes);
router.use("/announcements", announcementRoutes);
router.use("/chat", chatRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/iot", iotRoutes);

export default router;
