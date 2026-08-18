import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    ChevronDown,
    Mail,
    ShieldCheck,
    UserRound,
    Lock,
    MapPin,
    Settings,
    MessageCircle,
    FileQuestion,
    ArrowRight,
    HelpCircle,
    X,
} from "lucide-react";

const Help = () => {
    const [search, setSearch] = useState("");
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        {
            icon: UserRound,
            title: "Account",
            description: "Manage your account, profile, and personal information.",
            link: "/settings",
        },
        {
            icon: Mail,
            title: "Email",
            description: "Learn about email verification and email settings.",
            link: "/settings/email",
        },
        {
            icon: ShieldCheck,
            title: "Privacy & Security",
            description: "Control your privacy, visibility, and account security.",
            link: "/settings/privacy",
        },
        {
            icon: MapPin,
            title: "Location",
            description: "Understand location sharing and local discovery.",
            link: "/settings/privacy",
        },
        {
            icon: Settings,
            title: "Settings",
            description: "Manage your LookAtLocal preferences and account settings.",
            link: "/settings",
        },
        {
            icon: MessageCircle,
            title: "Contact Support",
            description: "Need more help? Get in touch with our support team.",
            link: "#contact-support",
        },
    ];

    const faqs = [
        {
            question: "How do I change my account information?",
            answer:
                "Open Settings and choose the relevant section to manage your profile, email, phone number, privacy, language, or other account preferences.",
        },
        {
            question: "How do I verify my email?",
            answer:
                "Go to Settings → Email Settings and select Send Verification Email. Open the verification email and use the verification link. Email verification is optional and does not prevent you from using your account.",
        },
        {
            question: "What happens if I don't verify my email?",
            answer:
                "You can continue using LookAtLocal normally. Verification is optional, but verifying your email helps confirm that you own the email address associated with your account.",
        },
        {
            question: "How do I manage my privacy?",
            answer:
                "Open Settings → Privacy & Security. You can manage profile visibility, search discoverability, activity visibility, location preferences, communication preferences, and personalization options.",
        },
        {
            question: "How do I change my phone number?",
            answer:
                "Open Settings → Phone Settings. Phone verification functionality is being prepared and will be available in a future update.",
        },
        {
            question: "Can I deactivate my account instead of deleting it?",
            answer:
                "Yes. If you only want to take a break from LookAtLocal, deactivation is the safer option. Visit Settings → Delete Account to review the available account options.",
        },
        {
            question: "Can I permanently delete my account?",
            answer:
                "Yes. Go to Settings → Delete Account and carefully review the warnings before proceeding. Permanent deletion should only be used when you are certain that you no longer need the account.",
        },
        {
            question: "Why is my location important on LookAtLocal?",
            answer:
                "LookAtLocal is designed around local discovery. Location can help provide relevant local content and recommendations. Your privacy settings allow you to control how location information is used and displayed.",
        },
    ];

    const filteredFaqs = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return faqs;

        return faqs.filter(
            (faq) =>
                faq.question.toLowerCase().includes(query) ||
                faq.answer.toLowerCase().includes(query)
        );
    }, [search]);

    const toggleFaq = (index) => {
        setOpenFaq((current) => (current === index ? null : index));
    };

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:py-12">
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        Back to LookAtLocal
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
                            <HelpCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white">
                                Help & Support
                            </h1>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Find answers and learn how to get the most out of LookAtLocal.
                            </p>
                        </div>
                    </div>
                </div>

                <section className="relative p-6 mb-8 overflow-hidden rounded-2xl bg-slate-900 sm:p-8 dark:bg-slate-900">
                    <div className="relative z-10 max-w-2xl">
                        <p className="mb-2 text-sm font-medium text-blue-300">
                            How can we help?
                        </p>

                        <h2 className="text-2xl font-bold text-white sm:text-3xl">
                            Search the LookAtLocal Help Center
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-300">
                            Search for answers about your account, privacy, email,
                            phone, settings, and more.
                        </p>

                        <div className="relative mt-6">
                            <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-slate-400" />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search for help..."
                                className="w-full py-4 pl-12 pr-12 text-sm bg-white border outline-none border-white/10 rounded-xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
                            />

                            {search && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-slate-700"
                                    aria-label="Clear search"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="absolute w-64 h-64 rounded-full -right-20 -top-24 bg-blue-600/20 blur-3xl" />
                    <div className="absolute w-64 h-64 rounded-full -bottom-32 right-20 bg-indigo-500/10 blur-3xl" />
                </section>

                {!search && (
                    <section className="mb-10">
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                                Browse Help Topics
                            </h2>

                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Find help based on what you are trying to do.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {categories.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <Link
                                        key={category.title}
                                        to={category.link}
                                        className="p-5 transition-all bg-white border border-gray-200 group rounded-2xl hover:border-blue-300 hover:shadow-md dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-700"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-slate-800">
                                                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                            </div>

                                            <ArrowRight className="w-4 h-4 text-gray-400 transition-transform group-hover:translate-x-1" />
                                        </div>

                                        <h3 className="mt-4 text-sm font-semibold text-gray-950 dark:text-white">
                                            {category.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                            {category.description}
                                        </p>
                                    </Link>
                                );
                            })}
                        </div>
                    </section>
                )}

                <section>
                    <div className="mb-5">
                        <h2 className="text-xl font-bold text-gray-950 dark:text-white">
                            {search ? "Search Results" : "Frequently Asked Questions"}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {search
                                ? `${filteredFaqs.length} ${filteredFaqs.length === 1 ? "result" : "results"
                                } found`
                                : "Quick answers to common LookAtLocal questions."}
                        </p>
                    </div>

                    {filteredFaqs.length > 0 ? (
                        <div className="overflow-hidden bg-white border border-gray-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800">
                            {filteredFaqs.map((faq, index) => {
                                const isOpen = openFaq === index;

                                return (
                                    <div
                                        key={faq.question}
                                        className="border-b border-gray-200 last:border-b-0 dark:border-slate-800"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFaq(index)}
                                            className="flex items-center justify-between w-full gap-6 p-5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/50"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="text-sm font-semibold text-gray-950 dark:text-white">
                                                {faq.question}
                                            </span>

                                            <ChevronDown
                                                className={`flex-shrink-0 w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div className="px-5 pb-5">
                                                <p className="max-w-3xl text-sm leading-7 text-gray-500 dark:text-gray-400">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-10 text-center bg-white border border-gray-200 rounded-2xl dark:bg-slate-900 dark:border-slate-800">
                            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-gray-100 rounded-full dark:bg-slate-800">
                                <FileQuestion className="w-6 h-6 text-gray-500" />
                            </div>

                            <h3 className="mt-4 text-base font-semibold text-gray-950 dark:text-white">
                                No results found
                            </h3>

                            <p className="max-w-md mx-auto mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                We couldn't find an answer matching your search. Try using
                                different words or contact support.
                            </p>

                            <button
                                type="button"
                                onClick={clearSearch}
                                className="px-5 py-2.5 mt-5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </section>

                <section
                    id="contact-support"
                    className="p-6 mt-10 border border-gray-200 rounded-2xl bg-gray-50 sm:p-8 dark:border-slate-800 dark:bg-slate-900"
                >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center flex-shrink-0 bg-blue-100 w-11 h-11 rounded-xl dark:bg-blue-900/30">
                                <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div>
                                <h2 className="text-base font-semibold text-gray-950 dark:text-white">
                                    Still need help?
                                </h2>

                                <p className="max-w-xl mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                                    If you can't find what you're looking for, contact
                                    LookAtLocal support and we'll help you with your issue.
                                </p>
                            </div>
                        </div>

                        <a
                            href="mailto:support@lookatlocal.com"
                            className="inline-flex items-center justify-center flex-shrink-0 gap-2 px-5 py-3 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Support
                        </a>
                    </div>
                </section>

                <div className="flex flex-wrap items-center justify-center mt-8 text-xs text-gray-400 gap-x-6 gap-y-2">
                    <Link
                        to="/settings/privacy"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Privacy
                    </Link>

                    <Link
                        to="/settings"
                        className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
                    >
                        Settings
                    </Link>

                    <span>LookAtLocal Help Center</span>
                </div>
            </div>
        </div>
    );
};

export default Help;