import React from 'react';
import { Search, UserRound, Handshake, Sparkles, ArrowRight, MapPin, Users, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Find what you need',
    description: 'Search local services, rentals, products, spaces and jobs available around you.',
    color: 'blue',
    bgGradient: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    icon: UserRound,
    title: 'Connect locally',
    description: 'Explore listing details and connect directly with the person or business behind the listing.',
    color: 'purple',
    bgGradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    icon: Handshake,
    title: 'Get things done',
    description: 'Call, WhatsApp or email with your local community through Look@Local.',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 4,
    icon: Sparkles,
    title: 'Build community',
    description: 'Build lasting connections and grow your local network through trusted interactions.',
    color: 'orange',
    bgGradient: 'from-orange-500 to-orange-600',
  },
];

const getColorClasses = (color) => {
  const colors = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-950/40',
      text: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-100 dark:border-blue-900/30',
      stepBg: 'bg-blue-100 dark:bg-blue-900/40',
      stepText: 'text-blue-700 dark:text-blue-300',
      glow: 'shadow-blue-500/20',
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-950/40',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-100 dark:border-purple-900/30',
      stepBg: 'bg-purple-100 dark:bg-purple-900/40',
      stepText: 'text-purple-700 dark:text-purple-300',
      glow: 'shadow-purple-500/20',
    },
    emerald: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-100 dark:border-emerald-900/30',
      stepBg: 'bg-emerald-100 dark:bg-emerald-900/40',
      stepText: 'text-emerald-700 dark:text-emerald-300',
      glow: 'shadow-emerald-500/20',
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-950/40',
      text: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-100 dark:border-orange-900/30',
      stepBg: 'bg-orange-100 dark:bg-orange-900/40',
      stepText: 'text-orange-700 dark:text-orange-300',
      glow: 'shadow-orange-500/20',
    },
  };
  return colors[color] || colors.blue;
};

const HowLookAtLocalWorks = () => {
  return (
    <section className="py-12 pb-16">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-medium rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
          <Sparkles className="w-3.5 h-3.5" />
          Simple & Transparent
        </div>
        <h2 className="text-3xl font-bold text-gray-950 dark:text-white md:text-4xl">
          How Look@Local Works
        </h2>
        <p className="max-w-2xl mx-auto mt-3 text-base text-gray-500 dark:text-gray-400">
          Everything you need to connect with your local community in four simple steps.
        </p>
      </div>

      <div className="relative">
        <div className="absolute top-20 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400 hidden md:block">
          <div className="absolute right-0 w-2 h-2 -translate-y-1/2 rounded-full top-1/2 bg-emerald-500 dark:bg-emerald-400"></div>
          <div className="absolute w-2 h-2 -translate-y-1/2 bg-purple-500 rounded-full top-1/2 left-1/3 dark:bg-purple-400"></div>
          <div className="absolute w-2 h-2 -translate-y-1/2 bg-blue-500 rounded-full top-1/2 left-2/3 dark:bg-blue-400"></div>
          <div className="absolute left-0 w-3 h-3 bg-blue-500 rounded-full -top-1 dark:bg-blue-400"></div>
          <div className="absolute right-0 w-3 h-3 rounded-full -top-1 bg-emerald-500 dark:bg-emerald-400"></div>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const colors = getColorClasses(step.color);

            return (
              <div
                key={step.id}
                className="relative transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl dark:border-slate-700 hover:shadow-xl hover:-translate-y-2"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${step.bgGradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-6 text-center">
                  <div className={`flex items-center justify-center mx-auto mb-5 w-16 h-16 rounded-2xl ${colors.bg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>

                  <div className={`inline-flex items-center justify-center mx-auto mb-4 text-xs font-bold rounded-full w-8 h-8 ${colors.stepBg} ${colors.stepText}`}>
                    {step.id}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                    {step.description}
                  </p>

                  {step.id < steps.length && (
                    <div className="absolute hidden -translate-y-1/2 lg:block -right-3 top-1/2">
                      <div className="flex items-center justify-center w-6 h-6 text-gray-400 bg-gray-200 rounded-full dark:bg-slate-700 dark:text-gray-500">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute w-6 h-1 transition-opacity duration-300 -translate-x-1/2 bg-gray-200 rounded-full opacity-0 -bottom-3 left-1/2 dark:bg-slate-700 group-hover:opacity-100">
                  <div className={`w-full h-full rounded-full bg-gradient-to-r ${step.bgGradient}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-6 px-6 py-4 bg-white border border-gray-200 shadow-sm dark:bg-slate-800 rounded-2xl dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Trusted</span>
          </div>
          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Local</span>
          </div>
          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Community</span>
          </div>
          <div className="w-px h-6 bg-gray-200 dark:bg-slate-700"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Safe</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowLookAtLocalWorks;