import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Home, CreditCard } from "lucide-react";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = () => {
  localStorage.removeItem("token");
  // wait for 2 seconds before navigating to home
  setTimeout(() => {
    navigate("/");
  }, 1500);
};


  const getUserEmail = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload?.email || "Admin";
    } catch {
      return "User";
    }
  };

  const toggleTheme = () => {
    const html = document.documentElement;
    if (theme === "light") {
      html.classList.add("dark");
      setTheme("dark");
    } else {
      html.classList.remove("dark");
      setTheme("light");
    }
  };

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const userEmail = getUserEmail();

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1 border border-black rounded-full hover:bg-gray-200"
      >
        <span className="text-sm font-medium truncate max-w-[120px]">
          {userEmail}
        </span>
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${userEmail}`}
          alt="user"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-md z-50">
          <button
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            <Home className="w-4 h-4 mr-2" /> Home
          </button>
          <button
            onClick={() => {
              alert("Subscription coming soon!");
              setIsOpen(false);
            }}
            className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            <CreditCard className="w-4 h-4 mr-2" /> Subscribe
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-left text-red-500 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
