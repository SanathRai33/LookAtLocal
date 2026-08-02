import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder, className }) => {
  return (
    <div className={`relative ${className || ''}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Search...'}
        className="w-full px-5 py-3 pl-12 pr-4 text-gray-900 transition-all duration-200 bg-white border border-gray-200 rounded-2xl dark:bg-slate-800 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
      />
      <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2 dark:text-gray-500" />
    </div>
  );
};

export default SearchBar;