
import React from 'react';
import { Link } from 'react-router-dom';


function ChoiceCard({ title, description, linkTo }) {
  return (
    <Link 
      to={linkTo} 
      className="block p-6 bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition-colors"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </Link>
  );
}

function NewComplaintPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create a New Post</h1>
      <p className="mb-8 text-gray-300">
        Where would you like to direct this post? Your identity will remain anonymous in both cases.
      </p>

      <div className="space-y-6">
        <ChoiceCard
          title="Confidential Report to Authority"
          description="Submit a secure, confidential report visible only to the college administration. Use this for sensitive issues like ragging, harassment, or safety concerns."
          linkTo="/confidential-report"
        />

        <ChoiceCard
          title="Public Post to Student Forum"
          description="Post to the anonymous public forum. This is visible to all other students. Use this for campus-wide issues like mess food, infrastructure, or starting a public poll."
          linkTo="/forum-post"
        />
      </div>
    </div>
  );
}

export default NewComplaintPage;