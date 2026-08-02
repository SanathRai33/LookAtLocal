import React from 'react';
import { Search } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden rounded-3xl"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-blue-700/95 dark:bg-blue-950/65" />

      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-blue-700/10 to-blue-950/35" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 bg-blue-400 rounded-full w-96 h-96 blur-3xl" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-white border border-white/20 bg-white/20 backdrop-blur-md rounded-full">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full" />
            </span>
            Now live in 50+ cities across India
          </div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Your Neighbourhood,
            <br />
            <span className="text-yellow-400">
              Reimagined.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-50 md:text-xl">
            Services, rentals, jobs, spaces — everything your community needs
            <br className="hidden sm:block" />
            right at your doorstep.
          </p>

          <div className="max-w-3xl p-2 mx-auto border shadow-2xl bg-white/95 dark:bg-slate-800/95 border-white/30 dark:border-slate-700 rounded-2xl backdrop-blur-md">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center flex-1 px-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <Search className="flex-shrink-0 w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search services, products, jobs..."
                  className="w-full px-3 py-3 text-gray-900 bg-transparent outline-none dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>

              <button
                type="button"
                className="py-3 font-medium text-white transition-all duration-200 bg-blue-600 px-7 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap"
              >
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pb-2 mt-3">
              <span className="px-2 text-xs text-gray-500 dark:text-gray-400">
                Popular:
              </span>

              <button
                type="button"
                className="px-3 py-1 text-xs text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
              >
                Plumber
              </button>

              <button
                type="button"
                className="px-3 py-1 text-xs text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
              >
                Room for rent
              </button>

              <button
                type="button"
                className="px-3 py-1 text-xs text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
              >
                Part-time jobs
              </button>

              <button
                type="button"
                className="px-3 py-1 text-xs text-gray-700 transition-colors duration-200 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
              >
                Blood donation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;