import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Newsletter from "../Components/Newsletter";
import BlogFilter from "../Components/BlogFilter";
import LatestBlogPreview from "../Components/LatestBlogPreview";

const Home = () => {

  const isLoggedIn = localStorage.getItem("token") !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Header />
        <LatestBlogPreview isLoggedIn={isLoggedIn} />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
