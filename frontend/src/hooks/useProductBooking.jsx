import { useCallback, useState } from "react";
import productBookingApi from "../api/product-booking.api";

const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

const useProductBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [pagination, setPagination] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const createBooking = async (data) => {
        setLoading(true);
        setError("");

        try {
            const response =
                await productBookingApi.createBooking(
                    data
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Product purchase request created successfully",
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setLoading(false);
        }
    };

    const getMyBookings = useCallback(
        async (params = {}) => {
            setLoading(true);
            setError("");

            try {
                const response =
                    await productBookingApi.getMyBookings(
                        params
                    );

                const data =
                    response.data?.data;

                setBookings(
                    data?.bookings || []
                );

                setPagination(
                    data?.pagination || null
                );

                return {
                    success: true,
                    data,
                };
            } catch (error) {
                const message =
                    getErrorMessage(error);

                setError(message);

                return {
                    success: false,
                    error: message,
                };
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const getReceivedBookings =
        useCallback(
            async (params = {}) => {
                setLoading(true);
                setError("");

                try {
                    const response =
                        await productBookingApi.getReceivedBookings(
                            params
                        );

                    const data =
                        response.data?.data;

                    setBookings(
                        data?.bookings || []
                    );

                    setPagination(
                        data?.pagination || null
                    );

                    return {
                        success: true,
                        data,
                    };
                } catch (error) {
                    const message =
                        getErrorMessage(error);

                    setError(message);

                    return {
                        success: false,
                        error: message,
                    };
                } finally {
                    setLoading(false);
                }
            },
            []
        );

    const getBookingById = async (
        transactionId
    ) => {
        try {
            const response =
                await productBookingApi.getBookingById(
                    transactionId
                );

            return {
                success: true,
                data: response.data?.data,
            };
        } catch (error) {
            return {
                success: false,
                error:
                    getErrorMessage(error),
            };
        }
    };

    const acceptBooking = async (
        transactionId,
        data = {}
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await productBookingApi.acceptBooking(
                    transactionId,
                    data
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Product booking accepted successfully",
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setActionLoading(false);
        }
    };

    const rejectBooking = async (
        transactionId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await productBookingApi.rejectBooking(
                    transactionId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Product booking rejected successfully",
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setActionLoading(false);
        }
    };

    const cancelBooking = async (
        transactionId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await productBookingApi.cancelBooking(
                    transactionId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Product booking cancelled successfully",
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setActionLoading(false);
        }
    };

    const completeBooking = async (
        transactionId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await productBookingApi.completeBooking(
                    transactionId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Product booking completed successfully",
            };
        } catch (error) {
            const message =
                getErrorMessage(error);

            setError(message);

            return {
                success: false,
                error: message,
            };
        } finally {
            setActionLoading(false);
        }
    };

    return {
        bookings,
        pagination,
        loading,
        actionLoading,
        error,

        createBooking,
        getMyBookings,
        getReceivedBookings,
        getBookingById,

        acceptBooking,
        rejectBooking,
        cancelBooking,
        completeBooking,
    };
};

export default useProductBooking;