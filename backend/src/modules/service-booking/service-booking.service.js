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
  endAt: true,

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

const ACTIVE_BOOKING_STATUSES = ["REQUESTED", "ACCEPTED", "IN_PROGRESS"];

const getUtcDayRange = (date) => {
  const start = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return { start, end };
};

const getConflictWhere = ({
  serviceId,
  pricingType,
  scheduledAt,
  endAt,
  excludeId,
}) => {
  const where = {
    serviceId,
    status: {
      in: ["ACCEPTED", "IN_PROGRESS"],
    },
  };

  if (excludeId) {
    where.id = { not: excludeId };
  }

  if (pricingType === "HOURLY") {
    where.scheduledAt = { lt: endAt };
    where.endAt = { gt: scheduledAt };
    return where;
  }

  if (pricingType === "DAILY") {
    const { start, end } = getUtcDayRange(scheduledAt);
    where.scheduledAt = {
      gte: start,
      lt: end,
    };
    return where;
  }

  where.scheduledAt = scheduledAt;
  return where;
};

const findAcceptedConflict = async ({
  serviceId,
  pricingType,
  scheduledAt,
  endAt,
  excludeId,
  tx = prisma,
}) => {
  return tx.serviceBooking.findFirst({
    where: getConflictWhere({
      serviceId,
      pricingType,
      scheduledAt,
      endAt,
      excludeId,
    }),
    select: {
      id: true,
      customerId: true,
      scheduledAt: true,
      endAt: true,
    },
  });
};

const validateBookingWindow = ({ pricingType, scheduledAt, endAt }) => {
  if (pricingType === "HOURLY") {
    if (!endAt) {
      throw new AppError("End time is required for hourly services", 400);
    }

    if (endAt <= scheduledAt) {
      throw new AppError("End time must be after start time", 400);
    }

    return;
  }

  if (endAt) {
    throw new AppError(
      `End time is not required for ${pricingType.toLowerCase()} services`,
      400,
    );
  }
};

