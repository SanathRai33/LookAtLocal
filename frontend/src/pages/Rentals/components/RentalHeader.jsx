import React from "react";
import { Search } from "lucide-react";

const RentalHeader = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  totalCount,
  loading,
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Rental Marketplace
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Rent anything from your neighbours — cameras, vehicles, tools & more
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full md:w-72 lg:w-96"
        >
          <div className="relative">

            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />

            <input
              type="text"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search items to rent..."
              disabled={loading}
              className="w-full h-12 pl-10 pr-4 text-sm text-gray-900 transition bg-white border border-gray-200 outline-none dark:bg-slate-800 dark:border-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />

          </div>
        </form>

      </div>

      <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {loading
          ? "Loading..."
          : `${totalCount} items found`}
      </div>
    </div>
  );
};

export default RentalHeader;