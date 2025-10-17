import React from "react";
// Assuming 'react-router-dom' is available in the environment
// We'll mock 'Link' for single-file runnability in the final export, but keep the import here
// for clarity if this were a multi-file project.
// import { Link } from "react-router-dom";

// Mock Link component for the single file environment
const Link = ({ to, children, className }) => (
    <a href={`#${to.replace('/', '-')}`} className={className}>
        {children}
    </a>
);


/**
 * Determines the Tailwind CSS classes for priority colored badges.
 * @param {string} priority - The priority level ("High", "Medium", or default).
 * @returns {string} Tailwind classes for background and text color.
 */
const getPriorityColor = (priority) => {
  switch (priority) {
    case "High":
      // Vibrant Red for high priority
      return "bg-red-600 text-white shadow-red-700/50";
    case "Medium":
      // Warning Orange for medium priority
      return "bg-yellow-600 text-white shadow-yellow-700/50";
    default:
      // Neutral Gray for low/default priority
      return "bg-gray-600 text-white shadow-gray-700/50";
  }
};

/**
 * Determines the Tailwind CSS classes for status colored badges.
 * @param {string} status - The status ("New", "In Progress", "Resolved", or default).
 * @returns {string} Tailwind classes for background and text color.
 */
const getStatusColor = (status) => {
  switch (status) {
    case "New":
      // Bright Blue for new complaints
      return "bg-blue-600 text-white shadow-blue-700/50";
    case "In Progress":
      // Purple accent (can match the admin theme) for progress
      return "bg-purple-600 text-white shadow-purple-700/50";
    case "Resolved":
      // Success Green for resolved complaints
      return "bg-emerald-600 text-white shadow-emerald-700/50";
    default:
      // Neutral Gray for unknown status
      return "bg-gray-600 text-white shadow-gray-700/50";
  }
};

/**
 * Renders a single row in the complaints table.
 * @param {Object} props - Component props.
 * @param {Object} props.complaint - The complaint object data.
 */
function ComplaintRow({ complaint }) {
  const { id, category, date, status, priority, description } = complaint;

  return (
    <tr className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/70 transition duration-150">
      {/* ID (Emphasized) */}
      <td className="px-6 py-4 font-bold text-emerald-400 whitespace-nowrap text-sm">
        {id}
      </td>

      {/* Category */}
      <td className="px-6 py-4 text-gray-300 text-sm">{category}</td>

      {/* Description (Truncated with subtle gray text) */}
      <td className="px-6 py-4 text-gray-400 text-sm max-w-xs">
        {/* Adjusted max-w-xs for better small screen handling in a table */}
        <p className="truncate">{description}</p>
      </td>

      {/* Priority Badge */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${getPriorityColor(
            priority
          )}`}
        >
          {priority}
        </span>
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${getStatusColor(
            status
          )}`}
        >
          {status}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-4 text-gray-400 text-sm">{date}</td>

      {/* Action Link */}
      <td className="px-6 py-4 text-center">
        <Link
          to={`/admin/complaint/${id}`}
          className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition duration-150 text-sm"
        >
          View &rarr;
        </Link>
      </td>
    </tr>
  );
}

// Mock data and wrapping component to make the file runnable in the environment
const mockComplaintsData = {
    id: 'CMP-2024-005',
    category: 'IT Support',
    date: '2024-10-17',
    status: 'In Progress',
    priority: 'High',
    description: 'My network connection keeps dropping every hour. I cannot attend online lectures consistently due to this issue.',
};

const App = () => (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
        <h2 className="text-2xl font-bold mb-4 text-white">Example Complaint Row Preview</h2>
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-2xl">
            <table className="w-full text-sm text-left text-gray-400">
                <thead className="text-xs text-gray-300 uppercase bg-gray-700/50">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Category</th>
                        <th scope="col" className="px-6 py-3">Description</th>
                        <th scope="col" className="px-6 py-3">Priority</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <ComplaintRow complaint={mockComplaintsData} />
                    <ComplaintRow complaint={{...mockComplaintsData, id: 'CMP-2024-006', priority: 'Medium', status: 'New', category: 'Facilities', description: 'The air conditioning unit in library section B is making a loud rattling noise and is leaking water.'}} />
                    <ComplaintRow complaint={{...mockComplaintsData, id: 'CMP-2024-007', priority: 'Low', status: 'Resolved', category: 'Academic', description: 'I need to request a late submission extension for the final project in the History of Art class.'}} />
                </tbody>
            </table>
        </div>
    </div>
);
export default App;
