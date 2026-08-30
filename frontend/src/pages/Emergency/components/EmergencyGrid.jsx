import React from 'react';
import { Link } from 'react-router-dom'
import EmergencyCard from './EmergencyCard';
import { Loader2, Siren } from 'lucide-react';

const EmergencyGrid = ({ emergencies, loading, onStatusChange }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        <span className="ml-3 text-gray-500 dark:text-gray-400">
          Loading emergency requests...
        </span>
      </div>
    );
  }

  if (emergencies?.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="flex items-center justify-center mb-4"><Siren className='w-20 h-20 text-6xl text-red-700 animate-pulse' /></div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No emergency requests
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          All clear! No emergency requests at the moment.
        </p>
        <Link
          to="/emergency/create"
          className="inline-block px-6 py-2.5 mt-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25"
        >
          Post Emergency
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
      {emergencies?.map((emergency) => (
        <EmergencyCard key={emergency.id} request={emergency} onStatusChange={onStatusChange} />
      ))}
    </div>
  );
};

export default EmergencyGrid;