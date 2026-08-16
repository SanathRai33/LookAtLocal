const prisma = require("../../config/prisma");

const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const validateFavoriteEntity = async (entityType, entityId) => {
  let entity = null;

  switch (entityType) {
    case "SERVICE":
      entity = await prisma.serviceListing.findFirst({
        where: {
          id: entityId,
          status: "ACTIVE",
          isAvailable: true,
          deletedAt: null,
        },

        select: {
          id: true,
        },
      });
      break;

    case "RENTAL":
      entity = await prisma.rentalListing.findFirst({
        where: {
          id: entityId,
          deletedAt: null,
        },

        select: {
          id: true,
        },
      });
      break;

    case "PRODUCT":
      entity = await prisma.productListing.findFirst({
        where: {
          id: entityId,
          deletedAt: null,
        },

        select: {
          id: true,
        },
      });
      break;

    case "SPACE":
      entity = await prisma.spaceListing.findFirst({
        where: {
          id: entityId,
          deletedAt: null,
        },

        select: {
          id: true,
        },
      });
      break;

    case "JOB":
      entity = await prisma.jobListing.findFirst({
        where: {
          id: entityId,
          deletedAt: null,
        },

        select: {
          id: true,
        },
      });
      break;

    case "COMMUNITY":
      entity = await prisma.communityPost.findFirst({
        where: {
          id: entityId,
          deletedAt: null,
        },

        select: {
          id: true,
        },
      });
      break;

    default:
      throw new AppError("Unsupported favorite entity type", 400);
  }

  if (!entity) {
    throw new AppError(
      "The item you are trying to favorite is unavailable",
      404,
    );
  }

  return entity;
};

const addFavorite = async (userId, data) => {
  const { entityType, entityId } = data;

  await validateFavoriteEntity(entityType, entityId);

  const existingFavorite = await prisma.favorite.findUnique({
    where: {
      userId_entityType_entityId: {
        userId,
        entityType,
        entityId,
      },
    },
  });

  if (existingFavorite) {
    throw new AppError("Item is already in your favorites", 409);
  }

  return prisma.favorite.create({
    data: {
      userId,
      entityType,
      entityId,
    },
  });
};

const removeFavorite = async (userId, entityType, entityId) => {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_entityType_entityId: {
        userId,
        entityType,
        entityId,
      },
    },

    select: {
      id: true,
    },
  });

  if (!favorite) {
    throw new AppError("Favorite not found", 404);
  }

  await prisma.favorite.delete({
    where: {
      id: favorite.id,
    },
  });
};

const getServiceFavoriteDetails = async (entityIds) => {
  if (!entityIds.length) {
    return new Map();
  }

  const services = await prisma.serviceListing.findMany({
    where: {
      id: {
        in: entityIds,
      },

      status: "ACTIVE",
      isAvailable: true,
      deletedAt: null,
    },

    select: {
      id: true,
      title: true,
      description: true,

      pricingType: true,
      price: true,
      isNegotiable: true,

      locality: true,
      city: true,
      state: true,

      provider: {
        select: {
          id: true,
          fullName: true,
          profileImageUrl: true,
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
  });

  return new Map(services.map((service) => [service.id, service]));
};

const getServiceFavoriteImages = async (entityIds) => {
  if (!entityIds.length) {
    return new Map();
  }

  const images = await prisma.listingImage.findMany({
    where: {
      entityType: "SERVICE",

      entityId: {
        in: entityIds,
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

const getFavorites = async (userId, filters) => {
  const { entityType, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    userId,
  };

  if (entityType) {
    where.entityType = entityType;
  }

  const [favorites, total] = await prisma.$transaction([
    prisma.favorite.findMany({
      where,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.favorite.count({
      where,
    }),
  ]);

  const serviceIds = favorites
    .filter((favorite) => favorite.entityType === "SERVICE")
    .map((favorite) => favorite.entityId);

  const [serviceMap, serviceImageMap] = await Promise.all([
    getServiceFavoriteDetails(serviceIds),

    getServiceFavoriteImages(serviceIds),
  ]);

  const enrichedFavorites = favorites.map((favorite) => {
    let entity = null;

    if (favorite.entityType === "SERVICE") {
      const service = serviceMap.get(favorite.entityId);

      if (service) {
        entity = {
          ...service,

          images: serviceImageMap.get(favorite.entityId) || [],

          isFavorite: true,
        };
      }
    }

    return {
      id: favorite.id,
      entityType: favorite.entityType,

      entityId: favorite.entityId,

      createdAt: favorite.createdAt,

      entity,
    };
  });

  return {
    favorites: enrichedFavorites,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};