const bcrypt = require("bcryptjs");

const prisma = require("../../config/prisma");
const env = require("../../config/env");
const AppError = require("../../utils/appError");
const { hashToken, generateSecureToken } = require("../../utils/token");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../../utils/jwt");

const { sendEmailVerificationEmail } = require("../../services/email.service");
const { createAuthSession } = require("./auth-session.service");

const safeUserSelect = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  profileImageUrl: true,
  role: true,
  status: true,
  isEmailVerified: true,
  isPhoneVerified: true,
  createdAt: true,
};

const registerUser = async (data, sessionInfo = {}) => {
  const { fullName, email, phone, password } = data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { phone }],
    },
    select: {
      email: true,
      phone: true,
    },
  });

  if (existingUser?.email === email) {
    throw new AppError("An account with this email already exists", 409);
  }

  if (existingUser?.phone === phone) {
    throw new AppError(
      "An account with this mobile number already exists",
      409,
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        fullName,
        email,
        phone,
        passwordHash,
      },
      select: safeUserSelect,
    });

    const { accessToken, refreshToken } = await createAuthSession(
      user,
      sessionInfo,
      tx,
    );

    return {
      user,
      accessToken,
      refreshToken,
    };
  });
};

const loginUser = async (data, sessionInfo = {}) => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (user.deletedAt) {
    throw new AppError("This account is no longer available", 403);
  }

  if (user.status === "SUSPENDED") {
    throw new AppError("Your account has been suspended", 403);
  }

  if (user.status === "BANNED") {
    throw new AppError("Your account has been banned", 403);
  }

  if (user.status === "DEACTIVATED") {
    throw new AppError("Your account is deactivated", 403);
  }

  const { accessToken, refreshToken } = await createAuthSession(
    user,
    sessionInfo,
  );

  const safeUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
    status: user.status,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    createdAt: user.createdAt,
  };

  return {
    user: safeUser,
    accessToken,
    refreshToken,
  };
};

const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: safeUserSelect,
  });

  if (!user) {
    throw new AppError("User account not found", 404);
  }

  return user;
};

const refreshAccessToken = async (refreshToken, sessionInfo = {}) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 401);
  }

  const payload = verifyRefreshToken(refreshToken);

  if (payload.type !== "refresh") {
    throw new AppError("Invalid refresh token", 401);
  }

  if (!payload.sessionId || !payload.sub) {
    throw new AppError("Invalid refresh token", 401);
  }

  const session = await prisma.userSession.findUnique({
    where: {
      id: payload.sessionId,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    throw new AppError("Session not found or has expired", 401);
  }

  if (session.userId !== payload.sub) {
    throw new AppError("Invalid refresh token", 401);
  }

  if (session.revokedAt) {
    throw new AppError("Session has been revoked", 401);
  }

  if (session.expiresAt <= new Date()) {
    throw new AppError("Session has expired", 401);
  }

  const incomingTokenHash = hashToken(refreshToken);

  if (session.refreshTokenHash !== incomingTokenHash) {
    await prisma.userSession.update({
      where: {
        id: session.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    throw new AppError("Invalid refresh token", 401);
  }

  const user = session.user;

  if (user.deletedAt) {
    throw new AppError("User account not found", 401);
  }

  if (user.status === "SUSPENDED") {
    throw new AppError("Your account has been suspended", 403);
  }

  if (user.status === "BANNED") {
    throw new AppError("Your account has been banned", 403);
  }

  if (user.status === "DEACTIVATED") {
    throw new AppError("Your account is deactivated", 403);
  }

  const newRefreshToken = generateRefreshToken(user, session.id);

  const newRefreshTokenHash = hashToken(newRefreshToken);

  const accessToken = generateAccessToken(user, session.id);

  await prisma.userSession.update({
    where: {
      id: session.id,
    },
    data: {
      refreshTokenHash: newRefreshTokenHash,
      lastUsedAt: new Date(),

      userAgent: sessionInfo.userAgent || session.userAgent,

      ipAddress: sessionInfo.ipAddress || session.ipAddress,
    },
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

const logoutUser = async (refreshToken) => {
  if (!refreshToken) {
    return;
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    return;
  }

  if (payload.type !== "refresh" || !payload.sessionId || !payload.sub) {
    return;
  }

  const session = await prisma.userSession.findUnique({
    where: {
      id: payload.sessionId,
    },
    select: {
      id: true,
      userId: true,
      refreshTokenHash: true,
      revokedAt: true,
    },
  });

  if (!session) {
    return;
  }

  if (session.userId !== payload.sub) {
    return;
  }

  if (session.revokedAt) {
    return;
  }

  const incomingTokenHash = hashToken(refreshToken);

  if (session.refreshTokenHash !== incomingTokenHash) {
    return;
  }

  await prisma.userSession.update({
    where: {
      id: session.id,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};

const changePassword = async (userId, currentSessionId, data) => {
  const { currentPassword, newPassword } = data;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      passwordHash: true,
    },
  });

  if (!user) {
    throw new AppError("User account not found", 404);
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.passwordHash,
  );

  if (!isCurrentPasswordValid) {
    throw new AppError("Current password is incorrect", 400);
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);

  if (isSamePassword) {
    throw new AppError(
      "New password must be different from current password",
      400,
    );
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: newPasswordHash,
      },
    }),

    prisma.userSession.updateMany({
      where: {
        userId,
        id: {
          not: currentSessionId,
        },
        revokedAt: null,
      },
      data: {
        revokedAt: new Date(),
      },
    }),
  ]);
};

const forgotPassword = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      status: true,
      deletedAt: true,
    },
  });

  if (!user || user.deletedAt || user.status !== "ACTIVE") {
    return null;
  }

  const resetToken = generateSecureToken();
  const tokenHash = hashToken(resetToken);

  const expiresAt = new Date(
    Date.now() + env.passwordResetExpiresMinutes * 60 * 1000,
  );

  await prisma.$transaction(async (tx) => {
    await tx.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    });

    await tx.passwordResetToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });
  });

  return {
    user,
    resetToken,
  };
};

