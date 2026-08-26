const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createServiceBookingSchema,
  availabilitySchema,
  bookingIdParamSchema,
  getBookingsSchema,
  acceptBookingSchema,
} = require("./service-booking.validation");

const {
  createBooking,
  getAvailability,
  getMyBookings,
  getReceivedBookings,
  getBookingById,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
} = require("./service-booking.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createServiceBookingSchema), createBooking);
router.get("/availability/:serviceId", validate(availabilitySchema), getAvailability);
router.get("/my-bookings", validate(getBookingsSchema), getMyBookings);
router.get("/received", validate(getBookingsSchema), getReceivedBookings);
router.get("/:bookingId", validate(bookingIdParamSchema), getBookingById);
router.patch("/:bookingId/accept", validate(acceptBookingSchema), acceptBooking);
router.patch("/:bookingId/reject", validate(bookingIdParamSchema), rejectBooking);
router.patch("/:bookingId/cancel", validate(bookingIdParamSchema), cancelBooking);
router.patch("/:bookingId/complete", validate(bookingIdParamSchema), completeBooking);

module.exports = router;
