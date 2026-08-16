import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmergency } from '../../hooks/useEmergency';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Loader2, AlertCircle, CheckCircle, MapPin, Navigation } from 'lucide-react';

const emergencyTypes = [
    { value: 'BLOOD', label: 'Blood', icon: '🩸' },
    { value: 'MEDICAL', label: 'Medical', icon: '🏥' },
    { value: 'ACCIDENT', label: 'Accident', icon: '🚑' },
    { value: 'VOLUNTEER', label: 'Volunteer', icon: '🤝' },
    { value: 'OTHER', label: 'Other', icon: '📌' },
];

const urgencyLevels = [
    { value: 'NORMAL', label: 'Normal', color: 'bg-yellow-500' },
    { value: 'URGENT', label: 'Urgent', color: 'bg-orange-500' },
    { value: 'CRITICAL', label: 'Critical', color: 'bg-red-600' },
];

const CreateEmergency = () => {
    const navigate = useNavigate();
    const { createEmergencyRequest } = useEmergency();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [formData, setFormData] = useState({
        emergencyType: '',
        title: '',
        description: '',
        urgency: 'NORMAL',
        contactPhone: '',
        useCurrentLocation: false,
        currentAddress: '',
        currentLocality: '',
        currentCity: '',
        currentState: '',
        currentPostalCode: '',
        currentLatitude: null,
        currentLongitude: null,
    });

    const steps = ['Details', 'Location'];

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                contactPhone: user.phone || '',
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (error) setError('');
        if (success) setSuccess(false);
    };

    const handleUseCurrentLocation = () => {
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
                        setFormData((prev) => ({
                            ...prev,
                            useCurrentLocation: true,
                            currentAddress: [
                                address.road || '',
                                address.house_number || '',
                                address.suburb || '',
                            ]
                                ?.filter(Boolean)
                                .join(', ') || '',
                            currentLocality: address.suburb || address.neighbourhood || address.village || '',
                            currentCity: address.city || address.town || address.municipality || '',
                            currentState: address.state || address.region || '',
                            currentPostalCode: address.postcode || '',
                            currentLatitude: latitude,
                            currentLongitude: longitude,
                        }));
                        setUseCurrentLocation(true);
                    }
                } catch (error) {
                    console.error('Error getting location details:', error);
                    setError('Failed to get address details. Please use saved address.');
                } finally {
                    setLocationLoading(false);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                setError('Unable to get your location. Please use saved address.');
                setLocationLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    const handleUseSavedAddress = () => {
        setUseCurrentLocation(false);
        setFormData((prev) => ({
            ...prev,
            useCurrentLocation: false,
            currentAddress: '',
            currentLocality: '',
            currentCity: '',
            currentState: '',
            currentPostalCode: '',
            currentLatitude: null,
            currentLongitude: null,
        }));
    };

    const nextStep = () => {
        setCurrentStep((prev) => Math.min(prev + 1, steps?.length - 1));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const validateDetails = () => {
        const newErrors = {};
        if (!formData.emergencyType) newErrors.emergencyType = 'Please select an emergency type';
        if (!formData.title?.trim()) newErrors.title = 'Title is required';
        if (!formData.description?.trim()) newErrors.description = 'Description is required';
        if (formData.title?.length < 3) newErrors.title = 'Title must be at least 3 characters';
        if (formData.description?.length < 10) newErrors.description = 'Description must be at least 10 characters';
        setError(Object.values(newErrors)[0] || '');
        return Object.keys(newErrors)?.length === 0;
    };

    const handleNext = () => {
        if (validateDetails()) {
            nextStep();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const submitData = {
                emergencyType: formData.emergencyType,
                title: formData.title,
                description: formData.description,
                urgency: formData.urgency,
                contactPhone: formData.contactPhone,
                useCurrentLocation: formData.useCurrentLocation,
            };

            if (formData.useCurrentLocation) {
                submitData.currentAddress = formData.currentAddress;
                submitData.currentLocality = formData.currentLocality;
                submitData.currentCity = formData.currentCity;
                submitData.currentState = formData.currentState;
                submitData.currentPostalCode = formData.currentPostalCode;
                submitData.currentLatitude = formData.currentLatitude;
                submitData.currentLongitude = formData.currentLongitude;
            }

            const result = await createEmergencyRequest(submitData);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/emergency');
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('Failed to create emergency request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <button
                    onClick={() => navigate('/emergency')}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Emergency
                </button>

                <div className="mt-6 mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Post Emergency Request
                    </h1>
                    <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                        Share your emergency request with the community
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-700">
                        <div
                            className="h-full transition-all duration-500 bg-red-600"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        />
                    </div>
                    <div className="relative flex justify-between">
                        {steps?.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isActive = index === currentStep;

                            return (
                                <div key={index} className="flex flex-col items-center">
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isCompleted
                                                ? 'border-red-600 bg-red-600 text-white'
                                                : isActive
                                                    ? 'border-red-600 bg-white dark:bg-slate-900 text-red-600'
                                                    : 'border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-900 text-gray-400'
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-sm font-medium">{index + 1}</span>
                                        )}
                                    </div>
                                    <span
                                        className={`mt-2 text-xs font-medium ${isActive
                                                ? 'text-red-600 dark:text-red-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                            }`}
                                    >
                                        {step}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-8">
                    {error && (
                        <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-start gap-2 p-3 mb-4 text-sm rounded-lg text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400">
                            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <span>Emergency request posted successfully! Redirecting...</span>
                        </div>
                    )}

                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <div>
                                <label
                                    htmlFor="emergencyType"
                                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                >
                                    Emergency Type
                                </label>
                                <select
                                    id="emergencyType"
                                    name="emergencyType"
                                    value={formData.emergencyType}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                >
                                    <option value="">Select emergency type</option>
                                    {emergencyTypes?.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.icon} {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                >
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Brief title of your emergency"
                                    disabled={loading}
                                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Describe your emergency in detail..."
                                    rows="5"
                                    disabled={loading}
                                    className="w-full px-4 py-3 text-base text-gray-900 transition border border-gray-300 outline-none rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {formData.description?.length || 0}/3000 characters
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label
                                        htmlFor="urgency"
                                        className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                    >
                                        Urgency Level
                                    </label>
                                    <select
                                        id="urgency"
                                        name="urgency"
                                        value={formData.urgency}
                                        onChange={handleChange}
                                        disabled={loading}
                                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    >
                                        {urgencyLevels?.map((level) => (
                                            <option key={level.value} value={level.value}>
                                                {level.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="contactPhone"
                                        className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                    >
                                        Contact Phone
                                    </label>
                                    <input
                                        id="contactPhone"
                                        name="contactPhone"
                                        type="tel"
                                        value={formData.contactPhone}
                                        onChange={handleChange}
                                        placeholder="Phone number"
                                        disabled={loading}
                                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={handleNext}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Step
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-950 dark:text-white">Location</h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Choose your location for the emergency request
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={handleUseCurrentLocation}
                                    disabled={locationLoading}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {locationLoading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Getting location...
                                        </>
                                    ) : (
                                        <>
                                            <Navigation className="w-4 h-4" />
                                            Use Current Location
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleUseSavedAddress}
                                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                                >
                                    <MapPin className="w-4 h-4" />
                                    Use Saved Address
                                </button>
                            </div>

                            <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800">
                                {useCurrentLocation ? (
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p className="font-medium text-gray-700 dark:text-gray-300">📍 Current Location</p>
                                        {formData.currentAddress && <p>{formData.currentAddress}</p>}
                                        {formData.currentLocality && <p>{formData.currentLocality}</p>}
                                        {(formData.currentCity || formData.currentState) && (
                                            <p>
                                                {formData.currentCity}{formData.currentState && `, ${formData.currentState}`}
                                            </p>
                                        )}
                                        {formData.currentPostalCode && <p>PIN: {formData.currentPostalCode}</p>}
                                    </div>
                                ) : (
                                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <p className="font-medium text-gray-700 dark:text-gray-300">📍 Saved Address</p>
                                        {user?.addressLine && <p>{user.addressLine}</p>}
                                        {user?.locality && <p>{user.locality}</p>}
                                        {(user?.city || user?.state) && (
                                            <p>
                                                {user.city}{user.state && `, ${user.state}`}
                                            </p>
                                        )}
                                        {user?.postalCode && <p>PIN: {user.postalCode}</p>}
                                        {!user?.addressLine && !user?.locality && !user?.city && (
                                            <p className="text-gray-400">No saved address found in your profile</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-4">
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading || !useCurrentLocation && !user?.addressLine}
                                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            Post Emergency
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateEmergency;