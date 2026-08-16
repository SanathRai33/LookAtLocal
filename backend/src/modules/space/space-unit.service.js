const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const unitSelect = {
  id: true,
  spaceListingId: true,

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
};

const validateSpaceOwnership = async (spaceId, userId) => {
  const space = await prisma.spaceListing.findFirst({
    where: {
      id: spaceId,
      ownerId: userId,
      deletedAt: null,
    },

    select: {
      id: true,
    },
  });

  if (!space) {
    throw new AppError(
      "Space listing not found or you do not have permission",
      404,
    );
  }

  return space;
};

const createSpaceUnit = async ({ spaceId, userId, data }) => {
  await validateSpaceOwnership(spaceId, userId);

  const unit = await prisma.spaceUnit.create({
    data: {
      spaceListingId: spaceId,

      unitNumber: data.unitNumber,

      floor: data.floor,

      areaSqft: data.areaSqft,

      pricingType: data.pricingType,

      price: data.price,

      depositAmount: data.depositAmount || 0,

      availableFrom: data.availableFrom,

      status: data.status || "AVAILABLE",
    },

    select: unitSelect,
  });

  return unit;
};

const getSpaceUnits = async (spaceId, userId, filters) => {
  const { search, page, limit } = filters;

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

    select: {
      id: true,
    },
  });

  if (!space) {
    throw new AppError("Space listing not found", 404);
  }

  const pagination = getPagination(page, limit);

  const where = {
    spaceListingId: spaceId,
  };

  if (search) {
    where.OR = [
      {
        unitNumber: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        floor: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [units, total] = await prisma.$transaction([
    prisma.spaceUnit.findMany({
      where,

      select: unitSelect,

      orderBy: [
        {
          floor: "asc",
        },
        {
          unitNumber: "asc",
        },
      ],

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.spaceUnit.count({
      where,
    }),
  ]);

  return {
    units,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const getSpaceUnitById = async (spaceId, unitId, userId) => {
  const unit = await prisma.spaceUnit.findFirst({
    where: {
      id: unitId,

      spaceListingId: spaceId,

      spaceListing: {
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
    },

    select: unitSelect,
  });

  if (!unit) {
    throw new AppError("Space unit not found", 404);
  }

  return unit;
};

const updateSpaceUnit = async (spaceId, unitId, userId, data) => {
  await validateSpaceOwnership(spaceId, userId);

  const unit = await prisma.spaceUnit.findFirst({
    where: {
      id: unitId,

      spaceListingId: spaceId,
    },

    select: {
      id: true,
    },
  });

  if (!unit) {
    throw new AppError("Space unit not found", 404);
  }

  const updateData = {
    ...data,
  };

  if (data.status === "OCCUPIED") {
    const space = await prisma.spaceListing.findFirst({
      where: {
        id: spaceId,
      },

      select: {
        status: true,
      },
    });

    if (space && space.status !== "ACTIVE") {
      throw new AppError(
        "Cannot mark unit as OCCUPIED when space listing is not ACTIVE",
        400,
      );
    }
  }

  const updatedUnit = await prisma.spaceUnit.update({
    where: {
      id: unitId,
    },

    data: updateData,

    select: unitSelect,
  });

  return updatedUnit;
};

const deleteSpaceUnit = async (spaceId, unitId, userId) => {
  await validateSpaceOwnership(spaceId, userId);

  const unit = await prisma.spaceUnit.findFirst({
    where: {
      id: unitId,

      spaceListingId: spaceId,

      status: {
        in: ["AVAILABLE", "RESERVED"],
      },
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!unit) {
    throw new AppError(
      "Space unit not found or cannot be deleted (only AVAILABLE or RESERVED units can be deleted)",
      404,
    );
  }

  await prisma.spaceUnit.delete({
    where: {
      id: unitId,
    },
  });

  return;
};

module.exports = {
  createSpaceUnit,
  getSpaceUnits,
  getSpaceUnitById,
  updateSpaceUnit,
  deleteSpaceUnit,
};