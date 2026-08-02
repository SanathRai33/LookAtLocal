import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';

const CategorySection = () => {
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