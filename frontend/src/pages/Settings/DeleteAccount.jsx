import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    AlertTriangle,
    ShieldOff,
    Trash2,
    Info,
    Lock,
    EyeOff,
    RotateCcw,
    CheckCircle2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUser } from '../../hooks/useUser'

const DeleteAccount = () => {
    const { user } = useAuth();
    const { updateMyAccountStatus, loading } = useUser();

    const [showDeleteConfirmation, setShowDeleteConfirmation] =
        useState(false);

    const [confirmationText, setConfirmationText] = useState("");

    const handleDeactivate = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to deactivate your account?"
        );

        if (!confirmed) {
            return;
        }

        const result = await updateMyAccountStatus("DEACTIVATED");

        if (!result.success) {
            alert(result.error);
            return;
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
    };

    const handleDelete = () => {
        alert("For now we don't have much users so we will not allow you to delete the account.");
    };

    const canDelete = confirmationText === "DELETE";

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
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl dark:bg-red-900/30">
                            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Delete Account
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Manage your account deactivation and deletion options
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-5 mb-6 border border-red-300 rounded-2xl bg-red-50 dark:border-red-900/60 dark:bg-red-950/20">
                    <AlertTriangle className="flex-shrink-0 w-6 h-6 mt-0.5 text-red-600 dark:text-red-400" />

                    <div>
                        <h2 className="font-semibold text-red-900 dark:text-red-300">
                            This section contains destructive account actions
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-red-800 dark:text-red-400">
                            Please read the information below carefully before
                            deactivating or deleting your LookAtLocal account.
                            Account deletion should only be used when you are certain
                            that you no longer want to use this account.
                        </p>
                    </div>
                </div>

                <div className="p-6 mb-6 bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-900 dark:border-slate-800">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                            <Info className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
                                Current Account
                            </p>

                            <p className="mt-1 text-base font-semibold text-gray-950 dark:text-white">
                                {user?.fullName || "Your Account"}
                            </p>

                            <p className="mt-1 text-sm text-gray-500 break-all dark:text-gray-400">
                                {user?.email || "No email available"}
                            </p>
                        </div>
                    </div>
                </div>

                <section className="mb-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-900 dark:border-slate-800">
                    <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                                <ShieldOff className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                            </div>

                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h2 className="text-base font-semibold text-gray-950 dark:text-white">
                                        Deactivate Account
                                    </h2>

                                    <span className="px-2 py-1 text-xs font-medium rounded-full text-amber-700 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                                        Recommended
                                    </span>
                                </div>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Take a break without permanently deleting your account.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">

                        <div className="space-y-4">
                            <WarningItem
                                icon={EyeOff}
                                title="Your profile can be hidden"
                                description="Your profile and certain public information can be hidden while your account is inactive."
                            />

                            <WarningItem
                                icon={Lock}
                                title="You won't be able to use normal account features"
                                description="You may need to reactivate your account before using features that require an active account."
                            />

                            <WarningItem
                                icon={RotateCcw}
                                title="You can come back later"
                                description="Deactivation is intended to be temporary. Your account can be reactivated when the backend feature is implemented."
                            />
                        </div>

                        <div className="flex items-start gap-3 p-4 mt-6 border border-amber-200 rounded-xl bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10">
                            <Info className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-400" />

                            <p className="text-sm leading-6 text-amber-800 dark:text-amber-400">
                                <strong>Consider deactivation first</strong> if you only
                                want to take a break from LookAtLocal. It is safer than
                                permanently deleting your account.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleDeactivate}
                            disabled={loading}
                            className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-sm font-medium text-gray-900 transition-colors border border-gray-300 rounded-lg sm:w-auto hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
                        >
                            <ShieldOff className="w-4 h-4" />

                            {loading ? "Deactivating..." : "Deactivate Account"}
                        </button>
                    </div>
                </section>

                <section className="overflow-hidden border border-red-300 shadow-sm rounded-2xl bg-red-50/40 dark:border-red-900/60 dark:bg-red-950/10">
                    <div className="p-6 border-b border-red-200 dark:border-red-900/50">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 bg-red-100 w-11 h-11 rounded-xl dark:bg-red-900/30">
                                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-red-900 dark:text-red-300">
                                    Permanently Delete Account
                                </h2>

                                <p className="mt-1 text-sm text-red-700 dark:text-red-400">
                                    This action is intended to permanently remove your account.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">

                        <div className="space-y-4">
                            <WarningItem
                                danger
                                icon={Trash2}
                                title="This action is permanent"
                                description="Once the deletion process is completed, the account may not be recoverable."
                            />

                            <WarningItem
                                danger
                                icon={EyeOff}
                                title="Your profile will no longer be available"
                                description="Your public profile and account presence will be removed or hidden according to the deletion policy."
                            />

                            <WarningItem
                                danger
                                icon={Info}
                                title="Your content may be affected"
                                description="Listings, posts, interactions, saved information, and other account-related data may be deleted, anonymized, or removed depending on the application's data policy."
                            />

                            <WarningItem
                                danger
                                icon={Lock}
                                title="You will be signed out"
                                description="After deletion, your active sessions should be invalidated and you will need to create a new account if you want to use LookAtLocal again."
                            />
                        </div>

                        <div className="flex items-start gap-3 p-4 mt-6 border border-red-300 rounded-xl bg-red-100/70 dark:border-red-900/60 dark:bg-red-950/30">
                            <AlertTriangle className="flex-shrink-0 w-5 h-5 mt-0.5 text-red-600 dark:text-red-400" />

                            <div>
                                <p className="text-sm font-semibold text-red-900 dark:text-red-300">
                                    Before deleting your account
                                </p>

                                <ul className="mt-2 space-y-1 text-sm leading-6 text-red-800 list-disc list-inside dark:text-red-400">
                                    <li>Make sure you no longer need this account.</li>
                                    <li>Save any information you need before deletion.</li>
                                    <li>Consider deactivating your account instead.</li>
                                    <li>Understand that deletion may not be reversible.</li>
                                </ul>
                            </div>
                        </div>

                        {!showDeleteConfirmation ? (
                            <button
                                type="button"
                                onClick={() => setShowDeleteConfirmation(true)}
                                className="inline-flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-sm font-semibold text-white transition-colors bg-red-600 rounded-lg sm:w-auto hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4" />
                                I Want to Delete My Account
                            </button>
                        ) : (
                            <div className="p-5 mt-6 bg-white border border-red-300 rounded-xl dark:bg-slate-900 dark:border-red-900/60">

                                <h3 className="font-semibold text-gray-950 dark:text-white">
                                    Are you absolutely sure?
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    This is a destructive action. To continue, type{" "}
                                    <strong className="text-red-600 dark:text-red-400">
                                        DELETE
                                    </strong>{" "}
                                    below.
                                </p>

                                <input
                                    type="text"
                                    value={confirmationText}
                                    onChange={(event) =>
                                        setConfirmationText(event.target.value)
                                    }
                                    placeholder="Type DELETE"
                                    autoComplete="off"
                                    className="w-full px-4 py-3 mt-4 text-sm bg-white border border-gray-300 rounded-lg outline-none dark:border-slate-700 dark:bg-slate-950 text-gray-950 dark:text-white focus:ring-2 focus:ring-red-500"
                                />

                                <div className="flex flex-col-reverse gap-3 mt-4 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowDeleteConfirmation(false);
                                            setConfirmationText("");
                                        }}
                                        className="px-5 py-3 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        disabled={!canDelete}
                                        onClick={handleDelete}
                                        className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Permanently Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <div className="flex items-start gap-3 p-5 mt-6 text-sm border border-gray-200 rounded-xl bg-gray-50 dark:border-slate-800 dark:bg-slate-900">
                    <Info className="flex-shrink-0 w-5 h-5 mt-0.5 text-gray-500 dark:text-gray-400" />

                    <p className="leading-6 text-gray-600 dark:text-gray-400">
                        <strong className="text-gray-900 dark:text-white">
                            Need a break?
                        </strong>{" "}
                        Deactivation is the safer option if you aren't sure about
                        permanently deleting your account.
                    </p>
                </div>
            </div>
        </div>
    );
};

const WarningItem = ({
    icon: Icon,
    title,
    description,
    danger = false,
}) => {
    return (
        <div className="flex items-start gap-4">
            <div
                className={`flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-lg ${danger
                    ? "bg-red-100 dark:bg-red-900/30"
                    : "bg-amber-100 dark:bg-amber-900/30"
                    }`}
            >
                <Icon
                    className={`w-4 h-4 ${danger
                        ? "text-red-600 dark:text-red-400"
                        : "text-amber-600 dark:text-amber-400"
                        }`}
                />
            </div>

            <div>
                <h3
                    className={`text-sm font-semibold ${danger
                        ? "text-red-900 dark:text-red-300"
                        : "text-gray-900 dark:text-white"
                        }`}
                >
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default DeleteAccount;