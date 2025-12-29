import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

router.post("/chat", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    // Use a try/catch specifically for the API call to log details
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are the Pune Municipal Corporation (PMC) Assistant. Answer civic queries professionally.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("AI Backend Error:", error.message);
    // Return the actual error message to the frontend console for debugging
    res
      .status(500)
      .json({ error: "Failed to generate response", details: error.message });
  }
});

export default router;
