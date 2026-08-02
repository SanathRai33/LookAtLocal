import React from 'react';
import {
    MapPin,
    Star,
    Clock,
    Shield,
    Award,
    TrendingUp,
    CheckCircle
} from 'lucide-react';

const ServiceCard = ({ service, variant = 'default' }) => {
    const {
        name,
        title,
        category,
        categoryIcon,
        rating,
        reviews,
        price,
        location,
        distance,
        availability,
        verified,
        popular,
        image,
        description,
        provider,
        tags,
        features,
        availableToday,
        responseTime,
        completedJobs
    } = service;

    const getAvailabilityColor = (availability) => {
        if (availability.includes('now') || availability.includes('today')) {
            return 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400';
        }
        return 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400';
    };

    // Variant 1: Default Card (shows more details)
    if (variant === 'default') {
        return (
            <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
                <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative flex-shrink-0 h-48 overflow-hidden bg-gray-100 sm:w-48 sm:h-auto dark:bg-slate-700">
                        <img
                            src={image}
                            alt={name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        />
                        {popular && (
                            <div className="absolute top-3 left-3">
                                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-yellow-500 rounded-full">
                                    <TrendingUp className="w-3 h-3" />
                                    Popular
                                </span>
                            </div>
                        )}
                        {verified && (
                            <div className="absolute top-3 right-3">
                                <span className="flex items-center gap-1 px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded-full">
                                    <Shield className="w-3 h-3" />
                                    Verified
                                </span>
                            </div>
                        )}
                        <div className="absolute bottom-3 left-3">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(availability)}`}>
                                {availability}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{categoryIcon}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">
                                    {name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                            </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-semibold text-gray-900 dark:text-white">{rating}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">({reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-4 h-4" />
                                {distance}
                            </div>
                        </div>

                        {/* Price & Features */}
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{price}</span>
                            {features && features.slice(0, 2).map((feature, index) => (
                                <span key={index} className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                    {feature}
                                </span>
                            ))}
                        </div>

                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                                {tags.map((tag, index) => (
                                    <span key={index} className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white ${provider.verified ? 'bg-blue-600' : 'bg-gray-500'
                                        }`}>
                                        {provider.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{provider.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{completedJobs} jobs completed</p>
                                    </div>
                                </div>
                            </div>
                            <button className="px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/25">
                                View Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Variant 2: Compact Card (shows less details)
    return (
        <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
            <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{categoryIcon}</span>
                            <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                                {name}
                            </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">{title}</p>
                    </div>
                    {verified && (
                        <span className="flex-shrink-0 text-xs bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                        </span>
                    )}
                </div>

                {/* Rating & Location */}
                <div className="flex items-center gap-3 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium text-gray-900 dark:text-white">{rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">({reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {distance}
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getAvailabilityColor(availability)}`}>
                        {availability}
                    </span>
                </div>

                {/* Price & Actions */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{price}</span>
                    <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;