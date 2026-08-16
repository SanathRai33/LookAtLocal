import React from 'react';
import RentalCard from './RentalCard';
import { Loader2 } from 'lucide-react';

const RentalGrid = ({ rentals, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading rentals...</span>
      </div>
    );
  }

  if (rentals.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No items found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
      {rentals.map((rental) => (
        <RentalCard key={rental.id} rental={rental} />
      ))}
    </div>
  );
};

export default RentalGrid;