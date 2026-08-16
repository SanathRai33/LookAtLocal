const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const favoriteService = require("./favorite.service");

const addFavorite = asyncHandler(async (req, res) => {
  const favorite = await favoriteService.addFavorite(req.user.id, req.body);

  return ApiResponse.success(
    res,
    201,
    "Added to favorites successfully",
    favorite,
  );
});

const getFavorites = asyncHandler(async (req, res) => {
  const result = await favoriteService.getFavorites(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Favorites fetched successfully",
    result,
  );
});

const removeFavorite = asyncHandler(async (req, res) => {
  await favoriteService.removeFavorite(
    req.user.id,
    req.params.entityType,
    req.params.entityId,
  );

  return ApiResponse.success(res, 200, "Removed from favorites successfully");
});

module.exports = {
  addFavorite,
  getFavorites,
  removeFavorite,
};
