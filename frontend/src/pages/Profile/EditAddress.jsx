import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/useUser';
import {
    MapPin,
    Building,
    Globe,
    Loader2,
    Save,
    AlertCircle,
    ArrowLeft,
    Navigation,
    Home
} from 'lucide-react';

const EditAddress = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useAuth();
    const { loading: updateLoading } = useUser();
    const [formData, setFormData] = useState({
        addressLine: '',
        locality: '',
        city: '',
        state: '',
        postalCode: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                addressLine: user.addressLine || '',
                locality: user.locality || '',
                city: user.city || '',
                state: user.state || '',
                postalCode: user.postalCode || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError('');
        if (success) setSuccess(false);
    };

    const getCurrentLocation = () => {
        setLocationLoading(true);
        setError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
                    );
                    const data = await response.json();

                    if (data && data.address) {
                        const address = data.address;
                        setFormData({
                            addressLine: [
                                address.road || '',
                                address.house_number || '',
                                address.suburb || '',
                            ]
                                .filter(Boolean)
                                .join(', ') || '',
                            locality: address.suburb || address.neighbourhood || address.village || '',
                            city: address.city || address.town || address.municipality || '',
                            state: address.state || address.region || '',
                            postalCode: address.postcode || '',
                        });
                        setSuccess(true);
                        setTimeout(() => setSuccess(false), 3000);
                    }
                } catch (error) {
                    console.error('Error getting location details:', error);
                    setError('Failed to get address details. Please enter manually.');
                } finally {
                    setLocationLoading(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                setError('Unable to get your location. Please enter address manually.');
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        const result = await updateUser(formData);

        if (result.success) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 mx-auto text-blue-600 animate-spin" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/profile/edit')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Edit Profile
                    </button>

                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Edit Address
                    </h1>
                    <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                        Update your address information
                    </p>
                </div>

                {error && (
                    <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="p-3 mb-4 text-sm rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                        Address updated successfully! Redirecting...
                    </div>
                )}

                <div className="mb-6">
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={locationLoading}
                        className="flex items-center justify-center w-full h-12 gap-2 text-blue-600 transition border-2 border-blue-300 border-dashed rounded-2xl bg-blue-50 hover:bg-blue-100 hover:border-blue-400 disabled:opacity-60 disabled:cursor-not-allowed dark:border-blue-800 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
                    >
                        {locationLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Getting your location...
                            </>
                        ) : (
                            <>
                                <Navigation className="w-5 h-5" />
                                Use Current Location
                            </>
                        )}
                    </button>
                    <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                        Allow location access to auto-fill your address
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="addressLine"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Address Line
                        </label>
                        <div className="relative">
                            <Home className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                            <input
                                id="addressLine"
                                name="addressLine"
                                type="text"
                                value={formData.addressLine}
                                onChange={handleChange}
                                placeholder="Street address, building, apartment"
                                disabled={loading || updateLoading}
                                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="locality"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Locality / Area
                        </label>
                        <div className="relative">
                            <Building className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                            <input
                                id="locality"
                                name="locality"
                                type="text"
                                value={formData.locality}
                                onChange={handleChange}
                                placeholder="Locality, neighborhood, or area"
                                disabled={loading || updateLoading}
                                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="city"
                                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                            >
                                City
                            </label>
                            <div className="relative">
                                <MapPin className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    disabled={loading || updateLoading}
                                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="state"
                                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                            >
                                State
                            </label>
                            <div className="relative">
                                <Globe className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    disabled={loading || updateLoading}
                                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="postalCode"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Pincode
                        </label>
                        <div className="relative">
                            <input
                                id="postalCode"
                                name="postalCode"
                                type="text"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder="6-digit postalCode"
                                maxLength="6"
                                pattern="[0-9]{6}"
                                disabled={loading || updateLoading}
                                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Enter a valid 6-digit Pincode
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={loading || updateLoading}
                            className="flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-gray-950 text-base font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            {loading || updateLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save Address
                                </>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/profile')}
                            disabled={loading || updateLoading}
                            className="flex h-12 min-w-[140px] items-center justify-center rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAddress;