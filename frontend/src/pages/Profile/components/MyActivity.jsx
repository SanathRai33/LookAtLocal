import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarCheck,
    Home,
    Package2,
    ShoppingCart,
} from "lucide-react";

const activities = [
    {
        id: "service-bookings",
        label: "Service Bookings",
        description: "Services you requested",
        icon: CalendarCheck,
        iconClass: "text-blue-600",
        iconBg: "bg-blue-50 dark:bg-blue-950/40",
        to: "/service-bookings",
    },
    {
        id: "rentals",
        label: "Rentals",
        description: "Items you rented",
        icon: Package2,
        iconClass: "text-emerald-600",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
        to: "/rental-bookings",
    },
    {
        id: "purchases",
        label: "Purchases",
        description: "Products you bought",
        icon: ShoppingCart,
        iconClass: "text-indigo-600",
        iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
        to: "/product-bookings",
    },
    {
        id: "applications",
        label: "Applications",
        description: "Jobs you applied for",
        icon: BriefcaseBusiness,
        iconClass: "text-orange-600",
        iconBg: "bg-orange-50 dark:bg-orange-950/40",
        to: "/job-applications",
    },
];

const MyActivity = () => {
    return (
        <section>
            <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                    <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                        My Activity
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Track the services, rentals, purchases, and applications you make.
                    </p>
                </div>

                <span className="hidden text-sm text-gray-400 sm:block">
                    Your activity
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {activities.map((activity) => {
                    const Icon = activity.icon;

                    const content = (
                        <>
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activity.iconBg}`}
                            >
                                <Icon className={`h-5 w-5 ${activity.iconClass}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {activity.label}
                                    </h3>

                                    {!activity.disabled && (
                                        <ArrowRight className="w-4 h-4 text-gray-400 transition-transform shrink-0 group-hover:translate-x-1 group-hover:text-blue-500" />
                                    )}
                                </div>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {activity.description}
                                </p>

                                {activity.disabled && (
                                    <span className="mt-2 inline-flex rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 dark:bg-slate-700 dark:text-gray-400">
                                        Coming soon
                                    </span>
                                )}
                            </div>
                        </>
                    );

                    if (activity.disabled) {
                        return (
                            <div
                                key={activity.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 cursor-not-allowed rounded-2xl bg-gray-50 opacity-70 dark:border-slate-700 dark:bg-slate-900"
                            >
                                {content}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={activity.id}
                            to={activity.to}
                            className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-900"
                        >
                            {content}
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default MyActivity;