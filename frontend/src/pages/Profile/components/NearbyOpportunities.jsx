import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import OpportunityCard from './OpportunityCard';

const NearbyOpportunities = ({ opportunities }) => {
  if (opportunities.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
            Nearby Opportunities
          </h2>

          <Link
            to="/services"
            className="flex items-center gap-1 text-sm font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-300"
          >
            View all
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="p-8 text-center bg-white border border-gray-200 rounded-2xl dark:border-slate-800 dark:bg-slate-900">
          <p className="text-gray-500 dark:text-gray-400">
            No nearby opportunities found. Check back later!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
          Nearby Opportunities
        </h2>

        <Link
          to="/services"
          className="flex items-center gap-1 text-sm font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-300"
        >
          View all
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
          />
        ))}
      </div>
    </section>
  );
};

export default NearbyOpportunities;