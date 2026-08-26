const { z } = require("zod");

const futureDate = z.coerce
  .date()
  .refine((date) => date > new Date(), "Date must be in the future");

const createRentalBookingSchema = z.object({
  body: z
    .object({
      rentalId: z.string().uuid("Invalid rental ID"),

      startDate: futureDate,

      endDate: futureDate,

      quantity: z.coerce
        .number()
        .int()
        .positive("Quantity must be greater than 0")
        .default(1),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const rentalBookingIdParamSchema = z.object({
  params: z.object({
    bookingId: z.string().uuid("Invalid booking ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const rentalAvailabilitySchema = z.object({
  params: z.object({
    rentalId: z.string().uuid("Invalid rental ID"),
  }),

  query: z
    .object({
      startDate: futureDate,
      endDate: futureDate,
      quantity: z.coerce
        .number()
        .int()
        .positive("Quantity must be greater than 0")
        .default(1),
    })
    .refine((data) => data.endDate > data.startDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    }),

  body: z.object({}).optional(),
});

const getRentalBookingsSchema = z.object({
  query: z.object({
    status: z
      .enum([
        "REQUESTED",
        "ACCEPTED",
        "REJECTED",
        "CANCELLED",
        "ACTIVE",
        "COMPLETED",
      ])
      .optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

module.exports = {
  createRentalBookingSchema,
  rentalAvailabilitySchema,
  rentalBookingIdParamSchema,
  getRentalBookingsSchema,
};
