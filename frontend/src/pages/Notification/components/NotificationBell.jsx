import React, {
    useEffect,
} from "react";
import {
    Bell,
    Loader2,
} from "lucide-react";
import {
    Link,
} from "react-router-dom";

import useNotifications from "../../hooks/useNotifications";

const NotificationBell = () => {
    const {
        unreadCount,
        getUnreadCount,
    } = useNotifications();

    useEffect(() => {
        getUnreadCount();

        const interval = setInterval(
            getUnreadCount,
            60000
        );

        return () =>
            clearInterval(interval);
    }, [getUnreadCount]);

    return (
        <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative flex items-center justify-center w-10 h-10 text-gray-600 transition rounded-xl hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
        >
            <Bell className="w-5 h-5" />

            {unreadCount > 0 && (
                <span className="absolute flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-red-500 border-2 border-white rounded-full -top-0.5 -right-0.5 dark:border-slate-900">
                    {unreadCount > 99
                        ? "99+"
                        : unreadCount}
                </span>
            )}
        </Link>
    );
};

export default NotificationBell;