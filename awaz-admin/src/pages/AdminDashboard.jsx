// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from 'react';
import ComplaintRow from '../components/ComplaintRow';
import PublicPostRow from '../components/PublicPostRow';
import axios from 'axios';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('private');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const statsRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      const endpoint = activeTab === 'private' ? 'private' : 'public';
      try {
        const response = await axios.get(`http://localhost:3000/user/post/${endpoint}`, {
          withCredentials: true,
        });
        setPosts(response.data.posts);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, [activeTab]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fade-in-up');
        });
      },
      { threshold: 0.1 }
    );

    const refs = [headerRef.current, tabsRef.current, statsRef.current, tableRef.current].filter(Boolean);
    refs.forEach(ref => observer.observe(ref));

    return () => refs.forEach(ref => observer.unobserve(ref));
  }, [isLoading]);

  const getPrivateStats = () => {
    if (activeTab !== 'private') return { new: 0, inProgress: 7, resolved: 2 };
    return {
      new: posts.filter(p => p.status === 'New').length,
      inProgress: posts.filter(p => p.status === 'In Progress').length,
      resolved: posts.filter(p => p.status === 'Resolved').length,
    };
  };

  const getPublicStats = () => {
    if (activeTab !== 'public') return { total: 0, totalLikes: 0, totalComments: 0 };
    return {
      total: posts.length,
      totalLikes: posts.reduce((sum, p) => sum + (p.likes?.length || 0), 0),
      totalComments: posts.reduce((sum, p) => sum + (p.comments?.length || 0), 0),
    };
  };

  const privateStats = getPrivateStats();
  const publicStats = getPublicStats();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center animate-fade-in-up">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-pulse">
            Loading Dashboard...
          </h1>
          <p className="text-gray-400">Fetching {activeTab} posts</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="bg-gray-800/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-red-500/20 text-center animate-fade-in-up">
          <div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-red-500" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Data</h2>
          <p className="text-gray-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:scale-105 transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header */}
          <div ref={headerRef} className="opacity-0 flex items-center gap-4">
            <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="white" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Monitor & Manage platform activity</p>
            </div>
          </div>

          {/* Tabs */}
          <div ref={tabsRef} className="opacity-0 flex justify-center">
            <div className="flex bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700/50 shadow-lg p-2 gap-3">
              {['private', 'public'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 scale-105'
                      : 'text-gray-400 hover:text-gray-100 hover:bg-gray-700/40'
                  }`}
                >
                  {tab === 'private' ? 'Private Queries' : 'Public Posts'}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="opacity-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {activeTab === 'private' ? (
              <>
                {[
                  { label: 'Total Queries', value: posts.length, color: 'from-blue-500 to-cyan-500' },
                  { label: 'New', value: privateStats.new, color: 'from-yellow-400 to-orange-500' },
                  { label: 'In Progress', value: privateStats.inProgress, color: 'from-purple-500 to-pink-500' },
                  { label: 'Resolved', value: privateStats.resolved, color: 'from-green-500 to-emerald-500' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-gray-800/50 backdrop-blur-md rounded-2xl p-5 border border-gray-700/50 hover:border-${stat.color.split(' ')[0]} transition-all duration-300 hover:scale-[1.02] shadow-md`}
                  >
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <h2 className={`text-4xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </h2>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  { label: 'Total Posts', value: publicStats.total, color: 'from-indigo-400 to-blue-500' },
                  { label: 'Total Likes', value: publicStats.totalLikes, color: 'from-pink-400 to-red-500' },
                  { label: 'Total Comments', value: publicStats.totalComments, color: 'from-cyan-400 to-sky-500' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-gray-800/50 backdrop-blur-md rounded-2xl p-5 border border-gray-700/50 hover:border-${stat.color.split(' ')[0]} transition-all duration-300 hover:scale-[1.02] shadow-md`}
                  >
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <h2 className={`text-4xl font-bold mt-1 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </h2>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Table */}
          <div ref={tableRef} className="opacity-0">
            <div className="bg-gray-800/60 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700/50 shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                    {activeTab === 'private' ? (
                      <tr>
                        {['ID', 'Description', 'Status', 'Date', 'Action'].map((h, i) => (
                          <th key={i} className="px-6 py-4 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    ) : (
                      <tr>
                        {['Title', 'Likes', 'Date', 'Action'].map((h, i) => (
                          <th key={i} className="px-6 py-4 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    )}
                  </thead>

                  <tbody className="divide-y divide-gray-700/40">
                    {posts.length > 0 ? (
                      activeTab === 'private'
                        ? posts.map(post => (
                            <ComplaintRow
                              key={post._id}
                              complaint={{
                                ...post,
                                id: post._id,
                                description: post.text,
                                date: new Date(post.createdAt).toLocaleDateString(),
                              }}
                            />
                          ))
                        : posts.map(post => <PublicPostRow key={post._id} post={post} />)
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-12 text-gray-500">
                          {activeTab === 'private'
                            ? 'No Private Queries Submitted Yet.'
                            : 'No Public Posts Available.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
