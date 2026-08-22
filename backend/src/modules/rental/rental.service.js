const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");
const { uploadImages, deleteImages } = require("../../services/upload.service");

const rentalSelect = {
  id: true,
  ownerId: true,
  categoryId: true,

  title: true,
  description: true,

  pricePerDay: true,
  depositAmount: true,
  isNegotiable: true,

  condition: true,
  quantity: true,
  deliveryOption: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  latitude: true,
  longitude: true,

  isAvailable: true,
  status: true,

  createdAt: true,
  updatedAt: true,

  owner: {
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      profileImageUrl: true,
      isPhoneVerified: true,
      isEmailVerified: true,
      createdAt: true,
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
};

const validateRentalCategory = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      module: "RENTAL",
      isActive: true,
    },
    select: {
      id: true,
    },
  });

  if (!category) {
    throw new AppError("Invalid or inactive rental category", 400);
  }

  return category;
};

const getRentalImages = async (rentalIds) => {
  if (!rentalIds.length) {
    return new Map();
  }

  const images = await prisma.listingImage.findMany({
    where: {
      entityType: "RENTAL",
      entityId: {
        in: rentalIds,
      },
    },

    orderBy: {
      sortOrder: "asc",
    },
  });

  const imageMap = new Map();

  for (const image of images) {
    if (!imageMap.has(image.entityId)) {
      imageMap.set(image.entityId, []);
    }

    imageMap.get(image.entityId).push(image);
  }

  return imageMap;
};

const getFavoriteRentalIds = async (userId, rentalIds) => {
  if (!userId || !rentalIds.length) {
    return new Set();
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,

      entityType: "RENTAL",

      entityId: {
        in: rentalIds,
      },
    },

    select: {
      entityId: true,
    },
  });

  return new Set(favorites.map((favorite) => favorite.entityId));
};

