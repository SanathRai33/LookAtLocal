import React from "react";
import {
    ArrowDownLeft,
    ArrowUpRight,
    Award,
    CalendarDays,
} from "lucide-react";

const ACTION_LABELS = {
    SERVICE_COMPLETED:
        "Service Completed",

    RENTAL_COMPLETED:
        "Rental Completed",

    PRODUCT_SOLD:
        "Product Sold",

    JOB_COMPLETED:
        "Job Completed",

    EMERGENCY_HELP:
        "Emergency Help",

    COMMUNITY_CONTRIBUTION:
        "Community Contribution",

    ADMIN_ADJUSTMENT:
        "Admin Adjustment",
};

const TYPE_LABELS = {
    EARNED: "Earned",
    REDEEMED: "Redeemed",
    ADJUSTED: "Adjusted",
    EXPIRED: "Expired",
};

const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};

const formatDateTime = (date) => {
    if (!date) return "-";

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

const PointsHistoryCard = ({
    transaction,
}) => {
    const isPositive =
        transaction.transactionType ===
        "EARNED";

    return (
        <article className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start min-w-0 gap-3">
                    <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${isPositive
                                ? "bg-emerald-100 dark:bg-emerald-900/30"
                                : "bg-gray-100 dark:bg-slate-700"
                            }`}
                    >
                        {isPositive ? (
                            <ArrowUpRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                            <ArrowDownLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        )}
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                            {ACTION_LABELS[
                                transaction
                                    .actionType
                            ] ||
                                transaction.actionType}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {TYPE_LABELS[
                                transaction
                                    .transactionType
                            ] ||
                                transaction.transactionType}
                        </p>
                    </div>
                </div>

                <p
                    className={`flex-shrink-0 text-lg font-bold ${isPositive
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                >
                    {isPositive ? "+" : ""}
                    {transaction.points}
                </p>
            </div>

            {transaction.description && (
                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {transaction.description}
                </p>
            )}

            <div className="flex flex-wrap items-center gap-4 pt-4 mt-4 text-xs text-gray-500 border-t border-gray-200 dark:border-slate-700 dark:text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4" />
                    {formatDate(
                        transaction.createdAt
                    )}
                </span>

                {transaction.referenceType && (
                    <span className="inline-flex items-center gap-1.5">
                        <Award className="w-4 h-4" />
                        {transaction.referenceType}
                    </span>
                )}
            </div>
        </article>
    );
};

export default PointsHistoryCard;