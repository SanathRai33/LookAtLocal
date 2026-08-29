import React, {
    useCallback,
    useEffect,
    useState,
} from "react";
import {
    Bell,
    CheckCheck,
    Loader2,
    RefreshCw,
    Trash2,
} from "lucide-react";
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";

import useNotifications from "../../hooks/useNotifications";
import NotificationItem from "./components/NotificationItem";

const Notifications = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const {
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
    } = useNotifications();

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const filter = searchParams.get("filter") || "all";

    const loadNotifications = useCallback(async () => {
        const params = {
            page,
            limit,
        };

        if (filter === "unread") {
            params.isRead = "false";
        } else if (filter === "read") {
            params.isRead = "true";
        }

        await getNotifications(params);
        await getUnreadCount();
    }, [filter, page, limit, getNotifications, getUnreadCount]);

    useEffect(() => {
        loadNotifications();
    }, [loadNotifications]);

    const handleFilterChange = (filterValue) => {
        setSearchParams({
            filter: filterValue,
            page: 1,
            limit: limit,
        });
    };

    const handleOpen = (notification) => {
        if (!notification.readAt) {
            markAsRead(notification.id);
        }

        const entityId =
            notification.entityId;

        switch (
        notification.entityType
        ) {
            case "SERVICE_BOOKING":
                navigate(
                    `/service-bookings/${entityId}`
                );
                break;

            case "RENTAL_BOOKING":
                navigate(
                    `/rental-bookings/${entityId}`
                );
                break;

            case "PRODUCT":
            case "PRODUCT_TRANSACTION":
                navigate(
                    `/product-transactions/${entityId}`
                );
                break;

            case "JOB_APPLICATION":
                navigate(
                    `/job-applications/${entityId}`
                );
                break;

            default:
                break;
        }
    };

    const handleMarkAsRead = async (
        notificationId
    ) => {
        await markAsRead(notificationId);
        await getUnreadCount();
    };

    const handleMarkAllAsRead =
        async () => {
            await markAllAsRead();
        };

    const handleDelete = async (
        notificationId
    ) => {
        await deleteNotification(
            notificationId
        );
        await getUnreadCount();
    };

    const handleDeleteAll = async () => {
        const confirmed =
            window.confirm(
                "Delete all notifications?"
            );

        if (!confirmed) return;

        await deleteAllNotifications();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="w-full max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Notifications
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {unreadCount} unread notification
                                {unreadCount === 1
                                    ? ""
                                    : "s"}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={
                                loadNotifications
                            }
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300"
                        >
                            <RefreshCw
                                className={`w-4 h-4 ${loading
                                        ? "animate-spin"
                                        : ""
                                    }`}
                            />

                            Refresh
                        </button>

                        {unreadCount >
                            0 && (
                                <button
                                    type="button"
                                    onClick={
                                        handleMarkAllAsRead
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-900/20 dark:text-blue-400"
                                >
                                    <CheckCheck className="w-4 h-4" />
                                    Mark all read
                                </button>
                            )}

                        {notifications.length >
                            0 && (
                                <button
                                    type="button"
                                    onClick={
                                        handleDeleteAll
                                    }
                                    disabled={
                                        actionLoading
                                    }
                                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/20 dark:text-red-400"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    Delete all
                                </button>
                            )}
                    </div>
                </div>

                <div className="flex gap-2 p-1 mt-6 overflow-x-auto bg-white border border-gray-200 rounded-xl dark:border-slate-700 dark:bg-slate-800">
                    {[
                        ["all", "All"],
                        ["unread", "Unread"],
                        ["read", "Read"],
                    ].map(
                        ([value, label]) => {
                            const active = filter === value;

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() =>
                                        handleFilterChange(
                                            value
                                        )
                                    }
                                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition ${active
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
                                        }`}
                                >
                                    {label}
                                </button>
                            );
                        }
                    )}
                </div>

                {error && (
                    <div className="p-4 mt-5 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : notifications.length ===
                    0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 mt-5 text-center bg-white border border-gray-200 rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                        <Bell className="w-10 h-10 text-gray-400" />

                        <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                            No notifications
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {filter === "unread"
                                ? "You have no unread notifications."
                                : filter === "read"
                                ? "You have no read notifications."
                                : "You're all caught up."}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4 mt-5">
                        {notifications.map(
                            (notification) => (
                                <NotificationItem
                                    key={
                                        notification.id
                                    }
                                    notification={
                                        notification
                                    }
                                    onRead={
                                        handleMarkAsRead
                                    }
                                    onDelete={
                                        handleDelete
                                    }
                                    onOpen={
                                        handleOpen
                                    }
                                    actionLoading={
                                        actionLoading
                                    }
                                />
                            )
                        )}
                    </div>
                )}

                {pagination?.totalPages >
                    1 && (
                        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
                            Showing{" "}
                            {
                                notifications.length
                            }{" "}
                            of{" "}
                            {pagination.total}{" "}
                            notifications
                        </p>
                    )}
            </div>
        </div>
    );
};

export default Notifications;