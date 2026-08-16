import { useState, useEffect } from 'react';
import { userApi } from '../api/user.api';
import { useAuth } from '../context/AuthContext';

export const useUser = () => {
    const { user: authUser, setUser, isAuthenticated } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getMyProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.getMyProfile();
            const userData = response.data.data;
            setUser(userData);
            return { success: true, data: userData };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const updateMyProfile = async (profileData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.updateMyProfile(profileData);
            const userData = response.data.data;
            setUser(userData);
            return { success: true, data: userData };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to update profile';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const deleteMyAccount = async () => {
        setLoading(true);
        setError(null);
        try {
            await userApi.deleteMyAccount();
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to delete account';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const getPublicProfile = async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await userApi.getPublicProfile(userId);
            return { success: true, data: response.data.data };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to fetch user profile';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    return {
        getMyProfile,
        updateMyProfile,
        deleteMyAccount,
        getPublicProfile,
        loading,
        error,
    };
};