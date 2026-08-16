const { z } = require("zod");

const emergencyTypes = ["BLOOD", "MEDICAL", "ACCIDENT", "VOLUNTEER", "OTHER"];
const urgencyLevels = ["NORMAL", "URGENT", "CRITICAL"];
const emergencyStatuses = ["ACTIVE", "RESOLVED", "CANCELLED", "EXPIRED"];

const phoneRegex = /^\+?[1-9]\d{9,14}$/;

const createEmergencySchema = z.object({
  body: z.object({
    emergencyType: z.enum(emergencyTypes),

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

    urgency: z.enum(urgencyLevels).default("NORMAL"),

    contactPhone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").optional(),

    useCurrentLocation: z.coerce.boolean().default(false),

    currentAddress: z.string().trim().max(255).optional(),
    currentLocality: z.string().trim().max(100).optional(),
    currentCity: z.string().trim().max(100).optional(),
    currentState: z.string().trim().max(100).optional(),
    currentPostalCode: z.string().trim().optional(),
    currentLatitude: z.coerce.number().min(-90).max(90).optional(),
    currentLongitude: z.coerce.number().min(-180).max(180).optional(),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateEmergencySchema = z.object({
  body: z
    .object({
      emergencyType: z.enum(emergencyTypes).optional(),

      title: z.string().trim().min(3).max(150).optional(),

      description: z.string().trim().min(10).max(3000).optional(),

      urgency: z.enum(urgencyLevels).optional(),

      contactPhone: z.string().trim().regex(phoneRegex).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    emergencyId: z.string().uuid("Invalid emergency ID"),
  }),

  query: z.object({}).optional(),
});

const emergencyIdParamSchema = z.object({
  params: z.object({
    emergencyId: z.string().uuid("Invalid emergency ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getEmergenciesSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    emergencyType: z.enum(emergencyTypes).optional(),

    urgency: z.enum(urgencyLevels).optional(),

    status: z.enum(emergencyStatuses).optional(),

    city: z.string().trim().max(100).optional(),

    sort: z
      .enum(["newest", "oldest", "urgent_first"])
      .default("newest"),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createEmergencySchema,
  updateEmergencySchema,
  emergencyIdParamSchema,
  getEmergenciesSchema,
};