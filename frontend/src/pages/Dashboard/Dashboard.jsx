import React from 'react';

import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import FeaturedListings from './components/FeaturedListings';
import PopularServices from './components/PopularServices';
import Testimonials from './components/Testimonials';
import CommunityCTA from './components/CommunityCTA';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <HeroSection />

        <CategorySection />

        <FeaturedListings />

        <PopularServices />

        <Testimonials />

        <CommunityCTA />
      </div>
    </div>
  );
};

export default Dashboard;