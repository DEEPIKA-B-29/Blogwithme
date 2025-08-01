// Components/AdminBlogCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminBlogCard = ({ blog, onDelete }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blogs/${blog._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent navigating to details on delete
    onDelete(blog._id);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-4 rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {blog.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            Category: {blog.category} | Author: {blog.author}
          </p>
        </div>
        <button
          onClick={handleDeleteClick}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminBlogCard;
