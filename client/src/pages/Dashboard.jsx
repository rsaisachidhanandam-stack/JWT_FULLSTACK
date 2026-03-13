// client/src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/posts?page=${pageNumber}&limit=10`);
      const data = res.data;

      setPosts(data.data || []);
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setHasNextPage(data.hasNextPage);
      setHasPrevPage(data.hasPrevPage);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleNext = () => {
    if (!hasNextPage) return;
    const nextPage = page + 1;
    fetchPosts(nextPage);
  };

  const handlePrev = () => {
    if (!hasPrevPage) return;
    const prevPage = page - 1;
    fetchPosts(prevPage);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Your Posts</h1>
        <Link
          to="/create-post"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create New Post
        </Link>
      </div>

      {loading && <p>Loading posts...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {!loading && posts.length === 0 && (
        <p className="text-gray-500">No posts yet. Create your first post!</p>
      )}

      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="border rounded p-3 bg-white shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-1">{post.title}</h2>
            <p className="text-gray-700 text-sm">
              {post.content.length > 150
                ? post.content.slice(0, 150) + "..."
                : post.content}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Created at: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {total > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            Page {page} of {totalPages} • Total posts: {total}
          </p>
          <div className="space-x-2">
            <button
              onClick={handlePrev}
              disabled={!hasPrevPage}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!hasNextPage}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
