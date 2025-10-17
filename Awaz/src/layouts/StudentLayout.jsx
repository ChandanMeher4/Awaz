
import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';

function StudentLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <StudentNavbar />
      <main className="container mx-auto p-4">
        <Outlet /> 
      </main>
    </div>
  );
}
export default StudentLayout;