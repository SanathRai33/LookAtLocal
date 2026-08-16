const prisma = require("../../config/prisma");

const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const reviewSelect = {
  id: true,

  reviewerId: true,
  revieweeId: true,

  entityType: true,
  entityId: true,
  transactionId: true,

  rating: true,
  comment: true,

  createdAt: true,
  updatedAt: true,

  reviewer: {
    select: {
      id: true,
      fullName: true,
      profileImageUrl: true,
    },
  },

  reviewee: {
    select: {
      id: true,
      fullName: true,
      profileImageUrl: true,
    },
  },
};

const createReview = async (reviewerId, data) => {
  const booking = await prisma.serviceBooking.findFirst({
    where: {
      id: data.transactionId,
      customerId: reviewerId,
    },

    select: {
      id: true,
      status: true,
      serviceId: true,

      service: {
        select: {
          id: true,
          providerId: true,
        },
      },
    },
  });

  if (!booking) {
    throw new AppError("Completed service booking not found", 404);
  }

  if (booking.status !== "COMPLETED") {
    throw new AppError(
      "You can review a service only after the booking is completed",
      400,
    );
  }

  if (booking.service.providerId === reviewerId) {
    throw new AppError("You cannot review your own service", 400);
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      reviewerId_entityType_transactionId: {
        reviewerId,
        entityType: "SERVICE",
        transactionId: booking.id,
      },
    },

    select: {
      id: true,
    },
  });

  if (existingReview) {
    throw new AppError("You have already reviewed this booking", 409);
  }

  const result = prisma.review.create({
    data: {
      reviewerId,

      revieweeId: booking.service.providerId,

      entityType: "SERVICE",

      entityId: booking.service.id,

      transactionId: booking.id,

      rating: data.rating,
      comment: data.comment,
    },

    select: reviewSelect,
  });

  await createNotification({
    userId: booking.service.providerId,

    type: NOTIFICATION_TYPES.REVIEW_RECEIVED.type,

    title: NOTIFICATION_TYPES.REVIEW_RECEIVED.title,

    message: NOTIFICATION_TYPES.REVIEW_RECEIVED.message,

    referenceType: "REVIEW",

    referenceId: review.id,
  });

  return result;
};

const getServiceReviews = async (serviceId, filters) => {
  const { page, limit } = filters;

  const service = await prisma.serviceListing.findFirst({
    where: {
      id: serviceId,
      deletedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!service) {
    throw new AppError("Service listing not found", 404);
  }

  const pagination = getPagination(page, limit);

  const where = {
    entityType: "SERVICE",
    entityId: serviceId,
  };

  const [reviews, total, ratingAggregate] = await prisma.$transaction([
    prisma.review.findMany({
      where,

      select: reviewSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.review.count({
      where,
    }),

    prisma.review.aggregate({
      where,

      _avg: {
        rating: true,
      },
    }),
  ]);

  return {
    reviews,

    rating: {
      average: ratingAggregate._avg.rating
        ? Number(ratingAggregate._avg.rating)
        : 0,

      count: total,
    },

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getUserReviews = async (userId, filters) => {
  const { page, limit } = filters;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      deletedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const pagination = getPagination(page, limit);

  const where = {
    revieweeId: userId,
  };

  const [reviews, total, ratingAggregate] = await prisma.$transaction([
    prisma.review.findMany({
      where,

      select: reviewSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.review.count({
      where,
    }),

    prisma.review.aggregate({
      where,

      _avg: {
        rating: true,
      },
    }),
  ]);

  return {
    reviews,

    rating: {
      average: ratingAggregate._avg.rating
        ? Number(ratingAggregate._avg.rating)
        : 0,

      count: total,
    },

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getMyReviews = async (reviewerId, filters) => {
  const { entityType, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    reviewerId,
  };

  if (entityType) {
    where.entityType = entityType;
  }

  const [reviews, total] = await prisma.$transaction([
    prisma.review.findMany({
      where,

      select: reviewSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.review.count({
      where,
    }),
  ]);

  return {
    reviews,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const updateReview = async (reviewId, reviewerId, data) => {
  const review = await prisma.review.findFirst({
    where: {
      id: reviewId,
      reviewerId,
    },

    select: {
      id: true,
    },
  });

  if (!review) {
    throw new AppError(
      "Review not found or you do not have permission to update it",
      404,
    );
  }

  return prisma.review.update({
    where: {
      id: reviewId,
    },

    data: {
      ...(data.rating !== undefined && {
        rating: data.rating,
      }),

      ...(data.comment !== undefined && {
        comment: data.comment,
      }),
    },

    select: reviewSelect,
  });
};

const deleteReview = async (reviewId, reviewerId) => {
  const review = await prisma.review.findFirst({
    where: {
      id: reviewId,
      reviewerId,
    },

    select: {
      id: true,
    },
  });

  if (!review) {
    throw new AppError(
      "Review not found or you do not have permission to delete it",
      404,
    );
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    },
  });
};

module.exports = {
  createReview,
  getServiceReviews,
  getUserReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
