import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    LockKeyhole,
    Eye,
    EyeOff,
    Loader2,
    CheckCircle,
    AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetPassword } = useAuth();

    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [tokenError, setTokenError] = useState(false);
    const [tokenVerified, setTokenVerified] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tokenParam = searchParams.get('token');

        if (tokenParam && tokenParam.length > 0) {
            setToken(tokenParam);
            setTokenVerified(true);
            setTokenError(false);
        } else {
            setTokenError(true);
            setTokenVerified(false);
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError('');

        const result = await resetPassword(
            token,
            formData.newPassword,
            formData.confirmNewPassword
        );

        if (result.success) {
            setSuccess(true);

            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } else {
            setError(
                result.error ||
                'Password reset failed. Please try again.'
            );
        }

        setLoading(false);
    };

    if (tokenError) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="mb-8 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-950/30">
                            <AlertCircle className="w-8 h-8 text-red-500" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Invalid reset link
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        The password reset link is missing or invalid.
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Please request a new password reset link.
                    </p>
                </div>

                <Link
                    to="/forgot-password"
                    className="flex items-center justify-center w-full h-12 gap-2 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Request new reset link
                </Link>
            </div>
        );
    }

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
                        Password reset successful
                    </h1>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Your password has been reset successfully.
                    </p>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Redirecting to login...
                    </p>
                </div>

                <Link
                    to="/login"
                    className="flex items-center justify-center w-full h-12 gap-2 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    Go to login
                </Link>
            </div>
        );
    }

    if (!tokenVerified) {
        return (
            <div className="w-full max-w-md mx-auto">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 mx-auto text-blue-600 animate-spin" />
                        <p className="mt-4 text-gray-500 dark:text-gray-400">
                            Verifying reset link...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                    Create new password
                </h1>

                <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                    Enter your new password below.
                </p>
            </div>

            {error && (
                <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="newPassword"
                        className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200 sm:text-base"
                    >
                        New password
                    </label>

                    <div className="relative">
                        <LockKeyhole className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />

                        <input
                            id="newPassword"
                            name="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.newPassword}
                            onChange={handleChange}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            required
                            disabled={loading}
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
                            }
                            disabled={loading}
                            className="absolute text-gray-400 transition -translate-y-1/2 right-4 top-1/2 hover:text-gray-700 disabled:opacity-60 dark:hover:text-gray-200"
                            aria-label={
                                showPassword
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <div className="mt-4">
                    <label
                        htmlFor="confirmNewPassword"
                        className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200 sm:text-base"
                    >
                        Confirm password
                    </label>

                    <div className="relative">
                        <LockKeyhole className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />

                        <input
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            type={
                                showConfirmPassword
                                    ? 'text'
                                    : 'password'
                            }
                            value={formData.confirmNewPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            autoComplete="new-password"
                            required
                            disabled={loading}
                            className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword((prev) => !prev)
                            }
                            disabled={loading}
                            className="absolute text-gray-400 transition -translate-y-1/2 right-4 top-1/2 hover:text-gray-700 disabled:opacity-60 dark:hover:text-gray-200"
                            aria-label={
                                showConfirmPassword
                                    ? 'Hide password'
                                    : 'Show password'
                            }
                        >
                            {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={
                        loading ||
                        !formData.newPassword ||
                        !formData.confirmNewPassword
                    }
                    className="flex items-center justify-center w-full h-12 gap-3 mt-6 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Resetting password...
                        </>
                    ) : (
                        'Reset password'
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

export default ResetPassword;