import React from 'react';
import { MapPin, Star, Users, Square, Calendar, Shield, Wifi, Zap, Car, Coffee } from 'lucide-react';

const PropertyCard = ({ property }) => {
  const { 
    title, 
    category,
    categoryIcon,
    rating, 
    reviews, 
    price, 
    deposit, 
    image, 
    location, 
    amenities,
    size,
    capacity,
    availability,
    owner,
    features
  } = property;

  // Map amenity to icon
  const getAmenityIcon = (amenity) => {
    const icons = {
      'Wi-Fi': <Wifi className="h-3.5 w-3.5" />,
      'WiFi': <Wifi className="h-3.5 w-3.5" />,
      'AC': <Zap className="h-3.5 w-3.5" />,
      'Parking': <Car className="h-3.5 w-3.5" />,
      'Coffee': <Coffee className="h-3.5 w-3.5" />,
      'CCTV': <Shield className="h-3.5 w-3.5" />,
      'Security': <Shield className="h-3.5 w-3.5" />,
      'Meals': <Coffee className="h-3.5 w-3.5" />,
      'Laundry': <Zap className="h-3.5 w-3.5" />,
      'Loading dock': <Square className="h-3.5 w-3.5" />,
      'Power backup': <Zap className="h-3.5 w-3.5" />,
      '24/7 access': <Shield className="h-3.5 w-3.5" />,
      '24/7': <Shield className="h-3.5 w-3.5" />,
      'Meeting Rooms': <Users className="h-3.5 w-3.5" />
    };
    return icons[amenity] || <Square className="h-3.5 w-3.5" />;
  };

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-700">
        <img 
          src={image} 
          alt={title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-700 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm dark:text-gray-300">
            <span>{categoryIcon}</span>
            {category}
          </span>
        </div>

        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-green-500/90 backdrop-blur-sm">
            {availability.includes('Available') ? 'Available' : 'Coming Soon'}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute flex items-center gap-1 px-3 py-1 text-sm rounded-full bottom-3 left-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium text-gray-900 dark:text-white">{rating}</span>
          <span className="text-gray-500 dark:text-gray-400">({reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="flex-shrink-0 w-4 h-4" />
          <span className="truncate">{location}</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {amenities.map((amenity, index) => (
            <span key={index} className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-lg dark:text-gray-400 dark:bg-slate-700">
              {getAmenityIcon(amenity)}
              {amenity}
            </span>
          ))}
        </div>

        {/* Size & Capacity */}
        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Square className="h-3.5 w-3.5" />
            {size}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {capacity}
          </span>
        </div>

        {/* Price & Deposit */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                ₹{price.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Deposit: ₹{deposit.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {owner.verified && (
              <span className="text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>
        </div>

        {/* Owner & Action */}
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
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;