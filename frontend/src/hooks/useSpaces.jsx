import { useState } from 'react';
import { spaceApi } from '../api/space.api';

export const useSpaces = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getSpaces = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await spaceApi.getSpaces(filters);
            const data = response.data.data;
            const meta = response.data.meta;

            setSpaces(data);

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
                error.response?.data?.message || 'Failed to fetch spaces';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };

        } finally {
            setLoading(false);
        }
    };

    const getMySpaces = async (filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await spaceApi.getMySpaces(filters);

            const data = response.data.data;
            const meta = response.data.meta;

            setSpaces(data);

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
                error.response?.data?.message || 'Failed to fetch your spaces';

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };

        } finally {
            setLoading(false);
        }
    };

    const getSpaceById = async (spaceId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await spaceApi.getSpaceById(spaceId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch space';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createSpace = async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await spaceApi.createSpace(formData);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create space';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateSpace = async (spaceId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await spaceApi.updateSpace(spaceId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update space';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteSpace = async (spaceId) => {
        setLoading(true);
        setError(null);
        try {
            await spaceApi.deleteSpace(spaceId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete space';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        spaces,
        loading,
        error,
        pagination,
        getSpaces,
        getMySpaces,
        getSpaceById,
        createSpace,
        updateSpace,
        deleteSpace,
    };
};