import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
    MapPin,
    Phone,
    Mail,
    Calendar,
    User,
    Briefcase,
    ShoppingBag,
    Building,
    Wrench,
    Package,
    Loader2,
    AlertCircle,
    ChevronLeft,
    Clock,
    Award,
    Shield,
    Users,
} from 'lucide-react';
import { userApi } from '../../api/user.api';

const tabs = [
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'rentals', label: 'Rentals', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'spaces', label: 'Spaces', icon: Building },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
];

const emptyStates = {
    services: {
        icon: '🔧',
        title: 'No services listed',
        description: "This user hasn't posted any services yet.",
    },
    rentals: {
        icon: '📦',
        title: 'No rentals listed',
        description: "This user hasn't posted any rentals yet.",
    },
    products: {
        icon: '🛍️',
        title: 'No products listed',
        description: "This user hasn't posted any products yet.",
    },
    spaces: {
        icon: '🏢',
        title: 'No spaces listed',
        description: "This user hasn't posted any spaces yet.",
    },
    jobs: {
        icon: '💼',
        title: 'No jobs posted',
        description: "This user hasn't posted any jobs yet.",
    },
};

const typeLabels = {
    services: 'Service',
    rentals: 'Rental',
    products: 'Product',
    spaces: 'Space',
    jobs: 'Job',
};

const getTitle = (item) =>
    item?.title ||
    item?.name ||
    item?.serviceName ||
    item?.productName ||
    item?.rentalName ||
    item?.spaceName ||
    item?.jobTitle ||
    'Untitled';

const getImage = (item) =>
    item?.imageUrl ||
    item?.thumbnailUrl ||
    item?.coverImageUrl ||
    item?.profileImageUrl ||
    item?.images?.[0]?.imageUrl ||
    item?.images?.[0]?.url ||
    null;

const getLocation = (item) => {
    if (item?.location) return item.location;

    if (item?.city && item?.state) {
        return `${item.city}, ${item.state}`;
    }

    return item?.city || item?.locality || null;
};

const getPrice = (item) => {
    const price =
        item?.price ??
        item?.amount ??
        item?.rent ??
        item?.hourlyRate ??
        item?.dailyRate;

    if (price === null || price === undefined || price === '') {
        return null;
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
        return null;
    }

    return `₹${numericPrice.toLocaleString('en-IN')}`;
};

const getInitials = (name) =>
    name
        ?.split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase() || 'U';

const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return '';
    }

    return date.toLocaleDateString('en-IN', {
        month: 'long',
        year: 'numeric',
    });
};

const ListingCard = ({ item, type }) => {
    const title = getTitle(item);
    const image = getImage(item);
    const location = getLocation(item);
    const price = getPrice(item);

    return (
        <article className="overflow-hidden transition bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-800 dark:border-slate-700 hover:-translate-y-1 hover:shadow-lg">
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-700">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <Package className="w-12 h-12 text-gray-400 dark:text-slate-500" />
                    </div>
                )}

                <span className="absolute px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full left-3 top-3 dark:bg-blue-950/70 dark:text-blue-400">
                    {typeLabels[type]}
                </span>
            </div>

            <div className="p-5">
                <h3 className="font-semibold text-gray-900 truncate dark:text-white">
                    {title}
                </h3>

                {item?.description && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                        {item.description}
                    </p>
                )}

                {location && (
                    <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 shrink-0" />

                        <span className="truncate">
                            {location}
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 mt-4">
                    {price ? (
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                            {price}
                        </span>
                    ) : (
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            View details
                        </span>
                    )}

                    {item?.createdAt && (
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            {formatDate(item.createdAt)}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
};

const EmptyState = ({ type }) => {
    const empty = emptyStates[type];

    return (
        <div className="py-16 text-center">
            <div className="mb-4 text-6xl">
                {empty.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {empty.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {empty.description}
            </p>
        </div>
    );
};

const PublicProfile = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('services');

    useEffect(() => {
        const fetchUserProfile = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await userApi.getPublicProfile(userId);

                setUser(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                        'Failed to load user profile'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />

                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen px-6 bg-white dark:bg-slate-950">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto text-red-500" />

                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
                        User not found
                    </h2>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        {error || 'The user you are looking for does not exist.'}
                    </p>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    const listings = user?.[activeTab] || [];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </button>

                <div className="mt-6 overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-slate-800">
                    <div className="relative">
                        <div className="h-32 overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-800 dark:via-blue-700 dark:to-indigo-800">
                            {user?.profileBannerUrl && (
                                <img
                                    src={user.profileBannerUrl}
                                    alt="Profile banner"
                                    className="object-cover w-full h-full"
                                />
                            )}
                        </div>

                        <div className="absolute -bottom-12 left-6 sm:left-8">
                            <div className="relative">
                                {user.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl}
                                        alt={user.fullName}
                                        className="object-cover w-24 h-24 border-4 border-white rounded-full shadow-lg dark:border-slate-800"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-24 h-24 text-3xl font-bold text-white border-4 border-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 dark:border-slate-800">
                                        {getInitials(user.fullName)}
                                    </div>
                                )}

                                {user.isEmailVerified && (
                                    <div className="absolute bottom-0 right-0 p-0.5 bg-white rounded-full dark:bg-slate-800">
                                        <div className="p-0.5 bg-emerald-500 rounded-full">
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-16 pb-6 pl-6 pr-6 sm:pl-8 sm:pr-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user.fullName}
                            </h1>

                            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    Member since {formatDate(user.createdAt)}
                                </span>

                                {user.city && user.state && (
                                    <>
                                        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />

                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {user.city}, {user.state}
                                        </span>
                                    </>
                                )}

                                {user.phone && (
                                    <>
                                        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />

                                        <span className="flex items-center gap-1">
                                            <Phone className="w-4 h-4" />
                                            {user.phone}
                                        </span>
                                    </>
                                )}

                                {user.email && (
                                    <>
                                        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />

                                        <span className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            {user.email}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {user.bio && (
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                                {user.bio}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            {user.isEmailVerified && (
                                <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                                    <Shield className="w-4 h-4" />
                                    Email verified
                                </span>
                            )}

                            {user.isPhoneVerified && (
                                <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                                    <Shield className="w-4 h-4" />
                                    Phone verified
                                </span>
                            )}

                            {user.status && (
                                <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                    <Users className="w-4 h-4" />
                                    {user.status === 'ACTIVE'
                                        ? 'Active member'
                                        : user.status}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide dark:border-slate-700">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const count = user?.[tab.id]?.length || 0;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />

                                    {tab.label}

                                    <span
                                        className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                                            activeTab === tab.id
                                                ? 'bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                                                : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        {listings.length === 0 ? (
                            <EmptyState type={activeTab} />
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {listings.map((item) => (
                                    <ListingCard
                                        key={item.id}
                                        item={item}
                                        type={activeTab}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 mt-6 bg-white shadow-sm rounded-2xl dark:bg-slate-800">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                        About {user.fullName}
                    </h3>

                    <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-950/50">
                                <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Member since
                                </p>

                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {formatDate(user.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                            <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/50">
                                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Location
                                </p>

                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.city && user.state
                                        ? `${user.city}, ${user.state}`
                                        : 'Not specified'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-950/50">
                                <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Status
                                </p>

                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.status || 'Active'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                            <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-950/50">
                                <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Last active
                                </p>

                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {formatDate(user.updatedAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;