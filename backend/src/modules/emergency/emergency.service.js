const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const emergencySelect = {
  id: true,
  userId: true,

  emergencyType: true,

  title: true,
  description: true,

  urgency: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  latitude: true,
  longitude: true,

  contactPhone: true,

  status: true,

  expiresAt: true,
  resolvedAt: true,

  createdAt: true,
  updatedAt: true,

  requester: {
    select: {
      id: true,
      fullName: true,
      profileImageUrl: true,
      phone: true,
      city: true,
    },
  },
};

const createEmergencyRequest = async ({ userId, data }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: {
      addressLine: true,
      locality: true,
      city: true,
      state: true,
      postalCode: true,
      latitude: true,
      longitude: true,
      phone: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const useCurrentLocation = data.useCurrentLocation || false;
  const addressLine = useCurrentLocation ? data.currentAddress : user.addressLine;
  const locality = useCurrentLocation ? data.currentLocality : user.locality;
  const city = useCurrentLocation ? data.currentCity : user.city;
  const state = useCurrentLocation ? data.currentState : user.state;
  const postalCode = useCurrentLocation ? data.currentPostalCode : user.postalCode;
  const latitude = useCurrentLocation ? data.currentLatitude : user.latitude;
  const longitude = useCurrentLocation ? data.currentLongitude : user.longitude;

  const emergency = await prisma.emergencyRequest.create({
    data: {
      userId: userId,

      emergencyType: data.emergencyType,

      title: data.title,

      description: data.description,

      urgency: data.urgency || "NORMAL",

      addressLine: addressLine,
      locality: locality,
      city: city,
      state: state,
      postalCode: postalCode,

      latitude: latitude,
      longitude: longitude,

      contactPhone: data.contactPhone || user.phone || "",

      status: "ACTIVE",

      expiresAt: expiresAt,
    },

    select: emergencySelect,
  });

  return emergency;
};

const getEmergencyRequests = async (userId, filters) => {
  const {
    search,
    emergencyType,
    urgency,
    status,
    city,
    sort,
    page,
    limit,
  } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    status: {
      in: ["ACTIVE", "RESOLVED"],
    },
  };

  if (emergencyType) {
    where.emergencyType = emergencyType;
  }

  if (urgency) {
    where.urgency = urgency;
  }

  if (status) {
    where.status = status;
  }

  if (city) {
    where.city = {
      contains: city,
      mode: "insensitive",
    };
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

  let orderBy;

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "urgent_first":
      orderBy = [
        {
          urgency: "desc",
        },
        {
          createdAt: "desc",
        },
      ];
      break;

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const [emergencies, total] = await prisma.$transaction([
    prisma.emergencyRequest.findMany({
      where,
      select: emergencySelect,
      orderBy,
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.emergencyRequest.count({
      where,
    }),
  ]);

  return {
    emergencies,
    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getMyEmergencyRequests = async (userId, filters) => {
  const { search, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    userId: userId,
  };

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

  const [emergencies, total] = await prisma.$transaction([
    prisma.emergencyRequest.findMany({
      where,
      select: emergencySelect,
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.emergencyRequest.count({
      where,
    }),
  ]);

  return {
    emergencies,
    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getEmergencyRequestById = async (emergencyId, userId) => {
  const emergency = await prisma.emergencyRequest.findFirst({
    where: {
      id: emergencyId,
    },
    select: emergencySelect,
  });

  if (!emergency) {
    throw new AppError("Emergency request not found", 404);
  }

  return emergency;
};

const updateEmergencyRequest = async (emergencyId, userId, data) => {
  const existingEmergency = await prisma.emergencyRequest.findFirst({
    where: {
      id: emergencyId,
      userId: userId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!existingEmergency) {
    throw new AppError(
      "Emergency request not found or you do not have permission to update it",
      404,
    );
  }

  if (existingEmergency.status === "RESOLVED") {
    throw new AppError("Cannot update a resolved emergency request", 400);
  }

  const updateData = {};

  const allowedFields = ["title", "description", "urgency", "contactPhone", "emergencyType"];

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  const emergency = await prisma.emergencyRequest.update({
    where: {
      id: emergencyId,
    },
    data: updateData,
    select: emergencySelect,
  });

  return emergency;
};

const deleteEmergencyRequest = async (emergencyId, userId) => {
  const emergency = await prisma.emergencyRequest.findFirst({
    where: {
      id: emergencyId,
      userId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!emergency) {
    throw new AppError(
      "Emergency request not found or you do not have permission to delete it",
      404,
    );
  }

  await prisma.emergencyRequest.delete({
    where: {
      id: emergencyId,
    },
  });

  return;
};

const resolveEmergencyRequest = async (emergencyId, userId) => {
  const emergency = await prisma.emergencyRequest.findFirst({
    where: {
      id: emergencyId,
      userId: userId,
      status: "ACTIVE",
    },
    select: {
      id: true,
    },
  });

  if (!emergency) {
    throw new AppError(
      "Emergency request not found or cannot be resolved",
      404,
    );
  }

  const resolved = await prisma.emergencyRequest.update({
    where: {
      id: emergencyId,
    },
    data: {
      status: "RESOLVED",
      resolvedAt: new Date(),
    },
    select: emergencySelect,
  });

  return resolved;
};

module.exports = {
  createEmergencyRequest,
  getEmergencyRequests,
  getMyEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyRequest,
  deleteEmergencyRequest,
  resolveEmergencyRequest,
};