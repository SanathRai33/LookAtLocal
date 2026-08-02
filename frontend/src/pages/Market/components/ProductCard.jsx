import React, { useState } from 'react';
import { MapPin, Star, Heart, Eye, Calendar, Tag, User } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(product.wishlisted || false);
  
  const { 
    title, 
    category, 
    price, 
    originalPrice, 
    condition, 
    conditionColor,
    image, 
    location, 
    seller, 
    postedDate,
    views,
    tags
  } = product;

  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const getConditionColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
      blue: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
      orange: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400'
    };
    return colors[color] || colors.green;
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
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              {discount}% OFF
            </span>
          </div>
        )}

        {/* Condition Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getConditionColor(conditionColor)}`}>
            {condition}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute p-2 transition-all duration-200 rounded-full bottom-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:scale-110"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Category */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 text-base font-semibold text-gray-900 dark:text-white line-clamp-1">
            {title}
          </h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-full whitespace-nowrap">
            {category}
          </span>
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1.5">
            {tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ₹{price.toLocaleString()}
          </span>
          {originalPrice > price && (
            <span className="text-sm text-gray-400 line-through dark:text-gray-500">
              ₹{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Location & Views */}
        <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" />
            <span>{views}</span>
          </div>
        </div>

        {/* Seller & Actions */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${
              seller.verified ? 'bg-blue-600' : 'bg-gray-500'
            }`}>
              {seller.initials}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{seller.name}</p>
                {seller.verified && (
                  <span className="text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded-full">
                    ✓
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>⭐ {seller.rating}</span>
                <span>•</span>
                <span>{seller.totalSales} sales</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500">
              <Calendar className="w-3 h-3" />
              {postedDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;