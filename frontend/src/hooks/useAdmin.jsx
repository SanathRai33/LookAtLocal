import { useState } from 'react';
import { adminApi } from '../api/admin.api';

export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRequest = async (apiCall) => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall();
            return { success: true, data: response.data.data, meta: response.data.meta };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Operation failed';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setLoading(false);
        }
    };

    const getDashboardStats = async () => {
        return handleRequest(() => adminApi.getDashboardStats());
    };

    const getUsers = async (params) => {
        return handleRequest(() => adminApi.getUsers(params));
    };

    const getUserById = async (userId) => {
        return handleRequest(() => adminApi.getUserById(userId));
    };

    const changeUserStatus = async (userId, data) => {
        return handleRequest(() => adminApi.changeUserStatus(userId, data));
    };

    const deleteUser = async (userId) => {
        return handleRequest(() => adminApi.deleteUser(userId));
    };

    const restoreUser = async (userId) => {
        return handleRequest(() => adminApi.restoreUser(userId));
    };

    const getPendingServices = async (params) => {
        return handleRequest(() => adminApi.getPendingServices(params));
    };

    const approveService = async (serviceId) => {
        return handleRequest(() => adminApi.approveService(serviceId));
    };

    const rejectService = async (serviceId, data) => {
        return handleRequest(() => adminApi.rejectService(serviceId, data));
    };

    const closeService = async (serviceId) => {
        return handleRequest(() => adminApi.closeService(serviceId));
    };

    const getPendingRentals = async (params) => {
        return handleRequest(() => adminApi.getPendingRentals(params));
    };

    const approveRental = async (rentalId) => {
        return handleRequest(() => adminApi.approveRental(rentalId));
    };

    const rejectRental = async (rentalId, data) => {
        return handleRequest(() => adminApi.rejectRental(rentalId, data));
    };

    const closeRental = async (rentalId) => {
        return handleRequest(() => adminApi.closeRental(rentalId));
    };

    const getPendingProducts = async (params) => {
        return handleRequest(() => adminApi.getPendingProducts(params));
    };

    const approveProduct = async (productId) => {
        return handleRequest(() => adminApi.approveProduct(productId));
    };

    const rejectProduct = async (productId, data) => {
        return handleRequest(() => adminApi.rejectProduct(productId, data));
    };

    const closeProduct = async (productId) => {
        return handleRequest(() => adminApi.closeProduct(productId));
    };

    const getPendingSpaces = async (params) => {
        return handleRequest(() => adminApi.getPendingSpaces(params));
    };

    const approveSpace = async (spaceId) => {
        return handleRequest(() => adminApi.approveSpace(spaceId));
    };

    const rejectSpace = async (spaceId, data) => {
        return handleRequest(() => adminApi.rejectSpace(spaceId, data));
    };

    const closeSpace = async (spaceId) => {
        return handleRequest(() => adminApi.closeSpace(spaceId));
    };

    const getPendingJobs = async (params) => {
        return handleRequest(() => adminApi.getPendingJobs(params));
    };

    const approveJob = async (jobId) => {
        return handleRequest(() => adminApi.approveJob(jobId));
    };

    const rejectJob = async (jobId, data) => {
        return handleRequest(() => adminApi.rejectJob(jobId, data));
    };

    const closeJob = async (jobId) => {
        return handleRequest(() => adminApi.closeJob(jobId));
    };

    const getReports = async (params) => {
        return handleRequest(() => adminApi.getReports(params));
    };

    const getReportById = async (reportId) => {
        return handleRequest(() => adminApi.getReportById(reportId));
    };

    const reviewReport = async (reportId) => {
        return handleRequest(() => adminApi.reviewReport(reportId));
    };

    const resolveReport = async (reportId, data) => {
        return handleRequest(() => adminApi.resolveReport(reportId, data));
    };

    const dismissReport = async (reportId, data) => {
        return handleRequest(() => adminApi.dismissReport(reportId, data));
    };

    const getReviews = async (params) => {
        return handleRequest(() => adminApi.getReviews(params));
    };

    const deleteReview = async (reviewId) => {
        return handleRequest(() => adminApi.deleteReview(reviewId));
    };

    const getCategories = async (params) => {
        return handleRequest(() => adminApi.getCategories(params));
    };

    const createCategory = async (data) => {
        return handleRequest(() => adminApi.createCategory(data));
    };

    const updateCategory = async (categoryId, data) => {
        return handleRequest(() => adminApi.updateCategory(categoryId, data));
    };

    const toggleCategoryStatus = async (categoryId) => {
        return handleRequest(() => adminApi.toggleCategoryStatus(categoryId));
    };

    const deleteCategory = async (categoryId) => {
        return handleRequest(() => adminApi.deleteCategory(categoryId));
    };

    const getPointsTransactions = async (params) => {
        return handleRequest(() => adminApi.getPointsTransactions(params));
    };

    const adjustUserPoints = async (userId, data) => {
        return handleRequest(() => adminApi.adjustUserPoints(userId, data));
    };

    const getServiceBookings = async (params) => {
        return handleRequest(() => adminApi.getServiceBookings(params));
    };

    const getRentalBookings = async (params) => {
        return handleRequest(() => adminApi.getRentalBookings(params));
    };

    const getBookingById = async (bookingId) => {
        return handleRequest(() => adminApi.getBookingById(bookingId));
    };

    const sendNotificationToUser = async (data) => {
        return handleRequest(() => adminApi.sendNotificationToUser(data));
    };

    const sendNotificationToUsers = async (data) => {
        return handleRequest(() => adminApi.sendNotificationToUsers(data));
    };

    const sendPlatformNotification = async (data) => {
        return handleRequest(() => adminApi.sendPlatformNotification(data));
    };

    return {
        loading,
        error,
        getDashboardStats,
        getUsers,
        getUserById,
        changeUserStatus,
        deleteUser,
        restoreUser,
        getPendingServices,
        approveService,
        rejectService,
        closeService,
        getPendingRentals,
        approveRental,
        rejectRental,
        closeRental,
        getPendingProducts,
        approveProduct,
        rejectProduct,
        closeProduct,
        getPendingSpaces,
        approveSpace,
        rejectSpace,
        closeSpace,
        getPendingJobs,
        approveJob,
        rejectJob,
        closeJob,
        getReports,
        getReportById,
        reviewReport,
        resolveReport,
        dismissReport,
        getReviews,
        deleteReview,
        getCategories,
        createCategory,
        updateCategory,
        toggleCategoryStatus,
        deleteCategory,
        getPointsTransactions,
        adjustUserPoints,
        getServiceBookings,
        getRentalBookings,
        getBookingById,
        sendNotificationToUser,
        sendNotificationToUsers,
        sendPlatformNotification,
    };
};