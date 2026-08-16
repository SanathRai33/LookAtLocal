const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createCommunityPostSchema,
  updateCommunityPostSchema,
  communityPostIdParamSchema,
  getCommunityPostsSchema,
} = require("./community.validation");

const {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
} = require("./community.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createCommunityPostSchema), createCommunityPost);
router.get("/", validate(getCommunityPostsSchema), getCommunityPosts);
router.get("/:postId", validate(communityPostIdParamSchema), getCommunityPostById);
router.patch("/:postId", validate(updateCommunityPostSchema), updateCommunityPost);
router.delete("/:postId", validate(communityPostIdParamSchema), deleteCommunityPost);

module.exports = router;