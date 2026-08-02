import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Search } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-12">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-900 dark:via-blue-950 dark:to-slate-900 rounded-3xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 bg-blue-400 rounded-full w-96 h-96 blur-3xl"></div>
        </div>
        
        <div className="relative px-6 py-12 text-center md:py-16">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready to connect with your community?
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-blue-100">
            Join 2.4 lakh+ users already discovering the best of their neighbourhood.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="flex items-center gap-2 px-8 py-3 font-semibold text-blue-600 transition-all duration-200 bg-white rounded-xl hover:shadow-lg hover:shadow-white/25"
            >
              <Users className="w-5 h-5" />
              Create Free Account
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="flex items-center gap-2 px-8 py-3 font-semibold text-white transition-all duration-200 border bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 border-white/30"
            >
              <Search className="w-5 h-5" />
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;