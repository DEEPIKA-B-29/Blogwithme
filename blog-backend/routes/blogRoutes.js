import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  deleteBlog,
} from "../controllers/blogController.js";
import { uploadImage } from "../controllers/uploadController.js";
import upload from "../middlewares/upload.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import isAdmin from "../middlewares/isAdmin.js"; // Optional if you want admin-only access

const router = express.Router();

// ✅ Protected: Only logged-in users (or admin) can create blogs
router.post("/", verifyToken, createBlog);

// ✅ Get all blogs (Public)
router.get("/", getAllBlogs);

// ✅ Get a single blog by ID (Public)
router.get("/:id", getBlogById);

// ✅ Upload image route (Protected if needed)
router.post("/upload", verifyToken, upload.single("image"), uploadImage);

// ✅ Protected: Only admin can delete blogs
router.delete("/:id", verifyToken, isAdmin, deleteBlog);

export default router;
