import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import RecentActivity from './RecentActivity';
import ProfileStrength from './ProfileStrength';

const ProfileSidebar = ({
  // activities,
  profileStrength,
}) => {
  // const [searchQuery, setSearchQuery] = useState('');

  return (
    <aside className="space-y-5">
      {/* <div className="relative">
        <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything local..."
          className="w-full pl-12 pr-4 text-sm text-gray-900 transition border border-gray-200 outline-none h-14 rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
        />
      </div> */}

      {/* <RecentActivity activities={activities} /> */}

      <ProfileStrength profileStrength={profileStrength} />
    </aside>
  );
};

export default ProfileSidebar;