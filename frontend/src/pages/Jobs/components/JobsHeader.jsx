import React from 'react';
import SearchBar from '../../../components/common/SearchBar';
import { Plus } from 'lucide-react';

const JobsHeader = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Local Jobs
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
                        Find jobs in your neighbourhood and nearby areas
                    </p>
                </div>
                <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
                    <div className="w-full sm:w-64 lg:w-80">
                        <SearchBar
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Job title, skill, or company..."
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-3 font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap">
                        <Plus className="w-5 h-5" />
                        Post a Job
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobsHeader;