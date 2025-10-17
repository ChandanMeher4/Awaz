
import React from 'react';
import { Link } from 'react-router-dom'; 
import { mockComplaints, mockPosts, CURRENT_USER_ID } from '../data/MockData';
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
  const myReports = mockComplaints.filter(c => c.userId === CURRENT_USER_ID);
  const myPosts = mockPosts.filter(p => p.userId === CURRENT_USER_ID);

  
  const hasNewMessage = (chat) => {
    if (chat.length === 0) return false;
    
    return chat[chat.length - 1].sender === 'admin';
  };

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
                key={report.id}
                to={`/my-activity/chat/${report.id}`} 
                className="block bg-gray-800 p-4 rounded-lg shadow-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-400">{report.id} - {report.date}</span>
                    <h3 className="text-lg font-medium text-white">{report.category}</h3>
                    <p className="text-gray-300 truncate max-w-md">{report.description}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-sm font-medium">Status:</span>
                    <span className={`block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    
                    {/* --- NEW: Notification Badge --- */}
                    {hasNewMessage(report.chat) && (
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
              <PostCard key={post.id} post={post} />
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