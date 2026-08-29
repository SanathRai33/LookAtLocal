const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");
const { uploadImage, deleteImage } = require("../../services/upload.service");

const privateProfileSelect = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  profileImageUrl: true,
  bio: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  role: true,
  status: true,

  isEmailVerified: true,
  isPhoneVerified: true,

  createdAt: true,
  updatedAt: true,
};

const publicProfileSelect = {
  id: true,
  fullName: true,
  phone: true,
  email: true,
  status: true,
  isEmailVerified: true,
  isPhoneVerified: true,
  profileImageUrl: true,
  bio: true,
  locality: true,
  city: true,
  state: true,
  createdAt: true,
};

const getMyProfile = async (userId) => {
  const [user, unreadNotificationCount] = await Promise.all([
    prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: privateProfileSelect,
    }),
    prisma.notification.count({
      where: {
        userId,
        readAt: null,
      },
    }),
  ]);

  if (!user) {
    throw new AppError("User profile not found", 404);
  }

  return {
    ...user,
    unreadNotificationCount,
  };
};

const updateMyProfile = async (userId, data) => {
  const updateData = {
    ...data,
  };

  if (data.phone) {
    const existingUser = await prisma.user.findFirst({
      where: {
        phone: data.phone,
        id: {
          not: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      throw new AppError("This mobile number is already in use", 409);
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        phone: true,
      },
    });

    if (!currentUser) {
      throw new AppError("User profile not found", 404);
    }

    if (currentUser.phone !== data.phone) {
      updateData.isPhoneVerified = false;
    }
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
    select: privateProfileSelect,
  });

  return user;
};

const updateAvatar = async (userId, file) => {
  if (!file) {
    throw new AppError("Profile image is required", 400);
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      profileImageUrl: true,
    },
  });

  if (!currentUser) {
    throw new AppError("User profile not found", 404);
  }

  const uploadedImage = await uploadImage(file, "lookatlocal/profiles");

  const user = await prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      profileImageUrl: uploadedImage.url,
    },

    select: privateProfileSelect,
  });

  return user;
};

const getPublicProfile = async (userId) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      status: "ACTIVE",
      deletedAt: null,
    },
    select: publicProfileSelect,
  });

  if (!user) {
    throw new AppError("User profile not found", 404);
  }

  const [services, rentals, products, spaces, jobs] = await Promise.all([
    prisma.serviceListing.findMany({
      where: {
        providerId: userId,
        status: "ACTIVE",
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.rentalListing.findMany({
      where: {
        ownerId: userId,
        status: "ACTIVE",
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.productListing.findMany({
      where: {
        sellerId: userId,
        status: "ACTIVE",
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.spaceListing.findMany({
      where: {
        ownerId: userId,
        status: "ACTIVE",
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.jobListing.findMany({
      where: {
        postedBy: userId,
        status: "ACTIVE",
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return {
    ...user,
    services,
    rentals,
    products,
    spaces,
    jobs,
  };
};

const updateMyAccountStatus = async (userId, status) => {
  const now = new Date();

  const currentUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      status: true,
      deletedAt: true,
    },
  });

  if (!currentUser) {
    throw new AppError("User account not found", 404);
  }

  if (!["ACTIVE", "DEACTIVATED"].includes(status)) {
    throw new AppError("Invalid account status", 400);
  }

  if (currentUser.status === status) {
    throw new AppError(`Account is already ${status.toLowerCase()}`, 400);
  }

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status,
      deletedAt: null,
      statusChangedAt: now,
    },
    select: privateProfileSelect,
  });

  return user;
};

const deleteMyAccount = async (userId) => {
  const now = new Date();

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "DEACTIVATED",
        deletedAt: now,
      },
    }),

    prisma.userSession.updateMany({
      where: {
        userId,
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    }),
  ]);
};

module.exports = {
  getMyProfile,
  updateMyProfile,
  updateAvatar,
  getPublicProfile,
  updateMyAccountStatus,
  deleteMyAccount,
};
