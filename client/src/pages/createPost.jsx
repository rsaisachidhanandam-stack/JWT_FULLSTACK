// client/src/pages/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/posts", { title, content });
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(
        err.response?.data?.message || "Failed to create post. Please try again."
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Create New Post</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Content</label>
          <textarea
            className="w-full border rounded px-3 py-2 h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

