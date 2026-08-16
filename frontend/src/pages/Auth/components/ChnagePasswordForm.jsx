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

    const validatePassword = (password) => [
        password.length >= 8,
        /[A-Z]/.test(password),
        /[a-z]/.test(password),
        /\d/.test(password),
        /[^A-Za-z0-9]/.test(password),
    ];

    const getPasswordStrength = (password) => {
        if (!password) {
            return {
                label: 'No password',
                color: 'bg-gray-200 dark:bg-slate-700',
            };
        }

        const score = validatePassword(password).filter(Boolean).length;

        if (score <= 2) return { label: 'Weak', color: 'bg-red-500' };
        if (score === 3) return { label: 'Fair', color: 'bg-yellow-500' };
        if (score === 4) return { label: 'Good', color: 'bg-blue-500' };

        return { label: 'Strong', color: 'bg-emerald-500' };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const passwordRules = validatePassword(formData.newPassword);
    const passwordStrength = getPasswordStrength(formData.newPassword);

    const disabled = loading || success;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Current Password */}
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

            {/* New Password */}
            <div>
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

                {formData.newPassword && (
                    <>
                        {/* Strength */}
                        <div className="mt-2">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                                    <div
                                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                                        style={{
                                            width: `${(passwordRules.filter(Boolean).length / 5) * 100}%`,
                                        }}
                                    />
                                </div>

                                <span
                                    className={`text-xs font-medium ${passwordStrength.color.replace(
                                        'bg-',
                                        'text-'
                                    )}`}
                                >
                                    {passwordStrength.label}
                                </span>
                            </div>
                        </div>
                    </>
                )}

                {/* Password Rules */}
                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    <p>Password must contain:</p>

                    <ul className="mt-1 space-y-0.5 list-disc list-inside">
                        {[
                            ['At least 8 characters', passwordRules[0]],
                            ['At least one uppercase letter', passwordRules[1]],
                            ['At least one lowercase letter', passwordRules[2]],
                            ['At least one number', passwordRules[3]],
                            ['At least one special character', passwordRules[4]],
                        ].map(([text, valid]) => (
                            <li
                                key={text}
                                className={valid ? 'text-emerald-500' : ''}
                            >
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <PasswordInput
                    name="confirmNewPassword"
                    label="Confirm New Password"
                    placeholder="Confirm your new password"
                    value={formData.confirmNewPassword}
                    visible={showPasswords.confirmNewPassword}
                    disabled={disabled}
                    onChange={handleChange}
                    onToggle={() => togglePassword('confirmNewPassword')}
                    matchState={
                        formData.confirmNewPassword
                            ? formData.newPassword === formData.confirmNewPassword
                            : null
                    }
                />

                {formData.confirmNewPassword && (
                    <p
                        className={`mt-1 text-xs ${formData.newPassword === formData.confirmNewPassword
                                ? 'text-emerald-500'
                                : 'text-red-500'
                            }`}
                    >
                        {formData.newPassword === formData.confirmNewPassword
                            ? '✓ Passwords match'
                            : '✗ Passwords do not match'}
                    </p>
                )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
                <button
                    type="submit"
                    disabled={
                        disabled ||
                        !formData.currentPassword ||
                        !formData.newPassword ||
                        !formData.confirmNewPassword
                    }
                    className="flex items-center justify-center h-12 gap-3 px-3 text-base font-semibold text-white transition rounded-2xl bg-gray-950 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
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

            {/* Security Tips */}
            <div className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

                    <div>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                            Password Security Tips
                        </p>

                        <ul className="mt-1 space-y-1 text-xs text-blue-700 dark:text-blue-400">
                            <li>• Use a unique password that you don't use elsewhere</li>
                            <li>• Make it at least 8 characters long</li>
                            <li>• Include uppercase, lowercase, numbers, and symbols</li>
                            <li>• Avoid personal information like your name or birthdate</li>
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ChnagePasswordForm;