import api from "./axios.js";

const productBookingApi = {
  createBooking: (data) => api.post("/product-bookings", data),

  getMyBookings: (params = {}) =>
    api.get("/product-bookings/my-bookings", {
      params,
    }),

  getReceivedBookings: (params = {}) =>
    api.get("/product-bookings/received", {
      params,
    }),

  getBookingById: (transactionId) =>
    api.get(`/product-bookings/${transactionId}`),

  acceptBooking: (transactionId, data = {}) =>
    api.patch(`/product-bookings/${transactionId}/accept`, data),

  rejectBooking: (transactionId) =>
    api.patch(`/product-bookings/${transactionId}/reject`),

  cancelBooking: (transactionId) =>
    api.patch(`/product-bookings/${transactionId}/cancel`),

  completeBooking: (transactionId) =>
    api.patch(`/product-bookings/${transactionId}/complete`),
};

export default productBookingApi;
