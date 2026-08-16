const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/apiResponse");

const bookingService = require("./service-booking.service");

const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking(req.user.id, req.body);

  return ApiResponse.success(
    res,
    201,
    "Service booking requested successfully",
    booking,
  );
});

const getMyBookings = asyncHandler(async (req, res) => {
  const result = await bookingService.getMyBookings(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your bookings fetched successfully",
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
    "Received bookings fetched successfully",
    result,
  );
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Service booking fetched successfully",
    booking,
  );
});

const acceptBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.acceptBooking(
    req.params.bookingId,
    req.user.id,
    req.body.agreedPrice,
  );

  return ApiResponse.success(
    res,
    200,
    "Service booking accepted successfully",
    booking,
  );
});

const rejectBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.rejectBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Service booking rejected successfully",
    booking,
  );
});

const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Service booking cancelled successfully",
    booking,
  );
});

const completeBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.completeBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Service booking completed successfully",
    booking,
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
