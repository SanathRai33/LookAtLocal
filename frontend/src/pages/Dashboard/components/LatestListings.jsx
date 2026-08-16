import React from 'react';
import { ChevronRight, Heart, MapPin, Clock, Loader2 } from 'lucide-react';

const formatRelativeDate = (value) => {
  if (!value) return 'Recently added';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Recently added';
  }
  const diffDays = Math.floor(
    (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return '1 week ago';
  if (diffWeeks < 5) return `${diffWeeks} weeks ago`;
  return date.toLocaleDateString();
};

const formatPrice = (listing) => {
  if (listing.price === null || listing.price === undefined) {
    return null;
  }
  const price = Number(listing.price);
  if (Number.isNaN(price)) {
    return null;
  }
  if (listing.type === 'RENTAL') {
    return `₹${price.toLocaleString('en-IN')}/day`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

const getTypeLabel = (type) => {
  const labels = {
    SERVICE: 'Service',
    RENTAL: 'Rental',
    PRODUCT: 'Buy & Sell',
    SPACE: 'Space',
    JOB: 'Job',
  };
  return labels[type] || 'Listing';
};

const getTypeStyle = (type) => {
  const styles = {
    SERVICE: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
    RENTAL: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
    PRODUCT: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
    SPACE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
    JOB: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
  };
  return styles[type] || 'bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300';
};

const jobImage = 'https://imgs.search.brave.com/gCsJ2RD0U0BB0FzIW51XN-YQTklrnAfOx88S1vFMnWM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy9zZWFyY2hpbmct/Zm9yLWEtbmV3LWpv/Yi1mcmVlLXBob3Rv/LmpwZz93PTYwMCZx/dWFsaXR5PTgw';

const LatestListings = ({ listings = [], loading = false }) => {
  if (loading) {
    return (
      <section className="pb-16">
        <div className="flex items-end justify-between mb-7">
          <div>
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
              Latest Listings
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Recently added to your local community
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="pb-16">
      <div className="flex items-end justify-between mb-7">
        <div>
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white md:text-3xl">
            Latest Listings
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Recently added to your local community
          </p>
        </div>
        {listings.length > 0 && (
          <button
            type="button"
            className="items-center hidden gap-1 text-sm font-medium text-gray-900 hover:text-blue-600 dark:text-white sm:flex"
          >
            Scroll for more
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center border border-gray-200 border-dashed rounded-2xl dark:border-slate-700">
          <div className="flex items-center justify-center w-16 h-16 mb-4 text-2xl bg-gray-100 rounded-full dark:bg-slate-800">
            📋
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No listings yet
          </h3>
          <p className="max-w-md mt-2 text-sm text-gray-500 dark:text-gray-400">
            There are no new listings available right now.
            Check back soon to discover services, rentals,
            products, spaces and jobs in your local community.
          </p>
        </div>
      ) : (
        <div className="relative overflow-x-auto scrollbar-hide">
          <div className="flex gap-5 pb-4 snap-x snap-mandatory">
            {listings.map((listing) => {
              const price = formatPrice(listing);
              return (
                <article
                  key={`${listing.type}-${listing.id}`}
                  className="flex-shrink-0 w-full overflow-hidden transition bg-white border border-gray-200 shadow-sm rounded-2xl hover:-translate-y-1 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
                >
                  <div className="relative flex items-center justify-center bg-gray-100 h-52 dark:bg-slate-700">
                    <div className="w-full overflow-hidden text-center h-52">
                      <img
                        src={listing?.type !== "JOB" ? listing?.imageUrl : jobImage}
                        alt={listing?.title}
                        className='object-cover w-full h-full'
                      />
                    </div>
                    <span
                      className={`absolute px-3 py-1 text-xs font-semibold rounded-full shadow-sm left-4 top-4 ${getTypeStyle(
                        listing.type
                      )}`}
                    >
                      {listing.category}
                    </span>
                    <button
                      type="button"
                      aria-label={`Favorite ${listing.title}`}
                      className="absolute flex items-center justify-center text-gray-500 transition rounded-full shadow-sm right-4 top-4 h-9 w-9 bg-white/95 hover:text-red-500"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold truncate text-gray-950 dark:text-white">
                      {listing.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {listing.location || 'Location not specified'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 mt-5">
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        {formatRelativeDate(listing.createdAt)}
                      </span>
                      {price ? (
                        <span className="font-bold text-gray-950 dark:text-white">
                          {price}
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          View details
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestListings;