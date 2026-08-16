const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const createAuditLog = async ({ adminId, action, entityType, entityId, metadata = {} }) => {
  return prisma.adminAuditLog.create({
    data: {
      adminId,
      action,
      entityType,
      entityId,
      newData: metadata,
    },
  });
};

const getDashboardStats = async () => {
  const [
    totalUsers,
    activeUsers,
    blockedUsers,
    totalServices,
    pendingServices,
    activeServices,
    totalRentals,
    pendingRentals,
    activeRentals,
    totalProducts,
    pendingProducts,
    activeProducts,
    totalSpaces,
    pendingSpaces,
    activeSpaces,
    totalJobs,
    pendingJobs,
    activeJobs,
    openReports,
    totalBookings,
    pendingBookings,
    completedBookings,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { status: "ACTIVE", deletedAt: null } }),
    prisma.user.count({ where: { status: "BANNED" } }),
    prisma.serviceListing.count({ where: { deletedAt: null } }),
    prisma.serviceListing.count({ where: { status: "PENDING", deletedAt: null } }),
    prisma.serviceListing.count({ where: { status: "ACTIVE", deletedAt: null } }),
    prisma.rentalListing.count({ where: { deletedAt: null } }),
    prisma.rentalListing.count({ where: { status: "PENDING", deletedAt: null } }),
    prisma.rentalListing.count({ where: { status: "ACTIVE", deletedAt: null } }),
    prisma.productListing.count({ where: { deletedAt: null } }),
    prisma.productListing.count({ where: { status: "PENDING", deletedAt: null } }),
    prisma.productListing.count({ where: { status: "ACTIVE", deletedAt: null } }),
    prisma.spaceListing.count({ where: { deletedAt: null } }),
    prisma.spaceListing.count({ where: { status: "PENDING", deletedAt: null } }),
    prisma.spaceListing.count({ where: { status: "ACTIVE", deletedAt: null } }),
    prisma.jobListing.count({ where: { deletedAt: null } }),
    prisma.jobListing.count({ where: { status: "PENDING", deletedAt: null } }),
    prisma.jobListing.count({ where: { status: "ACTIVE", deletedAt: null } }),
    prisma.report.count({ where: { status: { in: ["OPEN", "REVIEWING"] } } }),
    prisma.serviceBooking.count(),
    prisma.serviceBooking.count({ where: { status: "REQUESTED" } }),
    prisma.serviceBooking.count({ where: { status: "COMPLETED" } }),
  ]);

  return {
    users: {
      total: totalUsers,
      active: activeUsers,
      blocked: blockedUsers,
    },
    services: {
      total: totalServices,
      pending: pendingServices,
      active: activeServices,
    },
    rentals: {
      total: totalRentals,
      pending: pendingRentals,
      active: activeRentals,
    },
    products: {
      total: totalProducts,
      pending: pendingProducts,
      active: activeProducts,
    },
    spaces: {
      total: totalSpaces,
      pending: pendingSpaces,
      active: activeSpaces,
    },
    jobs: {
      total: totalJobs,
      pending: pendingJobs,
      active: activeJobs,
    },
    reports: {
      open: openReports,
    },
    bookings: {
      total: totalBookings,
      pending: pendingBookings,
      completed: completedBookings,
    },
  };
};

const getUsers = async (filters) => {
  const { search, status, role, sort, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {
    deletedAt: null,
  };

  if (status) {
    where.status = status;
  }

  if (role) {
    where.role = role;
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phone: { contains: search, mode: "insensitive" } },
    ];
  }

  let orderBy;
  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "name":
      orderBy = { fullName: "asc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        profileImageUrl: true,
        role: true,
        status: true,
        isEmailVerified: true,
        isPhoneVerified: true,
        city: true,
        state: true,
        createdAt: true,
      },
      orderBy,
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.user.count({ where }),
  ]);

  return {
    users,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const getUserById = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      profileImageUrl: true,
      bio: true,
      role: true,
      status: true,
      statusReason: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      addressLine: true,
      locality: true,
      city: true,
      state: true,
      postalCode: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          serviceListings: true,
          rentalListings: true,
          productListings: true,
          spaceListings: true,
          jobListings: true,
          emergencyRequests: true,
          reviewsWritten: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const changeUserStatus = async (userId, adminId, data) => {
  const { status, reason } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: { id: true, status: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (user.status === status) {
    throw new AppError(`User is already ${status}`, 400);
  }

  const updatedUser = await prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: {
        status,
        statusReason: reason || null,
        statusChangedBy: adminId,
        statusChangedAt: new Date(),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        status: true,
        statusReason: true,
      },
    });

    await createAuditLog({
      adminId,
      action: `USER_STATUS_CHANGED_TO_${status}`,
      entityType: "USER",
      entityId: userId,
      metadata: { oldStatus: user.status, newStatus: status, reason },
    });

    return updated;
  });

  return updatedUser;
};

