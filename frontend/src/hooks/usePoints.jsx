import { useCallback, useState } from "react";
import pointsApi from "../api/points.api";

const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

const usePoints = () => {
    const [summary, setSummary] = useState({
        balance: 0,
        totalEarned: 0,
    });

    const [transactions, setTransactions] =
        useState([]);

    const [pagination, setPagination] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [historyLoading, setHistoryLoading] =
        useState(false);

    const [error, setError] = useState("");

    const getSummary = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const response =
                await pointsApi.getSummary();

            const data = response.data?.data;

            setSummary({
                balance: data?.balance || 0,
                totalEarned:
                    data?.totalEarned || 0,
            });

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
    }, []);

    const getHistory = useCallback(
        async (params = {}) => {
            setHistoryLoading(true);
            setError("");

            try {
                const response =
                    await pointsApi.getHistory(
                        params
                    );

                const data =
                    response.data?.data;

                setTransactions(
                    data?.transactions || []
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
                setHistoryLoading(false);
            }
        },
        []
    );

    return {
        summary,
        transactions,
        pagination,
        loading,
        historyLoading,
        error,
        getSummary,
        getHistory,
    };
};

export default usePoints;