import Blog from "../model/Blog.js";
import imagekit from "../configs/imageKit.js";

// CREATE BLOG

export const createBlog = async (req, res) => {
  try {
    const { title, category, content, author, thumbnail: thumbnailFromClient } = req.body;

    if (!title || !category || !content || !author) {
      return res.status(400).json({
        message: "Title, category, content, and author are required.",
      });
    }

    let thumbnail = thumbnailFromClient || "";

    // Optionally support file upload in same route
    if (req.file) {
      const uploadedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/blogs",
      });

      thumbnail = imagekit.url({
        path: uploadedImage.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    }

    const newBlog = new Blog({ title, category, content, author, thumbnail });

    console.log("Blog to be saved:", newBlog);

    await newBlog.save();

    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Blog creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


// GET ALL BLOGS
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// GET SINGLE BLOG BY ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
  
};
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog", error: err.message });
  }
};


