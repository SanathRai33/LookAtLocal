const prisma = require("../../config/prisma");

const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");
const { awardPoints } = require("../points/points.service");
const { createNotification } = require("../notification/notification.service");
const {
  NOTIFICATION_TYPES,
} = require("../../constants/notification.constants");

const bookingSelect = {
  id: true,
  serviceId: true,
  customerId: true,

  scheduledAt: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  latitude: true,
  longitude: true,

  customerNote: true,
  agreedPrice: true,

  status: true,
  completedAt: true,

  createdAt: true,
  updatedAt: true,

  customer: {
    select: {
      id: true,
      fullName: true,
      profileImageUrl: true,
      phone: true,
    },
  },

  service: {
    select: {
      id: true,
      providerId: true,
      title: true,
      pricingType: true,
      price: true,
      isNegotiable: true,

      provider: {
        select: {
          id: true,
          fullName: true,
          profileImageUrl: true,
          phone: true,
        },
      },

      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
};

const createBooking = async (customerId, data) => {
  const service = await prisma.serviceListing.findFirst({
    where: {
      id: data.serviceId,
      status: "ACTIVE",
      isAvailable: true,
      deletedAt: null,
    },

    select: {
      id: true,
      providerId: true,
      price: true,
      isNegotiable: true,
    },
  });

  if (!service) {
    throw new AppError("Service is not available for booking", 404);
  }

  if (service.providerId === customerId) {
    throw new AppError("You cannot book your own service", 400);
  }

  const existingBooking = await prisma.serviceBooking.findFirst({
    where: {
      serviceId: service.id,
      customerId,

      status: {
        in: ["REQUESTED", "ACCEPTED"],
      },
    },

    select: {
      id: true,
    },
  });

  if (existingBooking) {
    throw new AppError(
      "You already have an active booking for this service",
      409,
    );
  }

  const result = prisma.serviceBooking.create({
    data: {
      serviceId: service.id,
      customerId,

      scheduledAt: data.scheduledAt,

      addressLine: data.addressLine,
      locality: data.locality,
      city: data.city,
      state: data.state,
      postalCode: data.postalCode,

      latitude: data.latitude,
      longitude: data.longitude,

      customerNote: data.customerNote,

      status: "REQUESTED",
    },

    select: bookingSelect,
  });

  await createNotification({
    userId: service.providerId,

    type: NOTIFICATION_TYPES.SERVICE_BOOKING_REQUESTED.type,

    title: NOTIFICATION_TYPES.SERVICE_BOOKING_REQUESTED.title,

    message: NOTIFICATION_TYPES.SERVICE_BOOKING_REQUESTED.message,

    referenceType: "SERVICE_BOOKING",

    referenceId: booking.id,
  });

  return result;
};

const getMyBookings = async (customerId, filters) => {
  const { status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    customerId,
  };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.serviceBooking.findMany({
      where,

      select: bookingSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.serviceBooking.count({
      where,
    }),
  ]);

  return {
    bookings,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getReceivedBookings = async (providerId, filters) => {
  const { status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    service: {
      providerId,
      deletedAt: null,
    },
  };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.serviceBooking.findMany({
      where,

      select: bookingSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.serviceBooking.count({
      where,
    }),
  ]);

  return {
    bookings,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getBookingById = async (bookingId, userId) => {
  const booking = await prisma.serviceBooking.findFirst({
    where: {
      id: bookingId,

      OR: [
        {
          customerId: userId,
        },

        {
          service: {
            providerId: userId,
          },
        },
      ],
    },

    select: bookingSelect,
  });

  if (!booking) {
    throw new AppError("Service booking not found", 404);
  }

  return booking;
};

const acceptBooking = async (bookingId, providerId, agreedPrice) => {
  const booking = await prisma.serviceBooking.findFirst({
    where: {
      id: bookingId,

      service: {
        providerId,
      },
    },

    select: {
      id: true,
      status: true,

      service: {
        select: {
          price: true,
          isAvailable: true,
          status: true,
        },
      },
    },
  });

  if (!booking) {
    throw new AppError(
      "Booking not found or you do not have permission to accept it",
      404,
    );
  }

  if (booking.status !== "REQUESTED") {
    throw new AppError("Only requested bookings can be accepted", 400);
  }

  if (booking.service.status !== "ACTIVE" || !booking.service.isAvailable) {
    throw new AppError("This service is no longer available", 400);
  }

  return prisma.serviceBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "ACCEPTED",

      agreedPrice: agreedPrice ?? booking.service.price,
    },

    select: bookingSelect,
  });

  await createNotification({
    userId: booking.customerId,

    type: NOTIFICATION_TYPES.SERVICE_BOOKING_ACCEPTED.type,

    title: NOTIFICATION_TYPES.SERVICE_BOOKING_ACCEPTED.title,

    message: NOTIFICATION_TYPES.SERVICE_BOOKING_ACCEPTED.message,

    referenceType: "SERVICE_BOOKING",

    referenceId: booking.id,
  });
};

const rejectBooking = async (bookingId, providerId) => {
  const booking = await prisma.serviceBooking.findFirst({
    where: {
      id: bookingId,

      service: {
        providerId,
      },
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!booking) {
    throw new AppError(
      "Booking not found or you do not have permission to reject it",
      404,
    );
  }

  if (booking.status !== "REQUESTED") {
    throw new AppError("Only requested bookings can be rejected", 400);
  }

  return prisma.serviceBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "REJECTED",
    },

    select: bookingSelect,
  });

  await createNotification({
    userId: booking.customerId,

    type: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.type,

    title: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.title,

    message: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.message,

    referenceType: "SERVICE_BOOKING",

    referenceId: booking.id,
  });
};

const cancelBooking = async (bookingId, customerId) => {
  const booking = await prisma.serviceBooking.findFirst({
    where: {
      id: bookingId,
      customerId,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!booking) {
    throw new AppError(
      "Booking not found or you do not have permission to cancel it",
      404,
    );
  }

  if (!["REQUESTED", "ACCEPTED"].includes(booking.status)) {
    throw new AppError("This booking cannot be cancelled", 400);
  }

  return prisma.serviceBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "CANCELLED",
    },

    select: bookingSelect,
  });
};

const completeBooking = async (bookingId, providerId) => {
  const booking = await prisma.serviceBooking.findFirst({
    where: {
      id: bookingId,

      service: {
        providerId,
      },
    },

    select: {
      id: true,
      status: true,
      customerId: true,
    },
  });

  if (!booking) {
    throw new AppError(
      "Booking not found or you do not have permission to complete it",
      404,
    );
  }

  if (booking.status !== "ACCEPTED") {
    throw new AppError("Only accepted bookings can be completed", 400);
  }

  const result = await prisma.$transaction(async (tx) => {
    const completedBooking = await tx.serviceBooking.update({
      where: {
        id: bookingId,
      },

      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },

      select: bookingSelect,
    });

    await awardPoints({
      tx,

      userId: booking.customerId,

      actionType: "SERVICE_COMPLETED",

      referenceType: "SERVICE_BOOKING",

      referenceId: booking.id,

      description: "Points earned for completing a service booking",
    });

    return completedBooking;
  });

  await createNotification({
    tx,

    userId,

    type: NOTIFICATION_TYPES.POINTS_EARNED.type,

    title: NOTIFICATION_TYPES.POINTS_EARNED.title,

    message: `You earned ${points} reward points.`,

    referenceType,

    referenceId,
  });

  return result;
};

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
