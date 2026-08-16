import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileStrength = ({ profileStrength }) => {
  return (
    <section className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          Profile Strength
        </h2>

        <span className="font-bold text-gray-950 dark:text-white">
          {profileStrength.percentage}%
        </span>
      </div>

      <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
        <div
          className="h-full transition-all duration-500 rounded-full bg-gray-950 dark:bg-blue-500"
          style={{
            width: `${profileStrength.percentage}%`,
          }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {profileStrength.tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2.5">
            {task.completed ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 shrink-0 dark:text-slate-600" />
            )}

            <span
              className={`text-sm ${
                task.completed
                  ? 'text-gray-500 line-through dark:text-gray-500'
                  : 'text-gray-900 dark:text-gray-200'
              }`}
            >
              {task.label}
            </span>
          </div>
        ))}
      </div>

      <Link
        to="/profile/edit-info"
        className="flex items-center justify-center w-full mt-6 text-sm font-medium transition border border-gray-200 h-11 rounded-xl text-gray-950 hover:bg-gray-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
      >
        Complete Profile
      </Link>
    </section>
  );
};

export default ProfileStrength;