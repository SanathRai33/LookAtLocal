import React from 'react';

const CommunityFilter = ({
  filters,
  activeFilter,
  setActiveFilter,
  showClosed,
  onShowClosedToggle,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
        <input
          type="checkbox"
          checked={showClosed}
          onChange={onShowClosedToggle}
          className="w-4 h-4 border-gray-300 rounded accent-gray-950 dark:accent-blue-500"
        />
        Show closed posts
      </label>
    </div>
  );
};

export default CommunityFilter;