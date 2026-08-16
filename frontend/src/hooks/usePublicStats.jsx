import { useEffect, useState } from 'react';
import { publicApi } from '../api/public.api';

export const usePublicStats = () => {
    const [stats, setStats] = useState(null);
    const [publicData, setPublicData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [latestLoading, setLatestLoading] = useState(true);
    const [error, setError] = useState(null);
    const [latestError, setLatestError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await publicApi.getStats();
                setStats(response.data.data);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    'Failed to fetch public statistics'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    useEffect(() => {
        const fetchLatestListings = async () => {
            try {
                const response = await publicApi.getPublicData();

                const data = response.data?.data;

                setPublicData(Array.isArray(data) ? data : []);
            } catch (error) {
                setLatestError(
                    error.response?.data?.message ||
                    'Failed to fetch latest listings'
                );
                setPublicData([]);
            } finally {
                setLatestLoading(false);
            }
        };

        fetchLatestListings();
    }, []);

    return {
        stats,
        publicData,
        loading,
        latestLoading,
        error,
        latestError,
    };
};