import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/useUser';
import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle2,
    Globe2,
    Home,
    Loader2,
    MapPin,
    Navigation,
    ShieldCheck,
} from 'lucide-react';

const CompleteAddress = () => {
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
    const [locationLoading, setLocationLoading] = useState(false);
    const [error, setError] = useState('');

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
            [name]:
                name === 'postalCode'
                    ? value.replace(/\D/g, '').slice(0, 6)
                    : value,
        }));
        if (error) setError('');
    };

    const getCurrentLocation = () => {
        setLocationLoading(true);
        setError('');

        if (!navigator.geolocation) {
            setError(
                'Location access is not supported by your browser. Please enter your address manually.',
            );
            setLocationLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
                    );

                    if (!response.ok) {
                        throw new Error('Failed to fetch address details');
                    }

                    const data = await response.json();
                    const address = data?.address;

                    if (!address) {
                        throw new Error('Address details were not found');
                    }

                    setFormData({
                        addressLine: [address.house_number || '', address.road || '']
                            .filter(Boolean)
                            .join(', '),
                        locality:
                            address.suburb ||
                            address.neighbourhood ||
                            address.village ||
                            '',
                        city:
                            address.city ||
                            address.town ||
                            address.municipality ||
                            '',
                        state: address.state || address.region || '',
                        postalCode: address.postcode || '',
                    });
                } catch (err) {
                    console.error('Reverse geocoding error:', err);
                    setError(
                        'We could not automatically find your address. Please enter it manually.',
                    );
                } finally {
                    setLocationLoading(false);
                }
            },
            (err) => {
                console.error('Geolocation error:', err);
                setError(
                    'Unable to access your location. Please allow location permission or enter your address manually.',
                );
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            },
        );
    };

    const validateForm = () => {
        if (!formData.addressLine.trim()) return 'Please enter your address.';
        if (!formData.city.trim()) return 'Please enter your city.';
        if (!formData.state.trim()) return 'Please enter your state.';
        if (!/^[1-9][0-9]{5}$/.test(formData.postalCode.trim())) {
            return 'Please enter a valid 6-digit Pincode.';
        }
        return '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await updateUser({
                addressLine: formData.addressLine.trim(),
                locality: formData.locality.trim() || null,
                city: formData.city.trim(),
                state: formData.state.trim(),
                postalCode: formData.postalCode.trim(),
            });

            if (result.success) {
                navigate('/dashboard', { replace: true });
            } else {
                setError(
                    result.error || 'Failed to save your address. Please try again.',
                );
            }
        } catch (err) {
            console.error('Complete address error:', err);
            setError('Something went wrong while saving your address. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const isSaving = loading || updateLoading || locationLoading;

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="flex items-center w-full max-w-6xl min-h-screen px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="relative hidden p-10 overflow-hidden text-white bg-slate-950 lg:flex lg:flex-col lg:justify-between">
                        <div className="absolute rounded-full -right-24 -top-24 h-72 w-72 bg-blue-500/20 blur-3xl" />
                        <div className="absolute rounded-full -bottom-24 -left-24 h-72 w-72 bg-indigo-500/20 blur-3xl" />

                        <div className="relative">
                            <div className="flex items-center justify-center w-12 h-12 mb-8 rounded-2xl bg-white/10 ring-1 ring-white/10">
                                <MapPin className="w-6 h-6 text-blue-400" />
                            </div>
                            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                                One last step
                            </p>
                            <h1 className="max-w-md text-4xl font-bold tracking-tight">
                                Tell us where you are.
                            </h1>
                            <p className="max-w-md mt-5 text-base leading-7 text-slate-300">
                                LookAtLocal is built around your local area. Your location helps us
                                show relevant products, services, jobs, spaces, and opportunities
                                near you.
                            </p>
                        </div>

                        <div className="relative space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/10">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-medium">More relevant local content</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Find things that actually matter around you.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-400/10">
                                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium">Your location stays with your account</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        You can update your address later from your profile.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:p-8 lg:p-10">
                        <div className="mb-7 lg:hidden">
                            <div className="flex items-center justify-center w-12 h-12 mb-5 text-blue-600 rounded-2xl bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="mb-8">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                                <MapPin className="h-3.5 w-3.5" />
                                Required for LookAtLocal
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                                Complete your address
                            </h2>
                            <p className="max-w-xl mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                                Add your location to finish setting up your account. You won't be
                                able to continue until this is completed.
                            </p>
                        </div>

                        {error && (
                            <div className="flex items-start gap-3 p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-2xl bg-red-50 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
                                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={getCurrentLocation}
                            disabled={isSaving}
                            className="mb-7 flex w-full items-center justify-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3.5 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-blue-400 dark:hover:bg-blue-950/50"
                        >
                            {locationLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Detecting your location...
                                </>
                            ) : (
                                <>
                                    <Navigation className="w-5 h-5" />
                                    Use my current location
                                </>
                            )}
                        </button>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="addressLine" className="block mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Home className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-400" />
                                    <input
                                        id="addressLine"
                                        name="addressLine"
                                        type="text"
                                        value={formData.addressLine}
                                        onChange={handleChange}
                                        placeholder="House no., street, building"
                                        autoComplete="street-address"
                                        disabled={isSaving}
                                        className="w-full h-12 pl-12 pr-4 text-sm transition border outline-none rounded-2xl border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="locality" className="block mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Locality / Area
                                    <span className="ml-2 text-xs font-normal text-slate-400">Optional</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-400" />
                                    <input
                                        id="locality"
                                        name="locality"
                                        type="text"
                                        value={formData.locality}
                                        onChange={handleChange}
                                        placeholder="Locality, neighbourhood, or area"
                                        autoComplete="address-level3"
                                        disabled={isSaving}
                                        className="w-full h-12 pl-12 pr-4 text-sm transition border outline-none rounded-2xl border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="city" className="block mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-400" />
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="Your city"
                                            autoComplete="address-level2"
                                            disabled={isSaving}
                                            className="w-full h-12 pl-12 pr-4 text-sm transition border outline-none rounded-2xl border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="state" className="block mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                        State <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <Globe2 className="absolute w-5 h-5 -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-400" />
                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            value={formData.state}
                                            onChange={handleChange}
                                            placeholder="Your state"
                                            autoComplete="address-level1"
                                            disabled={isSaving}
                                            className="w-full h-12 pl-12 pr-4 text-sm transition border outline-none rounded-2xl border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="postalCode" className="block mb-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                                    Pincode <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="postalCode"
                                    name="postalCode"
                                    type="text"
                                    inputMode="numeric"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="6-digit Pincode"
                                    autoComplete="postal-code"
                                    maxLength={6}
                                    disabled={isSaving}
                                    className="w-full h-12 px-4 text-sm transition border outline-none rounded-2xl border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:bg-slate-800"
                                />
                                <p className="mt-2 text-xs text-slate-400">Example: 575001</p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/15 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                {loading || updateLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Saving your address...
                                    </>
                                ) : (
                                    <>
                                        Continue to LookAtLocal
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="flex items-start gap-2 mt-6 text-xs leading-5 text-slate-400">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                            <p>
                                Your address is used to personalize local results. You can update
                                it later from your profile.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteAddress;