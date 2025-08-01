import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu_temp.jsx"; // import this

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-orange-50 shadow">
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        BlogWithMe
      </div>

      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <button
              className="border px-4 py-1 rounded-full border-black hover:bg-blue-200"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="border px-4 py-1 rounded-full border-black hover:bg-blue-200"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        ) : (
          <ProfileMenu />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
