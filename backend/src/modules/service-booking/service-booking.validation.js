const { z } = require("zod");

const futureDate = z.coerce
  .date()
  .refine((date) => date > new Date(), "Scheduled date must be in the future");

const bookingWindowFields = {
  scheduledAt: futureDate,
  endAt: z.coerce.date().optional(),
};

const createServiceBookingSchema = z.object({
  body: z
    .object({
      serviceId: z.string().uuid("Invalid service ID"),

      ...bookingWindowFields,

      addressLine: z.string().trim().min(3, "Address is required").max(255),

      locality: z.string().trim().max(100).optional(),

      city: z.string().trim().min(2).max(100),

      state: z.string().trim().min(2).max(100),

      postalCode: z
        .string()
        .trim()
        .regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
        .optional(),

      latitude: z.coerce.number().min(-90).max(90).optional(),

      longitude: z.coerce.number().min(-180).max(180).optional(),

      customerNote: z.string().trim().max(1000).optional(),
    })
    .refine((data) => !data.endAt || data.endAt > data.scheduledAt, {
      message: "End time must be after start time",
      path: ["endAt"],
    }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const bookingIdParamSchema = z.object({
  params: z.object({
    bookingId: z.string().uuid("Invalid booking ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const availabilitySchema = z.object({
  params: z.object({
    serviceId: z.string().uuid("Invalid service ID"),
  }),

  query: z
    .object({
      scheduledAt: futureDate,
      endAt: z.coerce.date().optional(),
    })
    .refine((data) => !data.endAt || data.endAt > data.scheduledAt, {
      message: "End time must be after start time",
      path: ["endAt"],
    }),

  body: z.object({}).optional(),
});

const getBookingsSchema = z.object({
  query: z.object({
    status: z
      .enum([
        "REQUESTED",
        "ACCEPTED",
        "REJECTED",
        "CANCELLED",
        "IN_PROGRESS",
        "COMPLETED",
      ])
      .optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

const acceptBookingSchema = z.object({
  params: z.object({
    bookingId: z.string().uuid("Invalid booking ID"),
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
  createServiceBookingSchema,
  availabilitySchema,
  bookingIdParamSchema,
  getBookingsSchema,
  acceptBookingSchema,
};
