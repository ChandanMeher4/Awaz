import React, { useState, useRef, useEffect } from 'react';

// --- MOCKING EXTERNAL DEPENDENCIES FOR SINGLE FILE RUNNABILITY ---
// In a real app, these would come from 'react-router-dom' and '../data/MockData'.

const mockComplaints = [
  {
    id: 'CMP-2024-001',
    category: 'Facilities',
    status: 'In Progress',
    chat: [
      { sender: 'admin', text: 'Hello, thank you for submitting your complaint regarding the broken elevator on the 3rd floor. We are investigating.', time: '10:00 AM' },
      { sender: 'student', text: 'Thanks for the quick response. Any ETA on when the repair crew will arrive?', time: '10:05 AM' },
      { sender: 'admin', text: 'The maintenance team is scheduled to arrive this afternoon. We will update you once the repair is complete.', time: '10:30 AM' },
    ],
  },
  {
    id: 'CMP-2024-002',
    category: 'Academic',
    status: 'Resolved',
    chat: [
      { sender: 'student', text: 'I have a query about my final grade in CS101. Could you please review it?', time: '09:00 AM' },
      { sender: 'admin', text: 'We have escalated your grade query to the course instructor. They will reach out to you directly within 48 hours.', time: '09:15 AM' },
    ],
  },
];

// Mocking hooks (assuming we are loading the first complaint 'CMP-2024-001')
const useParams = () => ({ id: 'CMP-2024-001' });
const useNavigate = () => (path) => console.log('Navigating to:', path);
const Link = ({ to, children }) => <a href="#" className="hover:text-emerald-300 transition duration-150">{children}</a>;
// --- END MOCK ---

const ComplaintChatPage = () => {
  // Using the mocked hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the complaint using the mocked data
  const complaint = mockComplaints.find(c => c.id === id);

  // State initialization logic remains the same
  const [currentChat, setCurrentChat] = useState(complaint?.chat || []);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll logic remains the same
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat]);

  // Handle message sending logic remains the same
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const msg = {
      sender: 'student',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Note: In a real app, you would send this to a Firestore/API endpoint.
    // Here we update the local state and the mock data for continuity.
    setCurrentChat(prevChat => [...prevChat, msg]);
    if (complaint) {
        complaint.chat.push(msg);
    }
    setNewMessage('');
  };

  if (!complaint) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <h1 className="text-3xl font-extrabold text-red-500">Complaint not found (ID: {id}).</h1>
        </div>
    );
  }

  const ChatBubble = ({ msg }) => {
    const isStudent = msg.sender === 'student';

    return (
      <div className={`flex ${isStudent ? 'justify-end' : 'justify-start'}`}>
        {/* Chat bubble styling improved */}
        <div className={`p-4 max-w-lg shadow-lg text-white rounded-xl ${
          isStudent
            ? 'bg-emerald-600 rounded-br-none' // User messages (more vibrant)
            : 'bg-gray-700 rounded-tl-none'     // Admin messages (neutral tone)
        }`}>
          {/* Sender label is now smaller and clearer */}
          <span className={`font-semibold text-xs mb-1 block ${isStudent ? 'text-emerald-100' : 'text-gray-300'}`}>
            {isStudent ? 'You' : 'Admin Support'}
          </span>
          <p className="text-sm leading-relaxed">{msg.text}</p>
          {/* Time stamp is subtle and aligned */}
          <span className="text-xs opacity-70 block mt-2 text-right">
            {msg.time}
          </span>
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/my-activity')}
            className="text-gray-400 flex items-center hover:text-emerald-400 transition duration-200 text-sm mb-3"
          >
            {/* Using an inline SVG for a cleaner icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to My Activity
          </button>
          
          <h1 className="text-4xl font-extrabold text-white mb-1">
            Complaint Conversation
          </h1>
          <div className="flex items-center text-gray-400 text-sm">
            <span className="font-medium mr-4">Report ID: <span className="text-emerald-300">{complaint.id}</span></span>
            <span className="font-medium">Category: <span className="text-gray-300">{complaint.category}</span></span>
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="flex flex-col bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">

          {/* Message List Area */}
          <div className="flex-1 p-6 space-y-5 overflow-y-auto h-[calc(100vh-280px)] custom-scrollbar">
            {currentChat.map((msg, index) => (
              <ChatBubble key={index} msg={msg} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSendMessage} className="bg-gray-700 p-4 border-t border-gray-600 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-5 py-3 bg-gray-600 text-white placeholder-gray-400 border-2 border-transparent rounded-full focus:outline-none focus:border-emerald-500 transition duration-150 shadow-inner"
              placeholder="Type your reply to the admin..."
              aria-label="New message input"
            />
            <button
              type="submit"
              className="ml-3 px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 transition duration-200 transform hover:scale-[1.01] shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50"
              aria-label="Send message"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Custom Scrollbar Styling (for a subtle, dark-mode scrollbar) */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* gray-700 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563; /* gray-600 */
          border-radius: 20px;
          border: 2px solid #374151;
        }
      `}</style>
    </div>
  );
}

// Exporting App as the main component as per the environment requirement
const App = () => <ComplaintChatPage />;
export default App;
