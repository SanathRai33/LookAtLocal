import React from 'react';
import {
  MapPin,
  Star,
  Clock,
  Shield,
  Award,
  TrendingUp,
  CheckCircle,
  IndianRupee,
  User,
  Wrench,
  Briefcase,
  Home,
  ShoppingBag,
  Package,
  Building
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categoryIcons = {
  SERVICE: <Wrench className="w-4 h-4" />,
  RENTAL: <ShoppingBag className="w-4 h-4" />,
  PRODUCT: <Package className="w-4 h-4" />,
  SPACE: <Building className="w-4 h-4" />,
  JOB: <Briefcase className="w-4 h-4" />,
};

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
  PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
  REJECTED: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
  CLOSED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

const ServiceCard = ({ service, variant = 'default' }) => {
  const {
    id,
    title,
    description,
    category,
    price,
    pricingType,
    city,
    state,
    status,
    provider,
    averageRating,
    reviewCount,
    isAvailable,
    images,
    experienceYears,
    isNegotiable
  } = service;

  const getPricingLabel = (type) => {
    const types = {
      HOURLY: '/hr',
      DAILY: '/day',
      FIXED: '',
    };
    return types[type] || '';
  };

  const getStatusColor = (status) => {
    return statusColors[status] || statusColors.CLOSED;
  };

  const getAvailability = () => {
    if (!isAvailable) return 'Unavailable';
    if (status === 'ACTIVE') return 'Available now';
    return status;
  };

  const getAvailabilityColor = () => {
    if (!isAvailable) return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    if (status === 'ACTIVE') return 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400';
    return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400';
  };

  const firstImage = images && images.length > 0 ? images[0].imageUrl : null;

  if (variant === 'default') {
    return (
      <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
        <div className="flex flex-col sm:flex-row">
          <div className="relative flex-shrink-0 h-48 overflow-hidden bg-gray-100 sm:w-48 sm:h-auto dark:bg-slate-700">
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
            {status === 'ACTIVE' && isAvailable && (
              <div className="absolute top-3 left-3">
                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Available
                </span>
              </div>
            )}
            <div className="absolute bottom-3 left-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getAvailabilityColor()}`}>
                {getAvailability()}
              </span>
            </div>
          </div>

          <div className="flex-1 p-5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {categoryIcons[category?.module] || <Wrench className="w-4 h-4" />}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category?.name || 'Service'}
                  </span>
                </div>
                <Link to={`/services/${id}`}>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5 hover:text-blue-600 dark:hover:text-blue-400">
                    {title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-2">
              {averageRating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">({reviewCount} reviews)</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                {city}, {state}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                <IndianRupee className="inline w-5 h-5" />
                {price || 0}{getPricingLabel(pricingType)}
              </span>
              {isNegotiable && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400">Negotiable</span>
              )}
              {experienceYears && (
                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="w-3 h-3" />
                  {experienceYears} years exp.
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                {provider?.profileImageUrl ? (
                  <img
                    src={provider.profileImageUrl}
                    alt={provider.fullName}
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {provider?.fullName?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{provider?.fullName || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{provider?.city || ''}</p>
                </div>
              </div>
              <Link
                to={`/services/${id}`}
                className="px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{categoryIcons[category?.module] || <Wrench className="w-4 h-4" />}</span>
              <Link to={`/services/${id}`}>
                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400">
                  {title}
                </h3>
              </Link>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{description}</p>
          </div>
          {status === 'ACTIVE' && (
            <span className="flex-shrink-0 text-xs bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Active
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-2 text-sm">
          {averageRating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium text-gray-900 dark:text-white">{averageRating.toFixed(1)}</span>
              <span className="text-gray-500 dark:text-gray-400">({reviewCount})</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            {city}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getAvailabilityColor()}`}>
            {getAvailability()}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
            <IndianRupee className="inline w-4 h-4" />
            {price || 0}{getPricingLabel(pricingType)}
          </span>
          <Link
            to={`/services/${id}`}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;