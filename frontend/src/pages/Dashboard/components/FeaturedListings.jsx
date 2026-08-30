import React from 'react';
import { ChevronRight, Heart, MapPin, Star } from 'lucide-react';
// import { featuredListings } from '../data/mockData';

const FeaturedListings = () => {
    return (
        <section className="pb-16">
            <div className="flex items-end justify-between mb-7">
                <div>
                    <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
                        Featured Listings
                    </h2>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Hand-picked by our community editors
                    </p>
                </div>

                <button className="items-center hidden gap-1 text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-white sm:flex">
                    View all
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {featuredListings.map((listing) => (
                    <article
                        key={listing.id}
                        className="overflow-hidden transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div className="relative overflow-hidden h-52">
                            <img
                                src={listing.image}
                                alt={listing.title}
                                className="object-cover w-full h-full transition duration-500 hover:scale-105"
                            />

                            <span className="absolute px-3 py-1 text-xs font-semibold text-gray-900 bg-white rounded-full shadow-sm left-4 top-4">
                                {listing.category}
                            </span>

                            <button className="absolute flex items-center justify-center text-gray-500 transition rounded-full shadow-sm right-4 top-4 h-9 w-9 bg-white/95 hover:text-red-500">
                                <Heart className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-5">
                            <h3 className="text-base font-semibold truncate text-gray-950 dark:text-white">
                                {listing.title}
                            </h3>

                            <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-4 h-4 shrink-0" />
                                <span className="truncate">{listing.location}</span>
                            </div>

                            <div className="flex items-center justify-between mt-5">
                                <div className="flex items-center gap-1">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="w-4 h-4 fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>

                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                        {listing.rating} ({listing.reviews})
                                    </span>
                                </div>

                                <span className="font-bold text-gray-950 dark:text-white">
                                    {listing.price}
                                </span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedListings;