import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import RegisterForm from './components/RegisterForm';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.acceptTerms) {
            setError('You must accept the Terms of Service and Privacy Policy');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        const { fullName, email, phone, password, acceptTerms } = formData;
        const result = await register({
            fullName,
            email,
            phone,
            password,
            confirmPassword: formData.confirmPassword,
            acceptTerms
        });

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
        setLoading(false);
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

            {error && (
                <div className="p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <RegisterForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                loading={loading}
            />

            <p className="text-sm text-center text-gray-500 mt-7 dark:text-gray-400 sm:text-base">
                Already have an account?{' '}
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

export default Register;