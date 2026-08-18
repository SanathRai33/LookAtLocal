import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowUp,
    ChevronDown,
    FileText,
    ShieldCheck,
    UserRound,
    MapPin,
    MessageCircle,
    AlertTriangle,
    Ban,
    Lock,
    Scale,
    Search,
} from "lucide-react";

const Terms = () => {
    const [openSection, setOpenSection] = useState(null);
    const [search, setSearch] = useState("");

    const sections = [
        {
            id: "acceptance",
            title: "1. Acceptance of Terms",
            icon: FileText,
            content: (
                <>
                    <p>
                        By accessing or using LookAtLocal, you agree to these Terms and
                        Conditions and to use the platform in accordance with applicable
                        laws and regulations.
                    </p>
                    <p>
                        If you do not agree with these terms, you should not use
                        LookAtLocal or its services.
                    </p>
                </>
            ),
        },
        {
            id: "account",
            title: "2. Your Account",
            icon: UserRound,
            content: (
                <>
                    <p>
                        You may need to create an account to access certain LookAtLocal
                        features. You are responsible for providing accurate information
                        and keeping your account credentials secure.
                    </p>
                    <p>
                        You are responsible for activity performed through your account.
                        If you believe that your account has been accessed without your
                        permission, you should take appropriate steps to secure it and
                        contact support.
                    </p>
                    <p>
                        You should not create an account using another person's identity
                        or information without authorization.
                    </p>
                </>
            ),
        },
        {
            id: "local-content",
            title: "3. Local Content and Information",
            icon: MapPin,
            content: (
                <>
                    <p>
                        LookAtLocal is designed to help people discover and interact with
                        local information, places, services, listings, and community
                        content.
                    </p>
                    <p>
                        Information provided by users or other sources may change,
                        become unavailable, or contain inaccuracies. You should verify
                        important information before relying on it.
                    </p>
                    <p>
                        LookAtLocal does not guarantee that every listing, location,
                        business detail, recommendation, review, or user-provided piece
                        of information is accurate, complete, or current.
                    </p>
                </>
            ),
        },
        {
            id: "user-content",
            title: "4. User-Generated Content",
            icon: MessageCircle,
            content: (
                <>
                    <p>
                        You may be able to submit content such as listings, descriptions,
                        reviews, comments, images, or other information.
                    </p>
                    <p>
                        You are responsible for the content you submit and must have the
                        necessary rights and permissions to publish it.
                    </p>
                    <p>
                        You must not submit content that is illegal, fraudulent,
                        misleading, abusive, threatening, defamatory, discriminatory,
                        sexually explicit, or intended to harm another person.
                    </p>
                    <p>
                        LookAtLocal may remove or restrict content that violates these
                        terms, applicable law, or platform policies.
                    </p>
                </>
            ),
        },
        {
            id: "prohibited",
            title: "5. Prohibited Activities",
            icon: Ban,
            content: (
                <>
                    <p>You must not use LookAtLocal to:</p>
                    <ul>
                        <li>Engage in unlawful activity.</li>
                        <li>Impersonate another person or organization.</li>
                        <li>Publish intentionally false or misleading information.</li>
                        <li>Harass, threaten, abuse, or intimidate other users.</li>
                        <li>Attempt to gain unauthorized access to accounts or systems.</li>
                        <li>Upload malicious software or harmful code.</li>
                        <li>Abuse automated systems, scraping, or excessive requests.</li>
                        <li>Interfere with the normal operation of the platform.</li>
                        <li>Use the service to facilitate fraud or other harmful activity.</li>
                    </ul>
                </>
            ),
        },
        {
            id: "privacy",
            title: "6. Privacy and Personal Information",
            icon: ShieldCheck,
            content: (
                <>
                    <p>
                        Your use of LookAtLocal may involve the collection and processing
                        of information necessary to provide the platform's features.
                    </p>
                    <p>
                        Our privacy practices and your available privacy controls are
                        described in the applicable Privacy Policy and Privacy Settings.
                    </p>
                    <p>
                        You should review your privacy settings regularly and only
                        provide information that you are comfortable sharing.
                    </p>
                </>
            ),
        },
        {
            id: "location",
            title: "7. Location Features",
            icon: MapPin,
            content: (
                <>
                    <p>
                        LookAtLocal may provide features based on your location or
                        approximate location.
                    </p>
                    <p>
                        Location information may be used to provide relevant local
                        discovery, recommendations, and other location-based features.
                    </p>
                    <p>
                        You should review your device and LookAtLocal privacy settings
                        before enabling location-related features.
                    </p>
                    <p>
                        LookAtLocal should not be treated as a substitute for emergency
                        services or emergency location systems.
                    </p>
                </>
            ),
        },
        {
            id: "security",
            title: "8. Account Security",
            icon: Lock,
            content: (
                <>
                    <p>
                        You are responsible for taking reasonable steps to protect access
                        to your account, including keeping your password and other
                        authentication information confidential.
                    </p>
                    <p>
                        LookAtLocal may provide security features such as email
                        verification and other account-protection mechanisms. These
                        features do not guarantee that an account will never be
                        compromised.
                    </p>
                </>
            ),
        },
        {
            id: "availability",
            title: "9. Service Availability",
            icon: AlertTriangle,
            content: (
                <>
                    <p>
                        We may change, update, suspend, or discontinue parts of
                        LookAtLocal from time to time.
                    </p>
                    <p>
                        Features may be unavailable because of maintenance, technical
                        issues, third-party dependencies, network problems, or other
                        circumstances.
                    </p>
                    <p>
                        We do not guarantee uninterrupted or error-free availability of
                        the platform.
                    </p>
                </>
            ),
        },
        {
            id: "termination",
            title: "10. Account Suspension and Termination",
            icon: Ban,
            content: (
                <>
                    <p>
                        LookAtLocal may restrict, suspend, or terminate an account when
                        necessary to protect users, the platform, or comply with
                        applicable requirements.
                    </p>
                    <p>
                        You may choose to deactivate or delete your account through the
                        account settings when those features are available.
                    </p>
                    <p>
                        Account deletion may be permanent and may not be reversible.
                        Review the account deletion information carefully before taking
                        that action.
                    </p>
                </>
            ),
        },
        {
            id: "intellectual-property",
            title: "11. Intellectual Property",
            icon: Scale,
            content: (
                <>
                    <p>
                        LookAtLocal and its associated software, branding, interface,
                        design, and original platform content may be protected by
                        intellectual property laws.
                    </p>
                    <p>
                        You may not copy, modify, distribute, reverse engineer, or
                        commercially exploit platform components without appropriate
                        authorization.
                    </p>
                    <p>
                        You retain responsibility for ensuring that content you submit
                        does not infringe the rights of others.
                    </p>
                </>
            ),
        },
        {
            id: "disclaimers",
            title: "12. Disclaimers",
            icon: AlertTriangle,
            content: (
                <>
                    <p>
                        LookAtLocal is provided for local discovery and community
                        purposes. Information available through the platform may not
                        always be accurate, complete, or suitable for your particular
                        situation.
                    </p>
                    <p>
                        You are responsible for making your own decisions based on
                        information obtained through the platform.
                    </p>
                    <p>
                        Nothing on LookAtLocal should be interpreted as professional
                        legal, medical, financial, safety, or emergency advice.
                    </p>
                </>
            ),
        },
        {
            id: "changes",
            title: "13. Changes to These Terms",
            icon: FileText,
            content: (
                <>
                    <p>
                        We may update these Terms and Conditions as LookAtLocal evolves,
                        new features are introduced, or legal and operational
                        requirements change.
                    </p>
                    <p>
                        Updated terms will be made available through the platform.
                        Continued use of LookAtLocal after an update may be subject to
                        the revised terms.
                    </p>
                </>
            ),
        },
        {
            id: "contact",
            title: "14. Contact Us",
            icon: MessageCircle,
            content: (
                <>
                    <p>
                        If you have questions about these Terms and Conditions, you can
                        contact LookAtLocal support.
                    </p>
                    <a
                        href="mailto:support@lookatlocal.com"
                        className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        Contact Support
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
                            <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Terms & Conditions
                            </h1>

                            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                Please read these terms carefully before using LookAtLocal.
                            </p>

                            <p className="mt-3 text-xs text-gray-400 dark:text-gray-500">
                                Last updated: August 2026
                            </p>
                        </div>
                    </div>
                </header>

                <div className="p-5 mb-6 border border-amber-200 rounded-2xl bg-amber-50 dark:border-amber-900/40 dark:bg-amber-900/10">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="flex-shrink-0 w-5 h-5 mt-0.5 text-amber-600 dark:text-amber-400" />

                        <div>
                            <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-300">
                                Important
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-amber-800 dark:text-amber-400">
                                These terms describe the intended rules for using
                                LookAtLocal. Before publishing this page for production,
                                have the final terms reviewed for the laws and requirements
                                applicable to your service.
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
                        placeholder="Search terms..."
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
                            <ShieldCheck className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </div>

                        <div>
                            <h2 className="text-sm font-semibold text-gray-950 dark:text-white">
                                Questions about these terms?
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                If you have questions about your rights, account, content,
                                privacy, or how LookAtLocal works, contact support before
                                continuing to use the service.
                            </p>

                            <a
                                href="mailto:support@lookatlocal.com"
                                className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center mt-8 text-xs text-gray-400 gap-x-6 gap-y-2 dark:text-gray-500">
                    <Link
                        to="/privacy"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Privacy Policy
                    </Link>

                    <Link
                        to="/help"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Help Center
                    </Link>

                    <Link
                        to="/settings"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Settings
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

export default Terms;