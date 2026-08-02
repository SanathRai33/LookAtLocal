import React from 'react';
import SearchBar from '../../../components/common/SearchBar';

const PropertiesHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Space Availability
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Find the perfect space — shops, offices, rooms, PG, warehouses & parking
          </p>
        </div>
        <div className="w-full md:w-72 lg:w-96">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spaces..."
          />
        </div>
      </div>
    </div>
  );
};

export default PropertiesHeader;