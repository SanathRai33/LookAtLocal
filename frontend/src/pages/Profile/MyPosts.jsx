import React from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Building,
  Briefcase,
  ArrowRight,
  Wrench,
  Handshake,
  ShoppingBag
} from 'lucide-react';

const MyPosts = () => {
  const myPostOptions = [
    {
      id: 'service',
      title: 'My Services',
      description: 'Manage your service listings',
      icon: Wrench,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      path: '/services/my-services',
    },
    {
      id: 'rental',
      title: 'My Rentals',
      description: 'Manage your rental listings',
      icon: Handshake,
      color: 'bg-emerald-500',
      hoverColor: 'hover:bg-emerald-600',
      path: '/rentals/my-rentals',
    },
    {
      id: 'product',
      title: 'My Products',
      description: 'Manage your product listings',
      icon: ShoppingBag,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/products/my-products',
    },
    {
      id: 'space',
      title: 'My Spaces',
      description: 'Manage your space listings',
      icon: Building,
      color: 'bg-amber-500',
      hoverColor: 'hover:bg-amber-600',
      path: '/spaces/my-spaces',
    },
    {
      id: 'job',
      title: 'My Jobs',
      description: 'Manage your job postings',
      icon: Briefcase,
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      path: '/jobs/my-jobs',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-5xl px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            My Posts
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage all your listings in one place
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myPostOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Link
                key={option.id}
                to={option.path}
                className="relative overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-slate-700 hover:border-transparent"
              >
                <div className="relative z-10 p-6">
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl ${option.color} text-white transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {option.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {option.description}
                  </p>
                  <div className="flex items-center mt-4 text-sm font-medium text-blue-600 transition-opacity duration-300 opacity-0 dark:text-blue-400 group-hover:opacity-100">
                    View All
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                <div
                  className={`absolute inset-0 rounded-2xl ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 ${option.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Total listings across all categories: Manage them from here
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;