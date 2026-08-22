import React from 'react';
import { Link } from 'react-router-dom';
import { Layers3, Plus, ShieldCheck, TriangleAlert } from 'lucide-react';

const ProfileHero = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const defaultAvatar = `https://imgs.search.brave.com/-GCk2mBn6m74iB_ns6xH234FVFDhehynprQ7osz0fgs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tcGhv/dG8vYnJpZ2h0LWZ1/bi1jYXJ0b29uLWZh/Y2UtaGFwcHktbWFu/LXdpdGgtY2xlYW5f/MTI4MzU5NS0zMzE2/Mi5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA`;

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-600">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-indigo-800/20" />

      <div
        className="absolute bottom-0 right-0 top-0 hidden w-[28%] bg-cover bg-center opacity-20 lg:block"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1000&q=80')",
        }}
      />

      <div className="relative z-10 px-6 py-8 sm:px-8 lg:px-10 lg:py-9">
        <div className="flex items-center gap-4">
          <img
            src={user?.profileImageUrl || defaultAvatar}
            alt={user?.fullName || 'User'}
            className="object-cover w-16 h-16 border-2 border-white rounded-full sm:h-18 sm:w-18"
          />

          <div>
            <p className="text-sm text-blue-100 sm:text-base">
              {getGreeting()},
            </p>

            <h1 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
              {user?.fullName || 'User'}
              <span>👋</span>
            </h1>
          </div>
        </div>

        <p className="mt-5 text-base text-blue-50 sm:text-lg">
          <div>Welcome to your profile dashboard.</div>
          <div className='flex gap-1 mt-1'>
            {user?.isEmailVerified ? <ShieldCheck /> : <TriangleAlert />} 
            {user?.isEmailVerified ? '  Email verified' : '  Please verify your email'}
          </div>
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            to="/profile/edit-info"
            className="inline-flex items-center justify-center h-12 gap-2 px-5 text-sm font-medium transition bg-white rounded-xl text-gray-950 hover:bg-gray-100 sm:text-base"
          >
            <Plus className="w-5 h-5" />
            Edit Profile
          </Link>

          <Link
            to="/my-posts"
            className="inline-flex items-center justify-center h-12 gap-2 px-5 text-sm font-medium text-white transition border rounded-xl border-white/30 bg-white/15 backdrop-blur-sm hover:bg-white/20 sm:text-base"
          >
            <Layers3 className="w-5 h-5" />
            My Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;