const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");
const { createNotification } = require("../notification/notification.service");

const applicationSelect = {
  id: true,
  jobId: true,
  applicantId: true,
  message: true,
  resumeUrl: true,
  status: true,
  createdAt: true,
  updatedAt: true,

  applicant: {
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      profileImageUrl: true,
      isPhoneVerified: true,
      isEmailVerified: true,
    },
  },

  job: {
    select: {
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

      poster: {
        select: {
          id: true,
          fullName: true,
          phone: true,
          email: true,
          profileImageUrl: true,
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
    },
  },
};

const notify = async ({ tx, userId, type, title, message, applicationId }) => {
  await createNotification({
    tx,
    userId,
    type,
    title,
    message,
    entityType: "JOB_APPLICATION",
    entityId: applicationId,
  });
};

const createApplication = async (applicantId, data) => {
  const result = await prisma.$transaction(
    async (tx) => {
      const job = await tx.jobListing.findFirst({
        where: {
          id: data.jobId,
          status: "ACTIVE",
          deletedAt: null,
        },

        select: {
          id: true,
          postedBy: true,
          title: true,
          vacancies: true,
          applicationDeadline: true,
        },
      });

      if (!job) {
        throw new AppError("Job is not available for applications", 404);
      }

      if (job.postedBy === applicantId) {
        throw new AppError("You cannot apply to your own job", 400);
      }

      if (job.applicationDeadline && job.applicationDeadline < new Date()) {
        throw new AppError("The application deadline has passed", 400);
      }

      const existingApplication = await tx.jobApplication.findUnique({
        where: {
          jobId_applicantId: {
            jobId: job.id,
            applicantId,
          },
        },

        select: {
          id: true,
          status: true,
        },
      });

      if (existingApplication) {
        throw new AppError("You have already applied to this job", 409);
      }

      const application = await tx.jobApplication.create({
        data: {
          jobId: job.id,
          applicantId,
          message: data.message,
          resumeUrl: data.resumeUrl,
          status: "APPLIED",
        },

        select: applicationSelect,
      });

      await notify({
        tx,
        userId: job.postedBy,
        type: "JOB_APPLICATION_RECEIVED",
        title: "New Job Application",
        message: `You received a new application for "${job.title}".`,
        applicationId: application.id,
      });

      return application;
    },
    {
      isolationLevel: "Serializable",
    },
  );

  return result;
};

const getMyApplications = async (applicantId, filters) => {
  const { status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    applicantId,
  };

  if (status) {
    where.status = status;
  }

  const [applications, total] = await prisma.$transaction([
    prisma.jobApplication.findMany({
      where,
      select: applicationSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.jobApplication.count({
      where,
    }),
  ]);

  return {
    applications,
    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getReceivedApplications = async (posterId, filters) => {
  const { status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    job: {
      postedBy: posterId,
      deletedAt: null,
    },
  };

  if (status) {
    where.status = status;
  }

  const [applications, total] = await prisma.$transaction([
    prisma.jobApplication.findMany({
      where,
      select: applicationSelect,
      orderBy: {
        createdAt: "desc",
      },
      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.jobApplication.count({
      where,
    }),
  ]);

  return {
    applications,
    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getApplicationById = async (applicationId, userId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,

      OR: [
        {
          applicantId: userId,
        },
        {
          job: {
            postedBy: userId,
          },
        },
      ],
    },

    select: applicationSelect,
  });

  if (!application) {
    throw new AppError("Job application not found", 404);
  }

  return application;
};

const reviewApplication = async (applicationId, posterId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: {
        postedBy: posterId,
      },
    },

    select: {
      id: true,
      applicantId: true,
      status: true,
    },
  });

  if (!application) {
    throw new AppError(
      "Application not found or you do not have permission",
      404,
    );
  }

  if (application.status !== "APPLIED") {
    throw new AppError("Only applied applications can be moved to review", 400);
  }

  return prisma.$transaction(async (tx) => {
    const updatedApplication = await tx.jobApplication.update({
      where: {
        id: applicationId,
      },

      data: {
        status: "REVIEWING",
      },

      select: applicationSelect,
    });

    await notify({
      tx,
      userId: application.applicantId,
      type: "JOB_APPLICATION_REVIEWING",
      title: "Application Under Review",
      message: "Your job application is now under review.",
      applicationId,
    });

    return updatedApplication;
  });
};

const shortlistApplication = async (applicationId, posterId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: {
        postedBy: posterId,
      },
    },

    select: {
      id: true,
      applicantId: true,
      status: true,
    },
  });

  if (!application) {
    throw new AppError(
      "Application not found or you do not have permission",
      404,
    );
  }

  if (!["APPLIED", "REVIEWING"].includes(application.status)) {
    throw new AppError(
      "Only applied or reviewing applications can be shortlisted",
      400,
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedApplication = await tx.jobApplication.update({
      where: {
        id: applicationId,
      },

      data: {
        status: "SHORTLISTED",
      },

      select: applicationSelect,
    });

    await notify({
      tx,
      userId: application.applicantId,
      type: "JOB_APPLICATION_SHORTLISTED",
      title: "Application Shortlisted",
      message: "Your application has been shortlisted by the employer.",
      applicationId,
    });

    return updatedApplication;
  });
};

