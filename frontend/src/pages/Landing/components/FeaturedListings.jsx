import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { featuredListings } from '../data/mockLandingData';

const FeaturedListings = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Featured Listings
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Hand-picked by our community editors
          </p>
        </div>
        <Link to="/marketplace" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {featuredListings.map((item) => (
          <div key={item.id} className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-700">
              <img 
                src={item.image} 
                alt={item.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 text-xs font-medium text-gray-700 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:text-gray-300">
                  {item.type}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPin className="w-3 h-3" />
                {item.location}
              </div>
              <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{item.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({item.reviews})</span>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;