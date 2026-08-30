import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { ArrowRightToLine, Phone } from 'lucide-react';
import SocialLogin from './components/SocialLogin';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
        setLoading(false);
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

            {error && (
                <div className="p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <LoginForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
            />

            <div className="flex items-center gap-4 my-8">
                {/* <div className="flex-1 h-px bg-gray-200 dark:bg-slate-800" />
                <span className="text-xs text-gray-500 whitespace-nowrap sm:text-sm">
                    or continue with
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-slate-800" /> */}
            </div>

            {/* <SocialLogin /> */}

            <p className="mt-8 text-sm text-center text-gray-500 dark:text-gray-400 sm:text-base">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="font-medium transition text-gray-950 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;