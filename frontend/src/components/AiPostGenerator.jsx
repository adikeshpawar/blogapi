import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const AiPostGenerator = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const messageRef = useRef(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const generatePost = async () => {
    if (!topic.trim()) {
      setMessage("⚠️ Please enter a topic.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/generate_post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          userId,
          token: `Bearer ${token}`, // Make sure token includes Bearer prefix
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ Blog post generated and uploaded successfully!\nTitle: ${data.title}`);
      } else {
        setMessage(`❌ Error: ${data.error || data.warning || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Server error while generating post");
    } finally {
      setLoading(false);
      setTopic("");
    }
  };

  // Animate message fade in
  useEffect(() => {
    if (message && messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [message]);

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-orange-600">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-orange-400 tracking-wide">
        🧠 AI Blog Post Generator
      </h2>
      <input
        type="text"
        placeholder="Enter blog topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full px-4 py-3 rounded-md bg-gray-700 text-gray-100 placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
      />
      <button
        onClick={generatePost}
        disabled={loading}
        className={`w-full py-3 rounded-md font-semibold text-white transition-colors duration-300 ${
          loading
            ? "bg-orange-400 cursor-not-allowed"
            : "bg-orange-600 hover:bg-orange-700 cursor-pointer"
        }`}
      >
        {loading ? "Generating..." : "Generate Post"}
      </button>

      {message && (
        <div
          ref={messageRef}
          className={`mt-5 whitespace-pre-wrap font-medium ${
            message.startsWith("✅")
              ? "text-green-400"
              : message.startsWith("⚠️")
              ? "text-yellow-400"
              : "text-red-400"
          } text-center`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default AiPostGenerator;
