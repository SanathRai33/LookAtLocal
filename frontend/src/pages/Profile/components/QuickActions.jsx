import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = ({ actions }) => {
  return (
    <section>
      <h2 className="mb-6 text-lg font-bold text-gray-950 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-3 gap-5 sm:grid-cols-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.id}
              to={action.to}
              className="group flex flex-col items-center text-center"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md ${action.bg}`}
              >
                <Icon className="h-6 w-6" />
              </div>

              <span className="mt-3 text-xs font-medium text-gray-900 dark:text-gray-300 sm:text-sm">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickActions;