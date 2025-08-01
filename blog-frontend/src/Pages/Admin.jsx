// Pages/Admin.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBlogCard from "../Components/AdminBlogCard";
import axios from "axios";
import Navbar from "../Components/Navbar";
import useSessionTimeout from "../Components/useSessionTimeout";

const Admin = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  useSessionTimeout();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.role !== "admin") {
        navigate("/");
      }
    } catch (err) {
      navigate("/login");
    }
  }, [navigate]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Blog deleted successfully.");
      fetchBlogs();
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to delete blog. Only admins are allowed to delete blogs."
      );
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <header className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Manage recent blog activity
            </p>
            <p className="text-xs text-gray-500 mt-2 italic">
              Only admins can view author details and delete blogs. Click a blog to view full content.
            </p>
          </header>

          <section className="space-y-4">
            {blogs.length ? (
              blogs.map((blog) => (
                <AdminBlogCard
                  key={blog._id}
                  blog={blog}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 italic mt-10">
                No blogs left to manage.
              </p>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Admin;
