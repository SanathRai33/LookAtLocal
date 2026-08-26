const ApiResponse = require("../../utils/apiResponse");
const asyncHandler = require("../../utils/asyncHandler");

const rentalBookingService = require("./rental-booking.service");

const createRentalBooking = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.createRentalBooking(
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    201,
    "Rental booking created successfully",
    booking,
  );
});

const getRentalAvailability = asyncHandler(async (req, res) => {
  const availability = await rentalBookingService.getRentalAvailability(
    req.params.rentalId,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental availability checked successfully",
    availability,
  );
});

const getMyRentalBookings = asyncHandler(async (req, res) => {
  const result = await rentalBookingService.getMyRentalBookings(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Your rental bookings fetched successfully",
    result,
  );
});

const getReceivedRentalBookings = asyncHandler(async (req, res) => {
  const result = await rentalBookingService.getReceivedRentalBookings(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Received rental bookings fetched successfully",
    result,
  );
});

const getRentalBookingById = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.getRentalBookingById(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental booking fetched successfully",
    booking,
  );
});

const acceptRentalBooking = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.acceptRentalBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental booking accepted successfully",
    booking,
  );
});

const rejectRentalBooking = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.rejectRentalBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental booking rejected successfully",
    booking,
  );
});

const cancelRentalBooking = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.cancelRentalBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental booking cancelled successfully",
    booking,
  );
});

const startRentalBooking = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.startRentalBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental booking started successfully",
    booking,
  );
});

const completeRentalBooking = asyncHandler(async (req, res) => {
  const booking = await rentalBookingService.completeRentalBooking(
    req.params.bookingId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Rental booking completed successfully",
    booking,
  );
});

module.exports = {
  createRentalBooking,
  getRentalAvailability,
  getMyRentalBookings,
  getReceivedRentalBookings,
  getRentalBookingById,
  acceptRentalBooking,
  rejectRentalBooking,
  cancelRentalBooking,
  startRentalBooking,
  completeRentalBooking,
};
