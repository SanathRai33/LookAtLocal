import React, {
    useCallback,
    useEffect,
    useState,
} from "react";
import {
    BriefcaseBusiness,
    Loader2,
    RefreshCw,
} from "lucide-react";
import useJobApplication from "../../hooks/useJobApplication";
import JobApplicationCard from "./components/JobApplicationCard";

const MyApplications = () => {
    const {
        applications,
        pagination,
        loading,
        error,
        getMyApplications,
        withdrawApplication,
        actionLoading,
    } = useJobApplication();

    const [actionApplicationId, setActionApplicationId] =
        useState(null);

    const loadApplications = useCallback(() => {
        return getMyApplications({
            page: 1,
            limit: 20,
        });
    }, [getMyApplications]);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const handleWithdraw = async (
        application
    ) => {
        const confirmed = window.confirm(
            "Are you sure you want to withdraw this application?"
        );

        if (!confirmed) {
            return;
        }

        setActionApplicationId(application.id);

        const result =
            await withdrawApplication(
                application.id
            );

        setActionApplicationId(null);

        if (result.success) {
            await loadApplications();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="w-full max-w-7xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                            <BriefcaseBusiness className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                My Applications
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Track the jobs you have applied for.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={loadApplications}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300"
                    >
                        <RefreshCw
                            className={`w-4 h-4 ${loading
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

                {loading &&
                    applications.length === 0 ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                ) : applications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-6 py-20 mt-8 text-center bg-white border border-gray-200 rounded-2xl dark:border-slate-700 dark:bg-slate-800">
                        <BriefcaseBusiness className="w-10 h-10 text-gray-400" />

                        <h2 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
                            No applications yet
                        </h2>

                        <p className="max-w-md mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Jobs you apply for will appear here.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid w-full grid-cols-1 gap-5 mt-8 md:grid-cols-2">
                            {applications.map(
                                (application) => (
                                    <JobApplicationCard
                                        key={
                                            application.id
                                        }
                                        application={
                                            application
                                        }
                                        onWithdraw={
                                            handleWithdraw
                                        }
                                        actionLoading={
                                            actionLoading &&
                                            actionApplicationId ===
                                            application.id
                                        }
                                    />
                                )
                            )}
                        </div>

                        {pagination && (
                            <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
                                Showing{" "}
                                {
                                    applications.length
                                }{" "}
                                of{" "}
                                {pagination.total}{" "}
                                applications
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyApplications;