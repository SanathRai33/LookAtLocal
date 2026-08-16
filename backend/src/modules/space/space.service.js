const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const { uploadImages, deleteImages } = require("../../services/upload.service");


const spaceSelect = {
  id: true,
  ownerId: true,
  categoryId: true,

  title: true,
  description: true,

  spaceType: true,

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

  units: {
    select: {
      id: true,
      unitNumber: true,
      floor: true,
      areaSqft: true,
      pricingType: true,
      price: true,
      depositAmount: true,
      availableFrom: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  },
};

const validateSpaceCategory = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      module: "SPACE",
      isActive: true,
    },

    select: {
      id: true,
    },
  });

  if (!category) {
    throw new AppError("Invalid or inactive space category", 400);
  }

  return category;
};

const getSpaceImages = async (spaceIds) => {
  if (!spaceIds.length) {
    return new Map();
  }

  const images = await prisma.listingImage.findMany({
    where: {
      entityType: "SPACE",

      entityId: {
        in: spaceIds,
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

const getFavoriteSpaceIds = async (userId, spaceIds) => {
  if (!userId || !spaceIds.length) {
    return new Set();
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,

      entityType: "SPACE",

      entityId: {
        in: spaceIds,
      },
    },

    select: {
      entityId: true,
    },
  });

  return new Set(favorites.map((favorite) => favorite.entityId));
};

const enrichSpaces = async (spaces, userId) => {
  if (!spaces.length) {
    return [];
  }

  const spaceIds = spaces.map((space) => space.id);

  const [imageMap, favoriteSpaceIds] = await Promise.all([
    getSpaceImages(spaceIds),

    getFavoriteSpaceIds(userId, spaceIds),
  ]);

  return spaces.map((space) => {
    return {
      ...space,

      images: imageMap.get(space.id) || [],

      isFavorite: favoriteSpaceIds.has(space.id),
    };
  });
};

const getOwnerOtherSpaces = async (ownerId, currentSpaceId, userId) => {
  const spaces = await prisma.spaceListing.findMany({
    where: {
      ownerId,
      id: { not: currentSpaceId },
      status: "ACTIVE",
      deletedAt: null,
    },
    select: spaceSelect,
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return enrichSpaces(spaces, userId);
};

const createSpace = async ({ userId, data, files = [] }) => {
  await validateSpaceCategory(data.categoryId);

  let uploadedImages = [];

  try {
    if (files.length > 0) {
      uploadedImages = await uploadImages(files, "lookatlocal/spaces");
    }

    const space = await prisma.$transaction(async (tx) => {
      const createdSpace = await tx.spaceListing.create({
        data: {
          ownerId: userId,

          categoryId: data.categoryId,

          title: data.title,

          description: data.description,

          spaceType: data.spaceType,

          addressLine: data.addressLine,

          locality: data.locality,

          city: data.city,

          state: data.state,

          postalCode: data.postalCode,

          latitude: data.latitude,

          longitude: data.longitude,

          status: "PENDING",
        },

        select: spaceSelect,
      });

      if (uploadedImages.length > 0) {
        await tx.listingImage.createMany({
          data: uploadedImages.map((image, index) => ({
            entityType: "SPACE",

            entityId: createdSpace.id,

            imageUrl: image.url,

            publicId: image.publicId,

            sortOrder: index,
          })),
        });
      }

      if (data.units && data.units.length > 0) {
        await tx.spaceUnit.createMany({
          data: data.units.map((unit) => ({
            spaceListingId: createdSpace.id,

            unitNumber: unit.unitNumber,

            floor: unit.floor,

            areaSqft: unit.areaSqft,

            pricingType: unit.pricingType,

            price: unit.price,

            depositAmount: unit.depositAmount || 0,

            availableFrom: unit.availableFrom,

            status: unit.status || "AVAILABLE",
          })),
        });
      }

      return createdSpace;
    });

    const [result] = await enrichSpaces([space], userId);

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

const getSpaces = async (userId, filters) => {
  const {
    search,
    categoryId,
    city,
    locality,
    postalCode,
    spaceType,
    pricingType,
    minPrice,
    maxPrice,
    unitStatus,
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
      "Please complete your profile location to find local spaces",
      400,
    );
  }

  const pagination = getPagination(page, limit);

  const where = {
    status: "ACTIVE",
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

  if (spaceType) {
    where.spaceType = spaceType;
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

  if (pricingType || minPrice || maxPrice || unitStatus) {
    where.units = {};

    if (pricingType) {
      where.units.some = {
        pricingType: pricingType,
      };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.units.some = {
        ...(where.units.some || {}),
        price: {},
      };

      if (minPrice !== undefined) {
        where.units.some.price.gte = minPrice;
      }

      if (maxPrice !== undefined) {
        where.units.some.price.lte = maxPrice;
      }
    }

    if (unitStatus) {
      where.units.some = {
        ...(where.units.some || {}),
        status: unitStatus,
      };
    }
  }

  let orderBy;

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const [spaces, total] = await prisma.$transaction([
    prisma.spaceListing.findMany({
      where,

      select: spaceSelect,

      orderBy,

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.spaceListing.count({
      where,
    }),
  ]);

  const enrichedSpaces = await enrichSpaces(spaces, userId);

  return {
    spaces: enrichedSpaces,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const getSpaceById = async (spaceId, userId) => {
  const space = await prisma.spaceListing.findFirst({
    where: {
      id: spaceId,

      deletedAt: null,

      OR: [
        {
          status: "ACTIVE",
        },

        {
          ownerId: userId,
        },
      ],
    },

    select: spaceSelect,
  });

  if (!space) {
    throw new AppError("Space listing not found", 404);
  }

  const [result] = await enrichSpaces([space], userId);
  const similarSpaces = await getOwnerOtherSpaces(
    space.ownerId,
    space.id,
    userId,
  );

  return {
    ...result,
    similarSpaces,
  };
};

const getMySpaces = async (userId, filters) => {
  const { search, status, page, limit } = filters;

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

  const [spaces, total] = await prisma.$transaction([
    prisma.spaceListing.findMany({
      where,

      select: spaceSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.spaceListing.count({
      where,
    }),
  ]);

  const enrichedSpaces = await enrichSpaces(spaces, userId);

  return {
    spaces: enrichedSpaces,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const updateSpace = async (spaceId, userId, data) => {
  const existingSpace = await prisma.spaceListing.findFirst({
    where: {
      id: spaceId,

      ownerId: userId,

      deletedAt: null,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!existingSpace) {
    throw new AppError(
      "Space listing not found or you do not have permission to update it",
      404,
    );
  }

  if (data.categoryId) {
    await validateSpaceCategory(data.categoryId);
  }

  const updateData = {
    ...data,
  };

  const moderationFields = [
    "categoryId",
    "title",
    "description",
    "spaceType",
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
    ["ACTIVE", "REJECTED"].includes(existingSpace.status)
  ) {
    updateData.status = "PENDING";
  }

  const space = await prisma.spaceListing.update({
    where: {
      id: spaceId,
    },

    data: updateData,

    select: spaceSelect,
  });

  const [result] = await enrichSpaces([space], userId);

  return result;
};

const deleteSpace = async (spaceId, userId) => {
  const space = await prisma.spaceListing.findFirst({
    where: {
      id: spaceId,

      ownerId: userId,

      deletedAt: null,
    },

    include: {
      units: {
        where: {
          status: {
            in: ["RESERVED", "OCCUPIED"],
          },
        },
      },
    },
  });

  if (!space) {
    throw new AppError(
      "Space listing not found or you do not have permission to delete it",
      404,
    );
  }

  if (space.units.length > 0) {
    throw new AppError(
      "Cannot delete a space listing with reserved or occupied units.",
      400,
    );
  }

  await prisma.$transaction(async (tx) => {
    const images = await tx.listingImage.findMany({
      where: {
        entityType: "SPACE",

        entityId: spaceId,
      },
    });

    if (images.length > 0) {
      await deleteImages(images.map((image) => image.publicId).filter(Boolean));

      await tx.listingImage.deleteMany({
        where: {
          entityType: "SPACE",

          entityId: spaceId,
        },
      });
    }

    await tx.spaceListing.update({
      where: {
        id: spaceId,
      },

      data: {
        deletedAt: new Date(),
        status: "CLOSED",
      },
    });

    await tx.spaceUnit.updateMany({
      where: {
        spaceListingId: spaceId,
        status: {
          in: ["AVAILABLE", "RESERVED"],
        },
      },

      data: {
        status: "RESERVED",
      },
    });
  });

  return;
};

module.exports = {
  createSpace,
  getSpaces,
  getSpaceById,
  getMySpaces,
  updateSpace,
  deleteSpace,
};