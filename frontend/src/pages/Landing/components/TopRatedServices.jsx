import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { topRatedServices } from '../data/mockLandingData';

const TopRatedServices = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Popular Services Nearby
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Top-rated professionals in your area
          </p>
        </div>
        <Link to="/services" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {topRatedServices.map((service) => (
          <div key={service.id} className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="object-cover h-14 w-14 rounded-xl"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                    {service.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium text-gray-900 dark:text-white">{service.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400">({service.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  {service.distance}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <Clock className="w-3 h-3" />
                    {service.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedServices;