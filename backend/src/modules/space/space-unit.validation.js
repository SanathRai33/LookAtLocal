const { z } = require("zod");

const pricingTypes = ["DAILY", "WEEKLY", "MONTHLY"];
const unitStatuses = ["AVAILABLE", "RESERVED", "OCCUPIED"];

const decimalField = z.coerce.number().positive("Must be greater than 0");

const optionalDecimalField = z.coerce.number().min(0).optional();

const createSpaceUnitSchema = z.object({
  body: z.object({
    unitNumber: z.string().trim().max(50).optional(),

    floor: z.string().trim().max(50).optional(),

    areaSqft: optionalDecimalField,

    pricingType: z.enum(pricingTypes),

    price: decimalField,

    depositAmount: z.coerce.number().min(0).default(0),

    availableFrom: z.coerce.date().optional(),

    status: z.enum(unitStatuses).default("AVAILABLE"),
  }),

  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
  }),

  query: z.object({}).optional(),
});

const updateSpaceUnitSchema = z.object({
  body: z
    .object({
      unitNumber: z.string().trim().max(50).optional(),

      floor: z.string().trim().max(50).optional(),

      areaSqft: optionalDecimalField,

      pricingType: z.enum(pricingTypes).optional(),

      price: decimalField.optional(),

      depositAmount: z.coerce.number().min(0).optional(),

      availableFrom: z.coerce.date().nullable().optional(),

      status: z.enum(unitStatuses).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
    unitId: z.string().uuid("Invalid unit ID"),
  }),

  query: z.object({}).optional(),
});

const spaceUnitIdParamSchema = z.object({
  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
    unitId: z.string().uuid("Invalid unit ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getSpaceUnitsSchema = z.object({
  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
  }),

  query: z.object({
    search: z.string().trim().max(100).optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
});

module.exports = {
  createSpaceUnitSchema,
  updateSpaceUnitSchema,
  spaceUnitIdParamSchema,
  getSpaceUnitsSchema,
};