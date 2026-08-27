const { z } = require("zod");

const bookingIdParamSchema = z.object({
  params: z.object({
    transactionId: z.string().uuid("Invalid transaction ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const createProductBookingSchema = z.object({
  body: z.object({
    productId: z.string().uuid("Invalid product ID"),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getBookingsSchema = z.object({
  query: z.object({
    status: z
      .enum(["REQUESTED", "ACCEPTED", "REJECTED", "CANCELLED", "COMPLETED"])
      .optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

const acceptBookingSchema = z.object({
  params: z.object({
    transactionId: z.string().uuid("Invalid transaction ID"),
  }),

  body: z.object({
    agreedPrice: z.coerce
      .number()
      .positive("Agreed price must be greater than 0")
      .optional(),
  }),

  query: z.object({}).optional(),
});

module.exports = {
  createProductBookingSchema,
  bookingIdParamSchema,
  getBookingsSchema,
  acceptBookingSchema,
};
