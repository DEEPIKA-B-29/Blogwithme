import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateBlogContent = async (title, category) => {
  const prompt = `Write a detailed blog post about "${title}" in the category "${category}".`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // no need to specify v1
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini error:", err);
    throw new Error("Failed to generate blog");
  }
};
