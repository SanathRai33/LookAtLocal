import React from 'react';
import { ArrowRightToLine } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FaWhatsapp  } from "react-icons/fa6";

const SocialLogin = () => {
    return (
        <div className="grid gap-5 sm:grid-cols-2">
            <button
                type="button"
                className="flex items-center justify-center h-12 gap-3 text-sm font-medium transition bg-white border border-gray-200 rounded-2xl text-gray-950 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 sm:text-base"
            >
                <FcGoogle className="w-5 h-5" />
                Google
            </button>

            <button
                type="button"
                className="flex items-center justify-center h-12 gap-3 text-sm font-medium transition bg-white border border-gray-200 rounded-2xl text-gray-950 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 sm:text-base"
            >
                <FaWhatsapp className="w-5 h-5 text-green-500" />
                Mobile OTP
            </button>
        </div>
    )
}

export default SocialLogin
