import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You are a helpful assistant. Always respond in neatly formatted paragraphs and bullet points." },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    let botReply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";

    // ✅ Format paragraphs and line breaks
    botReply = botReply
      .replace(/\r\n/g, "\n") // normalize
      .replace(/\n{3,}/g, "\n\n")
      .split(/\n{2,}/) // paragraph split
      .map(p => `<p>${p.trim().replace(/\n/g, "<br>")}</p>`)
      .join("");

    // Bold + italics conversion
    botReply = botReply
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");

    res.json({ reply: botReply });
  } catch (err) {
    console.error("Error contacting OpenRouter API:", err);
    res.status(500).json({ reply: "Error contacting AI." });
  }
});

export default router;
