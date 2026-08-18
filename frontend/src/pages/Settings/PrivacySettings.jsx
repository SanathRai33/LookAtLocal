import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Shield,
    UserRound,
    Search,
    Eye,
    EyeOff,
    MapPin,
    Navigation,
    Activity,
    MessageCircle,
    Sparkles,
    Info,
    Lock,
    Check,
} from "lucide-react";

const PrivacySettings = () => {
    const [settings, setSettings] = useState({
        profileVisibility: "public",
        showProfileInSearch: true,
        showOnlineStatus: true,
        locationSharing: false,
        showApproximateLocation: true,
        showActivity: true,
        allowMessages: true,
        personalizedRecommendations: true,
    });

    const [saved, setSaved] = useState(false);

    const updateSetting = (key, value) => {
        setSettings((previous) => ({
            ...previous,
            [key]: value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        /*
         * Backend integration will be added later.
         *
         * Example future API:
         *
         * PATCH /api/v1/users/privacy
         *
         * For now, this only updates the frontend state.
         */

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

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
                            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Privacy & Security
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Control how your information is visible and used on Look@Local
                            </p>
                        </div>
                    </div>
                </div>

                {/* Temporary notice */}
                <div className="flex items-start gap-3 p-4 mb-6 border border-blue-200 rounded-xl bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/10">
                    <Info className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400" />

                    <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                            Privacy controls
                        </p>

                        <p className="mt-1 text-sm leading-6 text-blue-800 dark:text-blue-400">
                            These controls are currently available in the interface.
                            Account-wide privacy preferences will be connected to your
                            account settings when the privacy API is implemented.
                        </p>
                    </div>
                </div>

                {/* ========================================================= */}
                {/* PROFILE PRIVACY */}
                {/* ========================================================= */}

                <PrivacySection
                    icon={UserRound}
                    title="Profile Privacy"
                    description="Control who can discover and view your profile."
                >
                    {/* Profile Visibility */}
                    <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                        <SettingHeader
                            icon={Eye}
                            title="Profile visibility"
                            description="Choose who can view your public profile."
                        />

                        <div className="grid gap-3 mt-5 sm:grid-cols-3">
                            <VisibilityOption
                                value="public"
                                selected={settings.profileVisibility === "public"}
                                title="Public"
                                description="Anyone can view your profile."
                                onClick={() =>
                                    updateSetting("profileVisibility", "public")
                                }
                            />

                            <VisibilityOption
                                value="local"
                                selected={settings.profileVisibility === "local"}
                                title="Local only"
                                description="Visible to people in your area."
                                onClick={() =>
                                    updateSetting("profileVisibility", "local")
                                }
                            />

                            <VisibilityOption
                                value="private"
                                selected={settings.profileVisibility === "private"}
                                title="Private"
                                description="Only limited information is visible."
                                onClick={() =>
                                    updateSetting("profileVisibility", "private")
                                }
                            />
                        </div>
                    </div>

                    <ToggleSetting
                        icon={Search}
                        title="Show profile in search"
                        description="Allow other people to find your profile through Look@Local search."
                        enabled={settings.showProfileInSearch}
                        onChange={(value) =>
                            updateSetting("showProfileInSearch", value)
                        }
                    />

                    <ToggleSetting
                        icon={Activity}
                        title="Show online status"
                        description="Let other users know when you are currently active."
                        enabled={settings.showOnlineStatus}
                        onChange={(value) =>
                            updateSetting("showOnlineStatus", value)
                        }
                    />
                </PrivacySection>

                {/* ========================================================= */}
                {/* LOCATION PRIVACY */}
                {/* ========================================================= */}

                <PrivacySection
                    icon={MapPin}
                    title="Location Privacy"
                    description="Control how your location is used and displayed."
                >
                    <ToggleSetting
                        icon={Navigation}
                        title="Location sharing"
                        description="Allow Look@Local to use your location to provide relevant local services and recommendations."
                        enabled={settings.locationSharing}
                        onChange={(value) =>
                            updateSetting("locationSharing", value)
                        }
                    />

                    <ToggleSetting
                        icon={MapPin}
                        title="Show approximate location"
                        description="Show an approximate area instead of your exact location to other users."
                        enabled={settings.showApproximateLocation}
                        onChange={(value) =>
                            updateSetting("showApproximateLocation", value)
                        }
                    />

                    <div className="p-6">
                        <div className="flex items-start gap-3 p-4 border border-amber-200 rounded-xl bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10">
                            <Lock className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-400" />

                            <div>
                                <p className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                                    Location privacy
                                </p>

                                <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-400">
                                    Your exact location should never be publicly displayed.
                                    Local features should use approximate location whenever
                                    possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </PrivacySection>

                {/* ========================================================= */}
                {/* ACTIVITY & SOCIAL */}
                {/* ========================================================= */}

                <PrivacySection
                    icon={MessageCircle}
                    title="Activity & Social"
                    description="Choose how other users can interact with you."
                >
                    <ToggleSetting
                        icon={Activity}
                        title="Show activity"
                        description="Allow other users to see relevant activity on your public profile."
                        enabled={settings.showActivity}
                        onChange={(value) =>
                            updateSetting("showActivity", value)
                        }
                    />

                    <ToggleSetting
                        icon={MessageCircle}
                        title="Allow people to contact me"
                        description="Allow other Look@Local users to contact you through available communication features."
                        enabled={settings.allowMessages}
                        onChange={(value) =>
                            updateSetting("allowMessages", value)
                        }
                    />
                </PrivacySection>

                {/* ========================================================= */}
                {/* PERSONALIZATION */}
                {/* ========================================================= */}

                <PrivacySection
                    icon={Sparkles}
                    title="Personalization"
                    description="Control whether Look@Local can personalize your experience."
                >
                    <ToggleSetting
                        icon={Sparkles}
                        title="Personalized recommendations"
                        description="Use your interactions and preferences to provide more relevant local recommendations."
                        enabled={settings.personalizedRecommendations}
                        onChange={(value) =>
                            updateSetting(
                                "personalizedRecommendations",
                                value
                            )
                        }
                    />
                </PrivacySection>

                {/* ========================================================= */}
                {/* PRIVACY INFORMATION */}
                {/* ========================================================= */}

                <div className="p-6 mt-6 border border-gray-200 rounded-2xl bg-gray-50 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-lg dark:bg-slate-800">
                            <Shield className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-950 dark:text-white">
                                Your privacy matters
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Look@Local should only expose information that is necessary
                                for the feature you are using. You remain in control of
                                information such as your profile visibility, location,
                                activity, and communication preferences.
                            </p>

                            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                More detailed privacy controls, data management, and account
                                privacy APIs can be added as the platform develops.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Save */}
                <div className="sticky z-10 flex items-center justify-between gap-4 p-4 mt-6 border border-gray-200 shadow-lg bottom-4 rounded-2xl bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
                    <div className="hidden sm:block">
                        {saved ? (
                            <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400">
                                <Check className="w-4 h-4" />
                                Privacy preferences updated
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Review your privacy preferences before saving.
                            </p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg sm:w-auto hover:bg-blue-700"
                    >
                        Save Privacy Preferences
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ============================================================= */
/* SECTION */
/* ============================================================= */

const PrivacySection = ({
    icon: Icon,
    title,
    description,
    children,
}) => {
    return (
        <section className="mb-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:bg-slate-900 dark:border-slate-800">
            <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-gray-950 dark:text-white">
                            {title}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {children}
        </section>
    );
};

/* ============================================================= */
/* SETTING HEADER */
/* ============================================================= */

const SettingHeader = ({
    icon: Icon,
    title,
    description,
}) => {
    return (
        <div className="flex items-start gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>

            <div>
                <h3 className="text-sm font-semibold text-gray-950 dark:text-white">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            </div>
        </div>
    );
};

/* ============================================================= */
/* TOGGLE */
/* ============================================================= */

const ToggleSetting = ({
    icon: Icon,
    title,
    description,
    enabled,
    onChange,
}) => {
    return (
        <div className="flex items-start justify-between gap-6 p-6 border-b border-gray-200 last:border-b-0 dark:border-slate-800">
            <div className="flex items-start flex-1 min-w-0 gap-4">
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-gray-950 dark:text-white">
                        {title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                </div>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                onClick={() => onChange(!enabled)}
                className={`relative flex-shrink-0 w-12 h-7 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${enabled
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-slate-700"
                    }`}
            >
                <span
                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                />
            </button>
        </div>
    );
};

/* ============================================================= */
/* VISIBILITY OPTION */
/* ============================================================= */

const VisibilityOption = ({
    selected,
    title,
    description,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative p-4 text-left border rounded-xl transition-all ${selected
                    ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
                    : "border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600"
                }`}
        >
            {selected && (
                <div className="absolute flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full top-3 right-3">
                    <Check className="w-3 h-3 text-white" />
                </div>
            )}

            <div
                className={`flex items-center justify-center w-9 h-9 rounded-lg ${selected
                        ? "bg-blue-100 dark:bg-blue-900/40"
                        : "bg-gray-100 dark:bg-slate-800"
                    }`}
            >
                {title === "Private" ? (
                    <EyeOff
                        className={`w-4 h-4 ${selected
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500"
                            }`}
                    />
                ) : (
                    <Eye
                        className={`w-4 h-4 ${selected
                                ? "text-blue-600 dark:text-blue-400"
                                : "text-gray-500"
                            }`}
                    />
                )}
            </div>

            <h3 className="mt-3 text-sm font-semibold text-gray-950 dark:text-white">
                {title}
            </h3>

            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                {description}
            </p>
        </button>
    );
};

export default PrivacySettings;