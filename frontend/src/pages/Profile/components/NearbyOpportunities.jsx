import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import OpportunityCard from './OpportunityCard';

const NearbyOpportunities = ({ opportunities }) => {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-950 dark:text-white">
          Nearby Opportunities
        </h2>

        <Link
          to="/services"
          className="flex items-center gap-1 text-sm font-medium text-gray-900 transition hover:text-blue-600 dark:text-gray-300"
        >
          View all
          <ChevronRight className="h-4 w-4" />
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