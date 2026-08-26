const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const ACTIVE_BOOKING_STATUSES = ["ACCEPTED", "ACTIVE"];

const rentalBookingSelect = {
  id: true,

  rentalId: true,
  renterId: true,

  startDate: true,
  endDate: true,

  quantity: true,

  pricePerDay: true,
  totalAmount: true,
  depositAmount: true,

  status: true,

  completedAt: true,
  createdAt: true,
  updatedAt: true,

  rental: {
    select: {
      id: true,
      ownerId: true,
      title: true,
      pricePerDay: true,
      depositAmount: true,
      quantity: true,
      deliveryOption: true,
      condition: true,
      isAvailable: true,
      status: true,

      owner: {
        select: {
          id: true,
          fullName: true,
          phone: true,
          email: true,
          profileImageUrl: true,
          isPhoneVerified: true,
          isEmailVerified: true,
        },
      },
    },
  },

  renter: {
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      profileImageUrl: true,
      isPhoneVerified: true,
      isEmailVerified: true,
    },
  },
};

const calculateRentalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const days = Math.ceil(
    (end.getTime() - start.getTime()) / millisecondsPerDay,
  );

  if (days <= 0) {
    throw new AppError("Rental period must be at least 1 day", 400);
  }

  return days;
};

const getOverlappingBookings = async ({
  rentalId,
  startDate,
  endDate,
  excludeBookingId,
  tx = prisma,
}) => {
  const where = {
    rentalId,

    status: {
      in: ACTIVE_BOOKING_STATUSES,
    },

    startDate: {
      lt: endDate,
    },

    endDate: {
      gt: startDate,
    },
  };

  if (excludeBookingId) {
    where.id = {
      not: excludeBookingId,
    };
  }

  return tx.rentalBooking.findMany({
    where,

    select: {
      id: true,
      renterId: true,
      startDate: true,
      endDate: true,
      quantity: true,
    },
  });
};

const getBookedQuantity = async ({
  rentalId,
  startDate,
  endDate,
  excludeBookingId,
  tx = prisma,
}) => {
  const bookings = await getOverlappingBookings({
    rentalId,
    startDate,
    endDate,
    excludeBookingId,
    tx,
  });

  return bookings.reduce((total, booking) => total + booking.quantity, 0);
};

const checkAvailability = async ({
  rentalId,
  startDate,
  endDate,
  requestedQuantity,
  tx = prisma,
}) => {
  const rental = await tx.rentalListing.findFirst({
    where: {
      id: rentalId,
      status: "ACTIVE",
      isAvailable: true,
      deletedAt: null,
    },

    select: {
      id: true,
      ownerId: true,
      quantity: true,
      pricePerDay: true,
      depositAmount: true,
    },
  });

  if (!rental) {
    throw new AppError("Rental is not available for booking", 404);
  }

  if (requestedQuantity > rental.quantity) {
    return {
      available: false,
      totalQuantity: rental.quantity,
      bookedQuantity: rental.quantity,
      availableQuantity: 0,
    };
  }

  const bookedQuantity = await getBookedQuantity({
    rentalId,
    startDate,
    endDate,
    tx,
  });

  const availableQuantity = Math.max(rental.quantity - bookedQuantity, 0);

  return {
    available: requestedQuantity <= availableQuantity,

    totalQuantity: rental.quantity,

    bookedQuantity,

    availableQuantity,
  };
};

const createRentalBooking = async (renterId, data) => {
  const result = await prisma.$transaction(async (tx) => {
    const rental = await tx.rentalListing.findFirst({
      where: {
        id: data.rentalId,
        status: "ACTIVE",
        isAvailable: true,
        deletedAt: null,
      },

      select: {
        id: true,
        ownerId: true,
        quantity: true,
        pricePerDay: true,
        depositAmount: true,
      },
    });

    if (!rental) {
      throw new AppError("Rental is not available for booking", 404);
    }

    if (rental.ownerId === renterId) {
      throw new AppError("You cannot book your own rental", 400);
    }

    const rentalDays = calculateRentalDays(data.startDate, data.endDate);

    const availability = await checkAvailability({
      rentalId: rental.id,
      startDate: data.startDate,
      endDate: data.endDate,
      requestedQuantity: data.quantity,
      tx,
    });

    if (!availability.available) {
      throw new AppError(
        `Only ${availability.availableQuantity} unit(s) available for the selected dates`,
        400,
      );
    }

    const totalAmount = Number(rental.pricePerDay) * rentalDays * data.quantity;

    const depositAmount = Number(rental.depositAmount || 0) * data.quantity;

    const booking = await tx.rentalBooking.create({
      data: {
        rentalId: rental.id,

        renterId,

        startDate: data.startDate,

        endDate: data.endDate,

        quantity: data.quantity,

        pricePerDay: rental.pricePerDay,

        totalAmount,

        depositAmount,

        status: "REQUESTED",
      },

      select: rentalBookingSelect,
    });

    return booking;
  });

  return result;
};

const getRentalBookingById = async (bookingId, userId) => {
  const booking = await prisma.rentalBooking.findFirst({
    where: {
      id: bookingId,

      OR: [
        {
          renterId: userId,
        },
        {
          rental: {
            ownerId: userId,
          },
        },
      ],
    },

    select: rentalBookingSelect,
  });

  if (!booking) {
    throw new AppError("Rental booking not found", 404);
  }

  return booking;
};

