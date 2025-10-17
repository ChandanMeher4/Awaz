// src/components/PublicPostRow.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function PublicPostRow({ post }) {
  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
      <td className="px-6 py-4 font-medium text-white">{post.title}</td>
      <td className="px-6 py-4">{post.likes}</td>
      <td className="px-6 py-4">{new Date(post.createdAt).toLocaleDateString()}</td>
      <td className="px-6 py-4 text-right">
        <button className="font-medium text-blue-500 hover:underline">View</button>
      </td>
    </tr>
  );
}
export default PublicPostRow;