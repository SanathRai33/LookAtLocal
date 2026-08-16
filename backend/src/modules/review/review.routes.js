const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");

const validate = require("../../middlewares/validate.middleware");

const {
  createReviewSchema,
  reviewIdParamSchema,
  serviceIdParamSchema,
  userIdParamSchema,
  getMyReviewsSchema,
  updateReviewSchema,
} = require("./review.validation");

const {
  createReview,
  getServiceReviews,
  getUserReviews,
  getMyReviews,
  updateReview,
  deleteReview,
} = require("./review.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createReviewSchema), createReview);
router.get("/my-reviews", validate(getMyReviewsSchema), getMyReviews);
router.get("/service/:serviceId", validate(serviceIdParamSchema), getServiceReviews);
router.get("/user/:userId", validate(userIdParamSchema), getUserReviews);
router.patch("/:reviewId", validate(updateReviewSchema), updateReview);
router.delete("/:reviewId", validate(reviewIdParamSchema), deleteReview);

module.exports = router;
