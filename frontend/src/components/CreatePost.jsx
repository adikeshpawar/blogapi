import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
const navigate = useNavigate();

  const handleClick = () => {
    navigate("/ai-post");  // Note the leading slash for absolute path
  };

  const [formData, setFormData] = useState({
    postTitle: "",
    postDescription: "",
    postTags: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("userId") || "152";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    document.getElementById("imageUpload").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.postTags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag !== "");

      const postPayload = {
        postTitle: formData.postTitle,
        postDescription: formData.postDescription,
        postTags: tagsArray,
      };

      const postResponse = await fetch(`http://localhost:8080/api/posts/user/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postPayload),
      });

      if (!postResponse.ok) {
        const errorText = await postResponse.text();
        throw new Error(`Failed to create post: ${errorText}`);
      }

      const createdPost = await postResponse.json();

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const imageUploadResponse = await fetch(
          `http://localhost:8080/api/posts/post/image/upload/${createdPost.postId}/user/${userId}`, {
            method: "POST",
            body: imageData,
          }
        );

        if (!imageUploadResponse.ok) {
          const errorText = await imageUploadResponse.text();
          throw new Error(`Failed to upload image: ${errorText}`);
        }
      }

      alert("Post and image uploaded successfully!");
      setFormData({ postTitle: "", postDescription: "", postTags: "" });
      setImageFile(null);

    } catch (error) {
      alert(error.message);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-900 text-orange-400 p-4">
      <div className="w-full max-w-xl">
        {/* New AI Button */}
        <div className="w-full flex justify-center mb-4">
          <button
            type="button"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
            onClick={handleClick}
          >
            Create Post with Help of AI
          </button>
        </div>

        {/* Original Form (unchanged) */}
        <form
          onSubmit={handleSubmit}
          className="w-full shadow-lg bg-gray-800 p-6 rounded-lg space-y-6"
        >
          {/* Post Title */}
          <div>
            <label htmlFor="postTitle" className="block mb-2 text-sm font-medium text-gray-200">
              Post Title
            </label>
            <input
              type="text"
              name="postTitle"
              value={formData.postTitle}
              onChange={handleChange}
              placeholder="Enter post title"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            />
          </div>

          {/* Post Description */}
          <div>
            <label htmlFor="postDescription" className="block mb-2 text-sm font-medium text-gray-200">
              Post Description
            </label>
            <textarea
              name="postDescription"
              value={formData.postDescription}
              onChange={handleChange}
              placeholder="Write your post description"
              required
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5 resize-none"
            />
          </div>

          {/* Post Tags */}
          <div>
            <label htmlFor="postTags" className="block mb-2 text-sm font-medium text-gray-200">
              Post Tags (comma separated)
            </label>
            <input
              type="text"
              name="postTags"
              value={formData.postTags}
              onChange={handleChange}
              placeholder="spring, java, backend"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-200">Post Image</label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileSelect}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            >
              {imageFile ? "Change Image" : "Upload Image"}
            </button>
            {imageFile && (
              <p className="mt-2 text-sm text-gray-300">{imageFile.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white bg-orange-500 hover:bg-orange-600 font-medium rounded-lg
                       text-sm px-5 py-2.5 text-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
