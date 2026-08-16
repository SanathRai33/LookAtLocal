const { z } = require("zod");

const spaceTypes = ["SHOP", "OFFICE", "ROOM", "PG", "WAREHOUSE", "PARKING"];
const spaceStatuses = ["DRAFT", "PENDING", "ACTIVE", "REJECTED", "CLOSED"];
const pricingTypes = ["DAILY", "WEEKLY", "MONTHLY"];
const unitStatuses = ["AVAILABLE", "RESERVED", "OCCUPIED"];

const booleanFromForm = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}, z.boolean());

const decimalField = z.coerce.number().positive("Must be greater than 0");

const optionalDecimalField = z.coerce.number().min(0).optional();

const spaceUnitSchema = z.object({
  unitNumber: z.string().trim().max(50).optional(),
  floor: z.string().trim().max(50).optional(),
  areaSqft: optionalDecimalField,
  pricingType: z.enum(pricingTypes),
  price: decimalField,
  depositAmount: z.coerce.number().min(0).default(0),
  availableFrom: z.coerce.date().optional(),
  status: z.enum(unitStatuses).default("AVAILABLE"),
});

const unitsFromForm = z.preprocess((value) => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}, z.array(spaceUnitSchema).max(50).optional());

const createSpaceSchema = z.object({
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

    spaceType: z.enum(spaceTypes),

    addressLine: z.string().trim().max(255).nullable().optional(),

    locality: z.string().trim().max(100).nullable().optional(),

    city: z.string().trim().min(2).max(100),

    state: z.string().trim().min(2).max(100),

    postalCode: z
      .string()
      .trim()
      .regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit PIN code")
      .nullable()
      .optional(),

    latitude: optionalDecimalField,

    longitude: optionalDecimalField,

    units: unitsFromForm,
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateSpaceSchema = z.object({
  body: z
    .object({
      categoryId: z.string().uuid("Invalid category ID").optional(),

      title: z.string().trim().min(3).max(150).optional(),

      description: z.string().trim().min(10).max(3000).optional(),

      spaceType: z.enum(spaceTypes).optional(),

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

      status: z.enum(spaceStatuses).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
  }),

  query: z.object({}).optional(),
});

const spaceIdParamSchema = z.object({
  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getSpacesSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    categoryId: z.string().uuid("Invalid category ID").optional(),

    city: z.string().trim().max(100).optional(),

    locality: z.string().trim().max(100).optional(),

    postalCode: z.string().trim().optional(),

    spaceType: z.enum(spaceTypes).optional(),

    pricingType: z.enum(pricingTypes).optional(),

    minPrice: z.coerce.number().min(0).optional(),

    maxPrice: z.coerce.number().min(0).optional(),

    unitStatus: z.enum(unitStatuses).optional(),

    sort: z.enum(["newest", "oldest"]).default("newest"),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createSpaceSchema,
  updateSpaceSchema,
  spaceIdParamSchema,
  getSpacesSchema,
};
