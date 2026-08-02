import React from 'react';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedListings from './components/FeaturedListings';
import TestimonialsSection from './components/TestimonialsSection';
import TopRatedServices from './components/TopRatedServices';
import CTASection from './components/CTASection';

const Landing = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-8">
                {/* Hero Section */}
                <HeroSection />

                {/* Stats Section */}
                <StatsSection />

                {/* Categories Section */}
                <CategoriesSection />

                {/* Featured Listings */}
                <FeaturedListings />

                {/* Testimonials */}
                <TestimonialsSection />

                {/* Top Rated Services */}
                <TopRatedServices />

                {/* CTA Section */}
                <CTASection />
            </div>
        </div>
    );
};

export default Landing;