import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmergency } from '../../hooks/useEmergency';
import { ChevronLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

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

const EditEmergency = () => {
    const { emergencyId } = useParams();
    const navigate = useNavigate();
    const { getEmergencyRequestById, updateEmergencyRequest } = useEmergency();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        emergencyType: '',
        title: '',
        description: '',
        urgency: 'NORMAL',
        contactPhone: '',
    });

    useEffect(() => {
        fetchEmergency();
    }, [emergencyId]);

    const fetchEmergency = async () => {
        setLoading(true);
        try {
            const result = await getEmergencyRequestById(emergencyId);
            if (result.success) {
                const data = result.data;
                setFormData({
                    emergencyType: data.emergencyType || '',
                    title: data.title || '',
                    description: data.description || '',
                    urgency: data.urgency || 'NORMAL',
                    contactPhone: data.contactPhone || '',
                });
            } else {
                setError(result.error || 'Failed to load emergency request');
            }
        } catch (error) {
            setError('Failed to load emergency request');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (error) setError('');
        if (success) setSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess(false);

        try {
            const result = await updateEmergencyRequest(emergencyId, formData);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/emergency');
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('Failed to update emergency request. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 mx-auto text-red-600 animate-spin" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Loading emergency request...
                    </p>
                </div>
            </div>
        );
    }

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
                        Edit Emergency Request
                    </h1>
                    <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                        Update your emergency request details
                    </p>
                </div>

                {error && (
                    <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-start gap-2 p-3 mb-4 text-sm rounded-lg text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400">
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>Emergency request updated successfully! Redirecting...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            disabled={saving}
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
                            disabled={saving}
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
                            disabled={saving}
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
                                disabled={saving}
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
                                disabled={saving}
                                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-red-600 text-base font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-600/15 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Update Request'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/emergency')}
                            disabled={saving}
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

export default EditEmergency;