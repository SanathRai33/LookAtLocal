import React from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import { LogIn, MapPin } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 lg:flex lg:flex-col">
          <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute bottom-20 right-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative z-10 flex h-full flex-col px-12 py-12 xl:px-16 xl:py-14">
            <Link
              to="/"
              className="inline-flex w-fit items-center gap-3 text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <MapPin className="h-5 w-5" />
              </div>

              <span className="text-2xl font-bold tracking-tight xl:text-3xl">
                Look <span className="text-yellow-300">@</span> Local
              </span>
            </Link>

            <div className="flex flex-1 items-center">
              <div>
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <LogIn
                    className="h-10 w-10 text-white"
                    strokeWidth={1.8}
                  />
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
                  Welcome back!
                </h1>

                <p className="mt-5 text-lg text-blue-100 xl:text-xl">
                  Sign in to access your local community.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/10 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <img
                  src="https://i.pravatar.cc/100?img=47"
                  alt="Priya Sharma"
                  className="h-14 w-14 shrink-0 rounded-full border-2 border-white object-cover"
                />

                <div className="min-w-0">
                  <p className="text-base font-semibold leading-6 text-white xl:text-lg">
                    "Found a plumber in 10 minutes. Absolutely love this!"
                  </p>

                  <p className="mt-1 text-sm text-blue-100 xl:text-base">
                    — Priya Sharma, Mumbai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex min-h-screen items-center justify-center bg-white px-5 py-10 dark:bg-slate-950 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-[550px]">
            <div className="mb-10 flex justify-center lg:hidden">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950">
                  <MapPin className="h-5 w-5" />
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