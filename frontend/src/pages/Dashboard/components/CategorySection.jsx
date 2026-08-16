import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Repeat2,
  ShoppingBag,
  Building2,
  BriefcaseBusiness,
  Siren,
  Megaphone,
} from 'lucide-react';

const CategorySection = () => {

    const categories = [
        {
            id: 1,
            title: 'Local Services',
            description: 'Plumbers, electricians, cleaners & more',
            icon: Wrench,
            path: '/services',
            iconClass: 'text-blue-600',
            bgClass: 'bg-blue-50 dark:bg-blue-950/40',
        },
        {
            id: 2,
            title: 'Rental Marketplace',
            description: 'Tools, vehicles & equipment for rent',
            icon: Repeat2,
            path: '/rentals',
            iconClass: 'text-purple-600',
            bgClass: 'bg-purple-50 dark:bg-purple-950/40',
        },
        {
            id: 3,
            title: 'Buy & Sell',
            description: 'Local marketplace for goods',
            icon: ShoppingBag,
            path: '/products',
            iconClass: 'text-orange-600',
            bgClass: 'bg-orange-50 dark:bg-orange-950/40',
        },
        {
            id: 4,
            title: 'Space Availability',
            description: 'Shops, offices, rooms & PGs',
            icon: Building2,
            path: '/spaces',
            iconClass: 'text-teal-600',
            bgClass: 'bg-teal-50 dark:bg-teal-950/40',
        },
        {
            id: 5,
            title: 'Local Jobs',
            description: 'Find work in your neighborhood',
            icon: BriefcaseBusiness,
            path: '/jobs',
            iconClass: 'text-indigo-600',
            bgClass: 'bg-indigo-50 dark:bg-indigo-950/40',
        },
        {
            id: 6,
            title: 'Emergency Help',
            description: 'Blood, medical & volunteer support',
            icon: Siren,
            path: '/emergency',
            iconClass: 'text-red-600',
            bgClass: 'bg-red-50 dark:bg-red-950/40',
        },
        {
            id: 7,
            title: 'Notice Board',
            description: 'Community updates & announcements',
            icon: Megaphone,
            path: '/community',
            iconClass: 'text-amber-600',
            bgClass: 'bg-amber-50 dark:bg-amber-950/40',
        },
    ];

    return (
        <section className="py-14 md:py-16">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
                    Explore Categories
                </h2>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Everything your community needs in one place
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                        <Link
                            key={category.id}
                            to={category.path}
                            className="group flex min-h-[178px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-4 py-6 text-center shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                        >
                            <div
                                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${category.bgClass}`}
                            >
                                <Icon className={`h-6 w-6 ${category.iconClass}`} />
                            </div>

                            <h3 className="text-sm font-semibold text-gray-950 dark:text-white sm:text-base">
                                {category.title}
                            </h3>

                            <p className="mt-1.5 text-xs leading-5 text-gray-500 dark:text-gray-400 sm:text-sm">
                                {category.description}
                            </p>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default CategorySection;