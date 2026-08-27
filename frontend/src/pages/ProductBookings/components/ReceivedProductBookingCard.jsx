import React from "react";
import {
    CheckCircle2,
    Clock3,
    Loader2,
    MapPin,
    Package,
    XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
    REQUESTED: {
        label: "Pending",
        className:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        icon: Clock3,
    },

    ACCEPTED: {
        label: "Accepted",
        className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: CheckCircle2,
    },

    REJECTED: {
        label: "Rejected",
        className:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
    },

    CANCELLED: {
        label: "Cancelled",
        className:
            "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300",
        icon: XCircle,
    },

    COMPLETED: {
        label: "Completed",
        className:
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        icon: CheckCircle2,
    },
};

const formatCurrency = (value) => {
    if (value === null || value === undefined) {
        return "Not finalized";
    }

    return `₹${Number(value).toLocaleString("en-IN")}`;
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const ReceivedProductBookingCard = ({
    booking,
    onAccept,
    onReject,
    onComplete,
    actionLoading = false,
}) => {
    const config =
        STATUS_CONFIG[booking.status] ||
        STATUS_CONFIG.REQUESTED;

    const StatusIcon = config.icon;

    const product = booking.product || {};
    const buyer = booking.buyer || {};

    return (
        <article className="flex flex-col h-full overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start min-w-0 gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 bg-blue-100 w-11 h-11 rounded-xl dark:bg-blue-900/30">
                            <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-bold text-gray-900 truncate dark:text-white">
                                {product.title || "Product"}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Purchase request
                            </p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
                    >
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                    </span>
                </div>

                <div className="p-4 mt-5 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Buyer
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <img
                            src={
                                buyer.profileImageUrl ||
                                "/default-avatar.png"
                            }
                            alt={buyer.fullName}
                            className="object-cover w-10 h-10 rounded-full"
                        />

                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {buyer.fullName}
                            </p>

                            {buyer.phone && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {buyer.phone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Listed Price
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(
                                product.price
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Agreed Price
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(
                                booking.agreedPrice
                            )}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Condition
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                            {product.condition || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Requested
                        </p>

                        <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                            {formatDate(
                                booking.createdAt
                            )}
                        </p>
                    </div>
                </div>

                {product.city && (
                    <div className="flex items-center gap-2 mt-5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {product.city}
                    </div>
                )}

                <div className="flex-1" />

                {booking.status === "REQUESTED" && (
                    <div className="grid grid-cols-2 gap-3 pt-5 mt-5 border-t border-gray-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() =>
                                onReject(booking)
                            }
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 transition border border-red-200 rounded-xl hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:hover:bg-red-900/20"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <XCircle className="w-4 h-4" />
                            )}

                            Reject
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                onAccept(booking)
                            }
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4" />
                            )}

                            Accept
                        </button>
                    </div>
                )}

                {booking.status === "ACCEPTED" && (
                    <div className="pt-5 mt-5 border-t border-gray-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() =>
                                onComplete(booking)
                            }
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-4 h-4" />
                            )}

                            Mark as Completed
                        </button>
                    </div>
                )}

                {booking.status === "COMPLETED" && (
                    <div className="flex items-center justify-center gap-2 pt-5 mt-5 text-sm font-semibold border-t border-gray-200 text-emerald-600 dark:border-slate-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-5 h-5" />
                        Sale Completed
                    </div>
                )}
            </div>
        </article>
    );
};

export default ReceivedProductBookingCard;