const resetPassword = async (token, newPassword) => {
  const tokenHash = hashToken(token);

  const resetRecord = await prisma.passwordResetToken.findUnique({
    where: {
      tokenHash,
    },
  });

  if (!resetRecord) {
    throw new AppError("Invalid or expired password reset link", 400);
  }

  if (resetRecord.usedAt) {
    throw new AppError("This password reset link has already been used", 400);
  }

  if (resetRecord.expiresAt <= new Date()) {
    throw new AppError("Invalid or expired password reset link", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: resetRecord.userId,
    },
    select: {
      id: true,
      passwordHash: true,
      status: true,
      deletedAt: true,
    },
  });

  if (!user || user.deletedAt || user.status !== "ACTIVE") {
    throw new AppError("Invalid or expired password reset link", 400);
  }

  const isSamePassword = await bcrypt.compare(newPassword, user.passwordHash);

  if (isSamePassword) {
    throw new AppError(
      "New password must be different from your current password",
      400,
    );
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  const now = new Date();

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordHash,
      },
    }),

    prisma.passwordResetToken.update({
      where: {
        id: resetRecord.id,
      },
      data: {
        usedAt: now,
      },
    }),

    prisma.userSession.updateMany({
      where: {
        userId: user.id,
        revokedAt: null,
      },
      data: {
        revokedAt: now,
      },
    }),
  ]);
};

const sendVerificationEmail = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      isEmailVerified: true,
      status: true,
      deletedAt: true,
    },
  });

  if (!user) {
    throw new AppError("User account not found", 404);
  }

  if (user.deletedAt) {
    throw new AppError("This account is no longer available", 403);
  }

  if (user.status !== "ACTIVE") {
    throw new AppError("This account is not active", 403);
  }

  if (user.isEmailVerified) {
    throw new AppError("Your email is already verified", 400);
  }

  const verificationToken = generateSecureToken();
  const tokenHash = hashToken(verificationToken);

  const expiresAt = new Date(
    Date.now() + env.emailVerificationExpiresMinutes * 60 * 1000,
  );

  await prisma.$transaction(async (tx) => {
    await tx.emailVerificationToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    });

    await tx.emailVerificationToken.create({
      data: {
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });
  });

  await sendEmailVerificationEmail({
    email: user.email,
    fullName: user.fullName,
    verificationToken,
  });

  return {
    email: user.email,
    expiresAt,
  };
};

const verifyEmail = async (token) => {
  if (!token) {
    throw new AppError("Verification token is required", 400);
  }

  const tokenHash = hashToken(token);

  const verificationRecord = await prisma.emailVerificationToken.findUnique({
    where: {
      tokenHash,
    },
  });

  if (!verificationRecord) {
    throw new AppError("Invalid verification link", 400);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: verificationRecord.userId,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      isEmailVerified: true,
      status: true,
      deletedAt: true,
    },
  });

  if (!user || user.deletedAt) {
    throw new AppError("User account not found", 404);
  }

  if (user.status !== "ACTIVE") {
    throw new AppError("This account is not active", 403);
  }

  if (user.isEmailVerified) {
    return {
      alreadyVerified: true,
      email: user.email,
    };
  }

  if (verificationRecord.usedAt) {
    throw new AppError("This verification link has already been used", 400);
  }

  if (verificationRecord.expiresAt <= new Date()) {
    throw new AppError("This verification link has expired", 400);
  }

  const now = new Date();

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isEmailVerified: true,
      },
    }),

    prisma.emailVerificationToken.update({
      where: {
        id: verificationRecord.id,
      },
      data: {
        usedAt: now,
      },
    }),
  ]);

  return {
    alreadyVerified: false,
    email: user.email,
  };
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  refreshAccessToken,
  logoutUser,
  changePassword,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