const getMyRentalBookings = async (renterId, filters) => {
  const { status, page = 1, limit = 20 } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    renterId,
  };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.rentalBooking.findMany({
      where,

      select: rentalBookingSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.rentalBooking.count({
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

const getReceivedRentalBookings = async (ownerId, filters) => {
  const { status, page = 1, limit = 20 } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    rental: {
      ownerId,
    },
  };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.rentalBooking.findMany({
      where,

      select: rentalBookingSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.rentalBooking.count({
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

const getRentalAvailability = async (rentalId, data) => {
  const availability = await checkAvailability({
    rentalId,

    startDate: data.startDate,

    endDate: data.endDate,

    requestedQuantity: data.quantity,
  });

  return {
    rentalId,

    startDate: data.startDate,

    endDate: data.endDate,

    requestedQuantity: data.quantity,

    ...availability,
  };
};

const acceptRentalBooking = async (bookingId, ownerId) => {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.rentalBooking.findFirst({
      where: {
        id: bookingId,
        rental: {
          ownerId,
        },
      },
      select: {
        id: true,
        rentalId: true,
        renterId: true,
        startDate: true,
        endDate: true,
        quantity: true,
        status: true,
      },
    });

    if (!booking) {
      throw new AppError("Rental booking not found", 404);
    }

    if (booking.status !== "REQUESTED") {
      throw new AppError("Only requested bookings can be accepted", 400);
    }

    const availability = await checkAvailability({
      rentalId: booking.rentalId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      requestedQuantity: booking.quantity,
      tx,
    });

    if (!availability.available) {
      throw new AppError(
        "Rental is no longer available for the requested quantity and dates",
        409,
      );
    }

    const updatedBooking = await tx.rentalBooking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: "ACCEPTED",
      },
      select: rentalBookingSelect,
    });

    const overlappingRequestedBookings = await tx.rentalBooking.findMany({
      where: {
        rentalId: booking.rentalId,
        status: "REQUESTED",
        id: {
          not: bookingId,
        },
        startDate: {
          lt: booking.endDate,
        },
        endDate: {
          gt: booking.startDate,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        quantity: true,
      },
    });

    let remainingQuantity = availability.availableQuantity - booking.quantity;

    for (const requestedBooking of overlappingRequestedBookings) {
      if (requestedBooking.quantity > remainingQuantity) {
        await tx.rentalBooking.update({
          where: {
            id: requestedBooking.id,
          },
          data: {
            status: "REJECTED",
          },
        });

        continue;
      }

      remainingQuantity -= requestedBooking.quantity;
    }

    return updatedBooking;
  });
};

const rejectRentalBooking = async (bookingId, ownerId) => {
  const booking = await prisma.rentalBooking.findFirst({
    where: {
      id: bookingId,

      rental: {
        ownerId,
      },
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!booking) {
    throw new AppError("Rental booking not found", 404);
  }

  if (booking.status !== "REQUESTED") {
    throw new AppError("Only requested bookings can be rejected", 400);
  }

  return prisma.rentalBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "REJECTED",
    },

    select: rentalBookingSelect,
  });
};

const cancelRentalBooking = async (bookingId, userId) => {
  const booking = await prisma.rentalBooking.findFirst({
    where: {
      id: bookingId,

      renterId: userId,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!booking) {
    throw new AppError("Rental booking not found", 404);
  }

  if (!["REQUESTED", "ACCEPTED"].includes(booking.status)) {
    throw new AppError("This booking cannot be cancelled", 400);
  }

  return prisma.rentalBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "CANCELLED",
    },

    select: rentalBookingSelect,
  });
};

const startRentalBooking = async (bookingId, ownerId) => {
  const booking = await prisma.rentalBooking.findFirst({
    where: {
      id: bookingId,

      rental: {
        ownerId,
      },
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!booking) {
    throw new AppError("Rental booking not found", 404);
  }

  if (booking.status !== "ACCEPTED") {
    throw new AppError("Only accepted bookings can be started", 400);
  }

  return prisma.rentalBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "ACTIVE",
    },

    select: rentalBookingSelect,
  });
};

const completeRentalBooking = async (bookingId, ownerId) => {
  const booking = await prisma.rentalBooking.findFirst({
    where: {
      id: bookingId,

      rental: {
        ownerId,
      },
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!booking) {
    throw new AppError("Rental booking not found", 404);
  }

  if (booking.status !== "ACTIVE") {
    throw new AppError("Only active rentals can be completed", 400);
  }

  return prisma.rentalBooking.update({
    where: {
      id: bookingId,
    },

    data: {
      status: "COMPLETED",

      completedAt: new Date(),
    },

    select: rentalBookingSelect,
  });
};

module.exports = {
  createRentalBooking,
  getRentalAvailability,
  getRentalBookingById,
  getMyRentalBookings,
  getReceivedRentalBookings,
  acceptRentalBooking,
  rejectRentalBooking,
  cancelRentalBooking,
  startRentalBooking,
  completeRentalBooking,
};
