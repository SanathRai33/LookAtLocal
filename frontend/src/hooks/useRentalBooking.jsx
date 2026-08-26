import { useCallback, useState } from "react";
import rentalBookingApi from "../api/rental-booking.api";

const getErrorMessage = (error) => {
    return (
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong"
    );
};

const useRentalBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [pagination, setPagination] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [actionLoading, setActionLoading] =
        useState(false);

    const createBooking = async (data) => {
        setLoading(true);
        setError("");

        try {
            const response =
                await rentalBookingApi.createBooking(
                    data
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Rental booking created successfully",
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

    const getAvailability = async (
        rentalId,
        params
    ) => {
        try {
            const response =
                await rentalBookingApi.getAvailability(
                    rentalId,
                    params
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

    const getMyBookings = useCallback(
        async (params = {}) => {
            setLoading(true);
            setError("");

            try {
                const response =
                    await rentalBookingApi.getMyBookings(
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
                        await rentalBookingApi.getReceivedBookings(
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
        bookingId
    ) => {
        try {
            const response =
                await rentalBookingApi.getBookingById(
                    bookingId
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
        bookingId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await rentalBookingApi.acceptBooking(
                    bookingId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Rental booking accepted successfully",
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
        bookingId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await rentalBookingApi.rejectBooking(
                    bookingId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Rental booking rejected successfully",
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
        bookingId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await rentalBookingApi.cancelBooking(
                    bookingId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Rental booking cancelled successfully",
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

    const startBooking = async (
        bookingId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await rentalBookingApi.startBooking(
                    bookingId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Rental booking started successfully",
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
        bookingId
    ) => {
        setActionLoading(true);
        setError("");

        try {
            const response =
                await rentalBookingApi.completeBooking(
                    bookingId
                );

            return {
                success: true,
                data: response.data?.data,
                message:
                    response.data?.message ||
                    "Rental booking completed successfully",
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
        error,
        actionLoading,
        createBooking,
        getAvailability,
        getMyBookings,
        getReceivedBookings,
        getBookingById,
        acceptBooking,
        rejectBooking,
        cancelBooking,
        startBooking,
        completeBooking,
    };
};

export default useRentalBooking;