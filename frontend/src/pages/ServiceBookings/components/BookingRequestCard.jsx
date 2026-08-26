import React from "react";
import {
    CalendarDays,
    Clock3,
    Loader2,
    MapPin,
    Phone,
    UserRound,
    XCircle,
    CheckCircle2,
    LocateFixed,
} from "lucide-react";
import { getGoogleMapsDirectionsUrl } from "../../../utils/maps";

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

const BookingRequestCard = ({
    booking,
    onAccept,
    onReject,
    onComplete,
    actionLoading = false,
}) => {
    const status = statusStyles[booking.status] || {
        label: booking.status,
        className:
            "bg-gray-100 text-gray-700 border-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600",
    };

    const customer = booking.customer;
    const service = booking.service;

    const isPending = booking.status === "REQUESTED";

    return (
        <article className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800 h-fit">
            <div className="flex flex-col gap-4 px-5 py-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start min-w-0 gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100 rounded-full w-11 h-11 dark:bg-slate-700">
                        {customer?.profileImageUrl ? (
                            <img
                                src={customer.profileImageUrl}
                                alt={customer.fullName || "Customer"}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <UserRound className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                        )}
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate dark:text-white">
                            {customer?.fullName || "Customer"}
                        </h3>

                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Booking request for{" "}
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {service?.title || "Service"}
                            </span>
                        </p>
                    </div>
                </div>

                <span
                    className={`inline-flex self-start px-3 py-1.5 text-xs font-semibold border rounded-full ${status.className}`}
                >
                    {status.label}
                </span>
            </div>

            <div className="px-5 pb-5">
                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <CalendarDays className="flex-shrink-0 w-5 h-5 text-blue-600" />

                        <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                            Date
                        </p>

                        <p className="text-[12px] font-semibold text-gray-900 dark:text-white">
                            {formatDate(booking.scheduledAt)}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <Clock3 className="flex-shrink-0 w-5 h-5 text-blue-600" />

                        <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                            Time
                        </p>

                        <p className="text-[12px] font-semibold text-gray-900 dark:text-white">
                            {formatTime(booking.scheduledAt)}

                            {booking.endAt && (
                                <>
                                    {" "}
                                    -{" "}
                                    {formatTime(booking.endAt)}
                                </>
                            )}
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 px-4 py-3 mt-3 border border-gray-200 rounded-xl dark:border-slate-700">
                    <MapPin className="flex-shrink-0 w-5 h-5 text-orange-600" />

                    <div className="min-w-0">
                        <p className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                            Service Location
                        </p>

                        <p className="mt-1 text-xs font-medium text-gray-900 dark:text-white">
                            {booking.addressLine}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                    <div className="px-4 py-3 mt-3 rounded-xl bg-blue-50 dark:bg-blue-900/10">
                        <p className="text-[12px] font-semibold text-blue-700 dark:text-blue-300">
                            Customer Note
                        </p>

                        <p className="mt-1 text-[12px] text-gray-700 dark:text-gray-300">
                            {booking.customerNote}
                        </p>
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-3 border-t border-gray-200 dark:border-slate-700">
                    <div>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400">
                            Service price
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                            {formatPrice(
                                booking.agreedPrice ?? service?.price
                            )}

                            {service?.pricingType === "HOURLY" && (
                                <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    / hour
                                </span>
                            )}
                        </p>
                    </div>

                    {customer?.phone && (
                        <a
                            href={`tel:${customer.phone}`}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        >
                            <Phone className="w-4 h-4" />
                            Call Customer
                        </a>
                    )}
                </div>

                {isPending ? (
                    <div className="grid grid-cols-2 gap-5 mt-5">
                        <button
                            type="button"
                            onClick={() => onReject(booking)}
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center gap-2 px-2 py-1.5 font-semibold text-red-700 transition border border-red-200 rounded-xl bg-red-50 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <XCircle className="w-5 h-5" />
                            )}
                            Reject
                        </button>

                        <button
                            type="button"
                            onClick={() => onAccept(booking)}
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center gap-2 px-4 py-1.5 font-semibold text-white transition bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-5 h-5" />
                            )}
                            Accept
                        </button>
                    </div>
                ) : booking.status === "ACCEPTED" ? (
                    <div className="grid grid-cols-1 gap-3 mt-5 sm:grid-cols-2">
                        <button
                            type="button"
                            disabled={
                                booking.latitude === null ||
                                booking.latitude === undefined ||
                                booking.longitude === null ||
                                booking.longitude === undefined
                            }
                            onClick={() => {
                                const url = getGoogleMapsDirectionsUrl(
                                    booking.latitude,
                                    booking.longitude
                                );

                                if (!url) {
                                    return;
                                }

                                window.open(
                                    url,
                                    "_blank",
                                    "noopener,noreferrer"
                                );
                            }}
                            className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-white transition bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <LocateFixed className="w-5 h-5" />
                            Get Direction
                        </button>

                        <button
                            type="button"
                            onClick={() => onComplete(booking)}
                            disabled={actionLoading}
                            className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {actionLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <CheckCircle2 className="w-5 h-5" />
                            )}

                            Mark as Completed
                        </button>
                    </div>
                ) : null}
            </div>
        </article>
    );
};

export default BookingRequestCard;