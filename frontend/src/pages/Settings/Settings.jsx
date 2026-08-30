import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    User,
    Key,
    Bell,
    Shield,
    Globe,
    Moon,
    Sun,
    ChevronRight,
    LogOut,
    AlertTriangle,
    Smartphone,
    Mail,
    Eye,
    Languages,
    Palette,
    Database,
    HelpCircle,
    FileText,
    ShieldCheck,
    UserX,
    Clock,
    Sparkles,
    Construction
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Settings = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const settingsSections = [
        {
            id: 'profile',
            title: 'Profile Settings',
            icon: User,
            items: [
                {
                    id: 'edit-profile',
                    label: 'Edit Profile',
                    description: 'Update your personal information',
                    icon: User,
                    to: '/profile/edit-info',
                },
                {
                    id: 'change-password',
                    label: 'Change Password',
                    description: 'Update your password',
                    icon: Key,
                    to: '/settings/change-password',
                },
                {
                    id: 'email-settings',
                    label: 'Email Settings',
                    description: 'Manage email preferences',
                    icon: Mail,
                    to: '/settings/email',
                },
                {
                    id: 'phone-settings',
                    label: 'Phone Settings',
                    description: 'Manage phone number',
                    icon: Smartphone,
                    to: '/settings/phone',
                    tag: { label: 'Coming Soon', variant: 'blue' }
                },
            ],
        },
        {
            id: 'preferences',
            title: 'Preferences',
            icon: Palette,
            items: [
                {
                    id: 'theme',
                    label: 'Theme',
                    description: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`,
                    icon: theme === 'dark' ? Sun : Moon,
                    to: '#',
                    onClick: toggleTheme,
                },
                {
                    id: 'language',
                    label: 'Language',
                    description: 'Change your language preference',
                    icon: Languages,
                    to: '#',
                    tag: { label: 'Coming Soon', variant: 'blue' }
                },
                // {
                //     id: 'notifications',
                //     label: 'Notifications',
                //     description: 'Manage notification preferences',
                //     icon: Bell,
                //     to: '#',
                //     tag: { label: 'Next Version', variant: 'purple' }
                // },
            ],
        },
        // {
        //     id: 'security',
        //     title: 'Security & Privacy',
        //     icon: Shield,
        //     items: [
        //         {
        //             id: 'privacy',
        //             label: 'Privacy Settings',
        //             description: 'Control your privacy preferences',
        //             icon: ShieldCheck,
        //             to: '/settings/privacy',
        //             tag: { label: 'Coming Soon', variant: 'blue' }
        //         },
        //         {
        //             id: 'sessions',
        //             label: 'Active Sessions',
        //             description: 'Manage your active sessions',
        //             icon: Database,
        //             to: '/settings/sessions',
        //             tag: { label: 'Next Version', variant: 'purple' }
        //         },
        //         {
        //             id: 'two-factor',
        //             label: 'Two-Factor Authentication',
        //             description: 'Add an extra layer of security',
        //             icon: Shield,
        //             to: '/settings/2fa',
        //             tag: { label: 'Next Version', variant: 'purple' }
        //         },
        //         {
        //             id: 'delete-account',
        //             label: 'Delete Account',
        //             description: 'Permanently delete your account',
        //             icon: UserX,
        //             to: '/settings/delete-account',
        //             danger: true,
        //             tag: { label: 'Working On', variant: 'yellow' }
        //         },
        //     ],
        // },
        {
            id: 'support',
            title: 'Support & About',
            icon: HelpCircle,
            items: [
                {
                    id: 'help',
                    label: 'Help Center',
                    description: 'Get help and support',
                    icon: HelpCircle,
                    to: '/help',
                },
                {
                    id: 'terms',
                    label: 'Terms of Service',
                    description: 'Read our terms and conditions',
                    icon: FileText,
                    to: '/terms',
                },
                {
                    id: 'privacy-policy',
                    label: 'Privacy Policy',
                    description: 'Read our privacy policy',
                    icon: Shield,
                    to: '/privacy',
                },
            ],
        },
    ];

    const renderTag = (tag) => {
        const variants = {
            blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
            purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
            green: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
            orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
            yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        };

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${variants[tag.variant] || variants.blue}`}>
                {tag.variant === 'purple' ? (
                    <Sparkles className="w-2.5 h-2.5" />
                ) : tag.variant === 'blue' ? (
                    <Clock className="w-2.5 h-2.5" />
                ) : (
                    <Construction className="w-2.5 h-2.5" />
                )}
                {tag.label}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Settings
                    </h1>
                    <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                        Manage your account settings and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* User Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex flex-col items-center text-center">
                                {user?.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl}
                                        alt={user.fullName}
                                        className="object-cover w-24 h-24 border-2 border-blue-500 rounded-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                                        <User className="w-12 h-12 text-white" />
                                    </div>
                                )}
                                <h3 className="mt-4 text-lg font-semibold text-gray-950 dark:text-white">
                                    {user?.fullName || 'User'}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {user?.email || 'user@example.com'}
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user?.status === 'ACTIVE'
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                                        }`}>
                                        {user?.status || 'Active'}
                                    </span>
                                    {user?.isEmailVerified && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                            Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-slate-800">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-red-600 transition rounded-lg cursor-pointer hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Settings Sections */}
                    <div className="space-y-6 lg:col-span-2">
                        {settingsSections.map((section) => (
                            <div
                                key={section.id}
                                className="bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="p-4 border-b border-gray-200 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <section.icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                        <h2 className="text-sm font-semibold text-gray-950 dark:text-white">
                                            {section.title}
                                        </h2>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-200 dark:divide-slate-800">
                                    {section.items.map((item) => {
                                        const Icon = item.icon;
                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex items-center justify-between p-4 transition cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 ${item.danger ? 'hover:bg-red-50 dark:hover:bg-red-950/20' : ''
                                                    }`}
                                            >
                                                <div className="flex items-center min-w-0 gap-3">
                                                    <div className={`p-2 rounded-lg flex-shrink-0 ${item.danger
                                                        ? 'bg-red-50 dark:bg-red-950/30'
                                                        : 'bg-gray-100 dark:bg-slate-800'
                                                        }`}>
                                                        <Icon className={`w-4 h-4 ${item.danger
                                                            ? 'text-red-600 dark:text-red-400'
                                                            : 'text-gray-600 dark:text-gray-300'
                                                            }`} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p className={`text-sm font-medium ${item.danger
                                                                ? 'text-red-600 dark:text-red-400'
                                                                : 'text-gray-950 dark:text-white'
                                                                }`}>
                                                                {item.label}
                                                            </p>
                                                            {item.tag && renderTag(item.tag)}
                                                        </div>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {item.onClick ? (
                                                    <button
                                                        onClick={item.onClick}
                                                        className="flex-shrink-0 p-1 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700"
                                                    >
                                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                                    </button>
                                                ) : (
                                                    <Link
                                                        to={item.to}
                                                        className={`p-1 rounded-lg flex-shrink-0 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700 ${item.danger ? 'hover:bg-red-100 dark:hover:bg-red-950/50' : ''
                                                            }`}
                                                        onClick={(e) => {
                                                            if (item.to === '#') {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    >
                                                        <ChevronRight className={`w-4 h-4 ${item.danger
                                                            ? 'text-red-600 dark:text-red-400'
                                                            : 'text-gray-400'
                                                            }`} />
                                                    </Link>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Social Links */}
                        <div className="pt-4 text-center">
                            <div className="flex items-center justify-center gap-4">
                                <a target='_blank' rel="noopener noreferrer" href="https://github.com/SanathRai33"
                                    className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="w-4 h-4" />
                                </a>
                                <a target='_blank' rel="noopener noreferrer" href="https://www.instagram.com/sannu_rai33/"
                                    className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-950/50 dark:hover:text-pink-400"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-4 h-4" />
                                </a>
                                <a target='_blank' rel="noopener noreferrer" href="https://www.linkedin.com/in/sanath-rai33/"
                                    className="p-2 text-gray-600 transition-all duration-200 bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="w-4 h-4" />
                                </a>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                Look@Local v1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;