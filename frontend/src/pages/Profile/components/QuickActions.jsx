import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, BriefcaseBusiness, Package2, Handshake, BicepsFlexed } from 'lucide-react';
import { BsBuilding } from 'react-icons/bs';

const actions = [
  {
    id: 1,
    label: 'Create Post',
    icon: Plus,
    to: '/create',
    bg: 'bg-slate-950 dark:bg-slate-800',
  },
  {
    id: 2,
    label: 'My Services',
    icon: BicepsFlexed,
    to: '/services/my-services',
    bg: 'bg-purple-950 dark:bg-purple-800',
  },
  {
    id: 3,
    label: 'My Rentals',
    icon: Handshake,
    to: '/rentals/my-rentals',
    bg: 'bg-emerald-500',
  },
  {
    id: 4,
    label: 'My Products',
    icon: Package2,
    to: '/products/my-products',
    bg: 'bg-indigo-500',
  },
  {
    id: 5,
    label: 'My Spaces',
    icon: BsBuilding,
    to: '/spaces/my-spaces',
    bg: 'bg-orange-500',
  },
  {
    id: 6,
    label: 'My Jobs',
    icon: BriefcaseBusiness,
    to: '/jobs/my-jobs',
    bg: 'bg-red-500',
  },
];

const QuickActions = () => {
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
              className="flex flex-col items-center text-center group"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm transition duration-200 group-hover:-translate-y-1 group-hover:shadow-md ${action.bg}`}
              >
                <Icon className="w-6 h-6" />
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