const { z } = require("zod");

const pricingTypes = ["HOURLY", "DAILY", "FIXED"];

const serviceStatuses = ["DRAFT", "PENDING", "ACTIVE", "REJECTED", "CLOSED"];

const booleanFromForm = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;

  return value;
}, z.boolean());

const createServiceSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid("Invalid category ID"),

    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(150, "Title cannot exceed 150 characters"),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters")
      .max(3000, "Description cannot exceed 3000 characters"),

    experienceYears: z.coerce.number().int().min(0).max(80).optional(),

    pricingType: z.enum(pricingTypes),

    price: z.coerce.number().positive("Price must be greater than 0"),

    isNegotiable: booleanFromForm.optional(),

    addressLine: z.string().trim().max(255).optional(),

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
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateServiceSchema = z.object({
  body: z
    .object({
      categoryId: z.string().uuid("Invalid category ID").optional(),

      title: z.string().trim().min(3).max(150).optional(),

      description: z.string().trim().min(10).max(3000).optional(),

      experienceYears: z.coerce
        .number()
        .int()
        .min(0)
        .max(80)
        .nullable()
        .optional(),

      pricingType: z.enum(pricingTypes).optional(),

      price: z.coerce.number().positive().optional(),

      isNegotiable: booleanFromForm.optional(),

      isAvailable: booleanFromForm.optional(),

      addressLine: z.string().trim().max(255).nullable().optional(),

      locality: z.string().trim().max(100).nullable().optional(),

      city: z.string().trim().min(2).max(100).optional(),

      state: z.string().trim().min(2).max(100).optional(),

      postalCode: z
        .string()
        .trim()
        .regex(/^[1-9][0-9]{5}$/)
        .nullable()
        .optional(),

      latitude: z.coerce.number().min(-90).max(90).nullable().optional(),

      longitude: z.coerce.number().min(-180).max(180).nullable().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    serviceId: z.string().uuid("Invalid service ID"),
  }),

  query: z.object({}).optional(),
});

const serviceIdParamSchema = z.object({
  params: z.object({
    serviceId: z.string().uuid("Invalid service ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getServicesSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    categoryId: z.string().uuid("Invalid category ID").optional(),

    pricingType: z.enum(pricingTypes).optional(),

    minPrice: z.coerce.number().min(0).optional(),

    maxPrice: z.coerce.number().min(0).optional(),

    isNegotiable: z.preprocess((value) => {
      if (value === "true") return true;
      if (value === "false") return false;

      return value;
    }, z.boolean().optional()),

    sort: z
      .enum(["newest", "oldest", "price_asc", "price_desc"])
      .default("newest"),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createServiceSchema,
  updateServiceSchema,
  serviceIdParamSchema,
  getServicesSchema,
};
