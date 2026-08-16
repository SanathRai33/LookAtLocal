import { useState } from 'react';
import { rentalApi } from '../api/rental.api';

export const useRentals = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getRentals = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await rentalApi.getRentals(filters);
            const { rentals: data, pagination: meta } = response.data.data;
            setRentals(data);
            if (meta) {
                setPagination(meta);
            }
            return { success: true, data, meta };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch rentals';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const getMyRentals = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await rentalApi.getMyRentals(filters);
            const { rentals: data, pagination: meta } = response.data.data;
            setRentals(data);
            if (meta) {
                setPagination(meta);
            }
            return { success: true, data, meta };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch your rentals';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const getRentalById = async (rentalId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await rentalApi.getRentalById(rentalId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch rental';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createRental = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await rentalApi.createRental(formData);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create rental';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateRental = async (rentalId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await rentalApi.updateRental(rentalId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update rental';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteRental = async (rentalId) => {
        setLoading(true);
        setError(null);
        try {
            await rentalApi.deleteRental(rentalId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete rental';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        rentals,
        loading,
        error,
        pagination,
        getRentals,
        getMyRentals,
        getRentalById,
        createRental,
        updateRental,
        deleteRental,
    };
};