import React from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityCTA = () => {
    return (
        <section className="pb-16">
            <div className="px-6 py-12 overflow-hidden text-center text-white rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 sm:px-10 md:py-14">
                <h2 className="text-2xl font-bold md:text-3xl">
                    Ready to connect with your community?
                </h2>

                <p className="max-w-2xl mx-auto mt-3 text-sm text-blue-100 sm:text-base">
                    Join 2.4 lakh+ users already discovering the best of their
                    neighbourhood.
                </p>

                <div className="flex flex-col items-center justify-center gap-3 mt-7 sm:flex-row">
                    <Link
                        to="/register"
                        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-gray-900 transition bg-white rounded-xl hover:bg-gray-100 sm:w-auto"
                    >
                        <UserPlus className="w-5 h-5" />
                        Create Free Account
                    </Link>

                    <Link
                        to="/services"
                        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition border rounded-xl border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 sm:w-auto"
                    >
                        <Search className="w-5 h-5" />
                        Browse Listings
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CommunityCTA;