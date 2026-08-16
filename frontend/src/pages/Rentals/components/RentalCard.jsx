import React from 'react';
import { MapPin, Star, Calendar, Shield, User, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const RentalCard = ({ rental }) => {
  const {
    id,
    title,
    description,
    category,
    pricePerDay,
    depositAmount,
    isNegotiable,
    condition,
    quantity,
    deliveryOption,
    city,
    state,
    owner,
    averageRating,
    reviewCount,
    isAvailable,
    status,
    images
  } = rental;

  const getConditionLabel = (cond) => {
    const labels = {
      NEW: 'New',
      LIKE_NEW: 'Like New',
      GOOD: 'Good',
      FAIR: 'Fair',
      POOR: 'Poor'
    };
    return labels[cond] || cond;
  };

  const getConditionColor = (cond) => {
    const colors = {
      NEW: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      LIKE_NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      GOOD: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      FAIR: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      POOR: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    };
    return colors[cond] || colors.GOOD;
  };

    const renderIcon = (iconName) => {
      if (!iconName) return '📌';
  
      const formattedName = iconName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
  
      const IconComponent = LucideIcons[formattedName];
  
      return IconComponent ? <IconComponent className="w-4 h-4" /> : <span>{formattedName}</span>;
    };

  const firstImage = images && images.length > 0 ? images[0].imageUrl : null;

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-700">
        {firstImage ? (
          <img
            src={firstImage}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-gray-400 dark:text-gray-500">No image</span>
          </div>
        )}
        <div className="absolute flex items-start justify-between w-[260px] top-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            isAvailable && status === 'ACTIVE'
              ? 'bg-green-500/90 text-white'
              : 'bg-gray-500/90 text-white'
          } backdrop-blur-sm`}>
            {isAvailable && status === 'ACTIVE' ? 'Available' : 'Not Available'}
          </span>
          {isNegotiable && (
            <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-yellow-500/90 backdrop-blur-sm">
              Negotiable
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-gray-700 rounded-full bg-white/90 backdrop-blur-sm dark:bg-slate-800/90 dark:text-gray-300">
            <span>{renderIcon(category?.icon) || '📌'}</span>
            {category?.name || 'Rental'}
          </span>
        </div>
      </div>

      <div className="p-4">
        <Link to={`/rentals/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400">
            {title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full ${getConditionColor(condition)}`}>
            {getConditionLabel(condition)}
          </span>
          {quantity > 1 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {quantity} available
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-1.5">
          {averageRating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({reviewCount} reviews)
              </span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            <span className="text-xs truncate max-w-[100px]">{city}, {state}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                <IndianRupee className="inline w-4 h-4" />
                {pricePerDay}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/day</span>
            </div>
            {depositAmount > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Shield className="w-3 h-3" />
                Deposit: <IndianRupee className="inline w-3 h-3" />
                {depositAmount}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {owner?.verified && (
              <span className="text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {owner?.profileImageUrl ? (
              <img
                src={owner.profileImageUrl}
                alt={owner.fullName}
                className="object-cover w-8 h-8 rounded-full"
              />
            ) : (
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
                owner?.verified ? 'bg-blue-600' : 'bg-gray-500'
              }`}>
                {owner?.fullName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {owner?.fullName || 'Unknown'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {deliveryOption === 'PICKUP' ? 'Pickup only' :
                 deliveryOption === 'OWNER_DELIVERY' ? 'Delivery available' :
                 'Pickup or Delivery'}
              </p>
            </div>
          </div>
          <Link
            to={`/rentals/${id}`}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;