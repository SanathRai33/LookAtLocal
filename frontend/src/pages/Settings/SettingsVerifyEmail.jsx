import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Mail,
    CheckCircle2,
    ShieldCheck,
    ArrowLeft,
    Loader2,
    Send,
    AlertCircle,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const SettingsVerifyEmail = () => {
    const { user, sendVerificationEmail } = useAuth();
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSendVerification = async () => {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const result = await sendVerificationEmail();

            if (result.success) {
                setMessage(
                    result.message ||
                    "Verification email sent successfully. Please check your inbox."
                );
            } else {
                setError(
                    result.error || "Failed to send verification email."
                );
            }
        } catch (error) {
            setError("Failed to send verification email.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.isEmailVerified) {
            navigate('/settings')
        }
    }, [])

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">

                <Link
                    to="/settings"
                    className="inline-flex items-center gap-2 mb-8 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Settings
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center bg-blue-100 w-11 h-11 rounded-xl dark:bg-blue-900/30">
                            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Email Verification
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Verify your email address to secure your account
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">

                    <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                    Email Address
                                </p>

                                <p className="mt-1 text-base font-medium break-all text-gray-950 dark:text-white">
                                    {user?.email || "No email address"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {user?.isEmailVerified ? (
                        <div className="p-6">
                            <div className="flex items-start gap-4 p-5 border border-green-200 rounded-xl bg-green-50 dark:border-green-900/50 dark:bg-green-900/10">
                                <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-green-600 dark:text-green-400" />

                                <div>
                                    <h2 className="font-semibold text-green-800 dark:text-green-400">
                                        Email Verified
                                    </h2>

                                    <p className="mt-1 text-sm text-green-700 dark:text-green-500">
                                        Your email address has been successfully verified.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-6 text-sm text-gray-500 dark:text-gray-400">
                                <ShieldCheck className="w-4 h-4" />
                                Your verified email helps keep your account secure.
                            </div>
                        </div>
                    ) : (
                        <div className="p-6">

                            <div className="flex items-start gap-4 p-5 border border-amber-200 rounded-xl bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/10">
                                <AlertCircle className="flex-shrink-0 w-6 h-6 text-amber-600 dark:text-amber-400" />

                                <div>
                                    <h2 className="font-semibold text-amber-800 dark:text-amber-400">
                                        Email Not Verified
                                    </h2>

                                    <p className="mt-1 text-sm leading-6 text-amber-700 dark:text-amber-500">
                                        Your email is not verified yet. Verification is optional,
                                        but it helps secure your account and confirms that you
                                        own this email address.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-sm font-semibold text-gray-950 dark:text-white">
                                    Verify your email
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    Click the button below and we'll send a verification link
                                    to your email address. Open the email and click the
                                    verification link to complete the process.
                                </p>
                            </div>

                            {message && (
                                <div className="p-4 mt-6 border border-green-200 rounded-lg bg-green-50 dark:border-green-900/50 dark:bg-green-900/20">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-green-600 dark:text-green-400" />

                                        <p className="text-sm text-green-700 dark:text-green-400">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="p-4 mt-6 border border-red-200 rounded-lg bg-red-50 dark:border-red-900/50 dark:bg-red-900/20">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400" />

                                        <p className="text-sm text-red-700 dark:text-red-400">
                                            {error}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={handleSendVerification}
                                disabled={loading}
                                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-sm font-medium text-white transition bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Verification Email
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SettingsVerifyEmail;