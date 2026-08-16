const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const communityService = require("./community.service");

const createCommunityPost = asyncHandler(async (req, res) => {
  const post = await communityService.createCommunityPost({
    userId: req.user.id,
    data: req.body,
  });

  return ApiResponse.success(
    res,
    201,
    "Community post created successfully",
    post,
  );
});

const getCommunityPosts = asyncHandler(async (req, res) => {
  const result = await communityService.getCommunityPosts(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Community posts fetched successfully",
    result.posts,
    result.pagination,
  );
});

const getCommunityPostById = asyncHandler(async (req, res) => {
  const post = await communityService.getCommunityPostById(
    req.params.postId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Community post fetched successfully", post);
});

const updateCommunityPost = asyncHandler(async (req, res) => {
  const post = await communityService.updateCommunityPost(
    req.params.postId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    200,
    "Community post updated successfully",
    post,
  );
});

const deleteCommunityPost = asyncHandler(async (req, res) => {
  await communityService.deleteCommunityPost(req.params.postId, req.user.id);

  return ApiResponse.success(res, 200, "Community post deleted successfully");
});

module.exports = {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
};