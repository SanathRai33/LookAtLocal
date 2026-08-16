const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const spaceService = require("./space.service");

const createSpace = asyncHandler(async (req, res) => {
  const space = await spaceService.createSpace({
    userId: req.user.id,
    data: req.body,
    files: req.files || [],
  });

  return ApiResponse.success(
    res,
    201,
    "Space listing created successfully",
    space,
  );
});

const getSpaces = asyncHandler(async (req, res) => {
  const result = await spaceService.getSpaces(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Spaces fetched successfully",
    result.spaces,
    result.pagination,
  );
});

const getMySpaces = asyncHandler(async (req, res) => {
  const result = await spaceService.getMySpaces(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your space listings fetched successfully",
    result.spaces,
    result.pagination,
  );
});

const getSpaceById = asyncHandler(async (req, res) => {
  const space = await spaceService.getSpaceById(
    req.params.spaceId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Space fetched successfully", space);
});

const updateSpace = asyncHandler(async (req, res) => {
  const space = await spaceService.updateSpace(
    req.params.spaceId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    200,
    "Space listing updated successfully",
    space,
  );
});

const deleteSpace = asyncHandler(async (req, res) => {
  await spaceService.deleteSpace(req.params.spaceId, req.user.id);

  return ApiResponse.success(res, 200, "Space listing deleted successfully");
});

module.exports = {
  createSpace,
  getSpaces,
  getMySpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
};