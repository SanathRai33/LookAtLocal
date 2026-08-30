import React, { useState } from 'react';
import { Loader2, Save, Shield } from 'lucide-react';
import PasswordInput from './PasswordInput';

const initialFormData = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
};

const ChnagePasswordForm = ({
    onSubmit,
    loading,
    success,
    onCancel,
}) => {
    const [formData, setFormData] = useState(initialFormData);

    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const togglePassword = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const disabled = loading || success;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PasswordInput
                name="currentPassword"
                label="Current Password"
                placeholder="Enter your current password"
                value={formData.currentPassword}
                visible={showPasswords.currentPassword}
                disabled={disabled}
                onChange={handleChange}
                onToggle={() => togglePassword('currentPassword')}
            />

            <PasswordInput
                name="newPassword"
                label="New Password"
                placeholder="Enter your new password"
                value={formData.newPassword}
                visible={showPasswords.newPassword}
                disabled={disabled}
                onChange={handleChange}
                onToggle={() => togglePassword('newPassword')}
            />

            <PasswordInput
                name="confirmNewPassword"
                label="Confirm New Password"
                placeholder="Confirm your new password"
                value={formData.confirmNewPassword}
                visible={showPasswords.confirmNewPassword}
                disabled={disabled}
                onChange={handleChange}
                onToggle={() => togglePassword('confirmNewPassword')}
            />

            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={
                        disabled ||
                        !formData.currentPassword ||
                        !formData.newPassword ||
                        !formData.confirmNewPassword
                    }
                    className="flex items-center justify-center flex-1 h-12 gap-3 px-3 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Update Password
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="flex h-12 min-w-[140px] items-center justify-center rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                    Cancel
                </button>
            </div>

            <div className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                    <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                            Password Security Tips
                        </p>

                        <ul className="mt-1 space-y-1 text-xs text-blue-700 dark:text-blue-400">
                            <li>• Use a unique password that you don't use elsewhere</li>
                            <li>• Avoid personal information like your name or birthdate</li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ChnagePasswordForm;