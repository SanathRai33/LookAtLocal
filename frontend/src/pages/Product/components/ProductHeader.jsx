import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductHeader = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  totalCount,
  sortBy,
  onSortChange,
  loading
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.label : 'Sort by';
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Buy & Sell
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Find great deals on pre-loved items near you
          </p>
        </div>
        <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
          <form onSubmit={handleSubmit} className="w-full sm:w-64 lg:w-80">
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
                disabled={loading}
                className="w-full h-12 pl-10 pr-4 text-sm text-gray-900 transition bg-white border border-gray-200 outline-none dark:bg-slate-800 dark:border-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </form>

          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {getCurrentSortLabel()}
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 z-20 w-56 mt-2 bg-white border border-gray-200 shadow-lg dark:bg-slate-800 dark:border-gray-700 rounded-xl">
                {sortOptions?.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left transition hover:bg-gray-50 dark:hover:bg-slate-700 ${
                      sortBy === option.value
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/products/create"
            className="flex items-center justify-center gap-2 px-5 py-2.5 font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Sell Item
          </Link>
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {loading ? 'Loading...' : `${totalCount} items found`}
      </div>
    </div>
  );
};

export default ProductHeader;