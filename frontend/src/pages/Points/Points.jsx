import React, { useCallback, useEffect, useState } from "react";
import { Award, Loader2, RefreshCw, Sparkles } from "lucide-react";

import usePoints from "../../hooks/usePoints";
import PointsSummary from "./components/PointsSummary";
import PointsHistory from "./components/PointsHistory";

const Points = () => {
    const {
        summary,
        transactions,
        loading,
        historyLoading,
        error,
        getSummary,
        getHistory,
    } = usePoints();

    const [transactionType, setTransactionType] =
        useState("");

    const [actionType, setActionType] =
        useState("");

    const loadData = useCallback(async () => {
        await Promise.all([
            getSummary(),
            getHistory({
                page: 1,
                limit: 20,
                ...(transactionType && {
                    transactionType,
                }),
                ...(actionType && {
                    actionType,
                }),
            }),
        ]);
    }, [
        getSummary,
        getHistory,
        transactionType,
        actionType,
    ]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleTransactionTypeChange = (
        value
    ) => {
        setTransactionType(value);
    };

    const handleActionTypeChange = (value) => {
        setActionType(value);
    };

    if (
        loading &&
        !summary.balance &&
        !summary.totalEarned
    ) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="w-full max-w-7xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 bg-amber-100 rounded-xl dark:bg-amber-900/30">
                            <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                My Points
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Track your points and contribution history.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={loadData}
                        disabled={
                            loading ||
                            historyLoading
                        }
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                    >
                        <RefreshCw
                            className={`w-4 h-4 ${loading ||
                                historyLoading
                                ? "animate-spin"
                                : ""
                                }`}
                        />

                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="p-4 mt-6 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </div>
                )}

                <div className="mt-8">
                    <PointsSummary
                        balance={summary.balance}
                        totalEarned={
                            summary.totalEarned
                        }
                    />
                </div>

                <div className="flex items-start gap-3 p-5 mt-6 border border-amber-100 rounded-2xl bg-amber-50 dark:border-amber-900/30 dark:bg-amber-900/10">
                    <Sparkles className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-400" />

                    <div>
                        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                            Earn points by contributing locally
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-400">
                            Complete services, rentals, product
                            transactions, jobs, emergency help and
                            community contributions to earn points.
                        </p>
                    </div>
                </div>

                <PointsHistory
                    transactions={transactions}
                    loading={historyLoading}
                    transactionType={
                        transactionType
                    }
                    actionType={actionType}
                    onTransactionTypeChange={
                        handleTransactionTypeChange
                    }
                    onActionTypeChange={
                        handleActionTypeChange
                    }
                />
            </div>
        </div>
    );
};

export default Points;