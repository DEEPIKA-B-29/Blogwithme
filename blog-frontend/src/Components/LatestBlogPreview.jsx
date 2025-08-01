// Components/LatestBlogPreview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";

const LatestBlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`)
      .then((res) => {
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sorted.slice(0, 2));
      })
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  const handleSeeAll = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/blogs" : "/login");
  };

  return (
    <section className="max-w-3xl mx-auto px-4 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Latest Blogs</h2>

      <div className="flex flex-col gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSeeAll}
          className="text-blue-600 font-medium hover:underline"
        >
          See all blogs →
        </button>
      </div>
    </section>
  );
};

export default LatestBlogPreview;
