import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCommunity } from '../../../hooks/useCommunity';
import { useAuth } from '../../../context/AuthContext';
import { ChevronLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const postTypes = [
    { value: 'EVENT', label: 'Event' },
    { value: 'ANNOUNCEMENT', label: 'Announcement' },
    { value: 'LOST_FOUND', label: 'Lost & Found' },
    { value: 'ALERT', label: 'Alert' },
    { value: 'GENERAL', label: 'General' },
];

const EditCommunityPost = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { getCommunityPostById, updateCommunityPost } = useCommunity();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        postType: '',
        title: '',
        description: '',
        startsAt: '',
        endsAt: '',
        locationName: '',
        isPinned: false,
    });

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        setLoading(true);
        try {
            const result = await getCommunityPostById(postId);
            if (result.success) {
                const post = result.data;
                setFormData({
                    postType: post.postType || '',
                    title: post.title || '',
                    description: post.description || '',
                    startsAt: post.startsAt ? post.startsAt.split('T')[0] : '',
                    endsAt: post.endsAt ? post.endsAt.split('T')[0] : '',
                    locationName: post.locationName || '',
                    isPinned: post.isPinned || false,
                });
            } else {
                setError(result.error || 'Failed to load post');
            }
        } catch (error) {
            setError('Failed to load post');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
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
            const result = await updateCommunityPost(postId, formData);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/community');
                }, 2000);
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('Failed to update post. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">
                        Loading post...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <button
                    onClick={() => navigate('/community')}
                    className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Community
                </button>

                <div className="mt-6 mb-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Edit Community Post
                    </h1>
                    <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                        Update your community post
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
                        <span>Post updated successfully! Redirecting...</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="postType"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Post Type
                        </label>
                        <select
                            id="postType"
                            name="postType"
                            value={formData.postType}
                            onChange={handleChange}
                            disabled={saving}
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        >
                            <option value="">Select post type</option>
                            {postTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
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
                            placeholder="Enter a title for your post"
                            disabled={saving}
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
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
                            placeholder="Describe your post in detail..."
                            rows="5"
                            disabled={saving}
                            className="w-full px-4 py-3 text-base text-gray-900 transition border border-gray-300 outline-none rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {formData.description?.length || 0}/3000 characters
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label
                                htmlFor="startsAt"
                                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                            >
                                Start Date (optional)
                            </label>
                            <input
                                id="startsAt"
                                name="startsAt"
                                type="date"
                                value={formData.startsAt}
                                onChange={handleChange}
                                disabled={saving}
                                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="endsAt"
                                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                            >
                                End Date (optional)
                            </label>
                            <input
                                id="endsAt"
                                name="endsAt"
                                type="date"
                                value={formData.endsAt}
                                onChange={handleChange}
                                disabled={saving}
                                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="locationName"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Location Name (optional)
                        </label>
                        <input
                            id="locationName"
                            name="locationName"
                            type="text"
                            value={formData.locationName}
                            onChange={handleChange}
                            placeholder="e.g. Community Hall, Park, etc."
                            disabled={saving}
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Your address will be automatically included from your profile
                        </p>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-800">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-medium">📍 Your Location:</span>{' '}
                            {user?.addressLine ? (
                                <>
                                    {user.addressLine}
                                    {user.locality && `, ${user.locality}`}
                                    {user.city && `, ${user.city}`}
                                    {user.state && `, ${user.state}`}
                                    {user.postalCode && ` - ${user.postalCode}`}
                                </>
                            ) : (
                                <span className="text-gray-400">
                                    No address found in your profile. Please update your profile.
                                </span>
                            )}
                        </p>
                    </div>

                    {user?.role === 'ADMIN' && (
                        <div className="flex items-center gap-3">
                            <input
                                id="isPinned"
                                name="isPinned"
                                type="checkbox"
                                checked={formData.isPinned}
                                onChange={handleChange}
                                disabled={saving}
                                className="w-4 h-4 border-gray-300 rounded accent-gray-950 dark:accent-blue-500"
                            />
                            <label
                                htmlFor="isPinned"
                                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Pin this post (Admin only)
                            </label>
                        </div>
                    )}

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-gray-950 text-base font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Update Post'
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate('/community')}
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

export default EditCommunityPost;