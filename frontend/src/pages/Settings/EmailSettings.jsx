import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Mail,
    CheckCircle2,
    AlertCircle,
    Send,
    Loader2,
    ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const EmailSettings = () => {
    const { user, sendVerificationEmail } = useAuth();

    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSendVerification = async () => {
        setIsSending(true);
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const result = await sendVerificationEmail();

            if (result.success) {
                setSuccessMessage(
                    result.message ||
                    "Verification email sent successfully. Please check your inbox."
                );
            } else {
                setErrorMessage(
                    result.error || "Failed to send verification email."
                );
            }
        } catch (error) {
            setErrorMessage(
                error?.response?.data?.message ||
                "Failed to send verification email."
            );
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">

                <Link
                    to="/settings"
                    className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Settings
                </Link>

                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Email Settings
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your email address and verification status
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-900 dark:border-slate-800">

                    <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-950 dark:text-white">
                                        Email Address
                                    </p>

                                    {user?.isEmailVerified && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified
                                        </span>
                                    )}

                                    {!user?.isEmailVerified && (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                                            <AlertCircle className="w-3 h-3" />
                                            Not verified
                                        </span>
                                    )}
                                </div>

                                <p className="mt-2 text-base font-medium text-gray-800 break-all dark:text-gray-200">
                                    {user?.email || "No email address available"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {user?.isEmailVerified ? (
                            <VerifiedState />
                        ) : (
                            <UnverifiedState
                                isSending={isSending}
                                successMessage={successMessage}
                                errorMessage={errorMessage}
                                onSendVerification={handleSendVerification}
                            />
                        )}
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 mt-6 border border-blue-200 rounded-xl bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/10">
                    <ShieldCheck className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400" />

                    <div>
                        <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                            Why verify your email?
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-blue-800 dark:text-blue-400">
                            Email verification confirms that you own this email address
                            and helps improve the security of your LookAtLocal account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VerifiedState = () => {
    return (
        <div>
            <div className="flex items-start gap-4 p-5 border border-green-200 rounded-xl bg-green-50 dark:border-green-900/50 dark:bg-green-900/10">
                <CheckCircle2 className="flex-shrink-0 w-6 h-6 text-green-600 dark:text-green-400" />

                <div>
                    <h2 className="font-semibold text-green-800 dark:text-green-400">
                        Your email is verified
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-green-700 dark:text-green-500">
                        Your email address has been successfully verified.
                        You don't need to do anything else.
                    </p>
                </div>
            </div>
        </div>
    );
};

const UnverifiedState = ({
    isSending,
    successMessage,
    errorMessage,
    onSendVerification,
}) => {
    return (
        <div>
            <div className="flex items-start gap-4 p-5 border border-amber-200 rounded-xl bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/10">
                <AlertCircle className="flex-shrink-0 w-6 h-6 text-amber-600 dark:text-amber-400" />

                <div>
                    <h2 className="font-semibold text-amber-800 dark:text-amber-400">
                        Your email is not verified
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-amber-700 dark:text-amber-500">
                        Email verification is optional. You can continue using
                        LookAtLocal without verifying your email.
                    </p>
                </div>
            </div>

            <div className="mt-7">
                <h2 className="text-base font-semibold text-gray-950 dark:text-white">
                    Verify your email address
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    We'll send a verification link to your registered email
                    address. Open the email and click the verification button
                    to complete verification.
                </p>
            </div>

            {successMessage && (
                <div className="flex items-start gap-3 p-4 mt-6 border border-green-200 rounded-lg bg-green-50 dark:border-green-900/40 dark:bg-green-900/10">
                    <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-green-600 dark:text-green-400" />

                    <p className="text-sm leading-6 text-green-700 dark:text-green-400">
                        {successMessage}
                    </p>
                </div>
            )}

            {errorMessage && (
                <div className="flex items-start gap-3 p-4 mt-6 border border-red-200 rounded-lg bg-red-50 dark:border-red-900/40 dark:bg-red-900/10">
                    <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400" />

                    <p className="text-sm leading-6 text-red-700 dark:text-red-400">
                        {errorMessage}
                    </p>
                </div>
            )}

            <button
                type="button"
                onClick={onSendVerification}
                disabled={isSending}
                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {isSending ? (
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
    );
};

export default EmailSettings;