const getOwnerOtherRentals = async (ownerId, currentRentalId, userId) => {
  const rentals = await prisma.rentalListing.findMany({
    where: {
      ownerId,
      id: { not: currentRentalId },
      status: "ACTIVE",
      isAvailable: true,
      deletedAt: null,
    },
    select: rentalSelect,
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return enrichRentals(rentals, userId);
};

const getRentalRatings = async (rentalIds) => {
  if (!rentalIds.length) {
    return new Map();
  }

  const ratings = await prisma.review.groupBy({
    by: ["entityId"],

    where: {
      entityType: "RENTAL",

      entityId: {
        in: rentalIds,
      },
    },

    _avg: {
      rating: true,
    },

    _count: {
      rating: true,
    },
  });

  return new Map(
    ratings.map((item) => [
      item.entityId,
      {
        averageRating: item._avg.rating ? Number(item._avg.rating) : 0,

        reviewCount: item._count.rating,
      },
    ]),
  );
};

const enrichRentals = async (rentals, userId) => {
  if (!rentals.length) {
    return [];
  }

  const rentalIds = rentals.map((rental) => rental.id);

  const [imageMap, favoriteRentalIds, ratingMap] = await Promise.all([
    getRentalImages(rentalIds),

    getFavoriteRentalIds(userId, rentalIds),

    getRentalRatings(rentalIds),
  ]);

  return rentals.map((rental) => {
    const rating = ratingMap.get(rental.id) || {
      averageRating: 0,
      reviewCount: 0,
    };

    return {
      ...rental,

      images: imageMap.get(rental.id) || [],

      isFavorite: favoriteRentalIds.has(rental.id),

      averageRating: rating.averageRating,

      reviewCount: rating.reviewCount,
    };
  });
};

const createRental = async ({ userId, data, files = [] }) => {
  await validateRentalCategory(data.categoryId);

  let uploadedImages = [];

  try {
    if (files.length > 0) {
      uploadedImages = await uploadImages(files, "lookatlocal/rentals");
    }

    const rental = await prisma.$transaction(async (tx) => {
      const createdRental = await tx.rentalListing.create({
        data: {
          ownerId: userId,

          categoryId: data.categoryId,

          title: data.title,

          description: data.description,

          pricePerDay: data.pricePerDay,

          depositAmount: data.depositAmount ?? 0,

          isNegotiable: data.isNegotiable ?? false,

          condition: data.condition,

          quantity: data.quantity ?? 1,

          deliveryOption: data.deliveryOption,

          addressLine: data.addressLine,

          locality: data.locality,

          city: data.city,

          state: data.state,

          postalCode: data.postalCode,

          latitude: data.latitude,

          longitude: data.longitude,

          status: "PENDING",
        },

        select: rentalSelect,
      });

      if (uploadedImages.length > 0) {
        await tx.listingImage.createMany({
          data: uploadedImages.map((image, index) => ({
            entityType: "RENTAL",

            entityId: createdRental.id,

            imageUrl: image.url,

            publicId: image.publicId,

            sortOrder: index,
          })),
        });
      }

      return createdRental;
    });

    const [result] = await enrichRentals([rental], userId);

    return result;
  } catch (error) {
    if (uploadedImages.length > 0) {
      await deleteImages(uploadedImages.map((image) => image.publicId)).catch(
        () => {},
      );
    }

    throw error;
  }
};

const getRentals = async (userId, filters) => {
  const {
    search,
    categoryId,

    city,
    locality,
    postalCode,

    condition,
    deliveryOption,

    minPricePerDay,
    maxPricePerDay,

    isNegotiable,
    isAvailable,

    sort = "newest",

    page = 1,
    limit = 20,
  } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    status: "ACTIVE",
    deletedAt: null,

    owner: {
      status: "ACTIVE",
      deletedAt: null,
    },
  };

  if (typeof isAvailable === "boolean") {
    where.isAvailable = isAvailable;
  } else {
    where.isAvailable = true;
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (city) {
    where.city = {
      equals: city,
      mode: "insensitive",
    };
  }

  if (locality) {
    where.locality = {
      contains: locality,
      mode: "insensitive",
    };
  }

  if (postalCode) {
    where.postalCode = postalCode;
  }

  if (condition) {
    where.condition = condition;
  }

  if (deliveryOption) {
    where.deliveryOption = deliveryOption;
  }

  if (typeof isNegotiable === "boolean") {
    where.isNegotiable = isNegotiable;
  }

  if (minPricePerDay !== undefined || maxPricePerDay !== undefined) {
    where.pricePerDay = {};

    if (minPricePerDay !== undefined) {
      where.pricePerDay.gte = minPricePerDay;
    }

    if (maxPricePerDay !== undefined) {
      where.pricePerDay.lte = maxPricePerDay;
    }
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        category: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  let orderBy;

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "price_asc":
      orderBy = {
        pricePerDay: "asc",
      };
      break;

    case "price_desc":
      orderBy = {
        pricePerDay: "desc",
      };
      break;

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const [rentals, total] = await prisma.$transaction([
    prisma.rentalListing.findMany({
      where,

      select: rentalSelect,

      orderBy,

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.rentalListing.count({
      where,
    }),
  ]);

  const enrichedRentals = await enrichRentals(rentals, userId);

  return {
    rentals: enrichedRentals,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const getRentalById = async (rentalId, userId) => {
  const rental = await prisma.rentalListing.findFirst({
    where: {
      id: rentalId,
      status: "ACTIVE",
      deletedAt: null,

      owner: {
        status: "ACTIVE",
        deletedAt: null,
      },
    },

    select: rentalSelect,
  });

  if (!rental) {
    throw new AppError("Rental listing not found", 404);
  }

  const [result] = await enrichRentals([rental], userId);

  const similarRentals = await getOwnerOtherRentals(
    rental.ownerId,
    rental.id,
    userId,
  );

  return {
    ...result,
    similarRentals,
  };
};

const getMyRentals = async (userId, filters) => {
  const { search, status, page = 1, limit = 20 } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    ownerId: userId,

    deletedAt: null,
  };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [rentals, total] = await prisma.$transaction([
    prisma.rentalListing.findMany({
      where,

      select: rentalSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.rentalListing.count({
      where,
    }),
  ]);

  const enrichedRentals = await enrichRentals(rentals, userId);

  return {
    rentals: enrichedRentals,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const updateRental = async ({ rentalId, userId, data, files = [] }) => {
  const rental = await prisma.rentalListing.findFirst({
    where: {
      id: rentalId,
      ownerId: userId,
      deletedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!rental) {
    throw new AppError("Rental listing not found", 404);
  }

  if (data.categoryId) {
    await validateRentalCategory(data.categoryId);
  }

  let uploadedImages = [];

  try {
    if (files.length > 0) {
      uploadedImages = await uploadImages(files, "lookatlocal/rentals");
    }

    const updatedRental = await prisma.$transaction(async (tx) => {
      const rental = await tx.rentalListing.update({
        where: {
          id: rentalId,
        },

        data: {
          categoryId: data.categoryId,

          title: data.title,

          description: data.description,

          pricePerDay: data.pricePerDay,

          depositAmount: data.depositAmount,

          isNegotiable: data.isNegotiable,

          condition: data.condition,

          quantity: data.quantity,

          deliveryOption: data.deliveryOption,

          addressLine: data.addressLine,

          locality: data.locality,

          city: data.city,

          state: data.state,

          postalCode: data.postalCode,

          latitude: data.latitude,

          longitude: data.longitude,

          isAvailable: data.isAvailable,

          status: data.status,
        },

        select: rentalSelect,
      });

      if (uploadedImages.length > 0) {
        const oldImages = await tx.listingImage.findMany({
          where: {
            entityType: "RENTAL",
            entityId: rentalId,
          },
        });

        if (oldImages.length > 0) {
          await deleteImages(
            oldImages.map((img) => img.publicId).filter(Boolean),
          );

          await tx.listingImage.deleteMany({
            where: {
              entityType: "RENTAL",
              entityId: rentalId,
            },
          });
        }

        await tx.listingImage.createMany({
          data: uploadedImages.map((image, index) => ({
            entityType: "RENTAL",

            entityId: rentalId,

            imageUrl: image.url,

            publicId: image.publicId,

            sortOrder: index,
          })),
        });
      }

      return rental;
    });

    const [result] = await enrichRentals([updatedRental], userId);

    return result;
  } catch (error) {
    if (uploadedImages.length) {
      await deleteImages(uploadedImages.map((image) => image.publicId)).catch(
        () => {},
      );
    }

    throw error;
  }
};

const deleteRental = async (rentalId, userId) => {
  const rental = await prisma.rentalListing.findFirst({
    where: {
      id: rentalId,
      ownerId: userId,
      deletedAt: null,
    },

    include: {
      bookings: {
        where: {
          status: {
            in: ["REQUESTED", "ACCEPTED"],
          },
        },
      },
    },
  });

  if (!rental) {
    throw new AppError("Rental listing not found", 404);
  }

  if (rental.bookings.length > 0) {
    throw new AppError(
      "Cannot delete a rental listing with active bookings.",
      400,
    );
  }

  // Get images before deleting the listing.
  const images = await prisma.listingImage.findMany({
    where: {
      entityType: "RENTAL",
      entityId: rentalId,
    },
    select: {
      publicId: true,
    },
  });

  await prisma.$transaction(async (tx) => {
    // Delete listing images.
    await tx.listingImage.deleteMany({
      where: {
        entityType: "RENTAL",
        entityId: rentalId,
      },
    });

    // Delete the rental itself.
    await tx.rentalListing.delete({
      where: {
        id: rentalId,
      },
    });
  });

  // Delete Cloudinary images after successful DB deletion.
  const publicIds = images.map((image) => image.publicId).filter(Boolean);

  if (publicIds.length > 0) {
    await deleteImages(publicIds);
  }

  return;
};

module.exports = {
  createRental,
  getRentals,
  getRentalById,
  getMyRentals,
  updateRental,
  deleteRental,
};
