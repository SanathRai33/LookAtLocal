const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const spaceUnitService = require("./space-unit.service");

const createSpaceUnit = asyncHandler(async (req, res) => {
  const unit = await spaceUnitService.createSpaceUnit({
    spaceId: req.params.spaceId,
    userId: req.user.id,
    data: req.body,
  });

  return ApiResponse.success(
    res,
    201,
    "Space unit created successfully",
    unit,
  );
});

const getSpaceUnits = asyncHandler(async (req, res) => {
  const result = await spaceUnitService.getSpaceUnits(
    req.params.spaceId,
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Space units fetched successfully",
    result.units,
    result.pagination,
  );
});

const getSpaceUnitById = asyncHandler(async (req, res) => {
  const unit = await spaceUnitService.getSpaceUnitById(
    req.params.spaceId,
    req.params.unitId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Space unit fetched successfully", unit);
});

const updateSpaceUnit = asyncHandler(async (req, res) => {
  const unit = await spaceUnitService.updateSpaceUnit(
    req.params.spaceId,
    req.params.unitId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    200,
    "Space unit updated successfully",
    unit,
  );
});

const deleteSpaceUnit = asyncHandler(async (req, res) => {
  await spaceUnitService.deleteSpaceUnit(
    req.params.spaceId,
    req.params.unitId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Space unit deleted successfully");
});

module.exports = {
  createSpaceUnit,
  getSpaceUnits,
  getSpaceUnitById,
  updateSpaceUnit,
  deleteSpaceUnit,
};