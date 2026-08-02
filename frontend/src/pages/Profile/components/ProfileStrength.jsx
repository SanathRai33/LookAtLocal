import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileStrength = ({ profileStrength }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
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
          className="h-full rounded-full bg-gray-950 transition-all duration-500 dark:bg-blue-500"
          style={{
            width: `${profileStrength.percentage}%`,
          }}
        />
      </div>

      <div className="mt-5 space-y-3">
        {profileStrength.tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2.5">
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
            ) : (
              <Circle className="h-5 w-5 shrink-0 text-gray-300 dark:text-slate-600" />
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
        to="/profile/edit"
        className="mt-6 flex h-11 w-full items-center justify-center rounded-xl border border-gray-200 text-sm font-medium text-gray-950 transition hover:bg-gray-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
      >
        Complete Profile
      </Link>
    </section>
  );
};

export default ProfileStrength;