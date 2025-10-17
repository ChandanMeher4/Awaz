
import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PublicNavbar />
      <main className="container mx-auto p-4">
        <Outlet /> 
      </main>
    </div>
  );
}

export default PublicLayout;