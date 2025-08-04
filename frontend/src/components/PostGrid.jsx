import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const PostsGrid = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8080/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts");
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Animate posts on load
  useEffect(() => {
    if (!loading && posts.length > 0 && containerRef.current) {
      const postCards = containerRef.current.querySelectorAll(".post-card");

      gsap.fromTo(
        postCards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [loading, posts]);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl text-orange-400 font-semibold tracking-wide">
        Loading posts...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-xl text-red-500 font-semibold tracking-wide">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold text-orange-400 mb-4 tracking-wide">
          Explore the Blog
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto mb-6 text-lg">
          Discover inspiring articles, insights, and ideas shared by our amazing
          authors.
        </p>
        <Link
          to="/create-post"
          className="inline-block px-8 py-3 bg-orange-600 rounded-full font-semibold text-white shadow-lg hover:bg-orange-700 transition duration-300"
        >
          + Create New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-400 italic text-lg">No posts available right now.</p>
      ) : (
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {posts.map((post) => (
            <Link
              key={post.postId}
              to={`/posts/${post.postId}`}
              className="post-card bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-orange-700 overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-[1.04] hover:shadow-orange-500"
            >
              {post.postImage ? (
                <img
                  src={`http://localhost:8080/api/posts/post/image/${post.postImage}`}
                  alt={post.postTitle}
                  className="h-48 w-full object-cover rounded-t-2xl"
                />
              ) : (
                <div className="h-48 w-full bg-gray-700 flex items-center justify-center text-gray-400 italic rounded-t-2xl">
                  No Image
                </div>
              )}
              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-orange-400 mb-2 line-clamp-3">
                  {post.postTitle}
                </h2>
                <p className="text-gray-300 text-sm flex-grow line-clamp-4">
                  {post.postDescription || "No description"}
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  Author: {post.userName || "Unknown"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsGrid;
