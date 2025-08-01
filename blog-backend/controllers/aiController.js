// controllers/aiController.js
import { generateBlogContent } from "../gemini.js";

export const generateAIContent = async (req, res) => {
  const { title, category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "Title and category are required." });
  }

  try {
    const content = await generateBlogContent(title, category);
    res.json({ content });
  } catch (err) {
    console.error("AI generation failed:", err);
    res.status(500).json({ error: "Failed to generate blog content with AI." });
  }
};
