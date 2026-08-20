const prisma = require("../config/prisma");
const AppError = require("../utils/appError");
const { verifyAccessToken } = require("../utils/jwt");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new AppError("Authentication required", 401);
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const payload = verifyAccessToken(token);

    if (payload.type !== "access") {
      throw new AppError("Invalid authentication token", 401);
    }

    if (!payload.sub || !payload.sessionId) {
      throw new AppError("Invalid authentication token", 401);
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
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
        deletedAt: true,
      },
    });

    if (!user || user.deletedAt) {
      throw new AppError("User account not found", 401);
    }

    if (user.status === "SUSPENDED") {
      throw new AppError("Your account has been suspended", 403);
    }

    if (user.status === "BANNED") {
      throw new AppError("Your account has been banned", 403);
    }

    // if (user.status === "DEACTIVATED") {
    //   throw new AppError("Your account is deactivated", 403);
    // }

    req.user = user;
    req.sessionId = payload.sessionId;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
