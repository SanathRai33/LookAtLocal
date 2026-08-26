import api from "./axios";

export const serviceBookingApi = {
  createBooking: (data) => api.post("/service-bookings", data),

  getAvailability: (serviceId, params) => api.get(`/service-bookings/availability/${serviceId}`, {params}),

  getMyBookings: (params) => api.get("/service-bookings/my-bookings", { params}),

  getReceivedBookings: (params) => api.get("/service-bookings/received", {params}),

  getBookingById: (bookingId) => api.get(`/service-bookings/${bookingId}`),

  acceptBooking: (bookingId, data = {}) => api.patch(`/service-bookings/${bookingId}/accept`, data),

  rejectBooking: (bookingId) => api.patch(`/service-bookings/${bookingId}/reject`),

  cancelBooking: (bookingId) => api.patch(`/service-bookings/${bookingId}/cancel`),

  completeBooking: (bookingId) => api.patch(`/service-bookings/${bookingId}/complete`),
};
