// awaz-admin/src/components/ComplaintRow.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const getStatusColor = (status) => {
  return status === 'done' ? 'bg-green-500 text-green-100' : 'bg-yellow-500 text-yellow-100';
};

function ComplaintRow({ complaint }) {
  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700">
      <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
        {complaint.id}
      </td>
      <td className="px-6 py-4">
        <p className="max-w-md truncate">{complaint.description}</p>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
          {complaint.status}
        </span>
      </td>
      <td className="px-6 py-4">
        {complaint.date}
      </td>
      <td className="px-6 py-4 text-right">
        <Link 
          to={`/complaint/${complaint.id}`} 
          className="font-medium text-blue-500 hover:underline"
        >
          View
        </Link>
      </td>
    </tr>
  );
}

export default ComplaintRow;