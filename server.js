import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const model = process.env.OPENAI_MODEL || "gpt-6-luna";

app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, configured: Boolean(client), model });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!client) return res.status(503).json({ error: "AI is not configured yet. Add OPENAI_API_KEY to your server environment." });

    const messages = Array.isArray(req.body?.messages) ? req.body.messages : [];
    const safeMessages = messages
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-30)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 12000) }));

    if (!safeMessages.length || safeMessages.at(-1)?.role !== "user") {
      return res.status(400).json({ error: "Send a user message first." });
    }

    const response = await client.responses.create({
      model,
      instructions: "You are Panda AI, a friendly, capable personal AI assistant built by Panda Man. Be helpful, direct, creative, and honest. For coding requests, give practical production-ready solutions. Do not claim to have performed actions you cannot perform.",
      input: safeMessages
    });

    res.json({ content: response.output_text || "I couldn't generate a response." });
  } catch (error) {
    console.error("AI request failed:", error);
    res.status(500).json({ error: "The AI request failed. Check the server logs and API configuration." });
  }
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(port, () => console.log("Panda AI running on http://localhost:" + port));