import React from 'react';
import { Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const CategoryFilter = ({ categories, activeCategory, setActiveCategory, loading }) => {
  const allCategories = [
    { id: 'all', name: 'All', icon: 'clipboard' },
    ...categories
  ];

  const renderIcon = (iconName) => {
    if (!iconName) return '📌';
    const formattedName = iconName
      .split('-')
      ?.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    const IconComponent = LucideIcons[formattedName];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : <span>{formattedName}</span>;
  };

  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading categories...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {allCategories?.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            <span>{renderIcon(category?.icon)}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;