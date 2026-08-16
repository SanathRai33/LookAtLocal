const crypto = require("crypto");

const prisma = require("../../config/prisma");
const env = require("../../config/env");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../utils/jwt");

const { hashToken } = require("../../utils/token");

const createAuthSession = async (user, sessionInfo = {}, db = prisma) => {
  const expiresAt = new Date(Date.now() + env.refreshCookieMaxAge);

  const session = await db.userSession.create({
    data: {
      userId: user.id,

      refreshTokenHash: `pending-${crypto.randomUUID()}`,

      userAgent: sessionInfo.userAgent || null,
      ipAddress: sessionInfo.ipAddress || null,
      expiresAt,
    },
  });

  const refreshToken = generateRefreshToken(user, session.id);

  const refreshTokenHash = hashToken(refreshToken);

  await db.userSession.update({
    where: {
      id: session.id,
    },
    data: {
      refreshTokenHash,
    },
  });

  const accessToken = generateAccessToken(user, session.id);

  return {
    accessToken,
    refreshToken,
  };
};

module.exports = {
  createAuthSession,
};
