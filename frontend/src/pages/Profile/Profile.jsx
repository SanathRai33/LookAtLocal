import React from 'react';

import ProfileHero from './components/ProfileHero';
import StatsGrid from './components/StatsGrid';
import QuickActions from './components/QuickActions';
import NearbyOpportunities from './components/NearbyOpportunities';
import ProfileSidebar from './components/ProfileSidebar';

import {
  profileUser,
  profileStats,
  quickActions,
  opportunities,
  recentActivities,
  profileStrength,
} from './data/profileMockData';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1536px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <ProfileHero user={profileUser} />

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_450px]">
          <main className="min-w-0 space-y-9">
            <StatsGrid stats={profileStats} />

            <QuickActions actions={quickActions} />

            <NearbyOpportunities
              opportunities={opportunities}
            />
          </main>

          <ProfileSidebar
            activities={recentActivities}
            profileStrength={profileStrength}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;