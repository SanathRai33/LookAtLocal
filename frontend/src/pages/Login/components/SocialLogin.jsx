import React from 'react';
import { socialProviders } from '../data/mockLoginData';
import { ArrowRightToLine } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaWhatsapp  } from "react-icons/fa6";

const SocialLogin = () => {
    return (
        <div className="grid gap-5 sm:grid-cols-2">
            <button
                type="button"
                className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white text-sm font-medium text-gray-950 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 sm:text-base"
            >
                <FcGoogle className="h-5 w-5" />
                Google
            </button>

            <button
                type="button"
                className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white text-sm font-medium text-gray-950 transition hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 sm:text-base"
            >
                <FaWhatsapp className="h-5 w-5 text-green-500" />
                Mobile OTP
            </button>
        </div>
    )
}

export default SocialLogin
