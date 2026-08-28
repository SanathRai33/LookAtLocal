import React from "react";
import {
    BriefcaseBusiness,
    CheckCircle2,
    Clock3,
    FileText,
    Loader2,
    Mail,
    MapPin,
    Phone,
    UserCheck,
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
        label: "Reviewing",
        className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        icon: BriefcaseBusiness,
    },

    SHORTLISTED: {
        label: "Shortlisted",
        className:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
        icon: UserCheck,
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

const ReceivedApplicationCard = ({
    application,
    onReview,
    onShortlist,
    onAccept,
    onReject,
    actionLoading = false,
}) => {
    const config =
        STATUS_CONFIG[application.status] ||
        STATUS_CONFIG.APPLIED;

    const StatusIcon = config.icon;

    const applicant =
        application.applicant ||
        application.user ||
        {};

    const job =
        application.job || {};

    const canReview =
        application.status === "APPLIED";

    const canShortlist =
        application.status === "REVIEWING";

    const canAccept = [
        "REVIEWING",
        "SHORTLISTED",
    ].includes(application.status);

    const canReject = [
        "APPLIED",
        "REVIEWING",
        "SHORTLISTED",
    ].includes(application.status);

    return (
        <article className="flex flex-col h-full overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-700 dark:bg-slate-800">
            <div className="flex flex-col flex-1 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start min-w-0 gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <BriefcaseBusiness className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div className="min-w-0">
                            <h2 className="font-bold text-gray-900 truncate dark:text-white">
                                {job.title ||
                                    "Job Application"}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Job application
                            </p>
                        </div>
                    </div>

                    <span
                        className={`inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${config.className}`}
                    >
                        <StatusIcon className="w-4 h-4" />
                        {config.label}
                    </span>
                </div>

                <div className="p-4 mt-5 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Applicant
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                        <img
                            src={
                                applicant.profileImageUrl ||
                                "/default-avatar.png"
                            }
                            alt={
                                applicant.fullName ||
                                "Applicant"
                            }
                            className="object-cover w-10 h-10 rounded-full"
                        />

                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-white">
                                {applicant.fullName ||
                                    "Applicant"}
                            </p>

                            {applicant.email && (
                                <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                    {applicant.email}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                    <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Applied
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

                    {job.jobType && (
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Job Type
                            </p>

                            <p className="mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                                {job.jobType}
                            </p>
                        </div>
                    )}

                    {job.city && (
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Location
                            </p>

                            <div className="flex items-center gap-1.5 mt-1.5 text-sm font-semibold text-gray-900 dark:text-white">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span className="truncate">
                                    {job.city}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {application.message && (
                    <div className="p-4 mt-5 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Applicant Message
                        </p>

                        <p className="mt-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                            {application.message}
                        </p>
                    </div>
                )}

                {application.resumeUrl && (
                    <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        <FileText className="w-4 h-4" />
                        View Resume
                    </a>
                )}

                {application.status ===
                    "ACCEPTED" &&
                    (applicant.phone ||
                        applicant.email) && (
                        <div className="flex flex-wrap gap-2 mt-5">
                            {applicant.phone && (
                                <a
                                    href={`tel:${applicant.phone}`}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                                >
                                    <Phone className="w-4 h-4" />
                                    Call
                                </a>
                            )}

                            {applicant.email && (
                                <a
                                    href={`mailto:${applicant.email}`}
                                    className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email
                                </a>
                            )}
                        </div>
                    )}

                <div className="flex-1" />

                {(canReview ||
                    canShortlist ||
                    canAccept ||
                    canReject) && (
                        <div className="pt-5 mt-5 border-t border-gray-200 dark:border-slate-700">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                {canReview && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onReview(
                                                application
                                            )
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {actionLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <BriefcaseBusiness className="w-4 h-4" />
                                        )}

                                        Review
                                    </button>
                                )}

                                {canShortlist && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onShortlist(
                                                application
                                            )
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-purple-600 rounded-xl hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {actionLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <UserCheck className="w-4 h-4" />
                                        )}

                                        Shortlist
                                    </button>
                                )}

                                {canAccept && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onAccept(
                                                application
                                            )
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white transition bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {actionLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="w-4 h-4" />
                                        )}

                                        Accept
                                    </button>
                                )}

                                {canReject && (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            onReject(
                                                application
                                            )
                                        }
                                        disabled={
                                            actionLoading
                                        }
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-600 transition border border-red-200 rounded-xl hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/50 dark:hover:bg-red-900/20"
                                    >
                                        {actionLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <XCircle className="w-4 h-4" />
                                        )}

                                        Reject
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                {application.status ===
                    "ACCEPTED" && (
                        <div className="flex items-center justify-center gap-2 pt-5 mt-5 text-sm font-semibold border-t border-gray-200 text-emerald-600 dark:border-slate-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-5 h-5" />
                            Application Accepted
                        </div>
                    )}

                {application.status ===
                    "REJECTED" && (
                        <div className="flex items-center justify-center gap-2 pt-5 mt-5 text-sm font-semibold text-red-600 border-t border-gray-200 dark:border-slate-700 dark:text-red-400">
                            <XCircle className="w-5 h-5" />
                            Application Rejected
                        </div>
                    )}

                {application.status ===
                    "WITHDRAWN" && (
                        <div className="flex items-center justify-center gap-2 pt-5 mt-5 text-sm font-semibold text-gray-500 border-t border-gray-200 dark:border-slate-700 dark:text-gray-400">
                            <XCircle className="w-5 h-5" />
                            Application Withdrawn
                        </div>
                    )}
            </div>
        </article>
    );
};

export default ReceivedApplicationCard;