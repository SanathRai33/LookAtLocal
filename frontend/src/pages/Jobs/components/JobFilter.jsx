import React from 'react';
import { jobFilters } from '../data/mockJobs';

const JobFilter = ({ activeFilter, setActiveFilter }) => {
    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {jobFilters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === filter.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default JobFilter;