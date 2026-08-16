const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateAccessToken = (user, sessionId) => {
  return jwt.sign(
    {
      sub: user.id,
      sessionId,
      role: user.role,
      type: "access",
    },
    env.jwtAccessSecret,
    {
      expiresIn: env.jwtAccessExpiresIn,
    },
  );
};

const generateRefreshToken = (user, sessionId) => {
  return jwt.sign(
    {
      sub: user.id,
      sessionId,
      type: "refresh",
      jti: crypto.randomUUID(),
    },
    env.jwtRefreshSecret,
    {
      expiresIn: env.jwtRefreshExpiresIn,
    },
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtAccessSecret);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
