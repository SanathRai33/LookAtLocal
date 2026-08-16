const { z } = require("zod");

const getNotificationsSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),

    isRead: z.enum(["true", "false"]).optional(),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const notificationIdSchema = z.object({
  params: z.object({
    notificationId: z.string().uuid("Invalid notification ID"),
  }),

  query: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  getNotificationsSchema,
  notificationIdSchema,
};
