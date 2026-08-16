import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { authApi } from '../../api/auth.api';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState('');
    const [resendSuccess, setResendSuccess] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');

        if (token) {
            verifyEmail(token);
        } else {
            setVerifying(false);
            if (user?.isEmailVerified) {
                setVerified(true);
            }
        }
    }, [location, user]);

    const verifyEmail = async (token) => {
        setVerifying(true);
        setError('');
        try {
            await authApi.verifyEmail(token);
            setVerified(true);
            await refreshUser();
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            setError(error.response?.data?.message || 'Email verification failed');
        } finally {
            setVerifying(false);
        }
    };

    const handleResendVerification = async () => {
        setLoading(true);
        setError('');
        setResendSuccess(false);
        try {
            await authApi.resendVerificationEmail();
            setResendSuccess(true);
            setTimeout(() => {
                setResendSuccess(false);
            }, 5000);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to resend verification email');
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 mx-auto text-blue-600 animate-spin" />
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Verifying your email...</p>
                </div>
            </div>
        );
    }

    if (verified) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
                <div className="w-full max-w-md mx-auto text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30">
                            <CheckCircle className="w-10 h-10 text-emerald-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
                        Email Verified!
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Your email has been successfully verified.
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">
                        Redirecting to home page...
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center w-full h-12 gap-2 mt-6 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        Go to Home
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-md p-8 mx-auto">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-950/30">
                            <Mail className="w-10 h-10 text-blue-500" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-950 dark:text-white">
                        Verify Your Email
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        We've sent a verification link to your email address.
                    </p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Please check your inbox and click the link to verify your account.
                    </p>
                </div>

                {error && (
                    <div className="flex items-start gap-2 p-3 mt-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {resendSuccess && (
                    <div className="flex items-start gap-2 p-3 mt-4 text-sm rounded-lg text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400">
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>Verification email sent successfully!</span>
                    </div>
                )}

                <div className="mt-6 space-y-4">
                    <button
                        onClick={handleResendVerification}
                        disabled={loading}
                        className="flex items-center justify-center w-full h-12 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            'Resend Verification Email'
                        )}
                    </button>

                    <Link
                        to="/"
                        className="flex items-center justify-center w-full h-12 text-base font-semibold text-gray-700 transition border border-gray-300 rounded-2xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                    >
                        Go to Home
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Wrong email?{' '}
                        <Link
                            to="/profile/edit"
                            className="font-medium transition text-gray-950 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                        >
                            Update your email
                        </Link>
                    </p>
                </div>

                <div className="p-4 mt-6 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
                    <p className="text-xs text-yellow-800 dark:text-yellow-400">
                        <strong>Didn't receive the email?</strong> Check your spam folder or try resending the verification link.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;