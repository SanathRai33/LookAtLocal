import React, { useEffect, useState } from "react";
import {
    AlertCircle,
    CalendarDays,
    CheckCircle2,
    Clock3,
    Inbox,
    Loader2,
    RefreshCw,
} from "lucide-react";
import BookingRequestCard from "./components/BookingRequestCard";
import { useServiceBooking } from "../../hooks/useServiceBooking";
import { useSearchParams } from "react-router-dom";

const filters = [
    {
        value: "",
        label: "All",
    },
    {
        value: "REQUESTED",
        label: "Pending",
    },
    {
        value: "ACCEPTED",
        label: "Accepted",
    },
    {
        value: "REJECTED",
        label: "Rejected",
    },
    {
        value: "COMPLETED",
        label: "Completed",
    },
];

const ReceivedBookings = () => {
    const {
        bookings,
        loading,
        error,
        getReceivedBookings,
        acceptBooking,
        rejectBooking,
        completeBooking,
    } = useServiceBooking();

    const [searchParams, setSearchParams] = useSearchParams();
    const [actionBookingId, setActionBookingId] = useState(null);
    const [actionError, setActionError] = useState("");

    const activeFilter = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;

    const loadBookings = async () => {
        setActionError("");
        const params = {
            page,
            limit,
        };
        if (activeFilter) {
            params.status = activeFilter;
        }
        await getReceivedBookings(params);
    };

    useEffect(() => {
        loadBookings();
    }, [activeFilter, page, limit]);

    const handleFilterChange = (filterValue) => {
        setSearchParams({
            status: filterValue,
            page: 1,
            limit: limit,
        });
    };

    const handleAccept = async (booking) => {
        setActionBookingId(booking.id);
        setActionError("");

        const agreedPrice = booking.agreedPrice ?? booking.service?.price;

        const result = await acceptBooking(booking.id, {
            agreedPrice: agreedPrice
                ? Number(agreedPrice)
                : undefined,
        });

        setActionBookingId(null);

        if (!result.success) {
            setActionError(result.error);
            return;
        }

        await loadBookings();
    };

    const handleReject = async (booking) => {
        setActionBookingId(booking.id);
        setActionError("");

        const result = await rejectBooking(booking.id);

        setActionBookingId(null);

        if (!result.success) {
            setActionError(result.error);
            return;
        }

        await loadBookings();
    };

    const handleComplete = async (booking) => {
        setActionBookingId(booking.id);
        setActionError("");

        const result = await completeBooking(booking.id);

        setActionBookingId(null);

        if (!result.success) {
            setActionError(result.error);
            return;
        }

        await loadBookings();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
            <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col gap-5 mb-8 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center bg-blue-100 w-11 h-11 rounded-xl dark:bg-blue-900/30">
                                <Inbox className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Received Bookings
                                </h1>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Manage booking requests for your services.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={loadBookings}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 transition bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                    >
                        <RefreshCw
                            className={`w-4 h-4 ${loading ? "animate-spin" : ""
                                }`}
                        />
                        Refresh
                    </button>
                </div>

                <div className="flex gap-2 p-1 mb-6 overflow-x-auto bg-white border border-gray-200 rounded-xl dark:border-slate-700 dark:bg-slate-800">
                    {filters?.map((filter) => {
                        const active = activeFilter === filter.value;

                        return (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => handleFilterChange(filter.value)}
                                className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg transition ${active
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {actionError && (
                    <div className="flex items-start gap-3 p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        <AlertCircle className="flex-shrink-0 w-5 h-5" />

                        <div>
                            <p className="font-semibold">
                                Booking action failed
                            </p>

                            <p className="mt-1">{actionError}</p>
                        </div>
                    </div>
                )}

                {error && !actionError && (
                    <div className="flex items-start gap-3 p-4 mb-6 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        <AlertCircle className="flex-shrink-0 w-5 h-5" />

                        <div>
                            <p className="font-semibold">
                                Unable to load bookings
                            </p>

                            <p className="mt-1">{error}</p>
                        </div>
                    </div>
                )}

                {loading && bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />

                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            Loading booking requests...
                        </p>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 text-center bg-white border border-gray-200 border-dashed rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full dark:bg-slate-700">
                            <Inbox className="w-8 h-8 text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-lg font-semibold text-gray-900 dark:text-white">
                            No booking requests
                        </h2>

                        <p className="max-w-md mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {activeFilter
                                ? `There are no ${activeFilter.toLowerCase()} bookings at the moment.`
                                : "You don't have any booking requests yet."}
                        </p>
                    </div>
                ) : (
                    <div className="grid items-stretch grid-cols-1 gap-5 md:grid-cols-2">
                        {bookings?.map((booking) => (
                            <BookingRequestCard
                                key={booking.id}
                                booking={booking}
                                onAccept={handleAccept}
                                onReject={handleReject}
                                onComplete={handleComplete}
                                actionLoading={actionBookingId === booking.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReceivedBookings;