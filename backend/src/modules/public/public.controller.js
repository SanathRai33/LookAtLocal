const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const publicService = require("./public.service");

const getPublicStats = asyncHandler(async (req, res) => {
  const stats = await publicService.getPublicStats();

  return ApiResponse.success(
    res,
    200,
    "Public statistics fetched successfully",
    stats,
  );
});

const getLatestPublicListings = asyncHandler(async (req, res) => {
  const listings = await publicService.getLatestPublicListings(req?.user?.id);

  return ApiResponse.success(
    res,
    200,
    "Latest public listings fetched successfully",
    listings,
  );
});

module.exports = {
  getPublicStats,
  getLatestPublicListings,
};
