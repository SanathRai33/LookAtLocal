import React from 'react';
import ServiceCard from './ServiceCard';
import { Loader2 } from 'lucide-react';

const ServiceGrid = ({ services, loading, variant = 'default' }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-gray-500 dark:text-gray-400">Loading services...</span>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No services found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Try adjusting your search or filter
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} variant={variant} />
      ))}
    </div>
  );
};

export default ServiceGrid;