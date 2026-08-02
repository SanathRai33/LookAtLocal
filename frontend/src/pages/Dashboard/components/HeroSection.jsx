import React from 'react';
import { Search, MapPin } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      className="relative min-h-[500px] overflow-hidden rounded-3xl bg-cover bg-center lg:min-h-[560px]"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2000&q=85')",
      }}
    >
      <div className="absolute inset-0 bg-blue-700/65" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-blue-700/10 to-blue-950/45" />

      <div className="relative z-10 flex min-h-[500px] items-center justify-center px-5 py-14 text-center lg:min-h-[560px]">
        <div className="w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-medium text-white border rounded-full border-white/20 bg-white/20 backdrop-blur-md sm:text-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            Now live in 50+ cities across India
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Your Neighbourhood,
            <span className="block mt-1 text-yellow-400">
              Reimagined.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-5 text-base leading-7 text-blue-50 sm:text-lg">
            Services, rentals, jobs, spaces — everything your community needs,
            <span className="block">right at your doorstep.</span>
          </p>

          <div className="max-w-3xl p-2 mx-auto mt-8 bg-white shadow-2xl rounded-2xl">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex items-center flex-1 gap-3 px-4 rounded-xl bg-gray-50">
                <Search className="w-5 h-5 text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search services, products, jobs..."
                  className="w-full bg-transparent py-3.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
                />
              </div>

              <div className="items-center hidden gap-2 px-4 border-l border-gray-200 lg:flex">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Mumbai, Maharashtra
                </span>
              </div>

              <button className="rounded-xl bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                Search
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 px-2 pt-3 pb-1">
              <span className="text-xs text-gray-500">Popular:</span>

              {['Plumber', 'Room for rent', 'Part-time jobs', 'Blood donation'].map(
                (item) => (
                  <button
                    key={item}
                    className="px-3 py-1 text-xs text-gray-600 transition bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-600"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;