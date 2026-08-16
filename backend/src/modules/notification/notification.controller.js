const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const notificationService = require("./notification.service");

const getMyNotifications = asyncHandler(async (req, res) => {
  const result = await notificationService.getMyNotifications(
    req.user.id,
    req.query,
  );

  return ApiResponse.success(
    res,
    200,
    "Notifications fetched successfully",
    result,
  );
});

const getUnreadCount = asyncHandler(async (req, res) => {
  const result = await notificationService.getUnreadCount(req.user.id);

  return ApiResponse.success(
    res,
    200,
    "Unread notification count fetched successfully",
    result,
  );
});

const markAsRead = asyncHandler(async (req, res) => {
  const notification = await notificationService.markAsRead(
    req.params.notificationId,
    req.user.id,
  );

  return ApiResponse.success(
    res,
    200,
    "Notification marked as read",
    notification,
  );
});

const markAllAsRead = asyncHandler(async (req, res) => {
  await notificationService.markAllAsRead(req.user.id);

  return ApiResponse.success(res, 200, "All notifications marked as read");
});

const deleteNotification = asyncHandler(async (req, res) => {
  await notificationService.deleteNotification(
    req.params.notificationId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Notification deleted successfully");
});

const deleteAllNotifications = asyncHandler(async (req, res) => {
  await notificationService.deleteAllNotifications(req.user.id);

  return ApiResponse.success(
    res,
    200,
    "All notifications deleted successfully",
  );
});

module.exports = {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
};
