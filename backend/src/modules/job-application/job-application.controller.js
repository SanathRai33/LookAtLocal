const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const applicationService = require("./job-application.service");

const createApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.createApplication(
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    201,
    "Job application submitted successfully",
    application,
  );
});

const getMyApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getMyApplications(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Your job applications fetched successfully",
    result,
  );
});

const getReceivedApplications = asyncHandler(async (req, res) => {
  const result = await applicationService.getReceivedApplications(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Received job applications fetched successfully",
    result,
  );
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await applicationService.getApplicationById(
    req.params.applicationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Job application fetched successfully",
    application,
  );
});

const reviewApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.reviewApplication(
    req.params.applicationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Job application moved to review",
    application,
  );
});

const shortlistApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.shortlistApplication(
    req.params.applicationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Job application shortlisted successfully",
    application,
  );
});

const acceptApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.acceptApplication(
    req.params.applicationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Job application accepted successfully",
    application,
  );
});

const rejectApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.rejectApplication(
    req.params.applicationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Job application rejected successfully",
    application,
  );
});

const withdrawApplication = asyncHandler(async (req, res) => {
  const application = await applicationService.withdrawApplication(
    req.params.applicationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Job application withdrawn successfully",
    application,
  );
});

module.exports = {
  createApplication,
  getMyApplications,
  getReceivedApplications,
  getApplicationById,
  reviewApplication,
  shortlistApplication,
  acceptApplication,
  rejectApplication,
  withdrawApplication,
};
