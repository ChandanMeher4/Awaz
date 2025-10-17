
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockComplaints } from '../data/MockData';

function ComplaintDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const complaint = mockComplaints.find(c => c.id === id);

  const [status, setStatus] = useState(complaint?.status);
  const [message, setMessage] = useState(null);

  
  const [currentChat, setCurrentChat] = useState(complaint?.chat || []);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);
  

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    
    console.log(`Updating status for ${id} to ${status}`);
    const index = mockComplaints.findIndex(c => c.id === id);
    if (index !== -1) {
      mockComplaints[index].status = status;
    }
    setMessage('Status updated successfully!');
  };

  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const msg = {
      sender: 'admin',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    
    
    
    setCurrentChat([...currentChat, msg]);
    complaint.chat.push(msg); 
    setNewMessage('');
  };
  

  if (!complaint) {
    return <h1 className="text-3xl font-bold">Complaint not found.</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate('/admin/dashboard')} className="mb-4 text-blue-600 hover:underline">
        &larr; Back to Dashboard
      </button>
      
      <h1 className="text-3xl font-bold mb-4">Complaint Details: {complaint.id}</h1>

      {/* Main Details and Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: Details */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Complaint Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* ... (All the info fields are unchanged) ... */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{complaint.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date Reported</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{complaint.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">AI Priority</h3>
                <p className={`mt-1 text-lg font-semibold ${
                  complaint.priority === 'High' ? 'text-red-600' : 'text-yellow-600'
                }`}>{complaint.priority}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Current Status</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{status}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500">Full Description</h3>
              <p className="mt-1 text-gray-800 whitespace-pre-wrap">{complaint.description}</p>
            </div>
          </div>
          
          {/* Admin Action Form */}
          <div className="bg-gray-100 p-6 border-t border-gray-200">
            {/* ... (The status update form is unchanged) ... */}
            <form onSubmit={handleUpdateStatus}>
              <h2 className="text-xl font-bold mb-4">Admin Actions</h2>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Change Status
              </label>
              <div className="flex items-center space-x-4">
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="mt-1 block w-1/2 px-3 py-2 text-gray-900 border border-gray-300 rounded-md"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                >
                  Update Status
                </button>
              </div>
              {message && (
                <p className="mt-4 text-green-600 font-medium">{message}</p>
              )}
            </form>
          </div>
        </div>

        {/* --- NEW CHAT UI (Right Column) --- */}
        <div className="bg-white shadow-lg rounded-lg flex flex-col h-[600px]">
          <h2 className="text-xl font-bold p-4 border-b border-gray-200">
            Anonymous Chat with Reporter
          </h2>
          
          {/* Message List */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
            {currentChat.length === 0 && (
              <p className="text-gray-500 text-center">No messages yet. Send a message to get more details.</p>
            )}
            
            {currentChat.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-lg max-w-lg ${
                  msg.sender === 'admin' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-900'
                }`}>
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-75 block text-right mt-1">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="bg-gray-100 p-4 flex items-center border-t border-gray-200">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-full focus:outline-none"
              placeholder="Ask for more details..."
            />
            <button
              type="submit"
              className="ml-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
        {/* --- END NEW CHAT UI --- */}
        
      </div>
    </div>
  );
}

export default ComplaintDetailsPage;