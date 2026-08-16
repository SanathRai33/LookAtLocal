import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RelatedListings = ({ services = [] }) => {
    const navigate = useNavigate();

    if (!services.length) {
        return null;
    }

    const getPricingLabel = (pricingType) => {
        const labels = {
            HOURLY: '/hour',
            DAILY: '/day',
            FIXED: '',
        };

        return labels[pricingType] || '';
    };

    return (
        <div className="p-6 bg-white shadow-sm rounded-2xl dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                More from this provider
            </h3>

            <div className="mt-4 space-y-3">
                {services.map((service) => {
                    const image = service.images?.[0]?.imageUrl;

                    return (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => navigate(`/services/${service.id}`)}
                            className="flex items-center w-full gap-3 p-3 text-left transition rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-xl dark:bg-slate-700">
                                {image ? (
                                    <img
                                        src={image}
                                        alt={service.title}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-400">📌</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {service.title}
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />

                                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                                        {service.averageRating > 0
                                            ? service.averageRating.toFixed(1)
                                            : 'New'}
                                    </span>

                                    {service.reviewCount > 0 && (
                                        <span className="text-xs text-gray-500">
                                            ({service.reviewCount})
                                        </span>
                                    )}
                                </div>

                                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    ₹{Number(service.price).toLocaleString('en-IN')}
                                    {getPricingLabel(service.pricingType)}
                                </p>
                            </div>

                            <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedListings;