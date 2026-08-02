import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import { testimonials } from '../data/mockLandingData';

const TestimonialsSection = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            What our community says
          </h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Real stories from real people in your neighbourhood
          </p>
        </div>
        <Link to="/testimonials" className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
          View all
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-6 transition-all duration-300 bg-white border border-gray-200 shadow-sm dark:bg-slate-800 rounded-2xl dark:border-gray-700 hover:shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              "{testimonial.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;