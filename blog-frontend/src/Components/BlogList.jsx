// Components/BlogList.jsx
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axios from "axios";

const BlogList = ({ searchQuery = "", selectedCategory = "" }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? blog.category.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="max-w-5xl mx-auto px-4 mt-4">
      <h2 className="text-2xl font-semibold mb-4">Latest Blogs</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogList;
