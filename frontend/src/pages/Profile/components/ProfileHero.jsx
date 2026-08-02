import React from 'react';
import { Link } from 'react-router-dom';
import { Layers3, Plus } from 'lucide-react';

const ProfileHero = ({ user }) => {
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
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-full border-2 border-white object-cover sm:h-18 sm:w-18"
          />

          <div>
            <p className="text-sm text-blue-100 sm:text-base">
              Good morning,
            </p>

            <h1 className="flex items-center gap-2 text-2xl font-bold text-white sm:text-3xl">
              {user.name}
              <span>👋</span>
            </h1>
          </div>
        </div>

        <p className="mt-5 text-base text-blue-50 sm:text-lg">
          You have{' '}
          <span className="font-semibold text-white">
            {user.unreadMessages} unread messages
          </span>{' '}
          and{' '}
          <span className="font-semibold text-white">
            {user.newListingViews} new listing views
          </span>{' '}
          today.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/listings/create"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-medium text-gray-950 transition hover:bg-gray-100 sm:text-base"
          >
            <Plus className="h-5 w-5" />
            Post Listing
          </Link>

          <Link
            to="/my-listings"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/15 px-5 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20 sm:text-base"
          >
            <Layers3 className="h-5 w-5" />
            My Listings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;