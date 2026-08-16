const { z } = require("zod");

const uuidSchema = z.string().uuid("Invalid rental ID");

const decimalField = z.coerce
  .number({
    invalid_type_error: "Must be a number",
  })
  .nonnegative();

const optionalDecimalField = z
  .union([z.string(), z.number()])
  .optional()
  .transform((value) => (value !== undefined ? Number(value) : undefined));

const createRentalSchema = z.object({
  body: z.object({
    categoryId: z.string().uuid(),

    title: z.string().trim().min(5).max(120),

    description: z.string().trim().min(20).max(3000),

    pricePerDay: decimalField,

    depositAmount: decimalField.default(0),

    isNegotiable: z.coerce.boolean().default(false),

    condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"]),

    quantity: z.coerce.number().int().min(1).default(1),

    deliveryOption: z.enum(["PICKUP", "OWNER_DELIVERY", "BOTH"]),

    addressLine: z.string().trim().max(255).optional(),

    locality: z.string().trim().max(100).optional(),

    city: z.string().trim().min(2).max(100),

    state: z.string().trim().min(2).max(100),

    postalCode: z.string().trim().max(20).optional(),

    latitude: optionalDecimalField,

    longitude: optionalDecimalField,
  }),

  params: z.object({}),

  query: z.object({}),
});

const updateRentalSchema = z.object({
  params: z.object({
    rentalId: uuidSchema,
  }),

  body: z.object({
    categoryId: z.string().uuid().optional(),

    title: z.string().trim().min(5).max(120).optional(),

    description: z.string().trim().min(20).max(3000).optional(),

    pricePerDay: decimalField.optional(),

    depositAmount: decimalField.optional(),

    isNegotiable: z.coerce.boolean().optional(),

    condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"]).optional(),

    quantity: z.coerce.number().int().min(1).optional(),

    deliveryOption: z.enum(["PICKUP", "OWNER_DELIVERY", "BOTH"]).optional(),

    addressLine: z.string().trim().max(255).optional(),

    locality: z.string().trim().max(100).optional(),

    city: z.string().trim().min(2).max(100).optional(),

    state: z.string().trim().min(2).max(100).optional(),

    postalCode: z.string().trim().max(20).optional(),

    latitude: optionalDecimalField,

    longitude: optionalDecimalField,

    isAvailable: z.coerce.boolean().optional(),

    status: z
      .enum(["DRAFT", "PENDING", "ACTIVE", "REJECTED", "CLOSED"])
      .optional(),
  }),

  query: z.object({}),
});

const rentalIdSchema = z.object({
  params: z.object({
    rentalId: z.string().uuid("Invalid service ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getRentalsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    categoryId: z.string().uuid("Invalid category ID").optional(),

    city: z.string().optional(),

    locality: z.string().optional(),

    postalCode: z.string().optional(),

    condition: z.enum(["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"]).optional(),

    deliveryOption: z.enum(["PICKUP", "OWNER_DELIVERY", "BOTH"]).optional(),

    minPricePerDay: optionalDecimalField,

    maxPricePerDay: optionalDecimalField,

    isNegotiable: z.enum(["true", "false"]).optional(),

    isAvailable: z.enum(["true", "false"]).optional(),

    sort: z
      .enum(["newest", "oldest", "price_asc", "price_desc"])
      .default("newest"),

    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createRentalSchema,
  updateRentalSchema,
  rentalIdSchema,
  getRentalsSchema,
};
