const env = require("../config/env");

const getRefreshCookieOptions = () => {
  const isProduction = env.nodeEnv === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: env.refreshCookieMaxAge,
    path: "/api/v1/auth",
  };
};

const setRefreshTokenCookie = (res, token) => {
  res.cookie("refreshToken", token, getRefreshCookieOptions());
};

const clearRefreshTokenCookie = (res) => {
  const options = getRefreshCookieOptions();

  res.clearCookie("refreshToken", {
    httpOnly: options.httpOnly,
    secure: options.secure,
    sameSite: options.sameSite,
    path: options.path,
  });
};

module.exports = {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
};