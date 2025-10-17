import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function StudentNavbar() {
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-700 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-white font-extrabold text-2xl tracking-wide">
          <Link to="/dashboard" className="hover:text-blue-200 transition-colors">
            Awaz <span className="text-blue-300 text-lg font-semibold">(Student)</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/dashboard"
            className="text-gray-200 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-700 rounded-lg"
          >
            Public Feed
          </Link>
          <Link
            to="/create-post"
            className="text-gray-200 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-700 rounded-lg"
          >
            New Post
          </Link>
          <Link
            to="/my-activity"
            className="text-gray-200 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-700 rounded-lg"
          >
            My Activity
          </Link>
          <Link
            to="/chat"
            className="text-gray-200 hover:text-white px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-blue-700 rounded-lg"
          >
            AI Support Chat
          </Link>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200"
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-900 border-t border-blue-700 px-6 py-4 space-y-3">
          <Link
            to="/dashboard"
            className="block text-gray-200 hover:text-white py-2 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            Public Feed
          </Link>
          <Link
            to="/create-post"
            className="block text-gray-200 hover:text-white py-2 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            New Post
          </Link>
          <Link
            to="/my-activity"
            className="block text-gray-200 hover:text-white py-2 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            My Activity
          </Link>
          <Link
            to="/chat"
            className="block text-gray-200 hover:text-white py-2 transition-all duration-200"
            onClick={() => setMenuOpen(false)}
          >
            AI Support Chat
          </Link>
          <button
            onClick={() => {
              logout();
              setMenuOpen(false);
            }}
            className="w-full text-left bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2 rounded-lg transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default StudentNavbar;
