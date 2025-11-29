import express from "express";
import asyncHandler from "express-async-handler";
import ChatMessage from "../models/ChatMessege.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

/**
 * ⭐ Gemini AI endpoint
 * @route GET|POST /api/chat/ai
 */
router.all(
  "/ai",
  asyncHandler(async (req, res) => {
    try {
      const { message } = req.body || req.query;
      if (!message) return res.status(400).json({ error: "Message required" });

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: process.env.GEMINI_MODEL || "gemini-flash-latest",
      });

      const result = await model.generateContent(message);
      const reply = result.response.text();

      res.json({ reply });
    } catch (error) {
      console.error("Gemini AI error:", error);
      res.status(500).json({ error: "Gemini AI server error" });
    }
  })
);

/**
 * Get all messages
 * @route GET /api/chat/messages
 */
router.get(
  "/messages",
  asyncHandler(async (req, res) => {
    const messages = await ChatMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  })
);

/**
 * Create chat message
 * @route POST /api/chat/messages
 */
router.post(
  "/messages",
  asyncHandler(async (req, res) => {
    const message = await ChatMessage.create(req.body);
    res.status(201).json(message);
  })
);

export default router;
