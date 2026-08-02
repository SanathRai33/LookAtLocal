import React from 'react';
import JobCard from './JobCard';

const JobGrid = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No jobs found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter
        </p>
        <button className="mt-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
          Post a Job
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobGrid;