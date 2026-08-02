import React, { useState } from 'react';
import { Search } from 'lucide-react';
import RecentActivity from './RecentActivity';
import ProfileStrength from './ProfileStrength';

const ProfileSidebar = ({
  activities,
  profileStrength,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <aside className="space-y-5">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything local..."
          className="h-14 w-full rounded-2xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-500"
        />
      </div>

      <RecentActivity activities={activities} />

      <ProfileStrength profileStrength={profileStrength} />
    </aside>
  );
};

export default ProfileSidebar;