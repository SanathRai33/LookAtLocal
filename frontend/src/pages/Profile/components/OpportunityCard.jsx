import React from 'react';
import { Star } from 'lucide-react';

const OpportunityCard = ({ opportunity }) => {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <img
        src={opportunity.image}
        alt={opportunity.title}
        className="h-20 w-24 shrink-0 rounded-xl object-cover"
      />

      <div className="min-w-0 flex-1">
        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          {opportunity.category}
        </span>

        <h3 className="mt-1 truncate font-semibold text-gray-950 dark:text-white">
          {opportunity.title}
        </h3>

        <div className="mt-1 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="h-4 w-4 fill-amber-400 text-amber-400"
            />
          ))}

          <span className="ml-1 text-sm text-gray-500">
            {opportunity.rating}
          </span>
        </div>

        <p className="mt-1 font-bold text-gray-950 dark:text-white">
          {opportunity.price}
        </p>
      </div>
    </article>
  );
};

export default OpportunityCard;