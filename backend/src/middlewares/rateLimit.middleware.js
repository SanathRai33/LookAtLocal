const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

const createRateLimiter = ({ windowMs, limit, message }) => {
  return rateLimit({
    windowMs,
    limit,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    keyGenerator: (req) => {
      return ipKeyGenerator(req.ip);
    },

    handler: (req, res, next) => {
      const error = new Error(message);

      error.statusCode = 429;
      error.isOperational = true;

      next(error);
    },
  });
};

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "Too many requests. Please try again later.",
});

const registerLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: "Too many registration attempts. Please try again later.",
});

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: "Too many login attempts. Please try again later.",
});

const forgotPasswordLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  message: "Too many password reset requests. Please try again later.",
});

const resetPasswordLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: "Too many password reset attempts. Please try again later.",
});

const refreshTokenLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  message: "Too many token refresh requests. Please try again later.",
});

module.exports = {
  apiLimiter,
  registerLimiter,
  loginLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  refreshTokenLimiter,
};
