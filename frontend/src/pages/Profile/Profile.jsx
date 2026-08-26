import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileHero from './components/ProfileHero';
// import StatsGrid from './components/StatsGrid';
import QuickActions from './components/QuickActions';
// import NearbyOpportunities from './components/NearbyOpportunities';
import ProfileSidebar from './components/ProfileSidebar';
import MyActivity from './components/MyActivity';
import ManageRequests from './components/ManageRequests';

const Profile = () => {
  const { user, loading } = useAuth();
  const [profileStats, setProfileStats] = useState([
    {
      id: 1,
      title: 'Active Listings',
      value: 0,
      change: '+0',
      icon: 'BriefcaseBusiness',
      iconClass: 'text-blue-600',
      iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    },
    {
      id: 2,
      title: 'Profile Views',
      value: 0,
      change: '+0%',
      icon: 'Eye',
      iconClass: 'text-purple-600',
      iconBg: 'bg-purple-50 dark:bg-purple-950/40',
    },
    {
      id: 3,
      title: 'Messages',
      value: 0,
      change: '0 unread',
      icon: 'MessageSquare',
      iconClass: 'text-emerald-600',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    },
    {
      id: 4,
      title: 'Saved Items',
      value: 0,
      change: '+0',
      icon: 'Heart',
      iconClass: 'text-red-500',
      iconBg: 'bg-red-50 dark:bg-red-950/40',
    },
  ]);

  const [opportunities, setOpportunities] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [profileStrength, setProfileStrength] = useState({
    percentage: 0,
    tasks: [
      { id: 1, label: 'Add profile photo', completed: false },
      { id: 2, label: 'Verify mobile number', completed: false },
      { id: 1, label: 'Verify email id', completed: false },
      { id: 3, label: 'Add bio & skills', completed: false },
      { id: 4, label: 'Upload ID proof', completed: false },
    ],
  });

  useEffect(() => {
    if (user) {
      updateProfileStrength(user);
    }
  }, [user]);

  const updateProfileStrength = (userData) => {
    const tasks = [
      { id: 1, label: 'Add profile photo', completed: !!userData.profileImageUrl },
      { id: 2, label: 'Verify phone', completed: userData.isPhoneVerified || false },
      { id: 2, label: 'Verify email', completed: userData.isEmailVerified || false },
      { id: 3, label: 'Add bio', completed: !!userData.bio },
      // { id: 4, label: 'Upload ID proof', completed: false },
    ];

    const completedTasks = tasks.filter(task => task.completed).length;
    const percentage = Math.round((completedTasks / tasks.length) * 100);

    setProfileStrength({
      percentage,
      tasks,
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-solid rounded-full animate-spin border-gray-950 border-r-transparent dark:border-white"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="mx-auto w-full max-w-[1536px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <ProfileHero user={user} />

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_450px]">
          <main className="min-w-0 space-y-9">
            {/* <StatsGrid stats={profileStats} /> */}

            <QuickActions />

            <MyActivity />

            <ManageRequests />
            
            {/* <NearbyOpportunities opportunities={opportunities} /> */}
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