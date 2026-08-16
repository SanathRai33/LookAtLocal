const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const jobService = require("./job.service");

const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob({
    userId: req.user.id,
    data: req.body,
  });

  return ApiResponse.success(res, 201, "Job listing created successfully", job);
});

const getJobs = asyncHandler(async (req, res) => {
  const result = await jobService.getJobs(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Jobs fetched successfully",
    result.jobs,
    result.pagination,
  );
});

const getMyJobs = asyncHandler(async (req, res) => {
  const result = await jobService.getMyJobs(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your job listings fetched successfully",
    result.jobs,
    result.pagination,
  );
});

const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(req.params.jobId, req.user.id);

  return ApiResponse.success(res, 200, "Job fetched successfully", job);
});

const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(
    req.params.jobId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(res, 200, "Job listing updated successfully", job);
});

const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(req.params.jobId, req.user.id);

  return ApiResponse.success(res, 200, "Job listing deleted successfully");
});

module.exports = {
  createJob,
  getJobs,
  getMyJobs,
  getJobById,
  updateJob,
  deleteJob,
};