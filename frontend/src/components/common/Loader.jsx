import React from 'react';

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-dark-200">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
        <p className="text-text-secondary dark:text-gray-400 text-sm font-medium">
          Loading Look@Local...
        </p>
      </div>
    </div>
  );
};

export default Loader;