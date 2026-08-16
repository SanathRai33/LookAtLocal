import React, { useState, useEffect } from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const StepCategory = ({ formData, updateFormData, onNext }) => {
  const { categories, loading, getCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState(formData.categoryId);

  useEffect(() => {
    getCategories({ module: 'SPACE' });
  }, []);

  useEffect(() => {
    if (formData.categoryId) {
      setSelectedCategory(formData.categoryId);
    }
  }, [formData.categoryId]);

  const handleSelect = (categoryId) => {
    setSelectedCategory(categoryId);
    updateFormData({ categoryId: categoryId });
  };

  const handleNext = () => {
    if (selectedCategory) {
      onNext();
    }
  };

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
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading categories...</span>
      </div>
    );
  }

  if (categories?.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 dark:text-gray-400">No space categories available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-950 dark:text-white">What type of space are you listing?</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose the category that best fits your space</p>

      <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => handleSelect(category.id)}
              className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-gray-950 bg-gray-50 dark:border-blue-500 dark:bg-blue-950/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600'
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl ${
                  isSelected
                    ? 'bg-gray-950 text-white dark:bg-blue-500'
                    : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400'
                }`}
              >
                {renderIcon(category?.icon)}
              </div>
              <span
                className={`text-sm font-medium ${
                  isSelected
                    ? 'text-gray-950 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {category.name}
              </span>
              <span className="text-xs text-center text-gray-500 dark:text-gray-400">
                {category.module?.toLowerCase() || 'Space'}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          disabled={!selectedCategory}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Next Step
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepCategory;