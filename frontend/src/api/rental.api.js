import api from './axios';

export const rentalApi = {
  createRental: (data) => api.post('/rentals', data),
  getRentals: (params) => api.get('/rentals', { params }),
  getMyRentals: (params) => api.get('/rentals/my-listings', { params }),
  getRentalById: (rentalId) => api.get(`/rentals/${rentalId}`),
  updateRental: (rentalId, data) => api.patch(`/rentals/${rentalId}`, data),
  deleteRental: (rentalId) => api.delete(`/rentals/${rentalId}`),
};