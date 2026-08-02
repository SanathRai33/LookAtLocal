import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    User,
    Mail,
    Phone,
    LockKeyhole,
    MapPin,
    UserPlus,
    Eye,
    EyeOff,
} from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.agreeTerms) {
            return;
        }

        console.log('Register:', formData);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                    Create account
                </h1>

                <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                    Join your local community today
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200"
                    >
                        Full name
                    </label>

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Arjun Mehta"
                            autoComplete="name"
                            required
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200"
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
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200"
                    >
                        Mobile number
                    </label>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            autoComplete="tel"
                            required
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200"
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
                            placeholder="Create a strong password"
                            autoComplete="new-password"
                            required
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700 dark:hover:text-gray-200"
                            aria-label={
                                showPassword ? 'Hide password' : 'Show password'
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="mb-2 block text-sm font-medium text-gray-950 dark:text-gray-200"
                    >
                        Confirm Password
                    </label>

                    <div className="relative">
                        <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type='password'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            required
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <input
                        id="agreeTerms"
                        name="agreeTerms"
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        required
                        className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-gray-950"
                    />

                    <label
                        htmlFor="agreeTerms"
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
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl bg-gray-950 text-base font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    <UserPlus className="h-5 w-5" />
                    Create Account
                </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="font-medium text-gray-950 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;