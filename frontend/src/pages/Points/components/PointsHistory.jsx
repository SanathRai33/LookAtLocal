import React from "react";
import {
    Filter,
    Loader2,
    History,
} from "lucide-react";

import PointsHistoryCard from "./PointsHistoryCard";

const TRANSACTION_TYPES = [
    {
        value: "",
        label: "All",
    },
    {
        value: "EARNED",
        label: "Earned",
    },
    {
        value: "REDEEMED",
        label: "Redeemed",
    },
    {
        value: "ADJUSTED",
        label: "Adjusted",
    },
    {
        value: "EXPIRED",
        label: "Expired",
    },
];

const ACTION_TYPES = [
    {
        value: "",
        label: "All actions",
    },
    {
        value: "SERVICE_COMPLETED",
        label: "Service Completed",
    },
    {
        value: "RENTAL_COMPLETED",
        label: "Rental Completed",
    },
    {
        value: "PRODUCT_SOLD",
        label: "Product Sold",
    },
    {
        value: "JOB_COMPLETED",
        label: "Job Completed",
    },
    {
        value: "EMERGENCY_HELP",
        label: "Emergency Help",
    },
    {
        value: "COMMUNITY_CONTRIBUTION",
        label: "Community Contribution",
    },
    {
        value: "ADMIN_ADJUSTMENT",
        label: "Admin Adjustment",
    },
];

const PointsHistory = ({
    transactions,
    loading,
    transactionType,
    actionType,
    onTransactionTypeChange,
    onActionTypeChange,
}) => {
    return (
        <section className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <History className="w-5 h-5 text-gray-500 dark:text-gray-400" />

                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Points History
                        </h2>
                    </div>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Track how you earned and used your points.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative">
                        <Filter className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />

                        <select
                            value={transactionType}
                            onChange={(event) =>
                                onTransactionTypeChange(
                                    event.target.value
                                )
                            }
                            className="w-full py-2.5 pl-9 pr-8 text-sm font-medium text-gray-700 bg-white border border-gray-200 outline-none appearance-none rounded-xl focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 sm:w-auto"
                        >
                            {TRANSACTION_TYPES.map(
                                (item) => (
                                    <option
                                        key={
                                            item.value
                                        }
                                        value={
                                            item.value
                                        }
                                    >
                                        {item.label}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <select
                        value={actionType}
                        onChange={(event) =>
                            onActionTypeChange(
                                event.target.value
                            )
                        }
                        className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 outline-none rounded-xl focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 sm:w-auto"
                    >
                        {ACTION_TYPES.map(
                            (item) => (
                                <option
                                    key={item.value}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-7 h-7 text-blue-600 animate-spin" />
                </div>
            ) : transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-16 mt-5 text-center bg-white border border-gray-200 rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                    <History className="w-10 h-10 text-gray-400" />

                    <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                        No points history
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Your points transactions will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 mt-5">
                    {transactions.map(
                        (transaction) => (
                            <PointsHistoryCard
                                key={
                                    transaction.id
                                }
                                transaction={
                                    transaction
                                }
                            />
                        )
                    )}
                </div>
            )}
        </section>
    );
};

export default PointsHistory;