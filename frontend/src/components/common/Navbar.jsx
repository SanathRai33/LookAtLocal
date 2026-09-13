import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import {
  Menu,
  X,
  Bell,
  User,
  LogOut,
  Wrench,
  ShoppingBag,
  Building,
  Briefcase,
  AlertCircle,
  Users,
  Home,
  ChevronDown,
  Sun,
  Moon,
  Award,
  UserShield
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    setIsLoggingOut(false);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const navLinks = [
    { to: '/services', label: 'Services', icon: Wrench },
    { to: '/rentals', label: 'Rentals', icon: ShoppingBag },
    { to: '/products', label: 'Buy & Sell', icon: ShoppingBag },
    { to: '/spaces', label: 'Spaces', icon: Building },
    { to: '/jobs', label: 'Jobs', icon: Briefcase },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/emergency', label: 'Emergency', icon: AlertCircle },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/dashboard');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex justify-center ${isScrolled
      ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm'
      : 'bg-white dark:bg-slate-900'
      } border-b border-gray-200 dark:border-gray-800`}>
      <div className="px-4 max-auto max-w-[1420px] sm:px-6 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text">
                Look@Local
              </span>
            </Link>
          </div>

          {!isAuthenticated && (
            <div className="hidden w-0 lg:w-[640px] lg:flex">
              {/* <p></p> */}
            </div>
          )}

          {/* Desktop Navigation - Center */}
          <div className="items-center justify-center flex-1 hidden px-8 lg:flex">
            <div className="flex items-center space-x-1">
              {isAuthenticated && navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 w-fit rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${isActive(link.to)
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                    }`}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">

            <ThemeToggle />

            {isAuthenticated ? (
              <>
                <Link to="/notifications" aria-label="Notifications"
                  className="relative flex items-center justify-center p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  {user?.unreadNotificationCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold leading-none text-white bg-red-500 border-2 border-white rounded-full dark:border-slate-900">
                      {user.unreadNotificationCount > 99
                        ? "99+"
                        : user.unreadNotificationCount}
                    </span>
                  )}
                </Link>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    {user?.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user?.fullName}
                        className="object-cover w-8 h-8 border-2 border-blue-500 rounded-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                      }`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 z-50 w-56 py-2 mt-2 origin-top-right bg-white border border-gray-200 shadow-lg dark:bg-slate-800 rounded-xl dark:border-gray-700 animate-slide-down">
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.fullName || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>

                      <Link
                        to="/"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Home className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>


                      {/* <Link to="/points" className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700">
                        <Award className="w-4 h-4 mr-2" />
                        My Points
                      </Link> */}

                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>

                      {
                        user?.role === "ADMIN" && (

                          <Link
                            to="/admin"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 cursor-pointer dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            <UserShield className="w-4 h-4 mr-3" />
                            Admin Panel
                          </Link>
                        )
                      }

                      <hr className="my-2 border-gray-200 dark:border-gray-700" />

                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition-colors duration-200 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="items-center hidden w-full space-x-2 sm:flex">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 transition-colors duration-200 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="py-4 space-y-1 border-t border-gray-200 dark:border-gray-800">
            {isAuthenticated ? (
              <>
                {/* Mobile Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)
                      ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    <link.icon className="w-5 h-5 mr-3" />
                    {link.label}
                  </Link>
                ))}

                <hr className="my-2 border-gray-200 dark:border-gray-800" />

                <Link
                  to="/profile"
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cu"
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </Link>

                <Link
                  to="/"
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cu"
                >
                  <Home className="w-5 h-5 mr-3" />
                  Dashboard
                </Link>

                {/* <Link to="/points" className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 cu">
                  <Award className="w-4 h-4 mr-2" />
                  My Points
                </Link> */}

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 transition-all duration-200 rounded-lg dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 cu"
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </button>
              </>
            ) : (
              <div className="px-4 space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 text-sm font-medium text-center text-gray-700 transition-all duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-3 text-sm font-medium text-center text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;