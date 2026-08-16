const NOTIFICATION_TYPES = {
  SERVICE_BOOKING_REQUESTED: {
    type: "SERVICE_BOOKING_REQUESTED",
    title: "New Booking Request",
    message: "You have received a new service booking request.",
  },

  SERVICE_BOOKING_ACCEPTED: {
    type: "SERVICE_BOOKING_ACCEPTED",
    title: "Booking Accepted",
    message: "Your booking request has been accepted.",
  },

  SERVICE_BOOKING_REJECTED: {
    type: "SERVICE_BOOKING_REJECTED",
    title: "Booking Rejected",
    message: "Your booking request has been rejected.",
  },

  SERVICE_BOOKING_CANCELLED: {
    type: "SERVICE_BOOKING_CANCELLED",
    title: "Booking Cancelled",
    message: "A service booking has been cancelled.",
  },

  SERVICE_BOOKING_COMPLETED: {
    type: "SERVICE_BOOKING_COMPLETED",
    title: "Booking Completed",
    message: "Your service booking has been completed.",
  },

  REVIEW_RECEIVED: {
    type: "REVIEW_RECEIVED",
    title: "New Review",
    message: "Someone reviewed your service.",
  },

  POINTS_EARNED: {
    type: "POINTS_EARNED",
    title: "Points Earned",
    message: "Congratulations! You've earned reward points.",
  },

  SERVICE_APPROVED: {
    type: "SERVICE_APPROVED",
    title: "Service Approved",
    message: "Your service listing has been approved.",
  },

  SERVICE_REJECTED: {
    type: "SERVICE_REJECTED",
    title: "Service Rejected",
    message: "Your service listing has been rejected.",
  },
};

module.exports = {
  NOTIFICATION_TYPES,
};