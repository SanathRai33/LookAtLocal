import React, { useState } from 'react';
import { MapPin, Star, Heart, Eye, Calendar, Tag, User, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const {
    id,
    title,
    price,
    isNegotiable,
    condition,
    deliveryOption,
    city,
    state,
    seller,
    averageRating,
    reviewCount,
    status,
    images,
    createdAt,
    category
  } = product;

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
      NEW: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      LIKE_NEW: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
      GOOD: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
      FAIR: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
      POOR: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
    };
    return colors[cond] || colors.GOOD;
  };

  const getDeliveryLabel = (option) => {
    const labels = {
      PICKUP: 'Pickup',
      SELLER_DELIVERY: 'Delivery',
      BOTH: 'Both'
    };
    return labels[option] || option;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const firstImage = images && images?.length > 0 ? images[0].imageUrl : null;

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

        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConditionColor(condition)}`}>
            {getConditionLabel(condition)}
          </span>
        </div>

        {isNegotiable && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">
              Negotiable
            </span>
          </div>
        )}

        {/* <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute p-2 transition-all duration-200 rounded-full bottom-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:scale-110"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button> */}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${id}`}>
            <h3 className="flex-1 text-base font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400">
              {title}
            </h3>
          </Link>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-full whitespace-nowrap">
            {category?.name || 'Product'}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {getDeliveryLabel(deliveryOption)}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-3 mt-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            <IndianRupee className="inline w-4 h-4" />
            {price}
          </span>
          {isNegotiable && (
            <span className="text-xs text-yellow-600 dark:text-yellow-400">
              negotiable
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{city}, {state}</span>
          </div>
          {averageRating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
              <span>{averageRating.toFixed(1)}</span>
            </div>
          )}
          {reviewCount > 0 && (
            <span>({reviewCount})</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            {seller?.profileImageUrl ? (
              <img
                src={seller.profileImageUrl}
                alt={seller.fullName}
                className="object-cover w-8 h-8 rounded-full"
              />
            ) : (
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white bg-blue-600`}>
                {seller?.fullName?.charAt(0) || 'U'}
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {seller?.fullName || 'Unknown'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {status === 'ACTIVE' ? 'Active' : status}
              </p>
            </div>
          </div>
          <Link
            to={`/product/${id}`}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;