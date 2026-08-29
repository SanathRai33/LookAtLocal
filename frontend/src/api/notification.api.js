import api from "./axios.js";

const notificationApi = {
  getNotifications: (params = {}) => api.get("/notifications", { params }),

  getUnreadCount: () => api.get("/notifications/unread-count"),

  markAsRead: (notificationId) =>
    api.patch(`/notifications/${notificationId}/read`),

  markAllAsRead: () => api.patch("/notifications/read-all"),

  deleteNotification: (notificationId) =>
    api.delete(`/notifications/${notificationId}`),

  deleteAllNotifications: () => api.delete("/notifications"),
};

export default notificationApi;
