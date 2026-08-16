const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  getNotificationsSchema,
  notificationIdSchema,
} = require("./notification.validation");

const {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
} = require("./notification.controller");

const router = express.Router();

router.use(authenticate);

router.get("/", validate(getNotificationsSchema), getMyNotifications);

router.get("/unread-count", getUnreadCount);

router.patch("/read-all", markAllAsRead);

router.patch("/:notificationId/read", validate(notificationIdSchema), markAsRead);

router.delete("/", deleteAllNotifications);

router.delete("/:notificationId", validate(notificationIdSchema), deleteNotification);

module.exports = router;
