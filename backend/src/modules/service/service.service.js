const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const { uploadImages, deleteImages } = require("../../services/upload.service");

const serviceSelect = {
  id: true,
  providerId: true,
  categoryId: true,

  title: true,
  description: true,
  experienceYears: true,

  pricingType: true,
  price: true,
  isNegotiable: true,
  isAvailable: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  latitude: true,
  longitude: true,

  status: true,

  createdAt: true,
  updatedAt: true,

  provider: {
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

const validateServiceCategory = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      module: "SERVICE",
      isActive: true,
    },

    select: {
      id: true,
    },
  });

  if (!category) {
    throw new AppError("Invalid or inactive service category", 400);
  }

  return category;
};

const getServiceImages = async (serviceIds) => {
  if (!serviceIds.length) {
    return new Map();
  }

  const images = await prisma.listingImage.findMany({
    where: {
      entityType: "SERVICE",

      entityId: {
        in: serviceIds,
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

const getFavoriteServiceIds = async (userId, serviceIds) => {
  if (!serviceIds.length) {
    return new Set();
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,
      entityType: "SERVICE",

      entityId: {
        in: serviceIds,
      },
    },

    select: {
      entityId: true,
    },
  });

  return new Set(favorites.map((favorite) => favorite.entityId));
};

const getServiceRatings = async (serviceIds) => {
  if (!serviceIds.length) {
    return new Map();
  }

  const ratings = await prisma.review.groupBy({
    by: ["entityId"],

    where: {
      entityType: "SERVICE",

      entityId: {
        in: serviceIds,
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

const enrichServices = async (services, userId) => {
  if (!services.length) {
    return [];
  }

  const serviceIds = services.map((service) => service.id);

  const [imageMap, favoriteServiceIds, ratingMap] = await Promise.all([
    getServiceImages(serviceIds),

    getFavoriteServiceIds(userId, serviceIds),

    getServiceRatings(serviceIds),
  ]);

  return services.map((service) => {
    const rating = ratingMap.get(service.id) || {
      averageRating: 0,
      reviewCount: 0,
    };

    return {
      ...service,

      images: imageMap.get(service.id) || [],

      isFavorite: favoriteServiceIds.has(service.id),

      averageRating: rating.averageRating,

      reviewCount: rating.reviewCount,
    };
  });
};

const getProviderOtherServices = async (
  providerId,
  currentServiceId,
  userId,
) => {
  const services = await prisma.serviceListing.findMany({
    where: {
      providerId,
      id: {
        not: currentServiceId,
      },
      status: "ACTIVE",
      isAvailable: true,
      deletedAt: null,
    },

    select: serviceSelect,

    orderBy: {
      createdAt: "desc",
    },

    take: 3,
  });

  return enrichServices(services, userId);
};

const createService = async ({ userId, data, files = [] }) => {
  await validateServiceCategory(data.categoryId);

  let uploadedImages = [];

  try {
    if (files.length > 0) {
      uploadedImages = await uploadImages(files, "lookatlocal/services");
    }

    const service = await prisma.$transaction(async (tx) => {
      const createdService = await tx.serviceListing.create({
        data: {
          providerId: userId,
          categoryId: data.categoryId,

          title: data.title,
          description: data.description,

          experienceYears: data.experienceYears,

          pricingType: data.pricingType,

          price: data.price,

          isNegotiable: data.isNegotiable ?? false,

          addressLine: data.addressLine,

          locality: data.locality,

          city: data.city,
          state: data.state,

          postalCode: data.postalCode,

          latitude: data.latitude,

          longitude: data.longitude,

          status: "PENDING",
        },

        select: serviceSelect,
      });

      if (uploadedImages.length > 0) {
        await tx.listingImage.createMany({
          data: uploadedImages.map((image, index) => ({
            entityType: "SERVICE",

            entityId: createdService.id,

            imageUrl: image.url,
            publicId: image.publicId,

            sortOrder: index,
          })),
        });
      }

      return createdService;
    });

    const [result] = await enrichServices([service], userId);

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

const getServices = async (userId, filters) => {
  const {
    search,
    categoryId,
    pricingType,
    minPrice,
    maxPrice,
    isNegotiable,
    sort,
    page,
    limit,
  } = filters;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      city: true,
      locality: true,
      postalCode: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.city && !user.locality && !user.postalCode) {
    throw new AppError(
      "Please complete your profile location to find local services",
      400,
    );
  }

  const pagination = getPagination(page, limit);

  const where = {
    status: "ACTIVE",
    isAvailable: true,
    deletedAt: null,
  };

  if (user.postalCode) {
    where.postalCode = user.postalCode;
  } else if (user.city) {
    where.city = {
      equals: user.city,
      mode: "insensitive",
    };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (pricingType) {
    where.pricingType = pricingType;
  }

  if (typeof isNegotiable === "boolean") {
    where.isNegotiable = isNegotiable;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
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
        price: "asc",
      };
      break;

    case "price_desc":
      orderBy = {
        price: "desc",
      };
      break;

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
      break;
  }

  const [services, total] = await prisma.$transaction([
    prisma.serviceListing.findMany({
      where,
      select: serviceSelect,
      orderBy,
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.serviceListing.count({
      where,
    }),
  ]);

  const enrichedServices = await enrichServices(services, userId);

  return {
    services: enrichedServices,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getServiceById = async (serviceId, userId) => {
  const service = await prisma.serviceListing.findFirst({
    where: {
      id: serviceId,
      deletedAt: null,

      OR: [
        {
          status: "ACTIVE",
        },
        {
          providerId: userId,
        },
      ],
    },

    select: serviceSelect,
  });

  if (!service) {
    throw new AppError("Service listing not found", 404);
  }

  const [result] = await enrichServices([service], userId);

  const similarServices = await getProviderOtherServices(
    service.providerId,
    service.id,
    userId,
  );

  return {
    ...result,
    similarServices,
  };
};

const getMyServices = async (userId, filters) => {
  const { search, status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    providerId: userId,
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

  const [services, total] = await prisma.$transaction([
    prisma.serviceListing.findMany({
      where,

      select: serviceSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.serviceListing.count({
      where,
    }),
  ]);

  const enrichedServices = await enrichServices(services, userId);

  return {
    services: enrichedServices,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const updateService = async (serviceId, userId, data) => {
  const existingService = await prisma.serviceListing.findFirst({
    where: {
      id: serviceId,
      providerId: userId,
      deletedAt: null,
    },
  });

  if (!existingService) {
    throw new AppError(
      "Service listing not found or you do not have permission to update it",
      404,
    );
  }

  if (data.categoryId) {
    await validateServiceCategory(data.categoryId);
  }

  const updateData = {
    ...data,
  };

  const moderationFields = [
    "categoryId",
    "title",
    "description",
    "pricingType",
    "price",
    "addressLine",
    "locality",
    "city",
    "state",
    "postalCode",
  ];

  const requiresReview = moderationFields.some((field) =>
    Object.prototype.hasOwnProperty.call(data, field),
  );

  if (
    requiresReview &&
    ["ACTIVE", "REJECTED"].includes(existingService.status)
  ) {
    updateData.status = "PENDING";
  }

  const service = await prisma.serviceListing.update({
    where: {
      id: serviceId,
    },

    data: updateData,

    select: serviceSelect,
  });

  const [result] = await enrichServices([service], userId);

  return result;
};

const deleteService = async (serviceId, userId) => {
  const service = await prisma.serviceListing.findFirst({
    where: {
      id: serviceId,
      providerId: userId,
      deletedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!service) {
    throw new AppError(
      "Service listing not found or you do not have permission to delete it",
      404,
    );
  }

  await prisma.serviceListing.update({
    where: {
      id: serviceId,
    },

    data: {
      deletedAt: new Date(),
      isAvailable: false,
      status: "CLOSED",
    },
  });
};

module.exports = {
  createService,
  getServices,
  getServiceById,
  getMyServices,
  updateService,
  deleteService,
};
