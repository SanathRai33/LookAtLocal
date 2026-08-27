const prisma = require("../../config/prisma");

const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const bookingSelect = {
  id: true,
  productId: true,
  sellerId: true,
  buyerId: true,
  agreedPrice: true,
  status: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,

  product: {
    select: {
      id: true,
      sellerId: true,
      categoryId: true,
      title: true,
      description: true,
      price: true,
      isNegotiable: true,
      condition: true,
      deliveryOption: true,
      addressLine: true,
      locality: true,
      city: true,
      state: true,
      postalCode: true,
      latitude: true,
      longitude: true,
      status: true,
      soldAt: true,

      seller: {
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

      category: {
        select: {
          id: true,
          name: true,
          slug: true,
          icon: true,
        },
      },
    },
  },

  seller: {
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

  buyer: {
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

const createBooking = async (buyerId, data) => {
  return prisma.$transaction(
    async (tx) => {
      const product = await tx.productListing.findFirst({
        where: {
          id: data.productId,
          status: "ACTIVE",
          deletedAt: null,
          seller: {
            status: "ACTIVE",
            deletedAt: null,
          },
        },

        select: {
          id: true,
          sellerId: true,
          price: true,
        },
      });

      if (!product) {
        throw new AppError("Product is not available for purchase", 404);
      }

      if (product.sellerId === buyerId) {
        throw new AppError("You cannot buy your own product", 400);
      }

      const existingTransaction = await tx.productTransaction.findFirst({
        where: {
          productId: product.id,
          buyerId,
          status: {
            in: ["REQUESTED", "ACCEPTED"],
          },
        },

        select: {
          id: true,
        },
      });

      if (existingTransaction) {
        throw new AppError(
          "You already have an active purchase request for this product",
          409,
        );
      }

      const transaction = await tx.productTransaction.create({
        data: {
          productId: product.id,
          sellerId: product.sellerId,
          buyerId,
          agreedPrice: null,
          status: "REQUESTED",
        },

        select: bookingSelect,
      });

      return transaction;
    },
    {
      isolationLevel: "Serializable",
    },
  );
};

const getMyBookings = async (buyerId, filters) => {
  const { status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    buyerId,
  };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.productTransaction.findMany({
      where,
      select: bookingSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.productTransaction.count({
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

const getReceivedBookings = async (sellerId, filters) => {
  const { status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    sellerId,
  };

  if (status) {
    where.status = status;
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.productTransaction.findMany({
      where,
      select: bookingSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.productTransaction.count({
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

const getBookingById = async (transactionId, userId) => {
  const booking = await prisma.productTransaction.findFirst({
    where: {
      id: transactionId,

      OR: [
        {
          buyerId: userId,
        },
        {
          sellerId: userId,
        },
      ],
    },

    select: bookingSelect,
  });

  if (!booking) {
    throw new AppError("Product booking not found", 404);
  }

  return booking;
};

const acceptBooking = async (transactionId, sellerId, agreedPrice) => {
  try {
    return await prisma.$transaction(
      async (tx) => {
        const transaction = await tx.productTransaction.findFirst({
          where: {
            id: transactionId,
            sellerId,
          },

          select: {
            id: true,
            productId: true,
            buyerId: true,
            status: true,

            product: {
              select: {
                id: true,
                sellerId: true,
                price: true,
                status: true,
                deletedAt: true,
              },
            },
          },
        });

        if (!transaction) {
          throw new AppError(
            "Product booking not found or you do not have permission to accept it",
            404,
          );
        }

        if (transaction.status !== "REQUESTED") {
          throw new AppError(
            "Only requested product bookings can be accepted",
            400,
          );
        }

        if (
          transaction.product.status !== "ACTIVE" ||
          transaction.product.deletedAt
        ) {
          throw new AppError("This product is no longer available", 400);
        }

        const updatedTransaction = await tx.productTransaction.update({
          where: {
            id: transaction.id,
          },

          data: {
            status: "ACCEPTED",
            agreedPrice: agreedPrice ?? transaction.product.price,
          },

          select: bookingSelect,
        });

        await tx.productListing.update({
          where: {
            id: transaction.productId,
          },

          data: {
            status: "RESERVED",
          },
        });

        const conflictingRequests = await tx.productTransaction.findMany({
          where: {
            productId: transaction.productId,
            status: "REQUESTED",
            id: {
              not: transaction.id,
            },
          },

          select: {
            id: true,
            buyerId: true,
          },
        });

        if (conflictingRequests.length > 0) {
          await tx.productTransaction.updateMany({
            where: {
              id: {
                in: conflictingRequests.map((item) => item.id),
              },

              status: "REQUESTED",
            },

            data: {
              status: "REJECTED",
            },
          });
        }

        return updatedTransaction;
      },
      {
        isolationLevel: "Serializable",
      },
    );
  } catch (error) {
    if (error?.code === "P2034") {
      throw new AppError(
        "The product changed while you were accepting this request. Please try again.",
        409,
      );
    }

    throw error;
  }
};

const rejectBooking = async (transactionId, sellerId) => {
  return prisma.$transaction(async (tx) => {
    const transaction = await tx.productTransaction.findFirst({
      where: {
        id: transactionId,
        sellerId,
      },

      select: {
        id: true,
        buyerId: true,
        status: true,
      },
    });

    if (!transaction) {
      throw new AppError(
        "Product booking not found or you do not have permission to reject it",
        404,
      );
    }

    if (transaction.status !== "REQUESTED") {
      throw new AppError(
        "Only requested product bookings can be rejected",
        400,
      );
    }

    return tx.productTransaction.update({
      where: {
        id: transaction.id,
      },

      data: {
        status: "REJECTED",
      },

      select: bookingSelect,
    });
  });
};

const cancelBooking = async (transactionId, buyerId) => {
  return prisma.$transaction(async (tx) => {
    const transaction = await tx.productTransaction.findFirst({
      where: {
        id: transactionId,
        buyerId,
      },

      select: {
        id: true,
        productId: true,
        status: true,
      },
    });

    if (!transaction) {
      throw new AppError(
        "Product booking not found or you do not have permission to cancel it",
        404,
      );
    }

    if (!["REQUESTED", "ACCEPTED"].includes(transaction.status)) {
      throw new AppError("This product booking cannot be cancelled", 400);
    }

    const cancelledTransaction = await tx.productTransaction.update({
      where: {
        id: transaction.id,
      },

      data: {
        status: "CANCELLED",
      },

      select: bookingSelect,
    });

    if (transaction.status === "ACCEPTED") {
      await tx.productListing.update({
        where: {
          id: transaction.productId,
          status: "RESERVED",
        },

        data: {
          status: "ACTIVE",
        },
      });
    }

    return cancelledTransaction;
  });
};

const completeBooking = async (transactionId, sellerId) => {
  return prisma.$transaction(async (tx) => {
    const transaction = await tx.productTransaction.findFirst({
      where: {
        id: transactionId,
        sellerId,
      },

      select: {
        id: true,
        productId: true,
        buyerId: true,
        status: true,
      },
    });

    if (!transaction) {
      throw new AppError(
        "Product booking not found or you do not have permission to complete it",
        404,
      );
    }

    if (transaction.status !== "ACCEPTED") {
      throw new AppError(
        "Only accepted product bookings can be completed",
        400,
      );
    }

    const completedTransaction = await tx.productTransaction.update({
      where: {
        id: transaction.id,
      },

      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },

      select: bookingSelect,
    });

    await tx.productListing.update({
      where: {
        id: transaction.productId,
      },

      data: {
        status: "SOLD",
        soldAt: new Date(),
      },
    });

    return completedTransaction;
  });
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