const deleteUser = async (userId, adminId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: { id: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        deletedAt: new Date(),
        status: "DEACTIVATED",
      },
    });

    await createAuditLog({
      adminId,
      action: "USER_DELETED",
      entityType: "USER",
      entityId: userId,
    });
  });

  return { success: true };
};

const restoreUser = async (userId, adminId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, deletedAt: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.deletedAt) {
    throw new AppError("User is not deleted", 400);
  }

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: {
        deletedAt: null,
        status: "ACTIVE",
      },
    });

    await createAuditLog({
      adminId,
      action: "USER_RESTORED",
      entityType: "USER",
      entityId: userId,
    });
  });

  return { success: true };
};

const getPendingServices = async (filters) => {
  const { search, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {
    status: "PENDING",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { provider: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [services, total] = await prisma.$transaction([
    prisma.serviceListing.findMany({
      where,
      include: {
        provider: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.serviceListing.count({ where }),
  ]);

  return {
    services,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const approveService = async (serviceId, adminId) => {
  const service = await prisma.serviceListing.findFirst({
    where: { id: serviceId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!service) {
    throw new AppError("Pending service not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.serviceListing.update({
      where: { id: serviceId },
      data: {
        status: "ACTIVE",
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
    });

    await createAuditLog({
      adminId,
      action: "SERVICE_APPROVED",
      entityType: "SERVICE",
      entityId: serviceId,
    });
  });

  return { success: true };
};

const rejectService = async (serviceId, adminId, data) => {
  const { reason } = data;

  const service = await prisma.serviceListing.findFirst({
    where: { id: serviceId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!service) {
    throw new AppError("Pending service not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.serviceListing.update({
      where: { id: serviceId },
      data: {
        status: "REJECTED",
        rejectionReason: reason || "Not approved",
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
    });

    await createAuditLog({
      adminId,
      action: "SERVICE_REJECTED",
      entityType: "SERVICE",
      entityId: serviceId,
      metadata: { reason },
    });
  });

  return { success: true };
};

const closeService = async (serviceId, adminId) => {
  const service = await prisma.serviceListing.findFirst({
    where: { id: serviceId, status: "ACTIVE", deletedAt: null },
    select: { id: true },
  });

  if (!service) {
    throw new AppError("Active service not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.serviceListing.update({
      where: { id: serviceId },
      data: {
        status: "CLOSED",
        isAvailable: false,
      },
    });

    await createAuditLog({
      adminId,
      action: "SERVICE_CLOSED",
      entityType: "SERVICE",
      entityId: serviceId,
    });
  });

  return { success: true };
};

const getPendingRentals = async (filters) => {
  const { search, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {
    status: "PENDING",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { owner: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [rentals, total] = await prisma.$transaction([
    prisma.rentalListing.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.rentalListing.count({ where }),
  ]);

  return {
    rentals,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const approveRental = async (rentalId, adminId) => {
  const rental = await prisma.rentalListing.findFirst({
    where: { id: rentalId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!rental) {
    throw new AppError("Pending rental not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.rentalListing.update({
      where: { id: rentalId },
      data: {
        status: "ACTIVE",
      },
    });

    await createAuditLog({
      adminId,
      action: "RENTAL_APPROVED",
      entityType: "RENTAL",
      entityId: rentalId,
    });
  });

  return { success: true };
};

const rejectRental = async (rentalId, adminId, data) => {
  const { reason } = data;

  const rental = await prisma.rentalListing.findFirst({
    where: { id: rentalId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!rental) {
    throw new AppError("Pending rental not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.rentalListing.update({
      where: { id: rentalId },
      data: {
        status: "REJECTED",
      },
    });

    await createAuditLog({
      adminId,
      action: "RENTAL_REJECTED",
      entityType: "RENTAL",
      entityId: rentalId,
      metadata: { reason },
    });
  });

  return { success: true };
};

const closeRental = async (rentalId, adminId) => {
  const rental = await prisma.rentalListing.findFirst({
    where: { id: rentalId, status: "ACTIVE", deletedAt: null },
    select: { id: true },
  });

  if (!rental) {
    throw new AppError("Active rental not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.rentalListing.update({
      where: { id: rentalId },
      data: {
        status: "CLOSED",
        isAvailable: false,
      },
    });

    await createAuditLog({
      adminId,
      action: "RENTAL_CLOSED",
      entityType: "RENTAL",
      entityId: rentalId,
    });
  });

  return { success: true };
};

const getPendingProducts = async (filters) => {
  const { search, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {
    status: "PENDING",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { seller: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [products, total] = await prisma.$transaction([
    prisma.productListing.findMany({
      where,
      include: {
        seller: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.productListing.count({ where }),
  ]);

  return {
    products,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const approveProduct = async (productId, adminId) => {
  const product = await prisma.productListing.findFirst({
    where: { id: productId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!product) {
    throw new AppError("Pending product not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.productListing.update({
      where: { id: productId },
      data: {
        status: "ACTIVE",
      },
    });

    await createAuditLog({
      adminId,
      action: "PRODUCT_APPROVED",
      entityType: "PRODUCT",
      entityId: productId,
    });
  });

  return { success: true };
};

const rejectProduct = async (productId, adminId, data) => {
  const { reason } = data;

  const product = await prisma.productListing.findFirst({
    where: { id: productId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!product) {
    throw new AppError("Pending product not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.productListing.update({
      where: { id: productId },
      data: {
        status: "REJECTED",
      },
    });

    await createAuditLog({
      adminId,
      action: "PRODUCT_REJECTED",
      entityType: "PRODUCT",
      entityId: productId,
      metadata: { reason },
    });
  });

  return { success: true };
};

const closeProduct = async (productId, adminId) => {
  const product = await prisma.productListing.findFirst({
    where: { id: productId, status: "ACTIVE", deletedAt: null },
    select: { id: true },
  });

  if (!product) {
    throw new AppError("Active product not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.productListing.update({
      where: { id: productId },
      data: {
        status: "CLOSED",
      },
    });

    await createAuditLog({
      adminId,
      action: "PRODUCT_CLOSED",
      entityType: "PRODUCT",
      entityId: productId,
    });
  });

  return { success: true };
};

const getPendingSpaces = async (filters) => {
  const { search, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {
    status: "PENDING",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { owner: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [spaces, total] = await prisma.$transaction([
    prisma.spaceListing.findMany({
      where,
      include: {
        owner: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.spaceListing.count({ where }),
  ]);

  return {
    spaces,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const approveSpace = async (spaceId, adminId) => {
  const space = await prisma.spaceListing.findFirst({
    where: { id: spaceId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!space) {
    throw new AppError("Pending space not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.spaceListing.update({
      where: { id: spaceId },
      data: {
        status: "ACTIVE",
      },
    });

    await createAuditLog({
      adminId,
      action: "SPACE_APPROVED",
      entityType: "SPACE",
      entityId: spaceId,
    });
  });

  return { success: true };
};

const rejectSpace = async (spaceId, adminId, data) => {
  const { reason } = data;

  const space = await prisma.spaceListing.findFirst({
    where: { id: spaceId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!space) {
    throw new AppError("Pending space not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.spaceListing.update({
      where: { id: spaceId },
      data: {
        status: "REJECTED",
      },
    });

    await createAuditLog({
      adminId,
      action: "SPACE_REJECTED",
      entityType: "SPACE",
      entityId: spaceId,
      metadata: { reason },
    });
  });

  return { success: true };
};

const closeSpace = async (spaceId, adminId) => {
  const space = await prisma.spaceListing.findFirst({
    where: { id: spaceId, status: "ACTIVE", deletedAt: null },
    select: { id: true },
  });

  if (!space) {
    throw new AppError("Active space not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.spaceListing.update({
      where: { id: spaceId },
      data: {
        status: "CLOSED",
      },
    });

    await createAuditLog({
      adminId,
      action: "SPACE_CLOSED",
      entityType: "SPACE",
      entityId: spaceId,
    });
  });

  return { success: true };
};

const getPendingJobs = async (filters) => {
  const { search, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {
    status: "PENDING",
    deletedAt: null,
  };

  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { companyName: { contains: search, mode: "insensitive" } },
      { poster: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  const [jobs, total] = await prisma.$transaction([
    prisma.jobListing.findMany({
      where,
      include: {
        poster: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.jobListing.count({ where }),
  ]);

  return {
    jobs,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const approveJob = async (jobId, adminId) => {
  const job = await prisma.jobListing.findFirst({
    where: { id: jobId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!job) {
    throw new AppError("Pending job not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.jobListing.update({
      where: { id: jobId },
      data: {
        status: "ACTIVE",
      },
    });

    await createAuditLog({
      adminId,
      action: "JOB_APPROVED",
      entityType: "JOB",
      entityId: jobId,
    });
  });

  return { success: true };
};

const rejectJob = async (jobId, adminId, data) => {
  const { reason } = data;

  const job = await prisma.jobListing.findFirst({
    where: { id: jobId, status: "PENDING", deletedAt: null },
    select: { id: true },
  });

  if (!job) {
    throw new AppError("Pending job not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.jobListing.update({
      where: { id: jobId },
      data: {
        status: "REJECTED",
      },
    });

    await createAuditLog({
      adminId,
      action: "JOB_REJECTED",
      entityType: "JOB",
      entityId: jobId,
      metadata: { reason },
    });
  });

  return { success: true };
};

const closeJob = async (jobId, adminId) => {
  const job = await prisma.jobListing.findFirst({
    where: { id: jobId, status: "ACTIVE", deletedAt: null },
    select: { id: true },
  });

  if (!job) {
    throw new AppError("Active job not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.jobListing.update({
      where: { id: jobId },
      data: {
        status: "CLOSED",
      },
    });

    await createAuditLog({
      adminId,
      action: "JOB_CLOSED",
      entityType: "JOB",
      entityId: jobId,
    });
  });

  return { success: true };
};

const getReports = async (filters) => {
  const { search, status, entityType, sort, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {};

  if (status) {
    where.status = status;
  }

  if (entityType) {
    where.entityType = entityType;
  }

  if (search) {
    where.OR = [
      { description: { contains: search, mode: "insensitive" } },
      { reporter: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  let orderBy;
  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const [reports, total] = await prisma.$transaction([
    prisma.report.findMany({
      where,
      include: {
        reporter: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        reviewer: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
      orderBy,
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.report.count({ where }),
  ]);

  return {
    reports,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const getReportById = async (reportId) => {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    include: {
      reporter: {
        select: {
          id: true,
          fullName: true,
          email: true,
          profileImageUrl: true,
        },
      },
      reviewer: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  return report;
};

const reviewReport = async (reportId, adminId) => {
  const report = await prisma.report.findUnique({
    where: { id: reportId },
    select: { id: true, status: true },
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  if (report.status === "RESOLVED" || report.status === "DISMISSED") {
    throw new AppError("Report is already resolved or dismissed", 400);
  }

  await prisma.$transaction(async (tx) => {
    await tx.report.update({
      where: { id: reportId },
      data: {
        status: "REVIEWING",
        reviewedBy: adminId,
        reviewedAt: new Date(),
      },
    });

    await createAuditLog({
      adminId,
      action: "REPORT_REVIEWED",
      entityType: "REPORT",
      entityId: reportId,
    });
  });

  return { success: true };
};

const resolveReport = async (reportId, adminId, data) => {
  const { resolutionNote } = data;

  const report = await prisma.report.findUnique({
    where: { id: reportId },
    select: { id: true, status: true },
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  if (report.status === "RESOLVED" || report.status === "DISMISSED") {
    throw new AppError("Report is already resolved or dismissed", 400);
  }

  await prisma.$transaction(async (tx) => {
    await tx.report.update({
      where: { id: reportId },
      data: {
        status: "RESOLVED",
        reviewedBy: adminId,
        reviewedAt: new Date(),
        resolutionNote: resolutionNote || "Resolved by admin",
      },
    });

    await createAuditLog({
      adminId,
      action: "REPORT_RESOLVED",
      entityType: "REPORT",
      entityId: reportId,
      metadata: { resolutionNote },
    });
  });

  return { success: true };
};

const dismissReport = async (reportId, adminId, data) => {
  const { resolutionNote } = data;

  const report = await prisma.report.findUnique({
    where: { id: reportId },
    select: { id: true, status: true },
  });

  if (!report) {
    throw new AppError("Report not found", 404);
  }

  if (report.status === "RESOLVED" || report.status === "DISMISSED") {
    throw new AppError("Report is already resolved or dismissed", 400);
  }

  await prisma.$transaction(async (tx) => {
    await tx.report.update({
      where: { id: reportId },
      data: {
        status: "DISMISSED",
        reviewedBy: adminId,
        reviewedAt: new Date(),
        resolutionNote: resolutionNote || "Dismissed by admin",
      },
    });

    await createAuditLog({
      adminId,
      action: "REPORT_DISMISSED",
      entityType: "REPORT",
      entityId: reportId,
      metadata: { resolutionNote },
    });
  });

  return { success: true };
};

const getReviews = async (filters) => {
  const { search, rating, entityType, sort, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {};

  if (rating) {
    where.rating = parseInt(rating);
  }

  if (entityType) {
    where.entityType = entityType;
  }

  if (search) {
    where.OR = [
      { comment: { contains: search, mode: "insensitive" } },
      { reviewer: { fullName: { contains: search, mode: "insensitive" } } },
      { reviewee: { fullName: { contains: search, mode: "insensitive" } } },
    ];
  }

  let orderBy;
  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "rating_asc":
      orderBy = { rating: "asc" };
      break;
    case "rating_desc":
      orderBy = { rating: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
  }

  const [reviews, total] = await prisma.$transaction([
    prisma.review.findMany({
      where,
      include: {
        reviewer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
        reviewee: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
      orderBy,
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.review.count({ where }),
  ]);

  return {
    reviews,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const deleteReview = async (reviewId, adminId) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { id: true },
  });

  if (!review) {
    throw new AppError("Review not found", 404);
  }

  await prisma.$transaction(async (tx) => {
    await tx.review.delete({
      where: { id: reviewId },
    });

    await createAuditLog({
      adminId,
      action: "REVIEW_DELETED",
      entityType: "REVIEW",
      entityId: reviewId,
    });
  });

  return { success: true };
};

const getCategories = async (filters) => {
  const { module, search, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {};

  if (module) {
    where.module = module;
  }

  if (search) {
    where.name = { contains: search, mode: "insensitive" };
  }

  const [categories, total] = await prisma.$transaction([
    prisma.category.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.category.count({ where }),
  ]);

  return {
    categories,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const createCategory = async (adminId, data) => {
  const { name, slug, icon, module, parentId, sortOrder } = data;

  const existingCategory = await prisma.category.findUnique({
    where: { module_slug: { module, slug } },
  });

  if (existingCategory) {
    throw new AppError(`Category with slug "${slug}" already exists in this module`, 409);
  }

  const category = await prisma.$transaction(async (tx) => {
    const created = await tx.category.create({
      data: {
        name,
        slug,
        icon,
        module,
        parentId: parentId || null,
        sortOrder: sortOrder || 0,
        isActive: true,
      },
    });

    await createAuditLog({
      adminId,
      action: "CATEGORY_CREATED",
      entityType: "CATEGORY",
      entityId: created.id,
      metadata: { name, slug, module },
    });

    return created;
  });

  return category;
};

const updateCategory = async (categoryId, adminId, data) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const updatedCategory = await prisma.$transaction(async (tx) => {
    const updated = await tx.category.update({
      where: { id: categoryId },
      data,
    });

    await createAuditLog({
      adminId,
      action: "CATEGORY_UPDATED",
      entityType: "CATEGORY",
      entityId: categoryId,
      metadata: data,
    });

    return updated;
  });

  return updatedCategory;
};

const toggleCategoryStatus = async (categoryId, adminId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, isActive: true },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const updatedCategory = await prisma.$transaction(async (tx) => {
    const updated = await tx.category.update({
      where: { id: categoryId },
      data: {
        isActive: !category.isActive,
      },
    });

    await createAuditLog({
      adminId,
      action: `CATEGORY_${category.isActive ? "DEACTIVATED" : "ACTIVATED"}`,
      entityType: "CATEGORY",
      entityId: categoryId,
      metadata: { previousStatus: category.isActive, newStatus: !category.isActive },
    });

    return updated;
  });

  return updatedCategory;
};

const deleteCategory = async (categoryId, adminId) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      children: {
        select: { id: true },
      },
      serviceListings: {
        where: { deletedAt: null },
        select: { id: true },
        take: 1,
      },
      rentalListings: {
        where: { deletedAt: null },
        select: { id: true },
        take: 1,
      },
      productListings: {
        where: { deletedAt: null },
        select: { id: true },
        take: 1,
      },
      spaceListings: {
        where: { deletedAt: null },
        select: { id: true },
        take: 1,
      },
      jobListings: {
        where: { deletedAt: null },
        select: { id: true },
        take: 1,
      },
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  if (category.children.length > 0) {
    throw new AppError("Cannot delete category with subcategories", 400);
  }

  if (
    category.serviceListings.length > 0 ||
    category.rentalListings.length > 0 ||
    category.productListings.length > 0 ||
    category.spaceListings.length > 0 ||
    category.jobListings.length > 0
  ) {
    throw new AppError("Cannot delete category with existing listings", 400);
  }

  await prisma.$transaction(async (tx) => {
    await tx.category.delete({
      where: { id: categoryId },
    });

    await createAuditLog({
      adminId,
      action: "CATEGORY_DELETED",
      entityType: "CATEGORY",
      entityId: categoryId,
    });
  });

  return { success: true };
};

const getPointsTransactions = async (filters) => {
  const { userId, transactionType, actionType, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (transactionType) {
    where.transactionType = transactionType;
  }

  if (actionType) {
    where.actionType = actionType;
  }

  const [transactions, total] = await prisma.$transaction([
    prisma.pointsTransaction.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.pointsTransaction.count({ where }),
  ]);

  return {
    transactions,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const adjustUserPoints = async (userId, adminId, data) => {
  const { points, description } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: { id: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const transaction = await prisma.$transaction(async (tx) => {
    const created = await tx.pointsTransaction.create({
      data: {
        userId,
        points,
        transactionType: "ADJUSTED",
        actionType: "ADMIN_ADJUSTMENT",
        description: description || "Admin adjustment",
      },
    });

    await createAuditLog({
      adminId,
      action: "POINTS_ADJUSTED",
      entityType: "USER",
      entityId: userId,
      metadata: { points, description },
    });

    return created;
  });

  return transaction;
};

const getServiceBookings = async (filters) => {
  const { search, status, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { service: { title: { contains: search, mode: "insensitive" } } },
      { customer: { fullName: { contains: search, mode: "insensitive" } } },
      { service: { provider: { fullName: { contains: search, mode: "insensitive" } } } },
    ];
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.serviceBooking.findMany({
      where,
      include: {
        service: {
          select: {
            id: true,
            title: true,
            provider: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
        customer: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.serviceBooking.count({ where }),
  ]);

  return {
    bookings,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const getRentalBookings = async (filters) => {
  const { search, status, page, limit } = filters;
  const pagination = getPagination(page, limit);

  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { rental: { title: { contains: search, mode: "insensitive" } } },
      { renter: { fullName: { contains: search, mode: "insensitive" } } },
      { rental: { owner: { fullName: { contains: search, mode: "insensitive" } } } },
    ];
  }

  const [bookings, total] = await prisma.$transaction([
    prisma.rentalBooking.findMany({
      where,
      include: {
        rental: {
          select: {
            id: true,
            title: true,
            owner: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
        renter: {
          select: {
            id: true,
            fullName: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.rentalBooking.count({ where }),
  ]);

  return {
    bookings,
    pagination: getPaginationMeta({ page: pagination.page, limit: pagination.limit, total }),
  };
};

const getBookingById = async (bookingId) => {
  const serviceBooking = await prisma.serviceBooking.findUnique({
    where: { id: bookingId },
    include: {
      service: {
        select: {
          id: true,
          title: true,
          provider: {
            select: {
              id: true,
              fullName: true,
              email: true,
              profileImageUrl: true,
            },
          },
        },
      },
      customer: {
        select: {
          id: true,
          fullName: true,
          email: true,
          profileImageUrl: true,
        },
      },
    },
  });

  if (serviceBooking) {
    return { type: "SERVICE", booking: serviceBooking };
  }

  const rentalBooking = await prisma.rentalBooking.findUnique({
    where: { id: bookingId },
    include: {
      rental: {
        select: {
          id: true,
          title: true,
          owner: {
            select: {
              id: true,
              fullName: true,
              email: true,
              profileImageUrl: true,
            },
          },
        },
      },
      renter: {
        select: {
          id: true,
          fullName: true,
          email: true,
          profileImageUrl: true,
        },
      },
    },
  });

  if (rentalBooking) {
    return { type: "RENTAL", booking: rentalBooking };
  }

  throw new AppError("Booking not found", 404);
};

const sendNotificationToUser = async (adminId, data) => {
  const { userId, type, title, message, entityType, entityId } = data;

  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: { id: true },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const notification = await prisma.$transaction(async (tx) => {
    const created = await tx.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        entityType: entityType || null,
        entityId: entityId || null,
      },
    });

    await createAuditLog({
      adminId,
      action: "NOTIFICATION_SENT",
      entityType: "USER",
      entityId: userId,
      metadata: { type, title, message },
    });

    return created;
  });

  return notification;
};

const sendNotificationToUsers = async (adminId, data) => {
  const { userIds, type, title, message, entityType, entityId } = data;

  if (!userIds || userIds.length === 0) {
    throw new AppError("At least one user ID is required", 400);
  }

  const notifications = await prisma.$transaction(async (tx) => {
    const created = await tx.notification.createMany({
      data: userIds.map((userId) => ({
        userId,
        type,
        title,
        message,
        entityType: entityType || null,
        entityId: entityId || null,
      })),
    });

    await createAuditLog({
      adminId,
      action: "BULK_NOTIFICATIONS_SENT",
      entityType: "USER",
      metadata: { userIds, type, title, message, count: userIds.length },
    });

    return created;
  });

  return notifications;
};

const sendPlatformNotification = async (adminId, data) => {
  const { type, title, message, entityType, entityId } = data;

  const users = await prisma.user.findMany({
    where: { deletedAt: null, status: "ACTIVE" },
    select: { id: true },
  });

  if (users.length === 0) {
    throw new AppError("No active users found", 400);
  }

  const notifications = await prisma.$transaction(async (tx) => {
    const created = await tx.notification.createMany({
      data: users.map((user) => ({
        userId: user.id,
        type,
        title,
        message,
        entityType: entityType || null,
        entityId: entityId || null,
      })),
    });

    await createAuditLog({
      adminId,
      action: "PLATFORM_NOTIFICATION_SENT",
      entityType: "PLATFORM",
      metadata: { type, title, message, count: users.length },
    });

    return created;
  });

  return notifications;
};

module.exports = {
  createAuditLog,
  getDashboardStats,
  getUsers,
  getUserById,
  changeUserStatus,
  deleteUser,
  restoreUser,
  getPendingServices,
  approveService,
  rejectService,
  closeService,
  getPendingRentals,
  approveRental,
  rejectRental,
  closeRental,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  closeProduct,
  getPendingSpaces,
  approveSpace,
  rejectSpace,
  closeSpace,
  getPendingJobs,
  approveJob,
  rejectJob,
  closeJob,
  getReports,
  getReportById,
  reviewReport,
  resolveReport,
  dismissReport,
  getReviews,
  deleteReview,
  getCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
  getPointsTransactions,
  adjustUserPoints,
  getServiceBookings,
  getRentalBookings,
  getBookingById,
  sendNotificationToUser,
  sendNotificationToUsers,
  sendPlatformNotification,
};