const acceptApplication = async (applicationId, posterId) => {
  try {
    return await prisma.$transaction(
      async (tx) => {
        const application = await tx.jobApplication.findFirst({
          where: {
            id: applicationId,
            job: {
              postedBy: posterId,
              deletedAt: null,
            },
          },

          select: {
            id: true,
            applicantId: true,
            status: true,

            job: {
              select: {
                id: true,
                title: true,
                vacancies: true,
                status: true,
              },
            },
          },
        });

        if (!application) {
          throw new AppError(
            "Application not found or you do not have permission",
            404,
          );
        }

        if (
          !["APPLIED", "REVIEWING", "SHORTLISTED"].includes(application.status)
        ) {
          throw new AppError("This application cannot be accepted", 400);
        }

        if (application.job.status !== "ACTIVE") {
          throw new AppError("This job is no longer active", 400);
        }

        const acceptedCount = await tx.jobApplication.count({
          where: {
            jobId: application.job.id,
            status: "ACCEPTED",
          },
        });

        if (acceptedCount >= application.job.vacancies) {
          throw new AppError(
            "All available vacancies have already been filled",
            409,
          );
        }

        const updatedApplication = await tx.jobApplication.update({
          where: {
            id: application.id,
          },

          data: {
            status: "ACCEPTED",
          },

          select: applicationSelect,
        });

        const newAcceptedCount = acceptedCount + 1;

        if (newAcceptedCount >= application.job.vacancies) {
          await tx.jobListing.update({
            where: {
              id: application.job.id,
            },

            data: {
              status: "CLOSED",
            },
          });
        }

        await notify({
          tx,
          userId: application.applicantId,
          type: "JOB_APPLICATION_ACCEPTED",
          title: "Application Accepted",
          message: `Your application for "${application.job.title}" has been accepted.`,
          applicationId: application.id,
        });

        return updatedApplication;
      },
      {
        isolationLevel: "Serializable",
      },
    );
  } catch (error) {
    if (error?.code === "P2034") {
      throw new AppError(
        "The application changed while you were accepting it. Please try again.",
        409,
      );
    }

    throw error;
  }
};

const rejectApplication = async (applicationId, posterId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      job: {
        postedBy: posterId,
      },
    },

    select: {
      id: true,
      applicantId: true,
      status: true,
    },
  });

  if (!application) {
    throw new AppError(
      "Application not found or you do not have permission",
      404,
    );
  }

  if (!["APPLIED", "REVIEWING", "SHORTLISTED"].includes(application.status)) {
    throw new AppError("This application cannot be rejected", 400);
  }

  return prisma.$transaction(async (tx) => {
    const rejectedApplication = await tx.jobApplication.update({
      where: {
        id: applicationId,
      },

      data: {
        status: "REJECTED",
      },

      select: applicationSelect,
    });

    await notify({
      tx,
      userId: application.applicantId,
      type: "JOB_APPLICATION_REJECTED",
      title: "Application Rejected",
      message: "Your job application was not selected by the employer.",
      applicationId,
    });

    return rejectedApplication;
  });
};

const withdrawApplication = async (applicationId, applicantId) => {
  const application = await prisma.jobApplication.findFirst({
    where: {
      id: applicationId,
      applicantId,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!application) {
    throw new AppError(
      "Application not found or you do not have permission to withdraw it",
      404,
    );
  }

  if (!["APPLIED", "REVIEWING", "SHORTLISTED"].includes(application.status)) {
    throw new AppError("This application cannot be withdrawn", 400);
  }

  return prisma.$transaction(async (tx) => {
    return tx.jobApplication.update({
      where: {
        id: applicationId,
      },

      data: {
        status: "WITHDRAWN",
      },

      select: applicationSelect,
    });
  });
};

module.exports = {
  createApplication,
  getMyApplications,
  getReceivedApplications,
  getApplicationById,
  reviewApplication,
  shortlistApplication,
  acceptApplication,
  rejectApplication,
  withdrawApplication,
};
