import React, { useState } from 'react';
import { MapPin, Star, Heart, IndianRupee, Users, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const SpaceCard = ({ space }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const {
        id,
        title,
        spaceType,
        city,
        state,
        owner,
        status,
        images,
        units,
        isFavorite,
        category
    } = space;

    const getSpaceTypeLabel = (type) => {
        const labels = {
            SHOP: 'Shop',
            OFFICE: 'Office',
            ROOM: 'Room',
            PG: 'PG',
            WAREHOUSE: 'Warehouse',
            PARKING: 'Parking'
        };
        return labels[type] || type;
    };

    const getSpaceTypeColor = (type) => {
        const colors = {
            SHOP: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
            OFFICE: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
            ROOM: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
            PG: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
            WAREHOUSE: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
            PARKING: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400'
        };
        return colors[type] || colors.SHOP;
    };

    const firstImage = images && images?.length > 0 ? images[0].imageUrl : null;
    const availableUnits = units?.filter(u => u.status === 'AVAILABLE')?.length || 0;
    const totalUnits = units?.length || 0;
    const minPrice = units?.length > 0 ? Math.min(...units?.map(u => Number(u.price))) : null;

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
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getSpaceTypeColor(spaceType)}`}>
                        {getSpaceTypeLabel(spaceType)}
                    </span>
                </div>

                {status === 'ACTIVE' && (
                    <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full">
                            Available
                        </span>
                    </div>
                )}

                {/* <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute p-2 transition-all duration-200 rounded-full bottom-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:scale-110"
                >
                    <Heart className={`h-5 w-5 ${isWishlisted || isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                </button> */}
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <Link to={`/spaces/${id}`}>
                        <h3 className="flex-1 text-base font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400">
                            {title}
                        </h3>
                    </Link>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 rounded-full whitespace-nowrap">
                        {category?.name || 'Space'}
                    </span>
                </div>

                <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{city}, {state}</span>
                    </div>
                    {totalUnits > 0 && (
                        <div className="flex items-center gap-1">
                            <Package className="h-3.5 w-3.5" />
                            <span>{availableUnits} units</span>
                        </div>
                    )}
                </div>

                {minPrice !== null && (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            <IndianRupee className="inline w-4 h-4" />
                            {minPrice}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">/mo</span>
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        {owner?.profileImageUrl ? (
                            <img
                                src={owner.profileImageUrl}
                                alt={owner.fullName}
                                className="object-cover w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium text-white bg-blue-600`}>
                                {owner?.fullName?.charAt(0) || 'U'}
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {owner?.fullName || 'Unknown'}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {status === 'ACTIVE' ? 'Active' : status}
                            </p>
                        </div>
                    </div>
                    <Link
                        to={`/spaces/${id}`}
                        className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SpaceCard;