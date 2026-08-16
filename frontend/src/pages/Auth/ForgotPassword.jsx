import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await forgotPassword(email);

        if (result.success) {
            setSuccess(true);
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    if (success) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/30">
                            <CheckCircle className="w-8 h-8 text-emerald-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Check your email
                    </h1>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        We've sent a password reset link to{' '}
                        <span className="font-medium text-gray-900 dark:text-white">
                            {email}
                        </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        The link will expire in 15 minutes.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center justify-center w-full h-12 gap-2 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Back to login
                    </button>

                    <button
                        onClick={() => {
                            setSuccess(false);
                            setEmail('');
                        }}
                        className="flex items-center justify-center w-full h-12 gap-2 text-base font-semibold text-gray-700 transition border border-gray-300 rounded-2xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                    >
                        Try another email
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
                <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to login
                </Link>

                <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                    Reset your password
                </h1>
                <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>

            {error && (
                <div className="p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

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
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            disabled={loading}
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !email}
                    className="flex items-center justify-center w-full h-12 gap-3 mt-6 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending reset link...
                        </>
                    ) : (
                        'Send reset link'
                    )}
                </button>
            </form>

            <p className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400">
                Remember your password?{' '}
                <Link
                    to="/login"
                    className="font-medium transition text-gray-950 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default ForgotPassword;