const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const emergencyService = require("./emergency.service");

const createEmergencyRequest = asyncHandler(async (req, res) => {
  const emergency = await emergencyService.createEmergencyRequest({
    userId: req.user.id,
    data: req.body,
  });

  return ApiResponse.success(
    res,
    201,
    "Emergency request created successfully",
    emergency,
  );
});

const getEmergencyRequests = asyncHandler(async (req, res) => {
  const result = await emergencyService.getEmergencyRequests(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Emergency requests fetched successfully",
    result.emergencies,
    result.pagination,
  );
});

const getMyEmergencyRequests = asyncHandler(async (req, res) => {
  const result = await emergencyService.getMyEmergencyRequests(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your emergency requests fetched successfully",
    result.emergencies,
    result.pagination,
  );
});

const getEmergencyRequestById = asyncHandler(async (req, res) => {
  const emergency = await emergencyService.getEmergencyRequestById(
    req.params.emergencyId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Emergency request fetched successfully", emergency);
});

const updateEmergencyRequest = asyncHandler(async (req, res) => {
  const emergency = await emergencyService.updateEmergencyRequest(
    req.params.emergencyId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    200,
    "Emergency request updated successfully",
    emergency,
  );
});

const deleteEmergencyRequest = asyncHandler(async (req, res) => {
  await emergencyService.deleteEmergencyRequest(req.params.emergencyId, req.user.id);

  return ApiResponse.success(res, 200, "Emergency request deleted successfully");
});

const resolveEmergencyRequest = asyncHandler(async (req, res) => {
  const emergency = await emergencyService.resolveEmergencyRequest(
    req.params.emergencyId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Emergency request resolved successfully",
    emergency,
  );
});

module.exports = {
  createEmergencyRequest,
  getEmergencyRequests,
  getMyEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyRequest,
  deleteEmergencyRequest,
  resolveEmergencyRequest,
};