const createBooking = async (customerId, data) => {
  const result = await prisma.$transaction(
    async (tx) => {
      const service = await tx.serviceListing.findFirst({
        where: {
          id: data.serviceId,
          status: "ACTIVE",
          isAvailable: true,
          deletedAt: null,
        },
        select: {
          id: true,
          providerId: true,
          pricingType: true,
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

      validateBookingWindow({
        pricingType: service.pricingType,
        scheduledAt: data.scheduledAt,
        endAt: data.endAt,
      });

      const existingBooking = await tx.serviceBooking.findFirst({
        where: {
          serviceId: service.id,
          customerId,
          status: {
            in: ["REQUESTED", "ACCEPTED", "IN_PROGRESS"],
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

      const acceptedConflict = await findAcceptedConflict({
        serviceId: service.id,
        pricingType: service.pricingType,
        scheduledAt: data.scheduledAt,
        endAt: data.endAt,
        tx,
      });

      if (acceptedConflict) {
        throw new AppError(
          "This time slot is already booked. Please choose another time.",
          409,
        );
      }

      const booking = await tx.serviceBooking.create({
        data: {
          serviceId: service.id,
          customerId,
          scheduledAt: data.scheduledAt,
          endAt: data.endAt ?? null,
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
        tx,
        userId: service.providerId,
        type: NOTIFICATION_TYPES.SERVICE_BOOKING_REQUESTED.type,
        title: NOTIFICATION_TYPES.SERVICE_BOOKING_REQUESTED.title,
        message: NOTIFICATION_TYPES.SERVICE_BOOKING_REQUESTED.message,
        entityType: "SERVICE_BOOKING",
        entityId: booking.id,
      });

      return booking;
    },
    {
      isolationLevel: "Serializable",
    },
  );

  return result;
};

const getAvailability = async (serviceId, data) => {
  const service = await prisma.serviceListing.findFirst({
    where: {
      id: serviceId,
      status: "ACTIVE",
      isAvailable: true,
      deletedAt: null,
    },
    select: {
      id: true,
      pricingType: true,
    },
  });

  if (!service) {
    throw new AppError("Service is not available for booking", 404);
  }

  validateBookingWindow({
    pricingType: service.pricingType,
    scheduledAt: data.scheduledAt,
    endAt: data.endAt,
  });

  const conflict = await findAcceptedConflict({
    serviceId,
    pricingType: service.pricingType,
    scheduledAt: data.scheduledAt,
    endAt: data.endAt,
  });

  return {
    serviceId,
    pricingType: service.pricingType,
    scheduledAt: data.scheduledAt,
    endAt: data.endAt ?? null,
    available: !conflict,
  };
};

const getMyBookings = async (customerId, filters) => {
  const { status, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = { customerId };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.serviceBooking.findMany({
      where,
      select: bookingSelect,
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.serviceBooking.count({ where }),
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
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.serviceBooking.count({ where }),
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
      OR: [{ customerId: userId }, { service: { providerId: userId } }],
    },
    select: bookingSelect,
  });

  if (!booking) {
    throw new AppError("Service booking not found", 404);
  }

  return booking;
};

const notifyBookingRejected = async (bookingId, customerId, message) => {
  await createNotification({
    userId: customerId,
    type: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.type,
    title: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.title,
    message,
    entityType: "SERVICE_BOOKING",
    entityId: bookingId,
  });
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
      customerId: true,
      status: true,
      scheduledAt: true,
      endAt: true,
      service: {
        select: {
          id: true,
          pricingType: true,
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

  validateBookingWindow({
    pricingType: booking.service.pricingType,
    scheduledAt: booking.scheduledAt,
    endAt: booking.endAt,
  });

  try {
    const acceptedBooking = await prisma.$transaction(
      async (tx) => {
        const conflict = await findAcceptedConflict({
          serviceId: booking.service.id,
          pricingType: booking.service.pricingType,
          scheduledAt: booking.scheduledAt,
          endAt: booking.endAt,
          excludeId: booking.id,
          tx,
        });

        if (conflict) {
          throw new AppError(
            "This booking slot has already been accepted for another customer",
            409,
          );
        }

        const updatedBooking = await tx.serviceBooking.update({
          where: {
            id: booking.id,
          },
          data: {
            status: "ACCEPTED",
            agreedPrice: agreedPrice ?? booking.service.price,
          },
          select: bookingSelect,
        });

        const conflictingPendingBookings = await tx.serviceBooking.findMany({
          where: {
            ...getConflictWhere({
              serviceId: booking.service.id,
              pricingType: booking.service.pricingType,
              scheduledAt: booking.scheduledAt,
              endAt: booking.endAt,
            }),
            status: "REQUESTED",
            id: {
              not: booking.id,
            },
          },
          select: {
            id: true,
            customerId: true,
          },
        });

        if (conflictingPendingBookings.length > 0) {
          await tx.serviceBooking.updateMany({
            where: {
              id: {
                in: conflictingPendingBookings.map((item) => item.id),
              },
              status: "REQUESTED",
            },
            data: {
              status: "REJECTED",
            },
          });
        }

        await createNotification({
          tx,
          userId: booking.customerId,
          type: NOTIFICATION_TYPES.SERVICE_BOOKING_ACCEPTED.type,
          title: NOTIFICATION_TYPES.SERVICE_BOOKING_ACCEPTED.title,
          message: NOTIFICATION_TYPES.SERVICE_BOOKING_ACCEPTED.message,
          entityType: "SERVICE_BOOKING",
          entityId: booking.id,
        });

        for (const rejectedBooking of conflictingPendingBookings) {
          await createNotification({
            tx,
            userId: rejectedBooking.customerId,
            type: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.type,
            title: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.title,
            message:
              "Your booking request was not accepted because another request was confirmed for this time slot.",
            entityType: "SERVICE_BOOKING",
            entityId: rejectedBooking.id,
          });
        }

        return updatedBooking;
      },
      {
        isolationLevel: "Serializable",
      },
    );

    return acceptedBooking;
  } catch (error) {
    if (error?.code === "P2034") {
      throw new AppError(
        "The booking changed while you were accepting it. Please try again.",
        409,
      );
    }

    throw error;
  }
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
      customerId: true,
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

  const result = await prisma.$transaction(async (tx) => {
    const rejectedBooking = await tx.serviceBooking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "REJECTED",
      },
      select: bookingSelect,
    });

    await createNotification({
      tx,
      userId: booking.customerId,
      type: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.type,
      title: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.title,
      message: NOTIFICATION_TYPES.SERVICE_BOOKING_REJECTED.message,
      entityType: "SERVICE_BOOKING",
      entityId: booking.id,
    });

    return rejectedBooking;
  });

  return result;
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

  if (!ACTIVE_BOOKING_STATUSES.includes(booking.status)) {
    throw new AppError("This booking cannot be cancelled", 400);
  }

  const result = await prisma.$transaction(async (tx) => {
    return tx.serviceBooking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "CANCELLED",
      },
      select: bookingSelect,
    });
  });

  return result;
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

  if (booking.status !== "ACCEPTED" && booking.status !== "IN_PROGRESS") {
    throw new AppError(
      "Only accepted or in-progress bookings can be completed",
      400,
    );
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
      entityType: "SERVICE_BOOKING",
      entityId: booking.id,
      description: "Points earned for completing a service booking",
    });

    await createNotification({
      tx,
      userId: booking.customerId,
      type: NOTIFICATION_TYPES.POINTS_EARNED.type,
      title: NOTIFICATION_TYPES.POINTS_EARNED.title,
      message: NOTIFICATION_TYPES.POINTS_EARNED.message,
      entityType: "SERVICE_BOOKING",
      entityId: booking.id,
    });

    return completedBooking;
  });

  return result;
};

module.exports = {
  createBooking,
  getAvailability,
  getMyBookings,
  getReceivedBookings,
  getBookingById,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  completeBooking,
};
