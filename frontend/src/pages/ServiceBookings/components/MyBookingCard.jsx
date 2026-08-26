import React from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    MapPin,
    Phone,
    UserRound,
    XCircle,
} from "lucide-react";

const statusStyles = {
    REQUESTED: {
        label: "Pending",
        className:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900/40",
    },
    ACCEPTED: {
        label: "Accepted",
        className:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900/40",
    },
    REJECTED: {
        label: "Rejected",
        className:
            "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-900/40",
    },
    CANCELLED: {
        label: "Cancelled",
        className:
            "bg-gray-100 text-gray-700 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600",
    },
    COMPLETED: {
        label: "Completed",
        className:
            "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/40",
    },
    IN_PROGRESS: {
        label: "In Progress",
        className:
            "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-900/40",
    },
};

const formatDate = (value) => {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(new Date(value));
};

const formatTime = (value) => {
    if (!value) return "—";

    return new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
    }).format(new Date(value));
};

const formatPrice = (price) => {
    if (price === null || price === undefined) {
        return null;
    }

    const numericPrice = Number(price);

    if (Number.isNaN(numericPrice)) {
        return price;
    }

    return `₹${numericPrice}`;
};

const MyBookingCard = ({
    booking,
    onCancel,
    actionLoading = false,
}) => {
    const status = statusStyles[booking.status] || {
        label: booking.status,
        className:
            "bg-gray-100 text-gray-700 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600",
    };

    const service = booking.service;
    const provider = service?.provider;

    const canCancel =
        booking.status === "REQUESTED" ||
        booking.status === "ACCEPTED";

    const price = booking.agreedPrice ?? service?.price;

    return (
        <article className="flex flex-col h-full overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start min-w-0 gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100 rounded-full h-11 w-11 dark:bg-slate-700">
                        {provider?.profileImageUrl ? (
                            <img
                                src={provider.profileImageUrl}
                                alt={provider.fullName || "Provider"}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <UserRound className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        )}
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate dark:text-white">
                            {service?.title || "Service"}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Provider:{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {provider?.fullName || "Provider"}
                            </span>
                        </p>
                    </div>
                </div>

                <span
                    className={`inline-flex self-start rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                >
                    {status.label}
                </span>
            </div>

            <div className="flex flex-col flex-1 px-5 pb-5">
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <CalendarDays className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Date
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                {formatDate(booking.scheduledAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <Clock3 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Time
                            </p>

                            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                                {formatTime(booking.scheduledAt)}

                                {booking.endAt && (
                                    <>
                                        {" "}
                                        - {formatTime(booking.endAt)}
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-4 mt-4 border border-gray-200 rounded-xl dark:border-slate-700">
                    <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />

                    <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Service Location
                        </p>

                        <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            {booking.addressLine}
                        </p>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {[booking.locality, booking.city, booking.state]
                                .filter(Boolean)
                                .join(", ")}
                            {booking.postalCode
                                ? ` - ${booking.postalCode}`
                                : ""}
                        </p>
                    </div>
                </div>

                {booking.customerNote && (
                    <div className="p-4 mt-4 rounded-xl bg-blue-50 dark:bg-blue-900/10">
                        <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                            Your Note
                        </p>

                        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                            {booking.customerNote}
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-slate-700">
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Service price
                        </p>

                        <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(price)}

                            {service?.pricingType === "HOURLY" && (
                                <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    / hour
                                </span>
                            )}
                        </p>
                    </div>

                    {provider?.phone && booking.status === "ACCEPTED" && (
                        <a
                            href={`tel:${provider.phone}`}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        >
                            <Phone className="w-4 h-4" />
                            Call Provider
                        </a>
                    )}
                </div>

                {booking.status === "REQUESTED" && (
                    <div className="p-4 mt-4 rounded-xl bg-amber-50 dark:bg-amber-900/10">
                        <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                            Waiting for provider confirmation.
                        </p>

                        <p className="mt-1 text-xs text-amber-700 dark:text-amber-400">
                            The provider needs to accept your booking request before it is
                            confirmed.
                        </p>
                    </div>
                )}

                {booking.status === "ACCEPTED" && (
                    <div className="flex items-start gap-3 p-4 mt-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />

                        <div>
                            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                                Booking confirmed
                            </p>

                            <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
                                Your service provider has accepted this booking.
                            </p>
                        </div>
                    </div>
                )}

                {booking.status === "REJECTED" && (
                    <div className="flex items-start gap-3 p-4 mt-4 rounded-xl bg-red-50 dark:bg-red-900/10">
                        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />

                        <div>
                            <p className="text-sm font-semibold text-red-800 dark:text-red-300">
                                Booking request was rejected
                            </p>

                            <p className="mt-1 text-xs text-red-700 dark:text-red-400">
                                You can choose another time or request another service.
                            </p>
                        </div>
                    </div>
                )}

                {booking.status === "COMPLETED" && (
                    <div className="flex items-start gap-3 p-4 mt-4 rounded-xl bg-blue-50 dark:bg-blue-900/10">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

                        <div>
                            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                                Service completed
                            </p>

                            <p className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                                This booking has been completed.
                            </p>
                        </div>
                    </div>
                )}

                {booking.status === "CANCELLED" && (
                    <div className="p-4 mt-4 bg-gray-100 rounded-xl dark:bg-slate-700">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Booking cancelled
                        </p>
                    </div>
                )}

                {canCancel && (
                    <button
                        type="button"
                        onClick={() => onCancel(booking)}
                        disabled={actionLoading}
                        className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 mt-5 font-semibold text-red-700 transition border border-red-200 rounded-xl bg-red-50 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                    >
                        {actionLoading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-red-400 rounded-full animate-spin border-t-transparent" />
                                Cancelling...
                            </>
                        ) : (
                            <>
                                <XCircle className="w-5 h-5" />
                                Cancel Booking
                            </>
                        )}
                    </button>
                )}
            </div>
        </article>
    );
};

export default MyBookingCard;