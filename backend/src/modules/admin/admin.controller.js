const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");
const adminService = require("./admin.service");

const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await adminService.getDashboardStats();

  return ApiResponse.success(res, 200, "Dashboard stats fetched successfully", stats);
});

const getUsers = asyncHandler(async (req, res) => {
  const result = await adminService.getUsers(req.query);

  return ApiResponse.success(
    res,
    200,
    "Users fetched successfully",
    result.users,
    result.pagination
  );
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await adminService.getUserById(req.params.userId);

  return ApiResponse.success(res, 200, "User fetched successfully", user);
});

const changeUserStatus = asyncHandler(async (req, res) => {
  const user = await adminService.changeUserStatus(
    req.params.userId,
    req.user.id,
    req.body
  );

  return ApiResponse.success(res, 200, "User status updated successfully", user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await adminService.deleteUser(req.params.userId, req.user.id);

  return ApiResponse.success(res, 200, "User deleted successfully");
});

const restoreUser = asyncHandler(async (req, res) => {
  await adminService.restoreUser(req.params.userId, req.user.id);

  return ApiResponse.success(res, 200, "User restored successfully");
});

const getPendingServices = asyncHandler(async (req, res) => {
  const result = await adminService.getPendingServices(req.query);

  return ApiResponse.success(
    res,
    200,
    "Pending services fetched successfully",
    result.services,
    result.pagination
  );
});

const approveService = asyncHandler(async (req, res) => {
  await adminService.approveService(req.params.serviceId, req.user.id);

  return ApiResponse.success(res, 200, "Service approved successfully");
});

const rejectService = asyncHandler(async (req, res) => {
  await adminService.rejectService(req.params.serviceId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Service rejected successfully");
});

const closeService = asyncHandler(async (req, res) => {
  await adminService.closeService(req.params.serviceId, req.user.id);

  return ApiResponse.success(res, 200, "Service closed successfully");
});

const getPendingRentals = asyncHandler(async (req, res) => {
  const result = await adminService.getPendingRentals(req.query);

  return ApiResponse.success(
    res,
    200,
    "Pending rentals fetched successfully",
    result.rentals,
    result.pagination
  );
});

const approveRental = asyncHandler(async (req, res) => {
  await adminService.approveRental(req.params.rentalId, req.user.id);

  return ApiResponse.success(res, 200, "Rental approved successfully");
});

const rejectRental = asyncHandler(async (req, res) => {
  await adminService.rejectRental(req.params.rentalId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Rental rejected successfully");
});

const closeRental = asyncHandler(async (req, res) => {
  await adminService.closeRental(req.params.rentalId, req.user.id);

  return ApiResponse.success(res, 200, "Rental closed successfully");
});

const getPendingProducts = asyncHandler(async (req, res) => {
  const result = await adminService.getPendingProducts(req.query);

  return ApiResponse.success(
    res,
    200,
    "Pending products fetched successfully",
    result.products,
    result.pagination
  );
});

const approveProduct = asyncHandler(async (req, res) => {
  await adminService.approveProduct(req.params.productId, req.user.id);

  return ApiResponse.success(res, 200, "Product approved successfully");
});

const rejectProduct = asyncHandler(async (req, res) => {
  await adminService.rejectProduct(req.params.productId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Product rejected successfully");
});

const closeProduct = asyncHandler(async (req, res) => {
  await adminService.closeProduct(req.params.productId, req.user.id);

  return ApiResponse.success(res, 200, "Product closed successfully");
});

const getPendingSpaces = asyncHandler(async (req, res) => {
  const result = await adminService.getPendingSpaces(req.query);

  return ApiResponse.success(
    res,
    200,
    "Pending spaces fetched successfully",
    result.spaces,
    result.pagination
  );
});

const approveSpace = asyncHandler(async (req, res) => {
  await adminService.approveSpace(req.params.spaceId, req.user.id);

  return ApiResponse.success(res, 200, "Space approved successfully");
});

const rejectSpace = asyncHandler(async (req, res) => {
  await adminService.rejectSpace(req.params.spaceId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Space rejected successfully");
});

const closeSpace = asyncHandler(async (req, res) => {
  await adminService.closeSpace(req.params.spaceId, req.user.id);

  return ApiResponse.success(res, 200, "Space closed successfully");
});

const getPendingJobs = asyncHandler(async (req, res) => {
  const result = await adminService.getPendingJobs(req.query);

  return ApiResponse.success(
    res,
    200,
    "Pending jobs fetched successfully",
    result.jobs,
    result.pagination
  );
});

const approveJob = asyncHandler(async (req, res) => {
  await adminService.approveJob(req.params.jobId, req.user.id);

  return ApiResponse.success(res, 200, "Job approved successfully");
});

const rejectJob = asyncHandler(async (req, res) => {
  await adminService.rejectJob(req.params.jobId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Job rejected successfully");
});

const closeJob = asyncHandler(async (req, res) => {
  await adminService.closeJob(req.params.jobId, req.user.id);

  return ApiResponse.success(res, 200, "Job closed successfully");
});

const getReports = asyncHandler(async (req, res) => {
  const result = await adminService.getReports(req.query);

  return ApiResponse.success(
    res,
    200,
    "Reports fetched successfully",
    result.reports,
    result.pagination
  );
});

const getReportById = asyncHandler(async (req, res) => {
  const report = await adminService.getReportById(req.params.reportId);

  return ApiResponse.success(res, 200, "Report fetched successfully", report);
});

const reviewReport = asyncHandler(async (req, res) => {
  await adminService.reviewReport(req.params.reportId, req.user.id);

  return ApiResponse.success(res, 200, "Report review started successfully");
});

const resolveReport = asyncHandler(async (req, res) => {
  await adminService.resolveReport(req.params.reportId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Report resolved successfully");
});

const dismissReport = asyncHandler(async (req, res) => {
  await adminService.dismissReport(req.params.reportId, req.user.id, req.body);

  return ApiResponse.success(res, 200, "Report dismissed successfully");
});

const getReviews = asyncHandler(async (req, res) => {
  const result = await adminService.getReviews(req.query);

  return ApiResponse.success(
    res,
    200,
    "Reviews fetched successfully",
    result.reviews,
    result.pagination
  );
});

const deleteReview = asyncHandler(async (req, res) => {
  await adminService.deleteReview(req.params.reviewId, req.user.id);

  return ApiResponse.success(res, 200, "Review deleted successfully");
});

const getCategories = asyncHandler(async (req, res) => {
  const result = await adminService.getCategories(req.query);

  return ApiResponse.success(
    res,
    200,
    "Categories fetched successfully",
    result.categories,
    result.pagination
  );
});

const createCategory = asyncHandler(async (req, res) => {
  const category = await adminService.createCategory(req.user.id, req.body);

  return ApiResponse.success(res, 201, "Category created successfully", category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await adminService.updateCategory(
    req.params.categoryId,
    req.user.id,
    req.body
  );

  return ApiResponse.success(res, 200, "Category updated successfully", category);
});

const toggleCategoryStatus = asyncHandler(async (req, res) => {
  const category = await adminService.toggleCategoryStatus(
    req.params.categoryId,
    req.user.id
  );

  return ApiResponse.success(res, 200, "Category status toggled successfully", category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  await adminService.deleteCategory(req.params.categoryId, req.user.id);

  return ApiResponse.success(res, 200, "Category deleted successfully");
});

const getPointsTransactions = asyncHandler(async (req, res) => {
  const result = await adminService.getPointsTransactions(req.query);

  return ApiResponse.success(
    res,
    200,
    "Points transactions fetched successfully",
    result.transactions,
    result.pagination
  );
});

const adjustUserPoints = asyncHandler(async (req, res) => {
  const transaction = await adminService.adjustUserPoints(
    req.params.userId,
    req.user.id,
    req.body
  );

  return ApiResponse.success(res, 200, "Points adjusted successfully", transaction);
});

const getServiceBookings = asyncHandler(async (req, res) => {
  const result = await adminService.getServiceBookings(req.query);

  return ApiResponse.success(
    res,
    200,
    "Service bookings fetched successfully",
    result.bookings,
    result.pagination
  );
});

const getRentalBookings = asyncHandler(async (req, res) => {
  const result = await adminService.getRentalBookings(req.query);

  return ApiResponse.success(
    res,
    200,
    "Rental bookings fetched successfully",
    result.bookings,
    result.pagination
  );
});

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await adminService.getBookingById(req.params.bookingId);

  return ApiResponse.success(res, 200, "Booking fetched successfully", booking);
});

const sendNotificationToUser = asyncHandler(async (req, res) => {
  const notification = await adminService.sendNotificationToUser(
    req.user.id,
    req.body
  );

  return ApiResponse.success(res, 201, "Notification sent successfully", notification);
});

const sendNotificationToUsers = asyncHandler(async (req, res) => {
  const notifications = await adminService.sendNotificationToUsers(
    req.user.id,
    req.body
  );

  return ApiResponse.success(res, 201, "Notifications sent successfully", notifications);
});

const sendPlatformNotification = asyncHandler(async (req, res) => {
  const notifications = await adminService.sendPlatformNotification(
    req.user.id,
    req.body
  );

  return ApiResponse.success(res, 201, "Platform notification sent successfully", notifications);
});

module.exports = {
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
};