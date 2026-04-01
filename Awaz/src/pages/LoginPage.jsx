
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

function LoginPage() {
  const { loginAsStudent } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleStudentAnonymousLogin = async () => {
    setIsLoading(true);
    try {
      const randomId = Math.random().toString(36).substring(2, 10);
      const username = `anon_${randomId}`;
      const password = randomId; // They don't need to know this

      // Attempt to register a fresh anonymous user
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/user/api/register`, {
        username,
        password,
        role: "user"
      });

      if (response.data.success) {
        localStorage.setItem('awaz_token', response.data.token);
        loginAsStudent();
        navigate('/dashboard'); 
      }
    } catch (err) {
      console.error("Failed to generate anonymous session", err);
      alert("Registration system temporarily unavailable. Try again later.");
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
            className="w-full py-2 px-4 mt-4 font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">
            {isLoading ? 'Connecting Securely...' : 'Enter Anonymously'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;