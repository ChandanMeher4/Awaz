import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react'; // optional spinner icon (install lucide-react if not already)

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/user/api/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        login();
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-600">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">
          Admin Panel Login
        </h2>

        <form onSubmit={handleAdminLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Admin Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-all flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2025 Admin Control System
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
