import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="transition-colors duration-200 bg-white border-t border-gray-200 dark:bg-slate-900 dark:border-gray-800">
      <div className="px-4 mx-auto max-w-[1290px] sm:px-6 lg:px-6">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            
            {/* Brand Section */}
            <div className="col-span-1 lg:col-span-1">
              <Link to="/" className="inline-block">
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text">
                  Look@Local
                </h2>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Connecting communities — discover services, rentals, jobs, and more, right where you live.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center mt-4 space-x-3">
                <a 
                  href="#" 
                  className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-950/50 dark:hover:text-pink-400"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="#" 
                  className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Marketplace Links */}
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                Marketplace
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/services" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/rentals" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Rentals
                  </Link>
                </li>
                <li>
                  <Link to="/marketplace" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Buy & Sell
                  </Link>
                </li>
                <li>
                  <Link to="/properties" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Spaces
                  </Link>
                </li>
              </ul>
            </div>

            {/* Community Links */}
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                Community
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/jobs" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Local Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/emergency" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Emergency Help
                  </Link>
                </li>
                <li>
                  <Link to="/community" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Notice Board
                  </Link>
                </li>
                <li>
                  <Link to="/events" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account Links */}
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
                Account
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/dashboard" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/my-listings" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    My Listings
                  </Link>
                </li>
                <li>
                  <Link to="/favorites" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="text-sm text-gray-600 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Look@Local. All rights reserved.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link to="/privacy" className="text-sm text-gray-500 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-500 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-500 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Made with love - subtle badge */}
        <div className="pb-4 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-gray-400 dark:text-gray-600">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for local communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;