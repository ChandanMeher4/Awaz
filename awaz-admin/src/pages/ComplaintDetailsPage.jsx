// awaz-admin/src/pages/ComplaintDetailsPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [complaint, setComplaint] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/post/${id}`, {
          withCredentials: true,
        });
        setComplaint(response.data.post);
        setStatus(response.data.post.status);
      } catch (err) {
        setError('Failed to fetch complaint details.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await axios.patch(
        `http://localhost:3000/user/post/status/${id}`,
        { status },
        { withCredentials: true }
      );
      setMessage(response.data.message || 'Status updated successfully!');
    } catch (err) {
      setMessage('Failed to update status.');
    }
  };

  // Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 animate-pulse">
            Loading Complaint...
          </h1>
          <p className="text-gray-400">Please wait a moment.</p>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-red-500/20">
          <div className="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="currentColor" fill="none" className="text-red-500">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-400 text-center mb-3">
            Error Loading Complaint
          </h1>
          <p className="text-red-300 text-center mb-2 font-medium">{error}</p>
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

  if (!complaint) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-400">
        Complaint not found.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 sm:px-8 lg:px-16"
    >
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(1.5rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>

      <button
        onClick={() => navigate('/dashboard')}
        className="mb-8 text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" className="inline">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl border border-gray-700/50 p-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Complaint Details
          </h1>
          <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
            status === 'Resolved'
              ? 'bg-green-500/20 text-green-400 border border-green-400/20'
              : status === 'Pending'
              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-400/20'
              : 'bg-blue-500/20 text-blue-400 border border-blue-400/20'
          }`}>
            {status}
          </span>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-gray-400 font-medium mb-2">Complaint ID</h2>
            <p className="text-lg font-semibold text-white">{complaint._id}</p>
          </div>

          <div>
            <h2 className="text-gray-400 font-medium mb-2">Full Description</h2>
            <p className="text-gray-300 bg-gray-900/60 p-4 rounded-xl border border-gray-700 leading-relaxed">
              {complaint.text}
            </p>
          </div>

          <form
            onSubmit={handleUpdateStatus}
            className="mt-8 bg-gray-900/50 rounded-xl p-6 border border-gray-700/50"
          >
            <h2 className="text-xl font-semibold mb-4 text-indigo-400">Admin Actions</h2>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full sm:w-1/2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                Update Status
              </button>
            </div>

            {message && (
              <p
                className={`mt-4 text-sm font-medium ${
                  message.includes('Failed') ? 'text-red-400' : 'text-green-400'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ComplaintDetailsPage;
