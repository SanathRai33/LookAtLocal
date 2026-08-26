const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createRentalBookingSchema,
  rentalAvailabilitySchema,
  rentalBookingIdParamSchema,
  getRentalBookingsSchema,
} = require("./rental-booking.validation");

const {
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
} = require("./rental-booking.controller");

const router = express.Router();

router.use(authenticate);

// Create booking
router.post("/", validate(createRentalBookingSchema), createRentalBooking);

router.get(
  "/availability/:rentalId",
  validate(rentalAvailabilitySchema),
  getRentalAvailability,
);

router.get(
  "/my-bookings",
  validate(getRentalBookingsSchema),
  getMyRentalBookings,
);

router.get(
  "/received",
  validate(getRentalBookingsSchema),
  getReceivedRentalBookings,
);

router.get(
  "/:bookingId",
  validate(rentalBookingIdParamSchema),
  getRentalBookingById,
);

router.patch(
  "/:bookingId/accept",
  validate(rentalBookingIdParamSchema),
  acceptRentalBooking,
);

router.patch(
  "/:bookingId/reject",
  validate(rentalBookingIdParamSchema),
  rejectRentalBooking,
);

router.patch(
  "/:bookingId/start",
  validate(rentalBookingIdParamSchema),
  startRentalBooking,
);

router.patch(
  "/:bookingId/complete",
  validate(rentalBookingIdParamSchema),
  completeRentalBooking,
);

router.patch(
  "/:bookingId/cancel",
  validate(rentalBookingIdParamSchema),
  cancelRentalBooking,
);

module.exports = router;
