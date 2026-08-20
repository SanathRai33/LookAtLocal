const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const jobSelect = {
  id: true,
  postedBy: true,
  categoryId: true,

  title: true,
  description: true,
  companyName: true,

  jobType: true,

  salaryMin: true,
  salaryMax: true,
  salaryType: true,

  benefits: true,
  experienceRequired: true,
  vacancies: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  latitude: true,
  longitude: true,

  applicationDeadline: true,

  status: true,

  createdAt: true,
  updatedAt: true,

  poster: {
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

  applications: {
    select: {
      id: true,
      status: true,
      createdAt: true,
      applicant: {
        select: {
          id: true,
          fullName: true,
          profileImageUrl: true,
        },
      },
    },
  },
};

const validateJobCategory = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      module: "JOB",
      isActive: true,
    },

    select: {
      id: true,
    },
  });

  if (!category) {
    throw new AppError("Invalid or inactive job category", 400);
  }

  return category;
};

const getFavoriteJobIds = async (userId, jobIds) => {
  if (!userId || !jobIds.length) {
    return new Set();
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,

      entityType: "JOB",

      entityId: {
        in: jobIds,
      },
    },

    select: {
      entityId: true,
    },
  });

  return new Set(favorites.map((favorite) => favorite.entityId));
};

const enrichJobs = async (jobs, userId) => {
  if (!jobs.length) {
    return [];
  }

  const jobIds = jobs.map((job) => job.id);

  const [favoriteJobIds] = await Promise.all([
    getFavoriteJobIds(userId, jobIds),
  ]);

  return jobs.map((job) => {
    return {
      ...job,

      isFavorite: favoriteJobIds.has(job.id),
    };
  });
};

const getPosterOtherJobs = async (postedBy, currentJobId, userId) => {
  const jobs = await prisma.jobListing.findMany({
    where: {
      postedBy,
      id: { not: currentJobId },
      status: "ACTIVE",
      deletedAt: null,
    },
    select: jobSelect,
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return enrichJobs(jobs, userId);
};

const createJob = async ({ userId, data }) => {
  await validateJobCategory(data.categoryId);

  const job = await prisma.$transaction(async (tx) => {
    const createdJob = await tx.jobListing.create({
      data: {
        postedBy: userId,

        categoryId: data.categoryId,

        title: data.title,

        description: data.description,

        companyName: data.companyName,

        jobType: data.jobType,

        salaryMin: data.salaryMin,

        salaryMax: data.salaryMax,

        salaryType: data.salaryType,

        benefits: data.benefits,

        experienceRequired: data.experienceRequired,

        vacancies: data.vacancies ?? 1,

        addressLine: data.addressLine,

        locality: data.locality,

        city: data.city,

        state: data.state,

        postalCode: data.postalCode,

        latitude: data.latitude,

        longitude: data.longitude,

        applicationDeadline: data.applicationDeadline,

        status: "PENDING",
      },

      select: jobSelect,
    });

    return createdJob;
  });

  const [result] = await enrichJobs([job], userId);
  const similarJobs = await getPosterOtherJobs(job.postedBy, job.id, userId);

  return {
    ...result,
    similarJobs,
  };
};

const getJobs = async (userId, filters) => {
  const {
    search,
    categoryId,
    city,
    locality,
    postalCode,
    jobType,
    minSalary,
    maxSalary,
    salaryType,
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
      "Please complete your profile location to find local jobs",
      400,
    );
  }

  const pagination = getPagination(page, limit);

  const where = {
    status: "ACTIVE",
    deletedAt: null,

    poster: {
      status: "ACTIVE",
      deletedAt: null,
    },
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

  if (jobType) {
    where.jobType = jobType;
  }

  if (salaryType) {
    where.salaryType = salaryType;
  }

  if (minSalary !== undefined || maxSalary !== undefined) {
    where.salaryMin = {};

    if (minSalary !== undefined) {
      where.salaryMin.gte = minSalary;
    }

    if (maxSalary !== undefined) {
      where.salaryMax = {
        lte: maxSalary,
      };
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
        companyName: {
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

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const [jobs, total] = await prisma.$transaction([
    prisma.jobListing.findMany({
      where,

      select: jobSelect,

      orderBy,

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.jobListing.count({
      where,
    }),
  ]);

  const enrichedJobs = await enrichJobs(jobs, userId);

  return {
    jobs: enrichedJobs,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const getJobById = async (jobId, userId) => {
  const job = await prisma.jobListing.findFirst({
    where: {
      id: jobId,
      deletedAt: null,

      poster: {
        status: "ACTIVE",
        deletedAt: null,
      },
      
      OR: [
        {
          status: "ACTIVE",
        },
        {
          postedBy: userId,
        },
      ],
    },
    select: jobSelect,
  });

  if (!job) {
    throw new AppError("Job listing not found", 404);
  }

  const [result] = await enrichJobs([job], userId);

  const similarJobs = await getPosterOtherJobs(job.postedBy, job.id, userId);

  return {
    ...result,
    similarJobs,
  };
};

const getMyJobs = async (userId, filters) => {
  const { search, status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    postedBy: userId,

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

      {
        companyName: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [jobs, total] = await prisma.$transaction([
    prisma.jobListing.findMany({
      where,

      select: jobSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.jobListing.count({
      where,
    }),
  ]);

  const enrichedJobs = await enrichJobs(jobs, userId);

  return {
    jobs: enrichedJobs,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const updateJob = async (jobId, userId, data) => {
  const existingJob = await prisma.jobListing.findFirst({
    where: {
      id: jobId,

      postedBy: userId,

      deletedAt: null,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!existingJob) {
    throw new AppError(
      "Job listing not found or you do not have permission to update it",
      404,
    );
  }

  if (data.categoryId) {
    await validateJobCategory(data.categoryId);
  }

  const updateData = {
    ...data,
  };

  const moderationFields = [
    "categoryId",
    "title",
    "description",
    "companyName",
    "jobType",
    "salaryMin",
    "salaryMax",
    "salaryType",
    "benefits",
    "experienceRequired",
    "addressLine",
    "locality",
    "city",
    "state",
    "postalCode",
    "applicationDeadline",
  ];

  const requiresReview = moderationFields.some((field) =>
    Object.prototype.hasOwnProperty.call(data, field),
  );

  if (requiresReview && ["ACTIVE", "REJECTED"].includes(existingJob.status)) {
    updateData.status = "PENDING";
  }

  const job = await prisma.jobListing.update({
    where: {
      id: jobId,
    },

    data: updateData,

    select: jobSelect,
  });

  const [result] = await enrichJobs([job], userId);

  return result;
};

const deleteJob = async (jobId, userId) => {
  const job = await prisma.jobListing.findFirst({
    where: {
      id: jobId,

      postedBy: userId,

      deletedAt: null,
    },

    include: {
      applications: {
        where: {
          status: {
            in: ["APPLIED", "REVIEWING", "SHORTLISTED", "ACCEPTED"],
          },
        },
      },
    },
  });

  if (!job) {
    throw new AppError(
      "Job listing not found or you do not have permission to delete it",
      404,
    );
  }

  if (job.applications.length > 0) {
    throw new AppError(
      "Cannot delete a job listing with active applications.",
      400,
    );
  }

  await prisma.jobListing.update({
    where: {
      id: jobId,
    },

    data: {
      deletedAt: new Date(),
      status: "CLOSED",
    },
  });

  return;
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob,
};
