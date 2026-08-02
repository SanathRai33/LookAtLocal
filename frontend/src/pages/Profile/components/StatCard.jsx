import React from 'react';

const StatCard = ({ stat }) => {
  const Icon = stat.icon;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}
      >
        <Icon className={`h-5 w-5 ${stat.iconClass}`} />
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-950 dark:text-white">
          {stat.value}
        </p>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {stat.title}
        </p>

        <p className="mt-2 text-sm font-medium text-emerald-600">
          {stat.change}
        </p>
      </div>
    </div>
  );
};

export default StatCard;