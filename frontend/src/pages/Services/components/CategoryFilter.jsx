import React from 'react';
import { categories, getCategoryCounts } from '../data/mockServices';

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
    const counts = getCategoryCounts();

    return (
        <div className="pb-2 mb-6 overflow-x-auto">
            <div className="flex gap-2 flex-nowrap min-w-max">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${activeCategory === category.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        <span>{category.icon}</span>
                        {category.label}
                        <span className={`ml-1 text-xs ${activeCategory === category.id
                                ? 'text-blue-200'
                                : 'text-gray-400 dark:text-gray-500'
                            }`}>
                            ({counts[category.id] || 0})
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;