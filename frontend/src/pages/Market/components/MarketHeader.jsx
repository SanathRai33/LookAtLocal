import React from 'react';
import SearchBar from '../../../components/common/SearchBar';

const MarketHeader = ({ searchQuery, setSearchQuery }) => {
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
        <div className="w-full md:w-72 lg:w-96">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
          />
        </div>
      </div>
    </div>
  );
};

export default MarketHeader;