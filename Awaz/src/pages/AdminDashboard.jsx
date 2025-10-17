// src/pages/AdminDashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import ComplaintRow from "../components/ComplaintRow";
import axios from "axios";

function AdminDashboard() {
  const [filter, setFilter] = useState("All");
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const headerRef = useRef(null);
  const filterRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/post/all", {
          withCredentials: true,
        });

        const data = response.data;

        const transformedData = data.posts.map((post) => ({
          id: post._id,
          category: post.category || "General",
          description: post.text,
          priority: post.priority || "Medium",
          status: post.status,
          date: new Date(post.createdAt).toLocaleDateString(),
        }));

        setComplaints(transformedData);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please log in again.");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [headerRef.current, filterRef.current, tableRef.current].filter(Boolean);
    refs.forEach(ref => observer.observe(ref));

    return () => {
      refs.forEach(ref => observer.unobserve(ref));
    };
  }, [isLoading]);

  const filteredComplaints = complaints.filter(
    (c) => filter === "All" || c.status === filter
  );

  const getStatusCount = (status) => {
    if (status === "All") return complaints.length;
    return complaints.filter(c => c.status === status).length;
  };

  if (isLoading) {
    return (
      <>
        <style>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 animate-pulse-slow">
              Loading Dashboard...
            </h1>
            <p className="text-gray-400">Fetching complaint data</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-red-500/20">
          <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 text-center mb-3">
            Error Loading Data
          </h1>
          <p className="text-red-300 text-center mb-2 font-medium">{error}</p>
          <p className="text-gray-400 text-center text-sm">
            Please ensure the backend server is running on port 3000 and try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
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
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div ref={headerRef} className="mb-12 opacity-0">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                    Admin Dashboard
                  </span>
                </h1>
                <p className="text-gray-400 mt-1">Manage and review all student reports</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Total Reports</p>
                    <p className="text-3xl font-bold text-white mt-1">{complaints.length}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">New</p>
                    <p className="text-3xl font-bold text-white mt-1">{getStatusCount("New")}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <div className="h-3 w-3 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">In Progress</p>
                    <p className="text-3xl font-bold text-white mt-1">{getStatusCount("In Progress")}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-green-500/50 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">Resolved</p>
                    <p className="text-3xl font-bold text-white mt-1">{getStatusCount("Resolved")}</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div ref={filterRef} className="mb-8 opacity-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-300 font-semibold text-lg flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filter by Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["All", "New", "In Progress", "Resolved"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        filter === status
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {status}
                      {filter === status && (
                        <span className="ml-2 inline-block px-2 py-0.5 bg-white/20 rounded-full text-xs">
                          {getStatusCount(status)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div ref={tableRef} className="opacity-0">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        AI Priority
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-indigo-400 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {filteredComplaints.length > 0 ? (
                      filteredComplaints.map((complaint) => (
                        <ComplaintRow key={complaint.id} complaint={complaint} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-16">
                          <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-gray-600 mb-4">
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <p className="text-xl font-semibold text-gray-400 mb-2">
                              No Reports Found
                            </p>
                            <p className="text-gray-500">
                              There are no complaints matching the "{filter}" filter.
                            </p>
                          </div>
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