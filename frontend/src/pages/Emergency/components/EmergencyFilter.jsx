import React from 'react';

const EmergencyFilter = ({
    filters,
    activeFilter,
    setActiveFilter,
    urgencyOptions,
    urgencyFilter,
    setUrgencyFilter,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
                {filters?.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === filter.id
                                ? 'bg-red-600 text-white shadow-lg shadow-red-500/25'
                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />

            <div className="flex flex-wrap gap-2">
                {urgencyOptions?.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => setUrgencyFilter(option.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${urgencyFilter === option.id
                                ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EmergencyFilter;