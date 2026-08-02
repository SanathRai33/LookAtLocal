import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { ArrowRightToLine, Phone } from 'lucide-react';
import SocialLogin from './components/SocialLogin';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Login:', formData);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                    Login
                </h1>

                <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
                    Welcome back to your community
                </p>
            </div>

            <LoginForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} showPassword={showPassword} setShowPassword={setShowPassword} />

            <div className="my-8 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200 dark:bg-slate-800" />

                <span className="whitespace-nowrap text-xs text-gray-500 sm:text-sm">
                    or continue with
                </span>

                <div className="h-px flex-1 bg-gray-200 dark:bg-slate-800" />
            </div>

            <SocialLogin />

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="font-medium text-gray-950 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;