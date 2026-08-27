import React, { useEffect, useState } from "react";
import {
    CheckCircle2,
    Loader2,
    Package,
    X,
} from "lucide-react";

const ProductBookingModal = ({
    product,
    open,
    onClose,
    createBooking,
    loading,
}) => {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) {
            setSuccess(null);
            setError("");
        }
    }, [open]);

    const handleSubmit = async () => {
        setError("");

        const result = await createBooking({
            productId: product.id,
        });

        if (!result.success) {
            setError(result.error);
            return;
        }

        setSuccess(result.data);
    };

    if (!open || !product) {
        return null;
    }

    if (success) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl dark:bg-slate-800">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                        Purchase Request Sent
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Your request to buy this product has
                        been sent to the seller.
                    </p>

                    <div className="p-4 mt-5 text-left rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {product.title}
                                </p>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Waiting for seller approval
                                </p>
                            </div>

                            <p className="flex-shrink-0 text-sm font-bold text-blue-600 dark:text-blue-400">
                                ₹
                                {Number(
                                    product.price || 0
                                ).toLocaleString("en-IN")}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full px-5 py-3 mt-6 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-800">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Request to Buy
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {product.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="p-2 text-gray-500 transition rounded-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="p-4 mb-5 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                            {error}
                        </div>
                    )}

                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Product
                            </p>

                            <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
                                {product.title}
                            </h3>
                        </div>
                    </div>

                    <div className="p-4 mt-5 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Listed Price
                            </span>

                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                ₹
                                {Number(
                                    product.price || 0
                                ).toLocaleString("en-IN")}
                            </span>
                        </div>

                        {product.condition && (
                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-200 dark:border-slate-600">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Condition
                                </span>

                                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {product.condition}
                                </span>
                            </div>
                        )}
                    </div>

                    {product.seller?.fullName && (
                        <div className="flex items-center gap-3 mt-5">
                            <img
                                src={
                                    product.seller
                                        .profileImageUrl ||
                                    "/default-avatar.png"
                                }
                                alt={
                                    product.seller.fullName
                                }
                                className="object-cover w-10 h-10 rounded-full"
                            />

                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Seller
                                </p>

                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {product.seller.fullName}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="p-4 mt-5 border border-blue-100 rounded-xl bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10">
                        <p className="text-sm leading-6 text-blue-800 dark:text-blue-300">
                            Are you sure you want to send a
                            purchase request for this product?
                            The purchase will only be confirmed
                            after the seller accepts your request.
                        </p>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-5 py-3 font-semibold text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="inline-flex items-center justify-center flex-1 gap-2 px-5 py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Requesting...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Request to Buy
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductBookingModal;