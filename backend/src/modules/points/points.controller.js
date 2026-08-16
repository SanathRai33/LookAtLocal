const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const pointsService = require("./points.service");

const getPointsSummary = asyncHandler(async (req, res) => {
  const result = await pointsService.getPointsSummary(req.user.id);

  return ApiResponse.success(
    res,
    200,
    "Points summary fetched successfully",
    result,
  );
});

const getPointsHistory = asyncHandler(async (req, res) => {
  const result = await pointsService.getPointsHistory(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Points history fetched successfully",
    result,
  );
});

module.exports = {
  getPointsSummary,
  getPointsHistory,
};
