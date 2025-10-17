import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello. I'm the Awaz AI support bot. I'm here to listen if you need to talk about anything. Your chat here is anonymous and confidential.",
      sender: 'ai'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🔥 Send message to Flask AI backend
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const userMessageText = newMessage.trim();
    if (userMessageText === '') return;

    // Add user's message immediately
    const userMessage = {
      id: messages.length + 1,
      text: userMessageText,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      // 👇 Send request to Flask backend
      const res = await axios.post('http://127.0.0.1:5000/api/chat', {
        message: userMessageText,
      });

      const aiResponseText = res.data.reply || "I'm sorry, I couldn't understand that. Could you rephrase?";
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponseText,
        sender: 'ai',
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      setMessages(prev => [
        ...prev,
        {
          id: messages.length + 2,
          text: "⚠️ Sorry, I’m having trouble connecting to the AI right now.",
          sender: 'ai',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const ChatBubble = ({ msg }) => {
    const isUser = msg.sender === 'user';
    return (
      <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`p-4 max-w-lg shadow-xl text-white rounded-xl transition duration-150 ${
          isUser
            ? 'bg-emerald-600 rounded-br-sm'
            : 'bg-gray-700 rounded-tl-sm'
        }`}>
          <p className="text-sm leading-relaxed">{msg.text}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-extrabold text-white mb-6 tracking-tight">
          Confidential AI Support
        </h1>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">

          {/* Message List */}
          <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar">
            {messages.map(msg => (
              <ChatBubble key={msg.id} msg={msg} />
            ))}

            {/* AI Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-4 rounded-xl bg-gray-700 text-white shadow-md rounded-tl-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse-slow delay-0"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse-slow delay-150"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse-slow delay-300"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="bg-gray-700 p-4 border-t border-gray-600 flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-5 py-3 bg-gray-600 text-white placeholder-gray-400 border-2 border-transparent rounded-full focus:outline-none focus:border-emerald-500 transition duration-150 shadow-inner"
              placeholder="Type your message..."
              aria-label="Type your message"
            />
            <button
              type="submit"
              className="ml-3 px-6 py-3 bg-emerald-600 text-white font-bold rounded-full hover:bg-emerald-500 transition duration-200 transform hover:scale-[1.03] shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50"
              aria-label="Send message"
              disabled={isTyping}
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Styling for scroll + animation */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 20px;
          border: 2px solid #374151;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 1s infinite;
        }
        .delay-150 { animation-delay: 0.15s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}

export default ChatPage;
