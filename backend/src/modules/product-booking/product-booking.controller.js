const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const bookingService = require("./product-booking.service");

const createBooking = asyncHandler(async (req, res) => {
  const transaction = await bookingService.createBooking(
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    201,
    "Product purchase request created successfully",
    transaction,
  );
});

const getMyBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getMyBookings(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Your product bookings fetched successfully",
    result,
  );
});

const getReceivedBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getReceivedBookings(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Received product bookings fetched successfully",
    result,
  );
});

const getBookingById = asyncHandler(async (req, res) => {
  const transaction = await bookingService.getBookingById(
    req.params.transactionId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Product booking fetched successfully",
    transaction,
  );
});

const acceptBooking = asyncHandler(async (req, res) => {
  const transaction = await bookingService.acceptBooking(
    req.params.transactionId,
    req.user.id,
    req.body.agreedPrice,
  );

  return ApiResponse.success(
    res,
    200,
    "Product booking accepted successfully",
    transaction,
  );
});

const rejectBooking = asyncHandler(async (req, res) => {
  const transaction = await bookingService.rejectBooking(
    req.params.transactionId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Product booking rejected successfully",
    transaction,
  );
});

const cancelBooking = asyncHandler(async (req, res) => {
  const transaction = await bookingService.cancelBooking(
    req.params.transactionId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Product booking cancelled successfully",
    transaction,
  );
});

const completeBooking = asyncHandler(async (req, res) => {
  const transaction = await bookingService.completeBooking(
    req.params.transactionId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Product booking completed successfully",
    transaction,
  );
});

module.exports = {
  createBooking,
  getMyBookings,
  getReceivedBookings,
  getBookingById,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
};