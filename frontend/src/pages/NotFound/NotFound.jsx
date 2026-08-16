import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertCircle,
  ArrowRight,
  Compass
} from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: 'Services', path: '/services' },
    { label: 'Rentals', path: '/rentals' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Spaces', path: '/spaces' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Community', path: '/community' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center justify-center px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full blur-3xl dark:bg-blue-950/30"></div>
            </div>
            <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 blur-2xl animate-pulse"></div>
              <div className="relative flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-2xl dark:bg-slate-800">
                <div className="relative">
                  <span className="font-bold text-transparent text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text dark:from-blue-400 dark:to-purple-400">
                    404
                  </span>
                  <div className="absolute -top-2 -right-4">
                    <AlertCircle className="w-8 h-8 text-yellow-500 animate-bounce" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-bold text-gray-950 dark:text-white sm:text-4xl">
            Oops! Page not found
          </h1>
          <p className="max-w-md mx-auto mt-4 text-base text-gray-500 dark:text-gray-400">
            We couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Home className="w-4 h-4" />
              Homepage
            </Link>
          </div>

          {/* <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-white dark:bg-slate-950 dark:text-gray-400">
                  Or try searching
                </span>
              </div>
            </div>

            <div className="max-w-md mx-auto mt-6">
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full h-12 pl-12 pr-4 text-sm text-gray-900 border border-gray-300 outline-none rounded-xl dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
                    }
                  }}
                />
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  onClick={(e) => {
                    const input = e.target.closest('.relative').querySelector('input');
                    if (input && input.value.trim()) {
                      navigate(`/search?q=${encodeURIComponent(input.value.trim())}`);
                    }
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div> */}

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-white dark:bg-slate-950 dark:text-gray-400">
                  Quick Links
                </span>
              </div>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-3 mx-auto mt-6 sm:grid-cols-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                >
                  <Compass className="w-4 h-4 text-blue-500" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="max-w-md p-4 mx-auto mt-12 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/50">
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Can't find what you need?
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Try adjusting your search terms or browse our categories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;