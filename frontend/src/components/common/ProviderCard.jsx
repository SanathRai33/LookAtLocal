import React from 'react';
import {
    Phone,
    CheckCircle,
    Award,
    ShieldClose,
    ShieldCheck,
    Mail,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProviderCard = ({
    user,
    roleLabel = 'Listing Owner',
    providingSince,
    isPhoneVerified,
    isEmailVerified,
    isTopRated,
    showProfileButton = true,
    profilePath,
}) => {
    const navigate = useNavigate();

    if (!user) {
        return null;
    }

    const getInitials = (name = '') => {
        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0]?.toUpperCase())
            .join('');
    };

    const formatProvidingSince = (date) => {
        if (!date) return null;

        return new Date(date).toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
        });
    };

    const handleProfileClick = () => {
        if (profilePath) {
            navigate(profilePath);
        }
    };

    return (
        <div className="p-6 bg-white shadow-sm rounded-2xl dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {roleLabel}
            </h3>

            <div className="flex items-center gap-3 mt-4">
                {user?.profileImageUrl ? (
                    <img
                        src={user?.profileImageUrl}
                        alt={user?.fullName || 'User'}
                        className="object-cover w-12 h-12 rounded-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-blue-600 rounded-full">
                        {getInitials(user?.fullName)}
                    </div>
                )}

                <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate dark:text-white">
                        {user?.fullName || 'Unknown'}
                    </p>

                    {roleLabel && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {roleLabel.split(' ')[0]} since {formatProvidingSince(providingSince)}
                        </p>
                    )}
                </div>
            </div>

            <div>
                {user?.phone && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span>{user?.phone}</span>
                    </div>
                )}
                {user?.email && (
                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{user?.email}</span>
                    </div>
                )}
            </div>

            <div className="mt-4 space-y-2">
                {isPhoneVerified ? (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Phone verified</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
                        <ShieldClose className="w-4 h-4" />
                        <span>Phone not verified</span>
                    </div>
                )}

                {isEmailVerified ? (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Email verified</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
                        <ShieldClose className="w-4 h-4" />
                        <span>Email not verified</span>
                    </div>
                )}

                {isTopRated && (
                    <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400">
                        <Award className="w-4 h-4" />
                        <span>Top rated provider</span>
                    </div>
                )}
            </div>

            {showProfileButton && profilePath && (
                <button
                    type="button"
                    onClick={handleProfileClick}
                    className="w-full px-4 py-2.5 mt-4 text-sm font-medium text-center text-blue-600 transition border border-blue-200 rounded-xl hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/30"
                >
                    View full profile
                </button>
            )}
        </div>
    );
};

export default ProviderCard;