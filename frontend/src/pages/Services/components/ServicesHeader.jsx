import React, { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";

const ServicesHeader = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  totalCount,
  sortBy,
  onSortChange,
  loading,
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
  ];

  const pricingOptions = [
    { value: "", label: "All pricing types" },
    { value: "HOURLY", label: "Hourly" },
    { value: "DAILY", label: "Daily" },
    { value: "FIXED", label: "Fixed" },
  ];

  const getCurrentSortLabel = () => {
    const option = sortOptions.find(
      (option) => option.value === sortBy
    );

    return option ? option.label : "Sort by";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Local Services
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Find trusted professionals in your neighbourhood
          </p>
        </div>

        <div className="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
          {/* Search */}
          <form
            onSubmit={handleSubmit}
            className="w-full sm:w-64 lg:w-80"
          >
            <div className="relative">
              <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />

              <input
                type="text"
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search services..."
                className="w-full h-12 pl-10 pr-4 text-sm text-gray-900 transition bg-white border border-gray-200 outline-none dark:bg-slate-800 dark:border-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </form>

          {/* Filters */}
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>

          {/* Sort */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setShowSortDropdown((prev) => !prev)
              }
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition bg-white border border-gray-200 dark:bg-slate-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-xl whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />

              {getCurrentSortLabel()}

              <ChevronDown
                className={`w-4 h-4 transition-transform ${showSortDropdown ? "rotate-180" : ""
                  }`}
              />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 z-20 w-56 mt-2 bg-white border border-gray-200 shadow-lg dark:bg-slate-800 dark:border-gray-700 rounded-xl">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onSortChange(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left transition hover:bg-gray-50 dark:hover:bg-slate-700 ${sortBy === option.value
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20"
                      : "text-gray-700 dark:text-gray-300"
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="p-5 mt-5 bg-white border border-gray-200 shadow-sm dark:bg-slate-800 dark:border-gray-700 rounded-2xl">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filter Services
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Services are automatically filtered based on your location.
              </p>
            </div>

            <button
              type="button"
              onClick={onClearFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Pricing Type */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Pricing Type
              </label>

              <select
                value={filters.pricingType}
                onChange={(e) =>
                  onFilterChange(
                    "pricingType",
                    e.target.value,
                  )
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
              >
                {pricingOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Minimum Price
              </label>

              <input
                type="number"
                min="0"
                value={filters.minPrice}
                onChange={(e) =>
                  onFilterChange(
                    "minPrice",
                    e.target.value,
                  )
                }
                placeholder="0"
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
              />
            </div>

            {/* Maximum Price */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Maximum Price
              </label>

              <input
                type="number"
                min="0"
                value={filters.maxPrice}
                onChange={(e) =>
                  onFilterChange(
                    "maxPrice",
                    e.target.value,
                  )
                }
                placeholder="10000"
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
              />
            </div>

            {/* Negotiable */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Negotiable
              </label>

              <select
                value={filters.isNegotiable}
                onChange={(e) =>
                  onFilterChange(
                    "isNegotiable",
                    e.target.value,
                  )
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-blue-500"
              >
                <option value="">Any</option>

                <option value="true">
                  Negotiable only
                </option>

                <option value="false">
                  Non-negotiable only
                </option>
              </select>
            </div>
          </div>

          {/* Apply */}
          <div className="flex justify-end mt-5">
            <button
              type="button"
              onClick={onApplyFilters}
              disabled={loading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Applying..." : "Apply Filters"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {loading
          ? "Loading..."
          : `${totalCount} providers found`}
      </div>
    </div>
  );
};

export default ServicesHeader;