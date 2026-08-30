import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    UserPlus,
    MapPin,
    Package,
    Users,
    Wrench,
    ArrowRight,
} from 'lucide-react';

const AnimatedNumber = ({ value, suffix = '', decimals = 0, start }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let animationFrame;
        const duration = 1600;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress = 1 - Math.pow(1 - progress, 3);

            setCount(value * easedProgress);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [start, value]);

    return (
        <>
            {count.toFixed(decimals)}
            {suffix}
        </>
    );
};

const formatStat = (value) => {
    if (value >= 100000) {
        return {
            value: value / 100000,
            suffix: 'L+',
            decimals: 1,
        };
    }

    if (value >= 1000) {
        return {
            value: value / 1000,
            suffix: 'K+',
            decimals: 1,
        };
    }

    return {
        value,
        suffix: '+',
        decimals: 0,
    };
};

const CommunityCTA = ({ stats, loading }) => {

    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.25,
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const statsData = [
        {
            id: 1,
            label: 'Active Locations',
            rawValue: stats?.activeLocations || 0,
            icon: MapPin,
            description: 'Cities & towns across India',
        },
        {
            id: 2,
            label: 'Active Listings',
            rawValue: stats?.activeListings || 0,
            icon: Package,
            description: 'Jobs, rentals & more',
        },
        {
            id: 3,
            label: 'Service Categories',
            rawValue: stats?.serviceCategories || 0,
            icon: Wrench,
            description: 'Find everything you need',
        },
        {
            id: 4,
            label: 'Total Users',
            rawValue: stats?.totalUsers || 0,
            icon: Users,
            description: 'Growing local community',
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="px-4 pb-16 sm:px-6 lg:px-8"
        >
            <div className="relative max-w-6xl px-5 py-10 mx-auto overflow-hidden text-white shadow-2xl rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 sm:px-8 sm:py-12 md:py-14">
                <div className="absolute w-64 h-64 rounded-full -top-32 -right-32 bg-white/10 blur-3xl" />

                <div className="absolute w-64 h-64 rounded-full -bottom-32 -left-32 bg-blue-400/10 blur-3xl" />

                <div className="relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-medium border rounded-full bg-white/10 border-white/20 backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            Growing every day
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                            Your local community,
                            <span className="text-blue-200"> connected.</span>
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-blue-100 sm:text-base">
                            Discover services, jobs, rentals and opportunities
                            around you — all in one place.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-10 md:grid-cols-4 md:gap-4">
                        {statsData?.map((stat) => {
                            const Icon = stat.icon;
                            const formatted = formatStat(stat.rawValue);

                            return (
                                <div
                                    key={stat.id}
                                    className="p-4 text-center transition-all duration-300 border rounded-2xl bg-white/10 border-white/10 backdrop-blur-md hover:-translate-y-1 hover:bg-white/15 hover:border-white/20"
                                >
                                    <div className="flex items-center justify-center mx-auto mb-3 border w-11 h-11 rounded-xl bg-white/10 border-white/15">
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                                        {loading ? (
                                            <span className="inline-block w-16 h-8 rounded-lg animate-pulse bg-white/20" />
                                        ) : (
                                            <AnimatedNumber
                                                value={formatted.value}
                                                suffix={formatted.suffix}
                                                decimals={formatted.decimals}
                                                start={isVisible}
                                            />
                                        )}
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-white sm:text-sm">
                                        {stat.label}
                                    </p>

                                    <p className="mt-1 text-[11px] leading-tight text-blue-200 sm:text-xs">
                                        {stat.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* <div className="flex flex-col items-center justify-center gap-4 mt-10 text-center">
                        <p className="text-sm text-blue-100 sm:text-base">
                            Ready to be part of your local community?
                        </p>

                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-700 transition-all duration-300 bg-white rounded-xl hover:bg-blue-50 hover:gap-3 hover:shadow-xl"
                        >
                            <UserPlus className="w-4 h-4" />
                            Join Look@Local
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

export default CommunityCTA;