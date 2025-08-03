import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/create" }, replace: true });
    }
  }, []);

  // ✅ THUMBNAIL UPLOAD HANDLER (with token)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const token = localStorage.getItem("token"); // ✅ token added
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // ✅ add this
          },
        }
      );
      setThumbnail(res.data.url); // ✅ set thumbnail on success
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ AI CONTENT GENERATION
  const handleAIGenerate = async () => {
    if (!title || !category) {
      alert("Please enter both title and category first.");
      return;
    }

    if (content.trim() !== "") {
      setShowConfirm(true);
      return;
    }

    await confirmOverwrite();
  };

  const confirmOverwrite = async () => {
    setShowConfirm(false);
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/ai/ai-generate`, {
        title,
        category,
      });
      setContent(res.data.content);
    } catch (err) {
      console.error("AI generation failed:", err);
      alert("Something went wrong while generating content.");
    } finally {
      setLoading(false);
    }
  };

  const cancelOverwrite = () => {
    setShowConfirm(false);
  };

  // ✅ PUBLISH BLOG
  const handlePublish = async () => {
    if (!title || !category || !content || !author) {
      alert("All fields except thumbnail are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs`,
        {
          title,
          category,
          content,
          author,
          thumbnail, // ✅ now this will be populated
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog published!");
      navigate("/blogs");
    } catch (err) {
      console.error("Blog publish failed:", err);
      alert("Failed to publish blog");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">📝 Create a New Blog</h2>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          placeholder="Blog Title"
          onChange={(e) => setTitle(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="text"
          value={category}
          placeholder="Category (e.g. Tech, Food, Travel)"
          onChange={(e) => setCategory(e.target.value)}
          className="border p-3 rounded"
        />

        <input
          type="text"
          value={author}
          placeholder="Author Name"
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-3 rounded"
        />

        <textarea
          value={content}
          placeholder="Write your blog content here..."
          onChange={(e) => setContent(e.target.value)}
          className="border p-3 rounded h-40"
        />

        <div>
          <label className="block mb-2 font-medium">Upload Thumbnail (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail"
              className="mt-3 h-32 w-auto object-cover rounded"
            />
          )}
        </div>

        <div className="flex gap-4 mt-2">
          <button
            onClick={handleAIGenerate}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Generating..." : "✨ Generate with AI"}
          </button>

          <button
            onClick={handlePublish}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Publish Blog
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md text-center">
            <p className="text-lg font-medium mb-4">
              You already have content written. Overwrite with AI-generated content?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={cancelOverwrite}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmOverwrite}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Yes, Overwrite
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateBlog;
