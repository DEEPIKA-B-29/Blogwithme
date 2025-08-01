import React, { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email || !email.includes("@")) {
      return setMessage("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/newsletter/subscribe`,
        { email }
      );
      setMessage(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Subscription failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-orange-50 py-10 mt-10">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-2xl font-semibold mb-2">
          Subscribe to our Newsletter
        </h2>
        <p className="text-gray-600 mb-4">
          Get the latest blog updates in your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-gray-700 italic">{message}</p>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
