import { useState } from "react";
import { serviceBookingApi } from "../api/service-booking.api";

export const useServiceBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [booking, setBooking] = useState(null);
    const [availability, setAvailability] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createBooking = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const response = await serviceBookingApi.createBooking(data);

            const bookingData = response.data.data;

            setBooking(bookingData);

            return {
                success: true,
                data: bookingData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to create booking";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    const getAvailability = async (serviceId, params) => {
        setLoading(true);
        setError(null);

        try {
            const response = await serviceBookingApi.getAvailability(
                serviceId,
                params
            );

            const availabilityData = response.data.data;

            setAvailability(availabilityData);

            return {
                success: true,
                data: availabilityData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to check service availability";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    const getMyBookings = async (params = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await serviceBookingApi.getMyBookings(params);

            const { bookings, pagination } = response.data.data;

            setBookings(bookings);

            return {
                success: true,
                data: bookings,
                pagination,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to fetch your bookings";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    const getReceivedBookings = async (params = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await serviceBookingApi.getReceivedBookings(params);

            const { bookings, pagination } = response.data.data;

            setBookings(bookings);

            return {
                success: true,
                data: bookings,
                pagination,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to fetch received bookings";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getBookingById = async (bookingId) => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await serviceBookingApi.getBookingById(bookingId);

            const bookingData = response.data.data;

            setBooking(bookingData);

            return {
                success: true,
                data: bookingData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to fetch booking";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const acceptBooking = async (bookingId, data = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await serviceBookingApi.acceptBooking(
                    bookingId,
                    data
                );

            const bookingData = response.data.data;

            setBooking(bookingData);

            return {
                success: true,
                data: bookingData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to accept booking";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    const rejectBooking = async (bookingId) => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await serviceBookingApi.rejectBooking(bookingId);

            const bookingData = response.data.data;

            setBooking(bookingData);

            return {
                success: true,
                data: bookingData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to reject booking";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (bookingId) => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await serviceBookingApi.cancelBooking(bookingId);

            const bookingData = response.data.data;

            setBooking(bookingData);

            return {
                success: true,
                data: bookingData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to cancel booking";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    const completeBooking = async (bookingId) => {
        setLoading(true);
        setError(null);

        try {
            const response =
                await serviceBookingApi.completeBooking(bookingId);

            const bookingData = response.data.data;

            setBooking(bookingData);

            return {
                success: true,
                data: bookingData,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Failed to complete booking";

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
                status: error.response?.status,
            };
        } finally {
            setLoading(false);
        }
    };

    return {
        bookings,
        booking,
        availability,
        loading,
        error,

        createBooking,
        getAvailability,
        getMyBookings,
        getReceivedBookings,
        getBookingById,
        acceptBooking,
        rejectBooking,
        cancelBooking,
        completeBooking,
    };
};