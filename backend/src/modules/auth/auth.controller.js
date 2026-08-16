const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} = require("../../utils/cookie");
const { sendPasswordResetEmail } = require("../../services/email.service");

const authService = require("./auth.service");

const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body, {
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  });

  setRefreshTokenCookie(res, result.refreshToken);

  return ApiResponse.success(res, 201, "Account created successfully", {
    user: result.user,
    accessToken: result.accessToken,
  });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body, {
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  });

  setRefreshTokenCookie(res, result.refreshToken);

  return ApiResponse.success(res, 200, "Login successful", {
    user: result.user,
    accessToken: result.accessToken,
  });
});

const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getCurrentUser(req.user.id);

  return ApiResponse.success(
    res,
    200,
    "Current user fetched successfully",
    user,
  );
});

const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;

  const result = await authService.refreshAccessToken(token, {
    userAgent: req.get("user-agent"),
    ipAddress: req.ip,
  });

  setRefreshTokenCookie(res, result.refreshToken);

  return ApiResponse.success(res, 200, "Access token refreshed successfully", {
    accessToken: result.accessToken,
  });
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;

  await authService.logoutUser(refreshToken);

  clearRefreshTokenCookie(res);

  return ApiResponse.success(res, 200, "Logout successful");
});

const changePassword = asyncHandler(async (req, res) => {
  await authService.changePassword(req.user.id, req.sessionId, req.body);

  return ApiResponse.success(res, 200, "Password changed successfully");
});

const forgotPassword = asyncHandler(async (req, res) => {
  const result = await authService.forgotPassword(req.body.email);

  if (result) {
    await sendPasswordResetEmail({
      email: result.user.email,
      fullName: result.user.fullName,
      resetToken: result.resetToken,
    });
  }

  return ApiResponse.success(
    res,
    200,
    "If an account exists with that email, a password reset link has been sent",
  );
});

const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  await authService.resetPassword(token, newPassword);

  clearRefreshTokenCookie(res);

  return ApiResponse.success(
    res,
    200,
    "Password reset successfully. Please sign in with your new password",
  );
});

module.exports = {
  register,
  login,
  getMe,
  refreshToken,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
};
