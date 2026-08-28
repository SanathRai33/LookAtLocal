import React from "react";
import {
    Award,
    TrendingUp,
} from "lucide-react";

const PointsSummary = ({
    balance = 0,
    totalEarned = 0,
}) => {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Current Balance
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                            {balance.toLocaleString(
                                "en-IN"
                            )}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Available points
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                        <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Total Earned
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                            {totalEarned.toLocaleString(
                                "en-IN"
                            )}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Lifetime earned points
                        </p>
                    </div>

                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                        <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointsSummary;