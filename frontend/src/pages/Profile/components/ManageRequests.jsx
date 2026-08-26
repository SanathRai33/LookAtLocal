import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowRight,
    BriefcaseBusiness,
    CalendarClock,
    MessageSquareText,
    Package2,
} from "lucide-react";

const requests = [
    {
        id: "service-requests",
        label: "Service Requests",
        description: "Booking requests from customers",
        icon: CalendarClock,
        iconClass: "text-blue-600",
        iconBg: "bg-blue-50 dark:bg-blue-950/40",
        to: "/service-bookings/received",
    },
    {
        id: "rental-requests",
        label: "Rental Requests",
        description: "Rental requests from customers",
        icon: Package2,
        iconClass: "text-emerald-600",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/40",
        to: "/rental-bookings/received",
    },
    {
        id: "product-enquiries",
        label: "Product Enquiries",
        description: "Messages from interested buyers",
        icon: MessageSquareText,
        iconClass: "text-indigo-600",
        iconBg: "bg-indigo-50 dark:bg-indigo-950/40",
        disabled: true,
    },
    {
        id: "job-applications",
        label: "Job Applications",
        description: "Applications received for your jobs",
        icon: BriefcaseBusiness,
        iconClass: "text-orange-600",
        iconBg: "bg-orange-50 dark:bg-orange-950/40",
        disabled: true,
    },
];

const ManageRequests = () => {
    return (
        <section>
            <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                    <h2 className="text-lg font-bold text-gray-950 dark:text-white">
                        Manage Requests
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Manage requests and enquiries from other users.
                    </p>
                </div>

                <span className="hidden text-sm text-gray-400 sm:block">
                    Provider activity
                </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {requests.map((request) => {
                    const Icon = request.icon;

                    const content = (
                        <>
                            <div
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${request.iconBg}`}
                            >
                                <Icon className={`h-5 w-5 ${request.iconClass}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {request.label}
                                    </h3>

                                    {!request.disabled && (
                                        <ArrowRight className="w-4 h-4 text-gray-400 transition-transform shrink-0 group-hover:translate-x-1 group-hover:text-blue-500" />
                                    )}
                                </div>

                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {request.description}
                                </p>

                                {request.disabled && (
                                    <span className="mt-2 inline-flex rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 dark:bg-slate-700 dark:text-gray-400">
                                        Coming soon
                                    </span>
                                )}
                            </div>
                        </>
                    );

                    if (request.disabled) {
                        return (
                            <div
                                key={request.id}
                                className="flex items-center gap-4 p-4 border border-gray-200 cursor-not-allowed rounded-2xl bg-gray-50 opacity-70 dark:border-slate-700 dark:bg-slate-900"
                            >
                                {content}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={request.id}
                            to={request.to}
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

export default ManageRequests;