const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");

const userService = require("./user.service");

const getMyProfile = asyncHandler(async (req, res) => {
  const user = await userService.getMyProfile(req.user.id);

  return ApiResponse.success(res, 200, "Profile fetched successfully", user);
});

const updateMyProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateMyProfile(req.user.id, req.body);

  return ApiResponse.success(res, 200, "Profile updated successfully", user);
});

const updateAvatar = asyncHandler(async (req, res) => {
  
  const user = await userService.updateAvatar(req.user.id, req.file);

  return ApiResponse.success(
    res,
    200,
    "Profile image updated successfully",
    user,
  );
});

const getPublicProfile = asyncHandler(async (req, res) => {
  const user = await userService.getPublicProfile(req.validatedParams.userId);

  return ApiResponse.success(
    res,
    200,
    "User profile fetched successfully",
    user,
  );
});

const deleteMyAccount = asyncHandler(async (req, res) => {
  await userService.deleteMyAccount(req.user.id);

  return ApiResponse.success(res, 200, "Account deactivated successfully");
});

module.exports = {
  getMyProfile,
  updateMyProfile,
  updateAvatar,
  getPublicProfile,
  deleteMyAccount,
};
