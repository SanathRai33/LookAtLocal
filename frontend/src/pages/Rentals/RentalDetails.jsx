import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    MapPin,
    Star,
    Phone,
    Shield,
    IndianRupee,
    ChevronLeft,
    Loader2,
    AlertCircle,
    Package,
    Truck,
    Home,
    CalendarDays,
} from 'lucide-react';
import { useRentals } from '../../hooks/useRentals';
import useRentalBooking from '../../hooks/useRentalBooking';
import { useAuth } from '../../context/AuthContext';
import { FaWhatsapp } from 'react-icons/fa';
import ImageCarousel from '../../components/common/ImageCarousel';
import ProviderCard from '../../components/common/ProviderCard';
import RelatedRentals from './components/RelatedRentals';
import RentalBookingModal from './components/RentalBookingModal';

const RentalDetails = () => {
    const { rentalId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { getRentalById, loading } = useRentals();
    const { createBooking, getAvailability, loading: bookingLoading } = useRentalBooking();
    const [rental, setRental] = useState(null);
    const [error, setError] = useState('');
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);

    useEffect(() => {
        fetchRentalDetails();
    }, [rentalId]);

    const fetchRentalDetails = async () => {
        const result = await getRentalById(rentalId);
        if (result.success) {
            setRental(result.data);
        } else {
            setError(result.error);
        }
    };


    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    };

    const getConditionLabel = (cond) => {
        const labels = {
            NEW: 'New',
            LIKE_NEW: 'Like New',
            GOOD: 'Good',
            FAIR: 'Fair',
            POOR: 'Poor',
        };
        return labels[cond] || cond;
    };

    const getConditionColor = (cond) => {
        const colors = {
            NEW: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
            LIKE_NEW: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            GOOD: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            FAIR: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            POOR: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
        };
        return colors[cond] || colors.GOOD;
    };

    const getDeliveryLabel = (option) => {
        const labels = {
            PICKUP: 'Pickup Only',
            OWNER_DELIVERY: 'Owner Delivery',
            BOTH: 'Both',
        };
        return labels[option] || option;
    };

    const getDeliveryIcon = (option) => {
        const icons = {
            PICKUP: <Home className="w-4 h-4" />,
            OWNER_DELIVERY: <Truck className="w-4 h-4" />,
            BOTH: <Package className="w-4 h-4" />,
        };
        return icons[option] || <Package className="w-4 h-4" />;
    };

    const handleCall = () => {
        const phoneNumber = user?.phone || '';
        if (phoneNumber) {
            const cleanNumber = phoneNumber.replace(/[^0-9+]/g, '');
            window.location.href = `tel:${cleanNumber}`;
        } else {
            alert('Phone number not available');
        }
    };

    const handleWhatsApp = () => {
        const phoneNumber = user?.phone || '';

        if (!phoneNumber) {
            alert('WhatsApp number not available');
            return;
        }

        let cleanNumber = phoneNumber.replace(/\D/g, '');

        if (cleanNumber.length === 10) {
            cleanNumber = `91${cleanNumber}`;
        }

        if (cleanNumber.startsWith('0')) {
            cleanNumber = `91${cleanNumber.slice(1)}`;
        }

        const message = encodeURIComponent(
            `Hi, I'm interested in renting: ${rental?.title || ''}`
        );

        window.open(
            `https://wa.me/${cleanNumber}?text=${message}`,
            '_blank',
            'noopener,noreferrer'
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading rental details...</p>
                </div>
            </div>
        );
    }

    if (error || !rental) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <AlertCircle className="w-16 h-16 mx-auto text-red-500" />
                    <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Rental not found</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">{error || 'The rental you are looking for does not exist.'}</p>
                    <Link
                        to="/rentals"
                        className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Back to Rentals
                    </Link>
                </div>
            </div>
        );
    }

    const hasPhone = !!user?.phone;
    const provider = rental?.owner || {};

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <button
                    onClick={() => navigate('/rentals')}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Rentals
                </button>

                <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-slate-800">
                            <ImageCarousel
                                images={rental.images}
                                alt={rental.title}
                                heightClass="h-72"
                                objectFit="contain"
                            />

                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {rental.title}
                                        </h1>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {rental.category?.name || 'Rental'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                            <IndianRupee className="inline w-5 h-5" />
                                            {rental.pricePerDay}/day
                                        </div>
                                        {rental.depositAmount > 0 && (
                                            <div className="flex items-center justify-end gap-1 text-xs text-gray-500 dark:text-gray-400">
                                                <Shield className="w-3 h-3" />
                                                Deposit: ₹{rental.depositAmount}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 mt-4">
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        {rental.city}, {rental.state}
                                    </div>
                                    {rental.locality && (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            • {rental.locality}
                                        </span>
                                    )}
                                    {rental.averageRating > 0 && (
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                {rental.averageRating.toFixed(1)}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                ({rental.reviewCount} reviews)
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <Package className="w-4 h-4" />
                                        {rental.quantity} available
                                    </div>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        {getDeliveryIcon(rental.deliveryOption)}
                                        {getDeliveryLabel(rental.deliveryOption)}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        Description
                                    </h3>
                                    <div className="mt-2">
                                        <p className={`text-sm text-gray-600 dark:text-gray-300 ${!showFullDescription ? 'line-clamp-4' : ''}`}>
                                            {rental.description}
                                        </p>
                                        {rental.description && rental.description.length > 200 && (
                                            <button
                                                onClick={() => setShowFullDescription(!showFullDescription)}
                                                className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                                            >
                                                {showFullDescription ? 'Show less' : 'Show more'}
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {rental.addressLine && (
                                    <div className="p-4 mt-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Address:</span> {rental.addressLine}
                                        </p>
                                    </div>
                                )}

                                {rental?.isAvailable &&
                                    rental?.status === 'ACTIVE' && (
                                        <div className="flex flex-wrap gap-3 mt-6">
                                            {user?.id !== provider?.id && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowBookingModal(true)
                                                    }
                                                    className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition bg-orange-600 rounded-xl hover:bg-orange-700 hover:shadow-lg hover:shadow-orange-500/25"
                                                >
                                                    <CalendarDays className="w-5 h-5" />
                                                    Request Rental
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                onClick={handleCall}
                                                disabled={!hasPhone}
                                                className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl ${hasPhone
                                                    ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                <Phone className="w-5 h-5" />
                                                {hasPhone
                                                    ? 'Call Now'
                                                    : 'No Phone Number'}
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleWhatsApp}
                                                disabled={!hasPhone}
                                                className={`flex items-center gap-2 px-6 py-3 text-white transition rounded-xl ${hasPhone
                                                    ? 'bg-green-600 hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25'
                                                    : 'bg-gray-400 cursor-not-allowed'
                                                    }`}
                                            >
                                                <FaWhatsapp className="w-5 h-5" />
                                                {hasPhone
                                                    ? 'WhatsApp'
                                                    : 'No Phone Number'}
                                            </button>
                                        </div>
                                    )}

                                {rental.reviewCount > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Reviews ({rental.reviewCount})
                                        </h3>
                                        <div className="mt-3 space-y-3">
                                            {[1, 2].map((_, index) => (
                                                <div key={index} className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-blue-600 rounded-full">
                                                                {getInitials('User')}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">User {index + 1}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">2 days ago</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                            <span className="text-sm font-medium text-gray-900 dark:text-white">5.0</span>
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                        Great item! Highly recommended.
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <ProviderCard user={provider} roleLabel="Rental Owner" providingSince={rental?.createdAt} isPhoneVerified={provider?.isPhoneVerified}
                            isEmailVerified={provider?.isEmailVerified} isTopRated={rental?.averageRating > 4.5} profilePath={`/users/${provider.id}`}
                        />

                        <RelatedRentals rentals={rental?.similarRentals} />
                    </div>
                </div>
            </div>
            <RentalBookingModal rental={rental} open={showBookingModal} onClose={() => setShowBookingModal(false)}
                createBooking={createBooking} getAvailability={getAvailability} loading={bookingLoading}
            />
        </div>
    );
};

export default RentalDetails;