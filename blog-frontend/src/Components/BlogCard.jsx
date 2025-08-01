import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/blogs/${blog._id}`)}
      className="cursor-pointer bg-white rounded-lg p-4 shadow hover:shadow-md transition flex flex-col gap-2"
    >
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt="Thumbnail"
          className="h-40 w-full object-cover rounded"
        />
      )}
      <h3 className="text-xl font-bold">{blog.title}</h3>
      <p className="text-gray-500 text-sm">
        🖋 {blog.author} · {formattedDate}
      </p>
      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full w-fit">
        {blog.category}
      </span>
    </div>
  );
};

export default BlogCard;
