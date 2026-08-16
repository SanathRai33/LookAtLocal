import { useState } from 'react';
import { spaceUnitApi } from '../api/spaceUnit.api';

export const useSpaceUnits = () => {
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });

    const getSpaceUnits = async (spaceId, filters = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await spaceUnitApi.getSpaceUnits(spaceId, filters);

            console.log("🔵 SPACE UNITS API RESPONSE:", response.data);

            const data = response.data.data;
            const meta = response.data.meta;

            console.log("🟢 UNITS:", data);
            console.log("🟢 META:", meta);

            setUnits(data);

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
                error.response?.data?.message || "Failed to fetch units";

            console.error("🔴 GET UNITS ERROR:", error);

            setError(errorMessage);

            return {
                success: false,
                error: errorMessage,
            };

        } finally {
            setLoading(false);
        }
    };

    const getSpaceUnitById = async (spaceId, unitId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await spaceUnitApi.getSpaceUnitById(spaceId, unitId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch unit';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const createSpaceUnit = async (spaceId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await spaceUnitApi.createSpaceUnit(spaceId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create unit';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateSpaceUnit = async (spaceId, unitId, data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await spaceUnitApi.updateSpaceUnit(spaceId, unitId, data);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update unit';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteSpaceUnit = async (spaceId, unitId) => {
        setLoading(true);
        setError(null);
        try {
            await spaceUnitApi.deleteSpaceUnit(spaceId, unitId);
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete unit';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        units,
        loading,
        error,
        pagination,
        getSpaceUnits,
        getSpaceUnitById,
        createSpaceUnit,
        updateSpaceUnit,
        deleteSpaceUnit,
    };
};