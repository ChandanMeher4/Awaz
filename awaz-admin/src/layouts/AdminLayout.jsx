import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminNavbar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-gray-700 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="text-white font-bold text-xl">Awaz (Admin)</Link>
        <button onClick={logout} className="bg-red-600 text-white hover:bg-red-500 px-4 py-2 rounded-md text-sm font-medium">
          Logout
        </button>
      </div>
    </nav>
  );
}

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <AdminNavbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;