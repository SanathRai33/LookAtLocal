import React from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Phone,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    Clock3,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const PhoneSettings = () => {
    const { user } = useAuth();

    const isVerified = user?.isPhoneVerified;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-10">

                {/* Back */}
                <Link
                    to="/settings"
                    className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Settings
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Phone Settings
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your phone number and verification status
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-900 dark:border-slate-800">

                    {/* Phone Number */}
                    <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-950 dark:text-white">
                                        Phone Number
                                    </p>

                                    {isVerified ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                            <CheckCircle2 className="w-3 h-3" />
                                            Verified
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                                            <AlertCircle className="w-3 h-3" />
                                            Not verified
                                        </span>
                                    )}
                                </div>

                                <p className="mt-2 text-base font-medium text-gray-800 dark:text-gray-200">
                                    {user?.phone || "No phone number available"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Verification Section */}
                    <div className="p-6">
                        {isVerified ? (
                            <VerifiedState />
                        ) : (
                            <PendingVerificationState />
                        )}
                    </div>
                </div>

                {/* Security Information */}
                <div className="flex items-start gap-4 p-5 mt-6 border border-blue-200 rounded-xl bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/10">
                    <ShieldCheck className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400" />

                    <div>
                        <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                            Why verify your phone number?
                        </h2>

                        <p className="mt-1 text-sm leading-6 text-blue-800 dark:text-blue-400">
                            Phone verification can help confirm account ownership,
                            improve account security, and provide an additional way
                            to protect your LookAtLocal account.
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
                        Your phone number is verified
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-green-700 dark:text-green-500">
                        Your phone number has been successfully verified.
                    </p>
                </div>
            </div>
        </div>
    );
};

const PendingVerificationState = () => {
    return (
        <div>
            {/* Not Verified */}
            <div className="flex items-start gap-4 p-5 border border-amber-200 rounded-xl bg-amber-50 dark:border-amber-900/50 dark:bg-amber-900/10">
                <AlertCircle className="flex-shrink-0 w-6 h-6 text-amber-600 dark:text-amber-400" />

                <div>
                    <h2 className="font-semibold text-amber-800 dark:text-amber-400">
                        Your phone number is not verified
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-amber-700 dark:text-amber-500">
                        Phone verification is not available yet. You can continue
                        using LookAtLocal normally without verifying your phone
                        number.
                    </p>
                </div>
            </div>

            {/* Coming Soon */}
            <div className="flex items-center gap-4 p-5 mt-6 border border-gray-200 rounded-xl bg-gray-50 dark:border-slate-700 dark:bg-slate-800/50">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-200 rounded-lg dark:bg-slate-700">
                    <Clock3 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>

                <div>
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
                        Phone verification coming soon
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        We're working on phone verification. Once available,
                        you'll be able to verify your number using a secure
                        verification code.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PhoneSettings;