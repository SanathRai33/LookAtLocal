import React from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
    return (
        <section className="pb-16">
            <h2 className="mb-8 text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
                What our community says
            </h2>

            <div className="grid gap-5 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                    <article
                        key={testimonial.id}
                        className="flex min-h-[200px] flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                    >
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= testimonial.rating
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'fill-gray-200 text-gray-200 dark:fill-slate-600 dark:text-slate-600'
                                        }`}
                                />
                            ))}

                            <span className="ml-1 text-xs text-gray-500">
                                {testimonial.rating.toFixed(1)}
                            </span>
                        </div>

                        <p className="flex-1 mt-5 text-sm leading-6 text-gray-900 dark:text-gray-200 sm:text-base">
                            "{testimonial.quote}"
                        </p>

                        <div className="flex items-center gap-3 mt-5">
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="object-cover w-10 h-10 rounded-full"
                            />

                            <div>
                                <h3 className="text-sm font-semibold text-gray-950 dark:text-white">
                                    {testimonial.name}
                                </h3>

                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {testimonial.role}
                                </p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;