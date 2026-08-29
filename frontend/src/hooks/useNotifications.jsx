import {
    useCallback,
    useState,
} from "react";

import notificationApi from "../api/notification.api";

const getErrorMessage = (error) =>
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong";

const useNotifications = () => {
    const [notifications, setNotifications] =
        useState([]);

    const [unreadCount, setUnreadCount] =
        useState(0);

    const [pagination, setPagination] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [actionLoading, setActionLoading] =
        useState(false);

    const [error, setError] = useState("");

    const getNotifications = useCallback(
        async (params = {}) => {
            setLoading(true);
            setError("");

            try {
                const response =
                    await notificationApi.getNotifications(
                        params
                    );

                const data =
                    response.data?.data;

                setNotifications(
                    data?.notifications || []
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

    const getUnreadCount = useCallback(
        async () => {
            try {
                const response =
                    await notificationApi.getUnreadCount();

                const count =
                    response.data?.data
                        ?.unreadCount || 0;

                setUnreadCount(count);

                return {
                    success: true,
                    unreadCount: count,
                };
            } catch (error) {
                return {
                    success: false,
                    error:
                        getErrorMessage(error),
                };
            }
        },
        []
    );

    const markAsRead = useCallback(
        async (notificationId) => {
            setActionLoading(true);

            try {
                const response =
                    await notificationApi.markAsRead(
                        notificationId
                    );

                setNotifications((current) =>
                    current.map(
                        (notification) =>
                            notification.id ===
                                notificationId
                                ? {
                                    ...notification,
                                    readAt:
                                        response
                                            .data
                                            ?.data
                                            ?.readAt ||
                                        new Date().toISOString(),
                                }
                                : notification
                    )
                );

                setUnreadCount((count) =>
                    Math.max(0, count - 1)
                );

                return {
                    success: true,
                    data:
                        response.data?.data,
                };
            } catch (error) {
                return {
                    success: false,
                    error:
                        getErrorMessage(error),
                };
            } finally {
                setActionLoading(false);
            }
        },
        []
    );

    const markAllAsRead =
        useCallback(async () => {
            setActionLoading(true);

            try {
                await notificationApi.markAllAsRead();

                setNotifications((current) =>
                    current.map(
                        (notification) => ({
                            ...notification,
                            readAt:
                                notification.readAt ||
                                new Date().toISOString(),
                        })
                    )
                );

                setUnreadCount(0);

                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                    error:
                        getErrorMessage(error),
                };
            } finally {
                setActionLoading(false);
            }
        }, []);

    const deleteNotification =
        useCallback(async (notificationId) => {
            setActionLoading(true);

            try {
                await notificationApi.deleteNotification(
                    notificationId
                );

                setNotifications((current) =>
                    current.filter(
                        (notification) =>
                            notification.id !==
                            notificationId
                    )
                );

                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                    error:
                        getErrorMessage(error),
                };
            } finally {
                setActionLoading(false);
            }
        }, []);

    const deleteAllNotifications =
        useCallback(async () => {
            setActionLoading(true);

            try {
                await notificationApi.deleteAllNotifications();

                setNotifications([]);
                setUnreadCount(0);

                return {
                    success: true,
                };
            } catch (error) {
                return {
                    success: false,
                    error:
                        getErrorMessage(error),
                };
            } finally {
                setActionLoading(false);
            }
        }, []);

    return {
        notifications,
        unreadCount,
        pagination,
        loading,
        actionLoading,
        error,
        getNotifications,
        getUnreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        deleteAllNotifications,
    };
};

export default useNotifications;