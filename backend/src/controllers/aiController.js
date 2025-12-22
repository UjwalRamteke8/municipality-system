import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize Groq client
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // Ensure this is set in your .env
  baseURL: "https://api.groq.com/openai/v1",
});

export const getAIResponse = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are the Pune Municipal Corporation (PMC) Assistant. Answer civic queries professionally.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Fast and free model
    });

    const reply = completion.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Groq/AI Error:", error);
    res
      .status(500)
      .json({ message: "AI Assistant is temporarily unavailable." });
  }
};
