const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createProductBookingSchema,
  bookingIdParamSchema,
  getBookingsSchema,
  acceptBookingSchema,
} = require("./product-booking.validation");

const {
  createBooking,
  getMyBookings,
  getReceivedBookings,
  getBookingById,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
} = require("./product-booking.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createProductBookingSchema), createBooking);

router.get("/my-bookings", validate(getBookingsSchema), getMyBookings);

router.get("/received", validate(getBookingsSchema), getReceivedBookings);

router.get("/:transactionId", validate(bookingIdParamSchema), getBookingById);

router.patch(
  "/:transactionId/accept",
  validate(acceptBookingSchema),
  acceptBooking,
);

router.patch(
  "/:transactionId/reject",
  validate(bookingIdParamSchema),
  rejectBooking,
);

router.patch(
  "/:transactionId/cancel",
  validate(bookingIdParamSchema),
  cancelBooking,
);

router.patch(
  "/:transactionId/complete",
  validate(bookingIdParamSchema),
  completeBooking,
);

module.exports = router;
