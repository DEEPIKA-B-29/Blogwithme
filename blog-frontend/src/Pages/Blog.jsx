import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import BlogList from "../Components/BlogList";
import BlogFilter from "../Components/BlogFilter";

const Blogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center mt-6 mb-4">All Blogs</h1>
        <BlogFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <BlogList searchQuery={searchQuery} selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;
