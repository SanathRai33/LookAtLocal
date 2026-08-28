import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    BriefcaseBusiness,
    CheckCircle2,
    Clock3,
    Loader2,
    RefreshCw,
    UserCheck,
    Users,
    XCircle,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

import useJobApplication from "../../hooks/useJobApplication";
import ReceivedApplicationCard from "./components/ReceivedApplicationCard";

const ReceivedApplications = () => {
    const {
        applications,
        pagination,
        loading,
        error,
        getReceivedApplications,
        reviewApplication,
        shortlistApplication,
        acceptApplication,
        rejectApplication,
        actionLoading,
    } = useJobApplication();

    const [searchParams, setSearchParams] =
        useSearchParams();

    const [actionApplicationId, setActionApplicationId] =
        useState(null);
    const [actionError, setActionError] =
        useState("");

    const status =
        searchParams.get("status") || "";

    const page =
        parseInt(searchParams.get("page")) || 1;

    const limit =
        parseInt(searchParams.get("limit")) || 20;

    const loadApplications = useCallback(() => {
        const params = {
            page,
            limit,
        };

        if (status) {
            params.status = status;
        }

        return getReceivedApplications(params);
    }, [
        getReceivedApplications,
        page,
        limit,
        status,
    ]);

    useEffect(() => {
        loadApplications();
    }, [loadApplications]);

    const handleTabChange = (tabValue) => {
        setSearchParams({
            status: tabValue,
            page: 1,
            limit,
        });
    };

    const handleAction = async (
        application,
        action
    ) => {
        setActionApplicationId(application.id);
        setActionError("");

        const result = await action(
            application.id
        );

        setActionApplicationId(null);

        if (!result.success) {
            setActionError(result.error);
            return;
        }

        await loadApplications();
    };

    const tabs = useMemo(
        () => [
            {
                value: "",
                label: "All",
                icon: Users,
            },
            {
                value: "APPLIED",
                label: "Applied",
                icon: Clock3,
            },
            {
                value: "REVIEWING",
                label: "Reviewing",
                icon: BriefcaseBusiness,
            },
            {
                value: "SHORTLISTED",
                label: "Shortlisted",
                icon: UserCheck,
            },
            {
                value: "ACCEPTED",
                label: "Accepted",
                icon: CheckCircle2,
            },
            {
                value: "REJECTED",
                label: "Rejected",
                icon: XCircle,
            },
            {
                value: "WITHDRAWN",
                label: "Withdrawn",
                icon: XCircle,
            },
        ],
        []
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="w-full px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <BriefcaseBusiness className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Received Applications
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage applications received for your jobs.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={loadApplications}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 transition bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
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

                <div className="flex gap-2 p-1 mt-6 overflow-x-auto bg-white border border-gray-200 rounded-xl dark:border-slate-700 dark:bg-slate-800">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;

                        const active =
                            status === tab.value;

                        return (
                            <button
                                key={tab.value}
                                type="button"
                                onClick={() =>
                                    handleTabChange(
                                        tab.value
                                    )
                                }
                                className={`inline-flex flex-shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${active
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-700"
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {error && (
                    <div className="p-4 mt-6 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        {error}
                    </div>
                )}

                {actionError && (
                    <div className="p-4 mt-4 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                        {actionError}
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
                            No applications found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            {status
                                ? `There are no ${status.toLowerCase()} applications at the moment.`
                                : "Applications received for your jobs will appear here."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid w-full grid-cols-1 gap-5 mt-8 md:grid-cols-2">
                            {applications.map(
                                (application) => (
                                    <ReceivedApplicationCard
                                        key={
                                            application.id
                                        }
                                        application={
                                            application
                                        }
                                        onReview={(item) =>
                                            handleAction(
                                                item,
                                                reviewApplication
                                            )
                                        }
                                        onShortlist={(
                                            item
                                        ) =>
                                            handleAction(
                                                item,
                                                shortlistApplication
                                            )
                                        }
                                        onAccept={(item) =>
                                            handleAction(
                                                item,
                                                acceptApplication
                                            )
                                        }
                                        onReject={(item) =>
                                            handleAction(
                                                item,
                                                rejectApplication
                                            )
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
                                {applications.length}{" "}
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

export default ReceivedApplications;