import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockLandingData';
import { ArrowRight } from 'lucide-react';

const CategoriesSection = () => {
  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50',
      green: 'bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-950/50',
      purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-950/50',
      orange: 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/50',
      red: 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50',
      yellow: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-950/50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Explore Categories
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Everything your community needs in one place
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className={`group p-6 rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getColorClasses(category.color)}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-2 text-3xl">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {category.description}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;