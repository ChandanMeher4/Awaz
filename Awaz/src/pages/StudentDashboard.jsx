import React, { useState, useEffect } from 'react'; // <-- Import useState and useEffect
import PostCard from "../components/PostCard";
import axios from 'axios'; // <-- Make sure axios is imported

function StudentDashboard() {
  // --- NEW: State for live data, loading, and errors ---
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/post/public"
        );
        setPosts(response.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch public posts.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []); // The empty array ensures this runs only once on component load

  // --- Render logic for loading and error states ---
  if (isLoading) {
    return <div className="text-center text-white py-10">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-white mb-4">Public Feed</h1>

      <div>
        {/* --- FIX: Map over the 'posts' state variable, not 'mockPosts' --- */}
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p className="text-gray-400 text-center">The public feed is empty.</p>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;