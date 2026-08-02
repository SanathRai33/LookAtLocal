import React from 'react'
import { Link } from 'react-router-dom';
import { ArrowRightToLine, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';

const LoginForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200 sm:text-base"
                >
                    Email address
                </label>

                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="mt-6">
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200 sm:text-base"
                >
                    Password
                </label>

                <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        required
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-gray-800 dark:text-gray-300 sm:text-base">
                    <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 accent-gray-950"
                    />

                    <span>Remember me</span>
                </label>

                <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-gray-950 transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 sm:text-base"
                >
                    Forgot password?
                </Link>
            </div>

            <button
                type="submit"
                className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-gray-950 text-base font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                <ArrowRightToLine className="h-5 w-5" />
                Login
            </button>
        </form>
    )
}

export default LoginForm
