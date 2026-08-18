import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowUp,
    ChevronDown,
    Search,
    ShieldCheck,
    UserRound,
    MapPin,
    Database,
    Lock,
    Cookie,
    MessageCircle,
    Trash2,
    Mail,
    FileText,
} from "lucide-react";

const Privacy = () => {
    const [search, setSearch] = useState("");
    const [openSection, setOpenSection] = useState(null);

    const sections = [
        {
            id: "introduction",
            title: "1. Introduction",
            icon: ShieldCheck,
            content: (
                <>
                    <p>
                        LookAtLocal respects your privacy and is committed to being
                        transparent about how information is collected, used, stored,
                        and protected when you use our platform.
                    </p>

                    <p>
                        This Privacy Policy explains the types of information that may
                        be processed when you use LookAtLocal and the choices available
                        to you.
                    </p>
                </>
            ),
        },
        {
            id: "information-collected",
            title: "2. Information We Collect",
            icon: Database,
            content: (
                <>
                    <p>
                        Depending on how you use LookAtLocal, we may process information
                        such as:
                    </p>

                    <ul>
                        <li>Name and profile information.</li>
                        <li>Email address and phone number.</li>
                        <li>Account authentication information.</li>
                        <li>Profile picture and other profile information.</li>
                        <li>Location or approximate location.</li>
                        <li>Content that you voluntarily submit.</li>
                        <li>Information about your interactions with the platform.</li>
                        <li>Device, browser, and technical information.</li>
                        <li>Information required to maintain platform security.</li>
                    </ul>

                    <p>
                        We aim to collect information that is reasonably necessary to
                        provide, secure, maintain, and improve the service.
                    </p>
                </>
            ),
        },
        {
            id: "account-information",
            title: "3. Account Information",
            icon: UserRound,
            content: (
                <>
                    <p>
                        When you create an account, information such as your name, email
                        address, phone number, and other profile details may be associated
                        with your account.
                    </p>

                    <p>
                        You are responsible for keeping the information you provide
                        accurate and up to date.
                    </p>

                    <p>
                        You can manage many account details through the Settings section
                        of LookAtLocal.
                    </p>
                </>
            ),
        },
        {
            id: "location",
            title: "4. Location Information",
            icon: MapPin,
            content: (
                <>
                    <p>
                        Location is an important part of a local discovery platform.
                        LookAtLocal may use your location or approximate location to
                        provide relevant local content, recommendations, and services.
                    </p>

                    <p>
                        Location access may depend on permissions provided through your
                        device or browser.
                    </p>

                    <p>
                        You can manage available location-related preferences through
                        your device and LookAtLocal privacy settings.
                    </p>

                    <p>
                        We recommend using approximate location where exact location is
                        not necessary for a particular feature.
                    </p>
                </>
            ),
        },
        {
            id: "how-used",
            title: "5. How We Use Information",
            icon: FileText,
            content: (
                <>
                    <p>Information may be used to:</p>

                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Provide LookAtLocal features and services.</li>
                        <li>Provide relevant local discovery and recommendations.</li>
                        <li>Authenticate and secure your account.</li>
                        <li>Send important account-related communications.</li>
                        <li>Provide email verification and security functionality.</li>
                        <li>Respond to support requests.</li>
                        <li>Detect abuse, fraud, and security threats.</li>
                        <li>Maintain and improve platform functionality.</li>
                        <li>Understand how users interact with the platform.</li>
                    </ul>

                    <p>
                        We should not use personal information for purposes that are
                        incompatible with the purpose for which it was collected without
                        an appropriate basis or user choice where required.
                    </p>
                </>
            ),
        },
        {
            id: "user-content",
            title: "6. User-Generated Content",
            icon: MessageCircle,
            content: (
                <>
                    <p>
                        LookAtLocal may allow users to create and publish content such as
                        listings, reviews, comments, images, descriptions, and other
                        information.
                    </p>

                    <p>
                        Content that you intentionally make public may be visible to
                        other users and may be associated with your profile.
                    </p>

                    <p>
                        Do not publish personal information about yourself or another
                        person that you do not want to be publicly accessible.
                    </p>
                </>
            ),
        },
        {
            id: "communications",
            title: "7. Communications",
            icon: Mail,
            content: (
                <>
                    <p>
                        We may send service-related communications to the email address
                        or phone number associated with your account.
                    </p>

                    <p>
                        These may include account security notifications, verification
                        messages, important service updates, and responses to support
                        requests.
                    </p>

                    <p>
                        Optional communications may have separate preferences where
                        applicable.
                    </p>
                </>
            ),
        },
        {
            id: "security",
            title: "8. Security",
            icon: Lock,
            content: (
                <>
                    <p>
                        We use reasonable technical and organizational measures intended
                        to protect information against unauthorized access, alteration,
                        disclosure, and destruction.
                    </p>

                    <p>
                        Security measures may include authentication controls, access
                        controls, secure communication, token protection, and monitoring
                        for suspicious activity.
                    </p>

                    <p>
                        However, no internet-based service can guarantee absolute
                        security.
                    </p>
                </>
            ),
        },
        {
            id: "cookies",
            title: "9. Cookies and Similar Technologies",
            icon: Cookie,
            content: (
                <>
                    <p>
                        LookAtLocal may use cookies or similar technologies to support
                        authentication, maintain sessions, remember preferences, improve
                        functionality, and help protect the platform.
                    </p>

                    <p>
                        Some cookies may be necessary for the service to operate.
                        Depending on the implementation, you may be able to control
                        certain cookies through your browser or available privacy
                        controls.
                    </p>
                </>
            ),
        },
        {
            id: "sharing",
            title: "10. Sharing Information",
            icon: Database,
            content: (
                <>
                    <p>
                        We do not intend to make your private account information
                        publicly available simply because you use LookAtLocal.
                    </p>

                    <p>
                        Information may be shared with service providers or technology
                        partners when necessary to operate, secure, maintain, or provide
                        parts of the platform.
                    </p>

                    <p>
                        Information may also be disclosed when required by applicable
                        law, legal process, or when necessary to protect the rights,
                        safety, and security of users or the platform.
                    </p>
                </>
            ),
        },
        {
            id: "public-information",
            title: "11. Public Information",
            icon: UserRound,
            content: (
                <>
                    <p>
                        Information that you intentionally make public through your
                        profile, listings, reviews, comments, or other public features
                        may be visible to other users.
                    </p>

                    <p>
                        You should review your privacy settings before publishing
                        information and avoid sharing sensitive personal information in
                        public areas.
                    </p>
                </>
            ),
        },
        {
            id: "retention",
            title: "12. Data Retention",
            icon: Database,
            content: (
                <>
                    <p>
                        We may retain information for as long as reasonably necessary to
                        provide the service, maintain account records, meet legitimate
                        operational needs, resolve disputes, prevent abuse, maintain
                        security, or comply with applicable requirements.
                    </p>

                    <p>
                        Retention periods may differ depending on the type and purpose
                        of the information.
                    </p>
                </>
            ),
        },
        {
            id: "account-deletion",
            title: "13. Account Deletion",
            icon: Trash2,
            content: (
                <>
                    <p>
                        You may request deletion of your LookAtLocal account through the
                        account settings when the deletion functionality is available.
                    </p>

                    <p>
                        Account deletion may result in removal, anonymization, or
                        restriction of access to account-related information and
                        content, subject to applicable requirements and legitimate
                        retention needs.
                    </p>

                    <p>
                        Some information may need to be retained for security, legal,
                        fraud-prevention, or other legitimate purposes.
                    </p>

                    <p>
                        Account deletion may be permanent and may not be reversible.
                    </p>
                </>
            ),
        },
        {
            id: "privacy-controls",
            title: "14. Your Privacy Controls",
            icon: ShieldCheck,
            content: (
                <>
                    <p>
                        LookAtLocal provides privacy-related settings that may allow you
                        to control aspects of your account and how certain information
                        is displayed or used.
                    </p>

                    <p>
                        Depending on the available features, these controls may include
                        profile visibility, search discoverability, activity visibility,
                        location preferences, communication preferences, and
                        personalization.
                    </p>

                    <Link
                        to="/settings/privacy"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Manage Privacy Settings
                    </Link>
                </>
            ),
        },
        {
            id: "children",
            title: "15. Children's Privacy",
            icon: ShieldCheck,
            content: (
                <>
                    <p>
                        LookAtLocal is not intended to be used in violation of applicable
                        age restrictions or child-protection requirements.
                    </p>

                    <p>
                        If you believe that a child has provided personal information
                        through the service in circumstances where that information
                        should not have been collected, contact support.
                    </p>
                </>
            ),
        },
        {
            id: "changes",
            title: "16. Changes to This Privacy Policy",
            icon: FileText,
            content: (
                <>
                    <p>
                        This Privacy Policy may be updated as LookAtLocal develops,
                        introduces new features, changes its data practices, or responds
                        to applicable legal and operational requirements.
                    </p>

                    <p>
                        The updated policy will be made available on this page along with
                        the applicable revision date.
                    </p>
                </>
            ),
        },
        {
            id: "contact",
            title: "17. Contact Us",
            icon: Mail,
            content: (
                <>
                    <p>
                        If you have questions, concerns, or requests relating to this
                        Privacy Policy or the handling of your information, contact
                        LookAtLocal support.
                    </p>

                    <a
                        href="mailto:support@lookatlocal.com"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        <Mail className="w-4 h-4" />
                        support@lookatlocal.com
                    </a>
                </>
            ),
        },
    ];

    const filteredSections = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return sections;

        return sections.filter((section) =>
            section.title.toLowerCase().includes(query)
        );
    }, [search]);

    const toggleSection = (id) => {
        setOpenSection((current) => (current === id ? null : id));
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-5xl px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    Back to LookAtLocal
                </Link>

                <header className="mb-8">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Privacy Policy
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Learn how LookAtLocal handles information when you use our
                                platform.
                            </p>

                            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                                Last updated: August 2026
                            </p>
                        </div>
                    </div>
                </header>

                <div className="p-5 mb-6 border border-blue-200 rounded-2xl bg-blue-50 dark:border-blue-900/40 dark:bg-blue-900/10">
                    <div className="flex items-start gap-3">
                        <ShieldCheck className="flex-shrink-0 w-5 h-5 mt-0.5 text-blue-600 dark:text-blue-400" />

                        <div>
                            <h2 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                                Your privacy matters
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-blue-800 dark:text-blue-400">
                                This policy explains what information may be collected, why
                                it may be used, how it may be protected, and what privacy
                                controls are available to you.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative mb-6">
                    <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />

                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search privacy policy..."
                        className="w-full py-3.5 pl-12 pr-4 text-sm bg-white border border-gray-200 rounded-xl outline-none text-gray-950 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                    />
                </div>

                <div className="mb-6 overflow-hidden bg-white border border-gray-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800">
                    {filteredSections.length > 0 ? (
                        filteredSections.map((section) => {
                            const Icon = section.icon;
                            const isOpen = openSection === section.id;

                            return (
                                <section
                                    key={section.id}
                                    className="border-b border-gray-200 last:border-b-0 dark:border-slate-800"
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(section.id)}
                                        className="flex items-center justify-between w-full gap-6 p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center justify-center flex-shrink-0 bg-gray-100 rounded-lg w-9 h-9 dark:bg-slate-800">
                                                <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                            </div>

                                            <span className="text-sm font-semibold text-gray-950 dark:text-white">
                                                {section.title}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-6 pl-[4.75rem]">
                                            <div className="max-w-3xl space-y-4 text-sm leading-7 text-gray-600 dark:text-gray-400">
                                                {section.content}
                                            </div>
                                        </div>
                                    )}
                                </section>
                            );
                        })
                    ) : (
                        <div className="p-10 text-center">
                            <FileText className="w-8 h-8 mx-auto text-gray-400" />

                            <h2 className="mt-4 text-base font-semibold text-gray-950 dark:text-white">
                                No matching sections
                            </h2>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Try a different search term.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 border border-gray-200 rounded-2xl bg-gray-50 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-lg dark:bg-slate-800">
                            <Lock className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-950 dark:text-white">
                                Manage your privacy
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Use your account privacy settings to control available
                                profile, location, activity, communication, and
                                personalization preferences.
                            </p>

                            <Link
                                to="/settings/privacy"
                                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Open Privacy Settings
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-8 text-xs text-gray-400 gap-x-6 gap-y-2 dark:text-gray-500">
                    <Link
                        to="/terms"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Terms & Conditions
                    </Link>

                    <Link
                        to="/help"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Help Center
                    </Link>

                    <Link
                        to="/settings/privacy"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Privacy Settings
                    </Link>

                    <span>© {new Date().getFullYear()} LookAtLocal</span>
                </div>
            </div>

            <button
                type="button"
                onClick={() =>
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                className="fixed flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-white border border-gray-200 rounded-full shadow-md bottom-6 right-6 hover:text-gray-950 dark:bg-slate-900 dark:border-slate-800 dark:text-gray-300 dark:hover:text-white"
                aria-label="Back to top"
            >
                <ArrowUp className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Privacy;