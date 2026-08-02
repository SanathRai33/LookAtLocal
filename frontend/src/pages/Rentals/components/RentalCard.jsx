import React from 'react';
import { MapPin, Star, Calendar, Shield, User } from 'lucide-react';

const RentalCard = ({ rental }) => {
  const { 
    title, 
    category, 
    rating, 
    reviews, 
    pricePerDay, 
    deposit, 
    image, 
    owner, 
    location, 
    availability,
    categoryIcon 
  } = rental;

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-700">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute flex items-center gap-2 top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-green-500/90 backdrop-blur-sm">
            {availability ? 'Available' : 'Not Available'}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-700 rounded-full bg-white/90 backdrop-blur-sm">
            <span>{categoryIcon}</span>
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h3>
        
        {/* Rating & Location */}
        <div className="flex items-center gap-4 mt-1.5">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">({reviews} reviews)</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs truncate max-w-[100px]">{location}</span>
          </div>
        </div>

        {/* Price & Deposit */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">₹{pricePerDay}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/day</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Shield className="w-3 h-3" />
              Deposit: ₹{deposit}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {owner.verified && (
              <span className="text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Owner & Actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
              owner.verified ? 'bg-blue-600' : 'bg-gray-500'
            }`}>
              {owner.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{owner.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Since {owner.joinedDate}</p>
            </div>
          </div>
          <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;