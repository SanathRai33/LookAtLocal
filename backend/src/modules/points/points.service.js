const prisma = require("../../config/prisma");

const POINTS_RULES = require("../../config/points.config");
const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const pointsTransactionSelect = {
  id: true,
  points: true,

  transactionType: true,
  actionType: true,

  referenceType: true,
  referenceId: true,

  description: true,
  createdAt: true,
};

const awardPoints = async ({
  tx = prisma,
  userId,
  actionType,
  referenceType,
  referenceId,
  description,
}) => {
  const points = POINTS_RULES[actionType];

  if (!points) {
    throw new Error(`No points rule configured for ${actionType}`);
  }

  return tx.pointsTransaction.create({
    data: {
      userId,
      points,

      transactionType: "EARNED",
      actionType,

      referenceType,
      referenceId,

      description,
    },

    select: pointsTransactionSelect,
  });
};

const getPointsSummary = async (userId) => {
  const [balanceResult, earnedResult] = await Promise.all([
    prisma.pointsTransaction.aggregate({
      where: {
        userId,
      },

      _sum: {
        points: true,
      },
    }),

    prisma.pointsTransaction.aggregate({
      where: {
        userId,
        transactionType: "EARNED",
      },

      _sum: {
        points: true,
      },
    }),
  ]);

  return {
    balance: balanceResult._sum.points || 0,

    totalEarned: earnedResult._sum.points || 0,
  };
};

const getPointsHistory = async (userId, filters) => {
  const { transactionType, actionType, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    userId,
  };

  if (transactionType) {
    where.transactionType = transactionType;
  }

  if (actionType) {
    where.actionType = actionType;
  }

  const [transactions, total] = await prisma.$transaction([
    prisma.pointsTransaction.findMany({
      where,

      select: pointsTransactionSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,
      take: pagination.limit,
    }),

    prisma.pointsTransaction.count({
      where,
    }),
  ]);

  return {
    transactions,

    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

module.exports = {
  awardPoints,
  getPointsSummary,
  getPointsHistory,
};