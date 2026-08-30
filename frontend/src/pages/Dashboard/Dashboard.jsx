import React from 'react';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import LatestListings from './components/LatestListings';
import HowLookAtLocalWorks from './components/HowLookAtLocalWorks';
import CommunityCTA from './components/CommunityCTA';
import { usePublicStats } from '../../hooks/usePublicStats';

const Dashboard = () => {
  const { stats: publicStats, publicData, loading, latestLoading, } = usePublicStats();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <HeroSection cities={publicStats?.activeLocations} />

        <CategorySection />

        <LatestListings
          listings={publicData}
          loading={latestLoading}
        />

        <HowLookAtLocalWorks />
        
        {/* <PopularServices /> */}

        <CommunityCTA
          stats={publicStats}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;