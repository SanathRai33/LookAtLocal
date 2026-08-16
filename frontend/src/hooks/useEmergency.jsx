import { useState } from 'react';
import { emergencyApi } from '../api/emergency.api';

export const useEmergency = () => {
    const [emergencies, setEmergencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getEmergencyRequests = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await emergencyApi.getEmergencyRequests(filters);

            const data = response.data.data;
            const meta = response.data.meta;

            setEmergencies(Array.isArray(data) ? data : []);

            if (meta) {
                setPagination(meta);
            }

            return {
                success: true,
                data,
                meta,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                'Failed to fetch emergency requests';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getMyEmergencyRequests = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await emergencyApi.getMyEmergencyRequests(filters);

            const data = response.data.data;
            const meta = response.data.meta;

            setEmergencies(Array.isArray(data) ? data : []);

            if (meta) {
                setPagination(meta);
            }

            return {
                success: true,
                data,
                meta,
            };
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                'Failed to fetch your emergency requests';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    };

    const getEmergencyRequestById = async (emergencyId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await emergencyApi.getEmergencyRequestById(emergencyId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch emergency request';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createEmergencyRequest = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await emergencyApi.createEmergencyRequest(data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create emergency request';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateEmergencyRequest = async (emergencyId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await emergencyApi.updateEmergencyRequest(emergencyId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update emergency request';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteEmergencyRequest = async (emergencyId) => {
        setLoading(true);
        setError(null);
        try {
            await emergencyApi.deleteEmergencyRequest(emergencyId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete emergency request';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const resolveEmergencyRequest = async (emergencyId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await emergencyApi.resolveEmergencyRequest(emergencyId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to resolve emergency request';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        emergencies,
        loading,
        error,
        pagination,
        getEmergencyRequests,
        getMyEmergencyRequests,
        getEmergencyRequestById,
        createEmergencyRequest,
        updateEmergencyRequest,
        deleteEmergencyRequest,
        resolveEmergencyRequest,
    };
};