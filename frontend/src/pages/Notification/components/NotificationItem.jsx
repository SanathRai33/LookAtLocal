import React from "react";
import {
    Bell,
    Check,
    ExternalLink,
    Trash2,
} from "lucide-react";

const TYPE_LABELS = {
    SERVICE_BOOKING:
        "Service Booking",
    RENTAL_BOOKING:
        "Rental Booking",
    PRODUCT:
        "Product",
    JOB_APPLICATION:
        "Job Application",
    EMERGENCY:
        "Emergency",
    COMMUNITY:
        "Community",
    SYSTEM:
        "System",
};

const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};

const NotificationItem = ({
    notification,
    onRead,
    onDelete,
    onOpen,
    actionLoading,
}) => {
    const isUnread = !notification.readAt;

    return (
        <article
            className={`relative p-5 transition border rounded-2xl ${isUnread
                    ? "border-blue-200 bg-blue-50/60 dark:border-blue-900/50 dark:bg-blue-900/10"
                    : "border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                }`}
        >
            {isUnread && (
                <span className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full top-5 right-5" />
            )}

            <div className="flex gap-4">
                <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${isUnread
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-gray-100 dark:bg-slate-700"
                        }`}
                >
                    <Bell
                        className={`w-5 h-5 ${isUnread
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                    />
                </div>

                <div className="min-w-0 flex-1 pr-5">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                        </h3>

                        {notification.type && (
                            <span className="px-2 py-0.5 text-[11px] font-medium text-gray-600 bg-gray-100 rounded-full dark:bg-slate-700 dark:text-gray-300">
                                {TYPE_LABELS[
                                    notification.type
                                ] ||
                                    notification.type}
                            </span>
                        )}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {notification.message}
                    </p>

                    <p className="mt-3 text-xs text-gray-400">
                        {formatDate(
                            notification.createdAt
                        )}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {notification.entityId &&
                            onOpen && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        onOpen(
                                            notification
                                        )
                                    }
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 transition bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    View
                                </button>
                            )}

                        {isUnread && (
                            <button
                                type="button"
                                onClick={() =>
                                    onRead(
                                        notification.id
                                    )
                                }
                                disabled={
                                    actionLoading
                                }
                                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                            >
                                <Check className="w-3.5 h-3.5" />
                                Mark as read
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() =>
                                onDelete(
                                    notification.id
                                )
                            }
                            disabled={
                                actionLoading
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 transition bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default NotificationItem;