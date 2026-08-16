import React from 'react';
import { Activity } from 'lucide-react';

const RecentActivity = ({ activities }) => {
  if (!activities || activities.length === 0) {
    return (
      <section className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
          Recent Activity
        </h2>

        <div className="flex flex-col items-center justify-center py-8 mt-5">
          <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600" />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            No recent activity yet
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="text-xl font-bold text-gray-950 dark:text-white">
        Recent Activity
      </h2>

      <div className="mt-5 space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.id} className="flex gap-3">
              <div className="flex items-center justify-center bg-gray-100 rounded-full h-9 w-9 shrink-0 dark:bg-slate-800">
                <Icon className={`h-4 w-4 ${activity.iconClass}`} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium leading-5 text-gray-950 dark:text-gray-100">
                  {activity.text}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentActivity;