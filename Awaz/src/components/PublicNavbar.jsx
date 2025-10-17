import React from 'react';

function PublicNavbar() {
  return (
    <nav className="bg-gray-900 shadow-xl border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo/App Title: Enhanced font size, bolding, and the primary emerald accent color */}
          <div className="flex items-center">
            <a href="/" className="text-3xl font-extrabold text-emerald-400 hover:text-emerald-300 transition duration-300 tracking-wider">
              Awaz
            </a>
          </div>
          {/* Actions/Login Button: Styled to match the dynamic 'Send' button in the chat interface */}
          <div className="flex items-center">
            <a
              href="/login"
              className="px-6 py-2 bg-emerald-600 text-white font-semibold text-sm rounded-full
                         shadow-lg shadow-emerald-600/50 hover:bg-emerald-500
                         transition duration-300 transform hover:scale-[1.03]
                         focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-opacity-50"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Exporting App as the main component for the environment
const App = () => <PublicNavbar />;
export default App;
