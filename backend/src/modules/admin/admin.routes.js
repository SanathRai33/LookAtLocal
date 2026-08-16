const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const requireAdmin = require("../../middlewares/admin.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  changeUserStatusSchema,
  userIdParamSchema,
  rejectReasonSchema,
  reportActionSchema,
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
  serviceIdParamSchema,
  rentalIdParamSchema,
  productIdParamSchema,
  spaceIdParamSchema,
  jobIdParamSchema,
  reportIdParamSchema,
  reviewIdParamSchema,
  bookingIdParamSchema,
  adjustPointsSchema,
  sendNotificationSchema,
  sendBulkNotificationSchema,
  getUsersSchema,
  getReportsSchema,
  getReviewsSchema,
  getCategoriesSchema,
  getPointsSchema,
  getBookingsSchema,
} = require("./admin.validation");

const {
  getDashboardStats,
  getUsers,
  getUserById,
  changeUserStatus,
  deleteUser,
  restoreUser,
  getPendingServices,
  approveService,
  rejectService,
  closeService,
  getPendingRentals,
  approveRental,
  rejectRental,
  closeRental,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  closeProduct,
  getPendingSpaces,
  approveSpace,
  rejectSpace,
  closeSpace,
  getPendingJobs,
  approveJob,
  rejectJob,
  closeJob,
  getReports,
  getReportById,
  reviewReport,
  resolveReport,
  dismissReport,
  getReviews,
  deleteReview,
  getCategories,
  createCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
  getPointsTransactions,
  adjustUserPoints,
  getServiceBookings,
  getRentalBookings,
  getBookingById,
  sendNotificationToUser,
  sendNotificationToUsers,
  sendPlatformNotification,
} = require("./admin.controller");

const router = express.Router();

router.use(authenticate);
router.use(requireAdmin);

router.get("/dashboard", getDashboardStats);

router.get("/users", validate(getUsersSchema), getUsers);
router.get("/users/:userId", validate(userIdParamSchema), getUserById);
router.patch("/users/:userId/status", validate(changeUserStatusSchema), changeUserStatus);
router.delete("/users/:userId", validate(userIdParamSchema), deleteUser);
router.patch("/users/:userId/restore", validate(userIdParamSchema), restoreUser);

router.get("/services/pending", getPendingServices);
router.patch("/services/:serviceId/approve", validate(serviceIdParamSchema), approveService);
router.patch("/services/:serviceId/reject", validate(rejectReasonSchema), rejectService);
router.patch("/services/:serviceId/close", validate(serviceIdParamSchema), closeService);

router.get("/rentals/pending", getPendingRentals);
router.patch("/rentals/:rentalId/approve", validate(rentalIdParamSchema), approveRental);
router.patch("/rentals/:rentalId/reject", validate(rejectReasonSchema), rejectRental);
router.patch("/rentals/:rentalId/close", validate(rentalIdParamSchema), closeRental);

router.get("/products/pending", getPendingProducts);
router.patch("/products/:productId/approve", validate(productIdParamSchema), approveProduct);
router.patch("/products/:productId/reject", validate(rejectReasonSchema), rejectProduct);
router.patch("/products/:productId/close", validate(productIdParamSchema), closeProduct);

router.get("/spaces/pending", getPendingSpaces);
router.patch("/spaces/:spaceId/approve", validate(spaceIdParamSchema), approveSpace);
router.patch("/spaces/:spaceId/reject", validate(rejectReasonSchema), rejectSpace);
router.patch("/spaces/:spaceId/close", validate(spaceIdParamSchema), closeSpace);

router.get("/jobs/pending", getPendingJobs);
router.patch("/jobs/:jobId/approve", validate(jobIdParamSchema), approveJob);
router.patch("/jobs/:jobId/reject", validate(rejectReasonSchema), rejectJob);
router.patch("/jobs/:jobId/close", validate(jobIdParamSchema), closeJob);

router.get("/reports", validate(getReportsSchema), getReports);
router.get("/reports/:reportId", validate(reportIdParamSchema), getReportById);
router.patch("/reports/:reportId/review", validate(reportIdParamSchema), reviewReport);
router.patch("/reports/:reportId/resolve", validate(reportActionSchema), resolveReport);
router.patch("/reports/:reportId/dismiss", validate(reportActionSchema), dismissReport);

router.get("/reviews", validate(getReviewsSchema), getReviews);
router.delete("/reviews/:reviewId", validate(reviewIdParamSchema), deleteReview);

router.get("/categories", validate(getCategoriesSchema), getCategories);
router.post("/categories", validate(createCategorySchema), createCategory);
router.patch("/categories/:categoryId", validate(updateCategorySchema), updateCategory);
router.patch("/categories/:categoryId/status", validate(categoryIdParamSchema), toggleCategoryStatus);
router.delete("/categories/:categoryId", validate(categoryIdParamSchema), deleteCategory);

router.get("/points/transactions", validate(getPointsSchema), getPointsTransactions);
router.post("/users/:userId/points/adjust", validate(adjustPointsSchema), adjustUserPoints);

router.get("/service-bookings", validate(getBookingsSchema), getServiceBookings);
router.get("/rental-bookings", validate(getBookingsSchema), getRentalBookings);
router.get("/bookings/:bookingId", validate(bookingIdParamSchema), getBookingById);

router.post("/notifications/user", validate(sendNotificationSchema), sendNotificationToUser);
router.post("/notifications/bulk", validate(sendBulkNotificationSchema), sendNotificationToUsers);
router.post("/notifications/platform", validate(sendNotificationSchema), sendPlatformNotification);

module.exports = router;