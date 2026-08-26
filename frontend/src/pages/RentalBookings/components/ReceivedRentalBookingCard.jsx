import React from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Loader2,
    MapPin,
    Package,
    PlayCircle,
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

    ACTIVE: {
        label: "Active",
        className:
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        icon: PlayCircle,
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
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircle2,
    },
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatCurrency = (value) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const ReceivedRentalBookingCard = ({
    booking,
    onAccept,
    onReject,
    onStart,
    onComplete,
    actionLoading = false,
}) => {
    const config =
        STATUS_CONFIG[booking.status] ||
        STATUS_CONFIG.REQUESTED;

    const StatusIcon = config.icon;

    const rental = booking.rental || {};
    const renter = booking.renter || {};

    return (
        <article className="flex flex-col h-full overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start min-w-0 gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 bg-orange-100 w-11 h-11 rounded-xl dark:bg-orange-900/30">
                            <Package className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-bold text-gray-900 truncate dark:text-white">
                                {rental.title || "Rental"}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Rental booking request
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
                        Renter
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        {renter?.profileImageUrl ?
                            (<img
                                src={
                                    renter.profileImageUrl ||
                                    "/default-avatar.png"
                                }
                                alt={renter.fullName}
                                className="object-cover w-10 h-10 rounded-full"
                            />) : (
                                <div className="flex items-center justify-center w-10 h-10 font-bold border rounded-full bg-slate-800/60 border-slate-700/50">
                                    <span>{renter?.fullName?.charAt(0)}</span>
                                </div>
                            )
                        }

                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {renter.fullName}
                            </p>

                            {renter.phone && (
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {renter.phone}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 justify-evenly ">
                    <div className="px-3 py-1 border rounded-xl bg-slate-800/60 border-slate-700/50">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Rental Period
                        </p>

                        <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                            <CalendarDays className="w-4 h-4 text-gray-400 shrink-0" />

                            <span>
                                {formatDate(booking.startDate)}
                                {" → "}
                                {formatDate(booking.endDate)}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center px-3 py-1 border rounded-xl bg-slate-800/60 border-slate-700/50">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Quantity
                        </p>

                        <p className="mt-1.5 text-xs font-semibold text-gray-900 dark:text-white">
                            {booking.quantity}
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-3 py-1 border rounded-xl bg-slate-800/60 border-slate-700/50">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Rental Total
                        </p>

                        <p className="mt-1.5 text-xs font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(booking.totalAmount)}
                        </p>
                    </div>

                    <div className="flex flex-col items-center px-3 py-1 border rounded-xl bg-slate-800/60 border-slate-700/50">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Deposit
                        </p>

                        <p className="mt-1.5 text-xs font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(booking.depositAmount)}
                        </p>
                    </div>
                </div>

                {rental.city && (
                    <div className="flex items-center gap-2 mt-5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {rental.city}
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
                                onStart(booking)
                            }
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <PlayCircle className="w-4 h-4" />
                            )}

                            Start Rental
                        </button>
                    </div>
                )}

                {booking.status === "ACTIVE" && (
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
                        Rental Completed
                    </div>
                )}
            </div>
        </article>
    );
};

export default ReceivedRentalBookingCard;