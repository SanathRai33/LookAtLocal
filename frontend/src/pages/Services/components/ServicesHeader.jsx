import React from 'react';
import SearchBar from '../../../components/common/SearchBar';
import { Filter } from 'lucide-react';

const ServicesHeader = ({ searchQuery, setSearchQuery, totalCount }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Local Services
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
                        Find trusted professionals in your neighbourhood
                    </p>
                </div>
                <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
                    <div className="w-full sm:w-64 lg:w-80">
                        <SearchBar
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search services, providers..."
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 px-5 py-3 font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-200 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl whitespace-nowrap">
                        <Filter className="w-5 h-5" />
                        Filters
                    </button>
                </div>
            </div>
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {totalCount} providers found near you
            </div>
        </div>
    );
};

export default ServicesHeader;