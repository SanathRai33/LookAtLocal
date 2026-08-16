const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const notificationSelect = {
  id: true,

  userId: true,

  type: true,
  title: true,
  message: true,

  referenceType: true,
  referenceId: true,

  readAt: true,

  createdAt: true,
};

const createNotification = async ({
  tx = prisma,

  userId,

  type,

  title,

  message,

  referenceType = null,

  referenceId = null,
}) => {
  return tx.notification.create({
    data: {
      userId,

      type,

      title,

      message,

      referenceType,

      referenceId,
    },

    select: notificationSelect,
  });
};

const createBulkNotifications = async ({
  tx = prisma,

  userIds,

  type,

  title,

  message,

  referenceType = null,

  referenceId = null,
}) => {
  if (!userIds.length) {
    return;
  }

  return tx.notification.createMany({
    data: userIds.map((userId) => ({
      userId,

      type,

      title,

      message,

      referenceType,

      referenceId,
    })),
  });
};

const getMyNotifications = async (userId, filters) => {
  const { page = 1, limit = 20, readAt } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    userId,
  };

  if (readAt !== undefined) {
    where.readAt = readAt === "true";
  }

  const [notifications, total] = await prisma.$transaction([
    prisma.notification.findMany({
      where,

      select: notificationSelect,

      orderBy: [
        {
          readAt: "asc",
        },

        {
          createdAt: "desc",
        },
      ],

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.notification.count({
      where,
    }),
  ]);

  return {
    notifications,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const getUnreadCount = async (userId) => {
  const count = await prisma.notification.count({
    where: {
      userId,

      readAt: false,
    },
  });

  return {
    unreadCount: count,
  };
};

const markAsRead = async (notificationId, userId) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,

      userId,
    },

    select: {
      id: true,
    },
  });

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  return prisma.notification.update({
    where: {
      id: notificationId,
    },

    data: {
      readAt: true,
    },

    select: notificationSelect,
  });
};

const markAllAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: {
      userId,

      readAt: false,
    },

    data: {
      readAt: true,
    },
  });

  return;
};

const deleteNotification = async (notificationId, userId) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,

      userId,
    },

    select: {
      id: true,
    },
  });

  if (!notification) {
    throw new AppError("Notification not found", 404);
  }

  await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });

  return;
};

const deleteAllNotifications = async (userId) => {
  await prisma.notification.deleteMany({
    where: {
      userId,
    },
  });

  return;
};

module.exports = {
  createNotification,
  createBulkNotifications,
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
};