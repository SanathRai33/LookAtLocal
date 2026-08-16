import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../assets/animations/NotFound.json';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <main className="flex items-center justify-center min-h-screen px-6 bg-white dark:bg-slate-950">
            <div className="w-full max-w-2xl py-12 text-center">
                <div className="w-full max-w-md mx-auto">
                    <Lottie
                        animationData={notFoundAnimation}
                        loop
                        autoplay
                    />
                </div>

                <div className="max-w-lg mx-auto -mt-4">
                    <div className="inline-flex items-center px-3 py-1 mb-4 text-xs font-semibold text-blue-600 rounded-full bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400">
                        Error 404
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-5xl">
                        Page not found
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400 sm:text-base">
                        The page you're looking for doesn't exist or may have
                        been moved. Let's get you back to your local community.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-3 mt-8 sm:flex-row">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 transition border border-gray-200 rounded-xl dark:border-slate-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>

                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                        >
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;