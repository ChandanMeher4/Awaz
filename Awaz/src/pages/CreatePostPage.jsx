// src/pages/CreatePostPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAnonymous && !title.trim()) {
      setMessage({ type: "error", text: "Public posts require a title." });
      return;
    }
    if (!description.trim()) {
      setMessage({ type: "error", text: "Please fill out the description." });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("text", description);
    formData.append("anonymous", isAnonymous);
    if (!isAnonymous) formData.append("title", title);
    if (file) formData.append("media", file);

    try {
      await axios.post("http://localhost:3000/user/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setIsSubmitting(false);
      setMessage({
        type: "success",
        text: "Your post has been submitted successfully.",
      });

      const destination = isAnonymous ? "/my-activity" : "/dashboard";
      setTimeout(() => navigate(destination), 2000);
    } catch (err) {
      setIsSubmitting(false);
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Submission failed.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#1e293b] rounded-2xl shadow-xl p-8 transition-all">
        <h1 className="text-3xl font-semibold text-white mb-8 text-center tracking-wide">
          Create a New Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Post Type
            </label>
            <div className="flex bg-[#334155] rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setIsAnonymous(true)}
                className={`w-1/2 py-2.5 text-sm font-medium transition-all ${
                  isAnonymous
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:bg-[#475569]"
                }`}
              >
                Confidential to Admin
              </button>
              <button
                type="button"
                onClick={() => setIsAnonymous(false)}
                className={`w-1/2 py-2.5 text-sm font-medium transition-all ${
                  !isAnonymous
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-[#475569]"
                }`}
              >
                Public Post
              </button>
            </div>
          </div>

          {/* Title Input */}
          {!isAnonymous && (
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={!isAnonymous}
                placeholder="A short, descriptive title..."
                className="w-full px-4 py-2 rounded-md border border-gray-600 bg-[#0f172a] text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="6"
              placeholder="Describe your issue or thought..."
              className="w-full px-4 py-2 rounded-md border border-gray-600 bg-[#0f172a] text-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Attach Image/Video (Optional)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-all"
              accept="image/*,video/*"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 font-semibold rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 transition-all shadow-md"
            >
              {isSubmitting ? "Submitting..." : "Submit Post"}
            </button>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`p-3 rounded-md text-center mt-4 text-sm font-medium ${
                message.type === "error"
                  ? "bg-red-900 text-red-100"
                  : "bg-green-900 text-green-100"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
