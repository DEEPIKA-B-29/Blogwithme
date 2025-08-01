import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error("Error loading blog:", err));
  }, [id]);

  if (!blog) return <p className="text-center mt-10">Loading blog...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* ✅ Thumbnail */}
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt="Blog Thumbnail"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-gray-600 mb-4">
        {new Date(blog.createdAt).toLocaleDateString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
      <div className="flex gap-2 mb-6">
  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
    {blog.author}
  </span>
  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
    {blog.category}
  </span>
</div>

      
      <p className="text-lg leading-relaxed whitespace-pre-wrap">{blog.content}</p>
    </div>
  );
};

export default BlogDetails;
