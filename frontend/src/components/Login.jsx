import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";

const Login = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      localStorage.setItem("userId", data.userId);
      console.log(data.token);
      navigate(`/profile/${data.userId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col lg:flex-row bg-[#0f0f1a] text-white"
    >
      {/* Left Column */}
      <div className="flex-1 flex items-center justify-center p-10 bg-[#1e1e2f]">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto mb-4 h-16 w-16 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <h1 className="text-4xl font-bold text-orange-400 mb-2">Welcome Back</h1>
          <p className="text-gray-300 text-lg">
            Login to continue exploring posts, interacting with the community, and
            more.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-[#1e1e2f] w-full max-w-md p-8 rounded-2xl shadow-lg space-y-5">
          <h2 className="text-3xl font-bold text-orange-500 text-center">Login</h2>

          {error && (
            <p className="text-red-500 text-center" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2b2b3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#2b2b3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 rounded font-semibold transition-all duration-300"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-400 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
