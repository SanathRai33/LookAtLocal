import React from 'react';
import { Star } from 'lucide-react';

const OpportunityCard = ({ opportunity }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-amber-400 text-amber-400" />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600" />
      );
    }

    return stars;
  };

  return (
    <article className="flex items-center gap-4 p-4 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <img
        src={opportunity.image || 'https://via.placeholder.com/96x80/6366f1/ffffff?text=Service'}
        alt={opportunity.title}
        className="object-cover w-24 h-20 shrink-0 rounded-xl"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/96x80/6366f1/ffffff?text=Service';
        }}
      />

      <div className="flex-1 min-w-0">
        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          {opportunity.category || 'Service'}
        </span>

        <h3 className="mt-1 font-semibold truncate text-gray-950 dark:text-white">
          {opportunity.title}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          {renderStars(opportunity.rating || 0)}

          <span className="ml-1 text-sm text-gray-500">
            {opportunity.rating || 'New'}
          </span>
        </div>

        <p className="mt-1 font-bold text-gray-950 dark:text-white">
          {opportunity.price || 'Price on request'}
        </p>
      </div>
    </article>
  );
};

export default OpportunityCard;