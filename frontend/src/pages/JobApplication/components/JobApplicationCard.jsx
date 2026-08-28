import React from "react";
import {
    BriefcaseBusiness,
    CheckCircle2,
    Clock3,
    FileText,
    Loader2,
    MapPin,
    XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
    APPLIED: {
        label: "Applied",
        className:
            "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
        icon: Clock3,
    },

    REVIEWING: {
        label: "Under Review",
        className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: Clock3,
    },

    SHORTLISTED: {
        label: "Shortlisted",
        className:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: CheckCircle2,
    },

    ACCEPTED: {
        label: "Accepted",
        className:
            "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
        icon: CheckCircle2,
    },

    REJECTED: {
        label: "Rejected",
        className:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        icon: XCircle,
    },

    WITHDRAWN: {
        label: "Withdrawn",
        className:
            "bg-gray-100 text-gray-700 dark:bg-slate-700 dark:text-gray-300",
        icon: XCircle,
    },
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

const JobApplicationCard = ({
    application,
    onWithdraw,
    actionLoading = false,
}) => {
    const config =
        STATUS_CONFIG[application.status] ||
        STATUS_CONFIG.APPLIED;

    const StatusIcon = config.icon;
    const job = application.job || {};

    const canWithdraw = [
        "APPLIED",
        "REVIEWING",
        "SHORTLISTED",
    ].includes(application.status);

    return (
        <article className="flex flex-col h-full p-5 bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800 sm:p-6">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start min-w-0 gap-3">
                    <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                        <BriefcaseBusiness className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="font-bold text-gray-900 dark:text-white">
                            {job.title || "Job"}
                        </h2>

                        {job.companyName && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {job.companyName}
                            </p>
                        )}
                    </div>
                </div>

                <span
                    className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
                >
                    <StatusIcon className="w-4 h-4" />
                    {config.label}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Job Type
                    </p>

                    <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                        {job.jobType || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Vacancies
                    </p>

                    <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                        {job.vacancies ?? "-"}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Applied On
                    </p>

                    <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                        {formatDate(
                            application.createdAt
                        )}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Deadline
                    </p>

                    <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                        {formatDate(
                            job.applicationDeadline
                        )}
                    </p>
                </div>
            </div>

            {job.city && (
                <div className="flex items-center gap-2 mt-5 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {job.city}
                </div>
            )}

            {application.resumeUrl && (
                <a
                    href={application.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                    <FileText className="w-4 h-4" />
                    View Resume
                </a>
            )}

            <div className="flex-1" />

            {canWithdraw && (
                <div className="pt-5 mt-5 border-t border-gray-200 dark:border-slate-700">
                    <button
                        type="button"
                        onClick={() =>
                            onWithdraw(application)
                        }
                        disabled={actionLoading}
                        className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 transition border border-red-200 rounded-xl hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:hover:bg-red-900/20"
                    >
                        {actionLoading && (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        )}

                        Withdraw Application
                    </button>
                </div>
            )}
        </article>
    );
};

export default JobApplicationCard;