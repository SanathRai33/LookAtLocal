import React from 'react';
import { LockKeyhole, Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
    name,
    label,
    placeholder,
    value,
    visible,
    disabled,
    onChange,
    onToggle,
    matchState,
}) => {
    const borderClass =
        matchState === true
            ? 'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10'
            : matchState === false
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700 dark:focus:border-blue-500';

    return (
        <div>
            <label
                htmlFor={name}
                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
                {label}
            </label>

            <div className="relative">
                <LockKeyhole className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />

                <input
                    id={name}
                    name={name}
                    type={visible ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    disabled={disabled}
                    className={`h-[42px] w-full rounded-2xl border bg-gray-50 pl-12 pr-12 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${borderClass}`}
                />

                <button
                    type="button"
                    onClick={onToggle}
                    disabled={disabled}
                    className="absolute text-gray-400 transition -translate-y-1/2 right-4 top-1/2 hover:text-gray-700 disabled:opacity-60 dark:hover:text-gray-200"
                >
                    {visible ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default PasswordInput;