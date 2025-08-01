import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useSessionTimeout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const exp = payload.exp * 1000; // convert to ms
      const now = Date.now();

      if (exp <= now) {
        localStorage.removeItem("token");
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        const timeout = setTimeout(() => {
          localStorage.removeItem("token");
          alert("Session expired. Please log in again.");
          navigate("/login");
        }, exp - now);

        return () => clearTimeout(timeout);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);
};

export default useSessionTimeout;
