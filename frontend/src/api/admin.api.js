import api from './axios';

export const adminApi = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getUserById: (userId) => api.get(`/admin/users/${userId}`),
  changeUserStatus: (userId, data) => api.patch(`/admin/users/${userId}/status`, data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  restoreUser: (userId) => api.patch(`/admin/users/${userId}/restore`),

  getPendingServices: (params) => api.get('/admin/services/pending', { params }),
  approveService: (serviceId) => api.patch(`/admin/services/${serviceId}/approve`),
  rejectService: (serviceId, data) => api.patch(`/admin/services/${serviceId}/reject`, data),
  closeService: (serviceId) => api.patch(`/admin/services/${serviceId}/close`),

  getPendingRentals: (params) => api.get('/admin/rentals/pending', { params }),
  approveRental: (rentalId) => api.patch(`/admin/rentals/${rentalId}/approve`),
  rejectRental: (rentalId, data) => api.patch(`/admin/rentals/${rentalId}/reject`, data),
  closeRental: (rentalId) => api.patch(`/admin/rentals/${rentalId}/close`),

  getPendingProducts: (params) => api.get('/admin/products/pending', { params }),
  approveProduct: (productId) => api.patch(`/admin/products/${productId}/approve`),
  rejectProduct: (productId, data) => api.patch(`/admin/products/${productId}/reject`, data),
  closeProduct: (productId) => api.patch(`/admin/products/${productId}/close`),

  getPendingSpaces: (params) => api.get('/admin/spaces/pending', { params }),
  approveSpace: (spaceId) => api.patch(`/admin/spaces/${spaceId}/approve`),
  rejectSpace: (spaceId, data) => api.patch(`/admin/spaces/${spaceId}/reject`, data),
  closeSpace: (spaceId) => api.patch(`/admin/spaces/${spaceId}/close`),

  getPendingJobs: (params) => api.get('/admin/jobs/pending', { params }),
  approveJob: (jobId) => api.patch(`/admin/jobs/${jobId}/approve`),
  rejectJob: (jobId, data) => api.patch(`/admin/jobs/${jobId}/reject`, data),
  closeJob: (jobId) => api.patch(`/admin/jobs/${jobId}/close`),

  getReports: (params) => api.get('/admin/reports', { params }),
  getReportById: (reportId) => api.get(`/admin/reports/${reportId}`),
  reviewReport: (reportId) => api.patch(`/admin/reports/${reportId}/review`),
  resolveReport: (reportId, data) => api.patch(`/admin/reports/${reportId}/resolve`, data),
  dismissReport: (reportId, data) => api.patch(`/admin/reports/${reportId}/dismiss`, data),

  getReviews: (params) => api.get('/admin/reviews', { params }),
  deleteReview: (reviewId) => api.delete(`/admin/reviews/${reviewId}`),

  getCategories: (params) => api.get('/admin/categories', { params }),
  createCategory: (data) => api.post('/admin/categories', data),
  updateCategory: (categoryId, data) => api.patch(`/admin/categories/${categoryId}`, data),
  toggleCategoryStatus: (categoryId) => api.patch(`/admin/categories/${categoryId}/status`),
  deleteCategory: (categoryId) => api.delete(`/admin/categories/${categoryId}`),

  getPointsTransactions: (params) => api.get('/admin/points/transactions', { params }),
  adjustUserPoints: (userId, data) => api.post(`/admin/users/${userId}/points/adjust`, data),

  getServiceBookings: (params) => api.get('/admin/service-bookings', { params }),
  getRentalBookings: (params) => api.get('/admin/rental-bookings', { params }),
  getBookingById: (bookingId) => api.get(`/admin/bookings/${bookingId}`),

  sendNotificationToUser: (data) => api.post('/admin/notifications/user', data),
  sendNotificationToUsers: (data) => api.post('/admin/notifications/bulk', data),
  sendPlatformNotification: (data) => api.post('/admin/notifications/platform', data),
};