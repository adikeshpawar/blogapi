import React, { useState } from "react";

const AiPost = () => {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic");
      return;
    }

    setLoading(true);
    setError(null);
    setPostData(null);

    try {
      const response = await fetch("http://localhost:8000/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) throw new Error("Failed to generate AI post");

      const data = await response.json();
      setPostData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Generate AI Blog Post</h1>

      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Post"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {postData && (
        <div className="mt-6 border p-4 rounded bg-gray-50 text-gray-800">
          <h2 className="text-xl font-semibold mb-2">{postData.postTitle}</h2>
          <p className="mb-4">{postData.postDescription}</p>
          <img
            src={postData.generatedImageURL}
            alt="AI generated"
            className="mb-4 max-w-full rounded"
          />
          <p>
            <strong>Tags:</strong> {postData.postTags.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default AiPost;
