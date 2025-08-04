import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
  const [error, setError] = useState("");

  const userCardRef = useRef(null);
  const postsContainerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8080/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setError("Unauthorized or user not found");
        setLoading(false);
        navigate("/login");
      });
  }, [userId, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
     console.log("🔐 Token in UserProfile.jsx:", token); 

    if (!token) return;

    axios
      .get(`http://localhost:8080/api/posts/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        setPosts(res.data);
        setPostsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching user's posts:", err);
        setPostsLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    if (!loading && userCardRef.current) {
      gsap.fromTo(
        userCardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }
  }, [loading]);

  useEffect(() => {
    if (!postsLoading && posts.length > 0 && postsContainerRef.current) {
      const postCards = postsContainerRef.current.querySelectorAll(".post-card");

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
  }, [postsLoading, posts]);

  if (loading)
    return (
      <p className="text-center mt-20 text-xl text-orange-400 font-semibold tracking-wide">
        Loading user profile...
      </p>
    );
  if (error)
    return (
      <p className="text-center mt-20 text-xl text-red-500 font-semibold tracking-wide">
        {error}
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 p-6 flex flex-col items-center">
      {/* User Info Card */}
      <div
        ref={userCardRef}
        className="w-full max-w-4xl bg-gradient-to-tr from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-orange-600 p-10 mb-12"
      >
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-wider text-orange-400">
          User Profile
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-300">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-orange-400 uppercase tracking-wide">
              Name
            </h3>
            <p className="text-xl font-medium text-white">{user.userName}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-orange-400 uppercase tracking-wide">
              Email
            </h3>
            <p className="text-lg break-words">{user.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-orange-400 uppercase tracking-wide">
              About
            </h3>
            <p className="text-lg">{user.about || "Not provided"}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-orange-400 uppercase tracking-wide">
              User ID
            </h3>
            <p className="text-gray-400">{user.id}</p>
          </div>
        </div>
      </div>

      {/* User Posts */}
      <div className="w-full max-w-6xl">
        <h3 className="text-3xl font-bold text-orange-400 mb-8 border-b border-orange-600 pb-3 tracking-wide">
          User's Posts
        </h3>
        {postsLoading ? (
          <p className="text-center text-orange-400 font-semibold text-lg">
            Loading posts...
          </p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500 italic text-lg">
            No posts available.
          </p>
        ) : (
          <div
            ref={postsContainerRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="post-card bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg border border-orange-700 overflow-hidden flex flex-col hover:shadow-orange-500 hover:scale-[1.03] transform transition-transform duration-300"
              >
                {post.postImage ? (
                  <img
                    src={`http://localhost:8080/api/posts/post/image/${post.postImage}`}
                    alt={post.postTitle}
                    className="h-56 w-full object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="h-56 w-full bg-gray-700 flex items-center justify-center text-gray-400 italic rounded-t-2xl">
                    No Image
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="text-xl font-semibold text-orange-400 mb-3 line-clamp-2">
                    {post.postTitle}
                  </h4>
                  <p className="text-gray-300 flex-grow line-clamp-3">
                    {post.postDescription || "No description"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
