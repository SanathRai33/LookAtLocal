import React from 'react';
import { MapPin, IndianRupee, Clock, AlertCircle, Loader2, Package, Truck, Home } from 'lucide-react';

const StepPreview = ({ formData, onPrev, onSubmit, loading, error }) => {
    const getCategoryName = () => {
        if (formData.categoryName) {
            return formData.categoryName;
        }
        return formData.categoryId || 'Product';
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

    const getDeliveryLabel = (option) => {
        const labels = {
            PICKUP: 'Pickup Only',
            SELLER_DELIVERY: 'Seller Delivery',
            BOTH: 'Both',
        };
        return labels[option] || option;
    };

    const getDeliveryIcon = (option) => {
        const icons = {
            PICKUP: <Home className="w-4 h-4" />,
            SELLER_DELIVERY: <Truck className="w-4 h-4" />,
            BOTH: <Package className="w-4 h-4" />,
        };
        return icons[option] || <Package className="w-4 h-4" />;
    };

    const getFirstImage = () => {
        if (formData.images && formData.images?.length > 0) {
            return URL.createObjectURL(formData.images[0]);
        }
        return null;
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-950 dark:text-white">Preview Your Product</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review your product listing details before submitting</p>

            {error && (
                <div className="flex items-start gap-2 p-3 mt-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <div className="mt-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
                <div className="p-6">
                    <div className="flex items-start gap-4">
                        {getFirstImage() ? (
                            <img src={getFirstImage()} alt={formData.title} className="object-cover w-32 h-32 rounded-xl" />
                        ) : (
                            <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-xl dark:bg-slate-800">
                                <span className="text-sm text-gray-400 dark:text-gray-500">No image</span>
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                    {getCategoryName()}
                                </span>
                                <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                    Pending Review
                                </span>
                            </div>

                            <h3 className="mt-2 text-xl font-bold text-gray-950 dark:text-white">
                                {formData.title || 'Your product title will appear here'}
                            </h3>

                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                {formData.description || 'Your description will appear here...'}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {formData.city || 'City'}, {formData.state || 'State'}
                                </span>

                                <span className="flex items-center gap-1 font-semibold text-gray-950 dark:text-white">
                                    <IndianRupee className="w-4 h-4" />
                                    {formData.price || '0'}
                                </span>

                                {formData.isNegotiable && (
                                    <span className="text-xs text-emerald-600 dark:text-emerald-400">Negotiable</span>
                                )}

                                {formData.condition && (
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-gray-300">
                                        {getConditionLabel(formData.condition)}
                                    </span>
                                )}

                                <span className="flex items-center gap-1">
                                    {getDeliveryIcon(formData.deliveryOption)}
                                    {getDeliveryLabel(formData.deliveryOption)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {formData.addressLine && (
                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-medium">Address:</span> {formData.addressLine}
                            </p>
                        </div>
                    )}

                    {formData.images && formData.images?.length > 1 && (
                        <div className="flex gap-2 mt-4">
                            {formData.images.slice(1, 4)?.map((image, index) => (
                                <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index + 2}`} className="object-cover w-16 h-16 rounded-lg" />
                            ))}
                            {formData.images?.length > 4 && (
                                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg dark:bg-slate-800">
                                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">+{formData.images?.length - 4}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
                    <div className="flex items-start gap-3 text-sm">
                        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-gray-600 dark:text-gray-300">
                            Your product listing will be reviewed and published within 24 hours. You'll receive a notification when it's live.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={onPrev}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                        </>
                    ) : (
                        <>
                            Submit Listing
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default StepPreview;