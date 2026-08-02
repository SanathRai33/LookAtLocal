import React from 'react';

const RecentActivity = ({ activities }) => {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <h2 className="text-xl font-bold text-gray-950 dark:text-white">
        Recent Activity
      </h2>

      <div className="mt-5 space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.id} className="flex gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800">
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