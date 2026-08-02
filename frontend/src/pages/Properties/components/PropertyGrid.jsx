import React from 'react';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ properties }) => {
  if (properties.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No spaces found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;