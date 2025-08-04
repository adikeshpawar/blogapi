import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";

const RegisterForm = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    about: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }

    setLoading(false);
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <h1 className="text-4xl font-bold text-orange-400 mb-2">Join Us</h1>
          <p className="text-gray-300 text-lg">
            Create your account and become part of an amazing community.
          </p>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md bg-[#1e1e2f] p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
            Register
          </h2>

          {error && (
            <p className="text-red-500 text-center mb-4" role="alert">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="userName"
              placeholder="Username"
              className="w-full px-4 py-2 bg-[#2b2b3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
              required
              value={formData.userName}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 bg-[#2b2b3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
              required
              value={formData.email}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-[#2b2b3c] text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              onChange={handleChange}
              required
              value={formData.password}
            />
            <textarea
              name="about"
              placeholder="Tell us about yourself"
              className="w-full px-4 py-2 bg-[#2b2b3c] text-white rounded resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              rows={4}
              onChange={handleChange}
              value={formData.about}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded text-white font-semibold ${
                loading
                  ? "bg-orange-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              } transition-all duration-300`}
            >
              {loading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
              ) : null}
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-400 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
