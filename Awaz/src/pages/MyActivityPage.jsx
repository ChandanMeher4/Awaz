
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import PostCard from '../components/PostCard';

const getStatusColor = (status) => {
  switch (status) {
    case 'New': return 'bg-blue-500 text-blue-100';
    case 'In Progress': return 'bg-purple-500 text-purple-100';
    case 'Resolved': return 'bg-green-500 text-green-100';
    default: return 'bg-gray-500 text-gray-100';
  }
};

function MyActivityPage() {
  const [myReports, setMyReports] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem('awaz_token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/user/post/my/activity`, {
          headers: { "Authorization": `Bearer ${token}` },
          withCredentials: true
        });
        
        const posts = response.data.posts || [];
        // Separate anonymous queries from public posts
        setMyReports(posts.filter(p => p.anonymous));
        setMyPosts(posts.filter(p => !p.anonymous));
      } catch (err) {
        console.error("Failed to fetch activity:", err);
        setError("Failed to load your activity.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchActivity();
  }, []);

  const hasNewMessage = (chat) => {
    if (!chat || chat.length === 0) return false;
    return chat[chat.length - 1].sender === 'admin';
  };

  if (isLoading) {
    return <div className="text-center text-white py-10">Loading your activity...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-bold text-white mb-8">My Activity</h1>

      {/* Section 1: Confidential Reports */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          My Confidential Reports
        </h2>
        <div className="space-y-4">
          {myReports.length > 0 ? (
            myReports.map(report => (
              
              <Link
                key={report._id}
                to={`/my-activity/chat/${report._id}`} 
                className="block bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-400">{report._id} - {new Date(report.createdAt).toLocaleDateString()}</span>
                    <h3 className="text-lg font-medium text-white">{report.title || "Query"}</h3>
                    <p className="text-gray-300 truncate max-w-md">{report.text}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status || "Pending"}
                    </span>
                    
                    {/* --- NEW: Notification Badge --- */}
                    {hasNewMessage(report.replies) && (
                      <span className="block mt-2 px-3 py-1 text-xs font-bold rounded-full bg-red-500 text-white animate-pulse">
                        New Message
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              
            ))
          ) : (
            <p className="text-gray-400">You have not submitted any confidential reports.</p>
          )}
        </div>
      </section>

      {/* Section 2: Public Posts (unchanged) */}
      <section>
        {/* ... (This whole section is unchanged) ... */}
        <h2 className="text-2xl font-semibold text-white mb-4">
          My Public Posts
        </h2>
        <div className="space-y-6">
          {myPosts.length > 0 ? (
            myPosts.map(post => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-gray-400">You have not created any public posts.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyActivityPage;