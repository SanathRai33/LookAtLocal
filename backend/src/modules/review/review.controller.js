const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const reviewService = require("./review.service");

const createReview = asyncHandler(async (req, res) => {
  const review = await reviewService.createReview(req.user.id, req.body);

  return ApiResponse.success(res, 201, "Review created successfully", review);
});

const getServiceReviews = asyncHandler(async (req, res) => {
  const result = await reviewService.getServiceReviews(req.params.serviceId, req.query);

  return ApiResponse.success(
    res,
    200,
    "Service reviews fetched successfully",
    result,
  );
});

const getUserReviews = asyncHandler(async (req, res) => {
  const result = await reviewService.getUserReviews( req.params.userId, req.query);

  return ApiResponse.success(
    res,
    200,
    "User reviews fetched successfully",
    result,
  );
});

const getMyReviews = asyncHandler(async (req, res) => {
  const result = await reviewService.getMyReviews(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your reviews fetched successfully",
    result,
  );
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await reviewService.updateReview( req.params.reviewId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Review updated successfully", review);
});

const deleteReview = asyncHandler(async (req, res) => {
  await reviewService.deleteReview(req.params.reviewId, req.user.id);

  return ApiResponse.success(res, 200, "Review deleted successfully");
});

module.exports = {
  createReview,
  getServiceReviews,
  getUserReviews,
  getMyReviews,
  updateReview,
  deleteReview,
};
