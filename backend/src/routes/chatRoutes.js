// /api/chat/* endpoints
import express from "express";
import ChatMessage from "../models/ChatMessage.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * Get chat history for a room
 * Example: /api/chat/history?room=room1
 */
router.get("/history", authMiddleware, async (req, res) => {
  const room = req.query.room;
  if (!room) return res.status(400).json({ message: "Room required." });

  const messages = await ChatMessage.find({ room })
    .sort({ createdAt: 1 })
    .populate("from", "name email")
    .populate("to", "name email");

  res.json({ messages });
});

export default router;
