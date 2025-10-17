// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-indigo-500">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="mt-2 text-gray-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFoundPage;