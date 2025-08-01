import { generateBlogContent } from "./gemini.js";

generateBlogContent("Write a blog on AI in healthcare")
  .then((text) => console.log("Blog content:", text))
  .catch((err) => console.error("Generation failed:", err));
