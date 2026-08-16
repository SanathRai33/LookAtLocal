const { z } = require("zod");

const getPointsHistorySchema = z.object({
  query: z.object({
    transactionType: z
      .enum(["EARNED", "REDEEMED", "ADJUSTED", "EXPIRED"])
      .optional(),

    actionType: z
      .enum([
        "SERVICE_COMPLETED",
        "RENTAL_COMPLETED",
        "PRODUCT_SOLD",
        "JOB_COMPLETED",
        "EMERGENCY_HELP",
        "COMMUNITY_CONTRIBUTION",
        "ADMIN_ADJUSTMENT",
      ])
      .optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

module.exports = {
  getPointsHistorySchema,
};
