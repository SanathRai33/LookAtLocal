const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const serviceService = require("./service.service");

const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.createService({
    userId: req.user.id,
    data: req.body,
    files: req.files || [],
  });

  return ApiResponse.success(
    res,
    201,
    "Service listing created successfully",
    service,
  );
});

const getServices = asyncHandler(async (req, res) => {
  const result = await serviceService.getServices(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Services fetched successfully",
    result.services,
    result.pagination,
  );
});

const getMyServices = asyncHandler(async (req, res) => {
  const result = await serviceService.getMyServices(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your service listings fetched successfully",
    result.services,
    result.pagination,
  );
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await serviceService.getServiceById(
    req.params.serviceId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Service fetched successfully", service);
});

const updateService = asyncHandler(async (req, res) => {
  const service = await serviceService.updateService(
    req.params.serviceId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    200,
    "Service listing updated successfully",
    service,
  );
});

const deleteService = asyncHandler(async (req, res) => {
  await serviceService.deleteService(req.params.serviceId, req.user.id);

  return ApiResponse.success(res, 200, "Service listing deleted successfully");
});

module.exports = {
  createService,
  getServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService,
};
