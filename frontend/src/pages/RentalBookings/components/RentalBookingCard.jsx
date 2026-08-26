import React from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Loader2,
    MapPin,
    Package,
    XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
    REQUESTED: {
        label: "Requested",
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
        icon: Package,
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
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

const formatCurrency = (value) => {
    return `₹${Number(value || 0).toLocaleString("en-IN")}`;
};

const RentalBookingCard = ({
    booking,
    onCancel,
    actionLoading = false,
}) => {
    const config =
        STATUS_CONFIG[booking.status] ||
        STATUS_CONFIG.REQUESTED;

    const StatusIcon = config.icon;

    const canCancel =
        booking.status === "REQUESTED" ||
        booking.status === "ACCEPTED";

    const rental = booking.rental || {};

    return (
        <article className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center flex-shrink-0 bg-orange-100 w-11 h-11 rounded-xl dark:bg-orange-900/30">
                                <Package className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                            </div>

                            <div className="min-w-0">
                                <h2 className="font-bold text-gray-900 truncate dark:text-white">
                                    {rental.title || "Rental"}
                                </h2>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    Booking ID: {booking.id}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
                    >
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between gap-2 mt-6 ">
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

                {rental.owner && (
                    <div className="flex items-center gap-3 px-4 py-2 mt-5 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <img
                            src={
                                rental.owner.profileImageUrl ||
                                "/default-avatar.png"
                            }
                            alt={rental.owner.fullName}
                            className="object-cover w-10 h-10 rounded-full"
                        />

                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Rental Owner
                            </p>

                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                {rental.owner.fullName}
                            </p>
                        </div>
                    </div>
                )}

                {rental.city && (
                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {rental.city}
                    </div>
                )}

                {canCancel && (
                    <div className="flex justify-end pt-3 mt-5 border-t border-gray-200 dark:border-slate-700">
                        <button
                            type="button"
                            onClick={() => onCancel(booking)}
                            disabled={actionLoading}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 transition border border-red-200 rounded-xl hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:hover:bg-red-900/20"
                        >
                            {actionLoading && (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            )}

                            Cancel Booking
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
};

export default RentalBookingCard;