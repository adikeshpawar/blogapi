import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const userId = localStorage.getItem("userId") || "152";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/posts/${postId.trim()}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (postId) fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.content.trim()) return;

    try {
      setSubmitting(true);

      const response = await fetch(
        `http://localhost:8080/api/comments/user/${userId}/post/${postId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to submit comment");

      const newComment = await response.json();
      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));

      setFormData({ content: "" });
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading post...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-gray-300">Post not found.</p>;

  const commentsToShow = showAllComments ? post.comments : post.comments?.slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <h2 className="text-3xl font-bold text-orange-400 mb-4">{post.postTitle}</h2>
      <p className="mb-6 text-gray-300">{post.postDescription}</p>

      {post.postImage && (
        <img
          src={`http://localhost:8080/api/posts/post/image/${post.postImage}`}
          alt={post.postTitle}
          className="w-full rounded mb-6"
        />
      )}

      <h3 className="text-xl font-semibold text-orange-300 mb-2">Comments</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#1e1e2f] text-white border border-gray-600 mb-2"
          rows="3"
          placeholder="Write your comment..."
        />
        <button
          type="submit"
          disabled={submitting}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Add Comment"}
        </button>
      </form>

      {post.comments?.length ? (
        <>
          <ul className="space-y-2">
            {commentsToShow.map((comment) => (
              <li key={comment.commentId} className="bg-[#1e1e2f] p-3 rounded shadow">
                {comment.content || "No comment text"}
              </li>
            ))}
          </ul>

          {post.comments.length > 3 && (
            <button
              onClick={() => setShowAllComments((prev) => !prev)}
              className="mt-2 text-orange-400 underline"
            >
              {showAllComments ? "View Less" : "View All Comments"}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

export default PostDetails;
