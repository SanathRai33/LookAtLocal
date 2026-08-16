const { z } = require("zod");

const conditionOptions = ["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"];
const deliveryOptions = ["PICKUP", "SELLER_DELIVERY", "BOTH"];
const productStatuses = [
  "DRAFT",
  "PENDING",
  "ACTIVE",
  "RESERVED",
  "SOLD",
  "REJECTED",
  "CLOSED",
];

const booleanFromForm = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}, z.boolean());

const decimalField = z.coerce.number().positive("Must be greater than 0");

const optionalDecimalField = z.coerce.number().min(0).optional();

const createProductSchema = z.object({
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

    price: decimalField,

    isNegotiable: booleanFromForm.optional(),

    condition: z.enum(conditionOptions),

    deliveryOption: z.enum(deliveryOptions),

    addressLine: z.string().trim().max(255).optional(),

    locality: z.string().trim().max(100).optional(),

    city: z.string().trim().min(2).max(100),

    state: z.string().trim().min(2).max(100),

    postalCode: z
      .string()
      .trim()
      .regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
      .optional(),

    latitude: optionalDecimalField,

    longitude: optionalDecimalField,
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateProductSchema = z.object({
  body: z
    .object({
      categoryId: z.string().uuid("Invalid category ID").optional(),

      title: z.string().trim().min(3).max(150).optional(),

      description: z.string().trim().min(10).max(3000).optional(),

      price: decimalField.optional(),

      isNegotiable: booleanFromForm.optional(),

      condition: z.enum(conditionOptions).optional(),

      deliveryOption: z.enum(deliveryOptions).optional(),

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

      latitude: optionalDecimalField.nullable().optional(),

      longitude: optionalDecimalField.nullable().optional(),

      status: z.enum(productStatuses).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    productId: z.string().uuid("Invalid product ID"),
  }),

  query: z.object({}).optional(),
});

const productIdParamSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getProductsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    categoryId: z.string().uuid("Invalid category ID").optional(),

    city: z.string().trim().max(100).optional(),

    locality: z.string().trim().max(100).optional(),

    postalCode: z.string().trim().optional(),

    condition: z.enum(conditionOptions).optional(),

    deliveryOption: z.enum(deliveryOptions).optional(),

    minPrice: z.coerce.number().min(0).optional(),

    maxPrice: z.coerce.number().min(0).optional(),

    isNegotiable: z.coerce.boolean().optional(),

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
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  getProductsSchema,
};
