import api from "./axios.js";

const rentalBookingApi = {
  createBooking: (data) => api.post("/rental-bookings", data),

  getAvailability: (rentalId, params) =>
    api.get(`/rental-bookings/availability/${rentalId}`, { params }),

  getMyBookings: (params = {}) =>
    api.get("/rental-bookings/my-bookings", { params }),

  getReceivedBookings: (params = {}) =>
    api.get("/rental-bookings/received", { params }),

  getBookingById: (bookingId) => api.get(`/rental-bookings/${bookingId}`),

  acceptBooking: (bookingId) =>
    api.patch(`/rental-bookings/${bookingId}/accept`),

  rejectBooking: (bookingId) =>
    api.patch(`/rental-bookings/${bookingId}/reject`),

  cancelBooking: (bookingId) =>
    api.patch(`/rental-bookings/${bookingId}/cancel`),

  startBooking: (bookingId) => api.patch(`/rental-bookings/${bookingId}/start`),

  completeBooking: (bookingId) =>
    api.patch(`/rental-bookings/${bookingId}/complete`),
};

export default rentalBookingApi;
