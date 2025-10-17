
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const { loginAsStudent } = useAuth();
  const navigate = useNavigate();

  const handleStudentAnonymousLogin = () => {
    loginAsStudent();
    navigate('/dashboard'); 
  };

  return (
    <div className="flex justify-center items-center pt-20">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        {/* Student Anonymous Entry */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-center text-gray-900">Student Portal</h2>
          <p className="mt-2 text-sm text-gray-600">Your session is 100% anonymous.</p>
          <button 
            onClick={handleStudentAnonymousLogin}
            className="w-full py-2 px-4 mt-4 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700">
            Enter Anonymously
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;