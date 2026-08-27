import React, { useCallback, useEffect } from "react";
import { Loader2, Package, RefreshCw, ShoppingBag } from "lucide-react";
import useProductBooking from "../../hooks/useProductBooking";
import MyProductBookingCard from "./components/ProductBookingCard";
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
        value: "COMPLETED",
        label: "Completed",
    },
    {
        value: "REJECTED",
        label: "Rejected",
    },
    {
        value: "CANCELLED",
        label: "Cancelled",
    },
];

const MyProductBookings = () => {
    const {
        bookings,
        pagination,
        loading,
        error,
        getMyBookings,
        cancelBooking,
        actionLoading,
    } = useProductBooking();

    const [searchParams, setSearchParams] = useSearchParams();

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const status = searchParams.get("status") || "";

    const loadBookings = useCallback(() => {
        const params = {
            page,
            limit,
        };
        if (status) {
            params.status = status;
        }
        return getMyBookings(params);
    }, [getMyBookings, page, limit, status]);

    useEffect(() => {
        loadBookings();
    }, [loadBookings]);

    const handleFilterChange = (filterValue) => {
        setSearchParams({
            status: filterValue,
            page: 1,
            limit: limit,
        });
    };

    const handleCancel = async (booking) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this product purchase request?"
        );

        if (!confirmed) {
            return;
        }

        const result = await cancelBooking(booking.id);

        if (result.success) {
            await loadBookings();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center bg-blue-100 w-11 h-11 rounded-xl dark:bg-blue-900/30">
                                <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    My Product Purchases
                                </h1>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Track the products you have requested to purchase.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={loadBookings}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                    >
                        <RefreshCw
                            className={`w-4 h-4 ${loading ? "animate-spin" : ""
                                }`}
                        />
                        Refresh
                    </button>
                </div>

                <div className="flex gap-2 p-1 mt-6 mb-6 overflow-x-auto bg-white border border-gray-200 rounded-xl dark:border-slate-700 dark:bg-slate-800">
                    {filters.map((filter) => {
                        const active = status === filter.value;

                        return (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() => handleFilterChange(filter.value)}
                                className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition ${active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
                                    }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {error && (
                    <div className="p-4 mt-6 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </div>
                )}

                {loading && bookings.length === 0 ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 mt-8 text-center bg-white border border-gray-200 rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full dark:bg-slate-700">
                            <Package className="w-8 h-8 text-gray-400" />
                        </div>

                        <h2 className="mt-5 text-lg font-bold text-gray-900 dark:text-white">
                            No product purchase requests
                        </h2>

                        <p className="max-w-md mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {status
                                ? `You don't have any ${status.toLowerCase()} product purchase requests.`
                                : "Your product purchase requests will appear here once you request to buy something."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-5 mt-8 lg:grid-cols-2 md:grid-cols-2">
                            {bookings.map((booking) => (
                                <MyProductBookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onCancel={handleCancel}
                                    actionLoading={
                                        actionLoading &&
                                        booking.status !== "COMPLETED"
                                    }
                                />
                            ))}
                        </div>

                        {pagination && (
                            <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
                                Showing {bookings.length} of{" "}
                                {pagination.total} requests
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyProductBookings;