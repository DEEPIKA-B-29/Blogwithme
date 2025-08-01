// backend/routes/blogRoutes.js or aiRoutes.js
import express from "express";
import { generateBlogContent } from "../gemini.js";

const router = express.Router();

router.post("/ai-generate", async (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "Title and category are required." });
  }

  try {
    const content = await generateBlogContent(title, category);
    res.json({ content });
  } catch (err) {
    res.status(500).json({ error: "AI generation failed." });
  }
});

export default router;
