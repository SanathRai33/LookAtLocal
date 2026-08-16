import React from 'react';
import { Link } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    LockKeyhole,
    UserPlus,
    Eye,
    EyeOff,
    Loader2,
} from 'lucide-react';

const RegisterForm = ({ formData, handleChange, handleSubmit, showPassword, setShowPassword, loading }) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                >
                    Full name
                </label>
                <div className="relative">
                    <User className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Arjun Mehta"
                        autoComplete="name"
                        required
                        disabled={loading}
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
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
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                >
                    Mobile number
                </label>
                <div className="relative">
                    <Phone className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        required
                        disabled={loading}
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
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
                        placeholder="Create a strong password"
                        autoComplete="new-password"
                        required
                        disabled={loading}
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={loading}
                        className="absolute text-gray-400 transition -translate-y-1/2 right-4 top-1/2 hover:text-gray-700 disabled:opacity-60 dark:hover:text-gray-200"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                        ) : (
                            <Eye className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                >
                    Confirm Password
                </label>
                <div className="relative">
                    <LockKeyhole className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                        required
                        disabled={loading}
                        className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                </div>
            </div>

            <div className="flex items-start gap-3">
                <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-4 h-4 mt-1 border-gray-300 rounded shrink-0 accent-gray-950 disabled:opacity-60"
                />
                <label
                    htmlFor="acceptTerms"
                    className="text-sm leading-6 text-gray-500 dark:text-gray-400"
                >
                    I agree to the{' '}
                    <Link
                        to="/terms"
                        className="font-medium text-gray-950 hover:text-blue-600 dark:text-white"
                    >
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                        to="/privacy"
                        className="font-medium text-gray-950 hover:text-blue-600 dark:text-white"
                    >
                        Privacy Policy
                    </Link>
                </label>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full h-12 gap-3 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    <>
                        <UserPlus className="w-5 h-5" />
                        Create Account
                    </>
                )}
            </button>
        </form>
    );
};

export default RegisterForm;