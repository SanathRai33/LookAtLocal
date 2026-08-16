const { z } = require("zod");

const createReviewSchema = z.object({
  body: z.object({
    transactionId: z.string().uuid("Invalid booking ID"),

    rating: z.coerce
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot be greater than 5"),

    comment: z
      .string()
      .trim()
      .max(1000, "Comment cannot exceed 1000 characters")
      .optional(),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const reviewIdParamSchema = z.object({
  params: z.object({
    reviewId: z.string().uuid("Invalid review ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const serviceIdParamSchema = z.object({
  params: z.object({
    serviceId: z.string().uuid("Invalid service ID"),
  }),

  body: z.object({}).optional(),

  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

const userIdParamSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Invalid user ID"),
  }),

  body: z.object({}).optional(),

  query: z.object({
    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
});

const getMyReviewsSchema = z.object({
  query: z.object({
    entityType: z.enum(["SERVICE", "RENTAL"]).optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

const updateReviewSchema = z.object({
  params: z.object({
    reviewId: z.string().uuid("Invalid review ID"),
  }),

  body: z
    .object({
      rating: z.coerce.number().int().min(1).max(5).optional(),

      comment: z.string().trim().max(1000).nullable().optional(),
    })
    .refine((data) => data.rating !== undefined || data.comment !== undefined, {
      message: "At least one field must be provided",
    }),

  query: z.object({}).optional(),
});

module.exports = {
  createReviewSchema,
  reviewIdParamSchema,
  serviceIdParamSchema,
  userIdParamSchema,
  getMyReviewsSchema,
  updateReviewSchema,
};
