import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import ChnagePasswordForm from './components/ChnagePasswordForm';

const ChangePassword = () => {
    const navigate = useNavigate();
    const { changePassword } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError('');

        const result = await changePassword(formData);

        if (result.success) {
            setSuccess(true);

            setTimeout(() => {
                navigate('/settings');
            }, 3000);
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/settings')}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Settings
                    </button>

                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                        Change Password
                    </h1>

                    <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                        Update your password to keep your account secure
                    </p>
                </div>

                {error && (
                    <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-start gap-2 p-3 mb-4 text-sm rounded-lg text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400">
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <span>Password changed successfully! Redirecting...</span>
                    </div>
                )}

                <ChnagePasswordForm
                    onSubmit={handleSubmit}
                    loading={loading}
                    success={success}
                    onCancel={() => navigate('/settings')}
                />
            </div>
        </div>
    );
};

export default ChangePassword;