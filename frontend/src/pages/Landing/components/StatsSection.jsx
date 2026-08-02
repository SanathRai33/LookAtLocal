import React from 'react';
import { stats } from '../data/mockLandingData';

const StatsSection = () => {
  return (
    <section className="py-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="p-6 text-center bg-white border border-gray-200 shadow-sm dark:bg-slate-800 rounded-2xl dark:border-gray-700">
            <div className="mb-1 text-3xl">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;