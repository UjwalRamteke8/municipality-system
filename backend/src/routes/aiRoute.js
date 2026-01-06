// backend/src/routes/aiRoute.js

import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Initialize Groq (OpenAI-compatible) client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

// POST /api/ai/chat
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are the Municipal Corporation (PMC) Civic Assistant. Answer civic queries professionally and clearly.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      "Sorry, I could not generate a response at the moment.";

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("AI Backend Error:", error);

    return res.status(500).json({
      error: "AI Assistant is temporarily unavailable",
    });
  }
});

export default router;
