import React from 'react';
import { ChevronRight, MapPin, Star } from 'lucide-react';
// import { services } from '../data/mockData';

const PopularServices = () => {
    return (
        <section className="pb-16">
            <div className="flex items-center justify-between mb-7">
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
                    Popular Services Nearby
                </h2>

                <button className="items-center hidden gap-1 text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-white sm:flex">
                    View all
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
                {services.map((service) => (
                    <article
                        key={service.id}
                        className="relative p-5 transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
                    >
                        {service.badge && (
                            <span className="absolute right-5 top-5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                {service.badge}
                            </span>
                        )}

                        <div className="flex gap-4">
                            <img
                                src={service.image}
                                alt={service.name}
                                className="object-cover rounded-full h-14 w-14 shrink-0"
                            />

                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-950 dark:text-white">
                                    {service.name}
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {service.service}
                                </p>

                                <div className="flex items-center gap-1 mt-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                                        />
                                    ))}

                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                        {service.rating} ({service.reviews})
                                    </span>
                                </div>

                                <div className="flex items-end justify-between mt-3">
                                    <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <MapPin className="h-3.5 w-3.5" />
                                        {service.distance}
                                    </span>

                                    <span className="font-bold text-gray-950 dark:text-white">
                                        {service.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default PopularServices;