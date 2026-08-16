import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { MapPin, LogIn, Shield, Users, Sparkles } from 'lucide-react';

const AuthLayout = ({ title, subtitle }) => {
  const features = [
    {
      icon: Users,
      title: 'Local Community',
      description: 'Connect with people in your neighbourhood',
    },
    {
      icon: Shield,
      title: 'Trusted & Secure',
      description: 'Verified users and secure transactions',
    },
    {
      icon: Sparkles,
      title: 'Everything Local',
      description: 'Services, rentals, jobs & more',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 lg:flex lg:flex-col">
          <div className="absolute rounded-full -left-24 top-20 h-80 w-80 bg-blue-400/10 blur-3xl" />
          <div className="absolute right-0 rounded-full bottom-20 h-96 w-96 bg-violet-500/10 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/5 blur-3xl" />

          <div className="relative z-10 flex flex-col h-full px-12 py-12 xl:px-16 xl:py-14">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-white w-fit"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold tracking-tight xl:text-3xl">
                Look <span className="text-yellow-300">@</span> Local
              </span>
            </Link>

            <div className="flex lg:mt-24 h-fit">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
                  {title || 'Welcome to Look@Local'}
                </h1>

                <p className="mt-5 text-lg text-blue-100 xl:text-xl">
                  {subtitle || 'Your local community platform'}
                </p>

                <div className="mt-10 space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl bg-white/10 backdrop-blur-sm">
                          <Icon className="w-5 h-5 text-blue-200" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {feature.title}
                          </p>
                          <p className="text-sm text-blue-100">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex items-center gap-3 text-sm text-blue-200">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white border-2 rounded-full border-white/20 bg-white/10"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </div>
        </div>

        <main className="flex items-center justify-center min-h-screen px-5 py-10 bg-white dark:bg-slate-950 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[550px]">
            <div className="flex justify-center mb-10 lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400"
              >
                <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold">
                  Look <span className="text-yellow-500">@</span> Local
                </span>
              </Link>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;