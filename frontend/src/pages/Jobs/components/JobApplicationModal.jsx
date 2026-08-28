import React, { useEffect, useState } from "react";
import {
    AlertCircle,
    BriefcaseBusiness,
    CheckCircle2,
    FileText,
    Loader2,
    X,
} from "lucide-react";

const JobApplicationModal = ({
    job,
    open,
    loading = false,
    onClose,
    onSubmit,
}) => {
    const [message, setMessage] = useState("");
    const [resumeUrl, setResumeUrl] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) {
            setMessage("");
            setResumeUrl("");
            setSuccess(false);
            setError("");
        }
    }, [open]);

    if (!open || !job) {
        return null;
    }

    const handleSubmit = async () => {
        setError("");

        const result = await onSubmit({
            jobId: job.id,
            message: message.trim() || undefined,
            resumeUrl: resumeUrl.trim() || undefined,
        });

        if (!result?.success) {
            setError(
                result?.error ||
                "Failed to submit application"
            );

            return;
        }

        setSuccess(true);
    };

    if (success) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl dark:bg-slate-800">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-gray-900 dark:text-white">
                        Application Submitted
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Your application has been sent to the
                        employer successfully.
                    </p>

                    <div className="p-4 mt-5 text-left rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {job.title}
                        </p>

                        {job.companyName && (
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {job.companyName}
                            </p>
                        )}

                        <div className="flex items-center gap-2 mt-3 text-sm font-medium text-amber-600 dark:text-amber-400">
                            <BriefcaseBusiness className="w-4 h-4" />
                            Application status: Applied
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full px-5 py-3 mt-6 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
                    >
                        Done
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onMouseDown={(event) => {
                if (
                    event.target === event.currentTarget &&
                    !loading
                ) {
                    onClose();
                }
            }}
        >
            <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl dark:bg-slate-800">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Apply for Job
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {job.title}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="p-2 text-gray-500 transition rounded-lg hover:bg-gray-100 disabled:opacity-50 dark:hover:bg-slate-700"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {error && (
                        <div className="flex gap-3 p-4 mb-5 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300">
                            <AlertCircle className="flex-shrink-0 w-5 h-5" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                <BriefcaseBusiness className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div className="min-w-0">
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {job.title}
                                </p>

                                {job.companyName && (
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {job.companyName}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Message
                            <span className="ml-1 font-normal text-gray-400">
                                (Optional)
                            </span>
                        </label>

                        <textarea
                            value={message}
                            onChange={(event) =>
                                setMessage(
                                    event.target.value
                                )
                            }
                            rows={5}
                            maxLength={2000}
                            placeholder="Introduce yourself and explain why you're a good fit for this job..."
                            disabled={loading}
                            className="w-full px-4 py-3 mt-2 text-sm text-gray-900 placeholder-gray-400 transition bg-white border border-gray-200 outline-none resize-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                        />

                        <p className="mt-1 text-xs text-right text-gray-400">
                            {message.length}/2000
                        </p>
                    </div>

                    <div className="mt-4">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                            Resume URL
                            <span className="ml-1 font-normal text-gray-400">
                                (Optional)
                            </span>
                        </label>

                        <div className="relative mt-2">
                            <FileText className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-4 top-1/2" />

                            <input
                                type="url"
                                value={resumeUrl}
                                onChange={(event) =>
                                    setResumeUrl(
                                        event.target.value
                                    )
                                }
                                placeholder="https://example.com/resume.pdf"
                                disabled={loading}
                                className="w-full py-3 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400 transition bg-white border border-gray-200 outline-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="p-4 mt-5 border border-blue-100 rounded-xl bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10">
                        <p className="text-sm leading-6 text-blue-800 dark:text-blue-300">
                            Your application will be sent to the
                            employer for review. You can withdraw
                            it later while it is still under
                            consideration.
                        </p>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-5 py-3 font-semibold text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Applying...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Submit Application
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobApplicationModal;