import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightToLine, Eye, EyeOff, LockKeyhole, Mail, Loader2 } from 'lucide-react';

const LoginForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, loading }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200 sm:text-base"
                >
                    Email address
                </label>
                <div className="relative">
                    <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        disabled={loading}
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200 sm:text-base"
                >
                    Password
                </label>
                <div className="relative">
                    <LockKeyhole className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        required
                        disabled={loading}
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute text-gray-400 transition -translate-y-1/2 right-4 top-1/2 hover:text-gray-700 disabled:opacity-60 dark:hover:text-gray-200"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        disabled={loading}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-6">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-800 dark:text-gray-300 sm:text-base">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-4 h-4 border-gray-300 rounded accent-gray-950 disabled:opacity-60"
                    />
                    <span>Remember me</span>
                </label>
                <Link
                    to="/forgot-password"
                    className="text-sm font-medium transition text-gray-950 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 sm:text-base"
                >
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full h-12 gap-3 text-base font-semibold text-white transition mt-7 rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Logging in...
                    </>
                ) : (
                    <>
                        <ArrowRightToLine className="w-5 h-5" />
                        Login
                    </>
                )}
            </button>
        </form>
    );
};

export default LoginForm;