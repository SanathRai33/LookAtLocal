import { useState, useEffect, createContext, useContext } from 'react';
import { authApi } from '../api/auth.api';
import { userApi } from '../api/user.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await userApi.getMyProfile();

      const userData = response.data.data;

      setUser(userData);
      setIsAuthenticated(true);

      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);

      return {
        success: false,
        error:
          error.response?.data?.message || 'Failed to fetch profile',
      };
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const response = await userApi.getMyProfile();

      const userData = response.data.data;

      setUser(userData);
      setIsAuthenticated(true);

      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);

      return {
        success: false,
        error:
          error.response?.data?.message || 'Failed to fetch profile',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password });

      const { accessToken } = response.data.data;

      localStorage.setItem('token', accessToken);

      const profileResponse = await userApi.getMyProfile();
      const userData = profileResponse.data.data;

      setUser(userData);
      setIsAuthenticated(true);

      return {
        success: true,
        data: userData,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      const { user, accessToken } = response.data.data;
      localStorage.setItem('token', accessToken);
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const changePassword = async (data) => {
    try {
      await authApi.changePassword(data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Password change failed'
      };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authApi.forgotPassword(email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send reset email'
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      await authApi.resetPassword({ token, newPassword });
      return {
        success: true,
        message: 'Password reset successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Password reset failed'
      };
    }
  };

  const updateUser = async (data) => {
    try {
      const response = await userApi.updateMyProfile(data);
      const updatedUser = response.data.data;
      setUser(updatedUser);
      return { success: true, data: updatedUser };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  const verifyEmail = async (token) => {
    try {
      await authApi.verifyEmail(token);
      await refreshUser();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Email verification failed'
      };
    }
  };

  const sendVerificationEmail = async () => {
    try {
      await authApi.sendVerificationEmail();

      return {
        success: true,
        message: "Verification email sent successfully.",
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Failed to send verification email",
      };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      loading,
      login,
      register,
      logout,
      fetchUser,
      refreshUser,
      changePassword,
      forgotPassword,
      resetPassword,
      updateUser,
      verifyEmail,
      sendVerificationEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};