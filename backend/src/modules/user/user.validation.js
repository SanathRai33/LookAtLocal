const { z } = require("zod");

const updateProfileSchema = z.object({
  body: z
    .object({
      fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name cannot exceed 100 characters")
        .optional(),

      phone: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid mobile number")
        .optional(),

      bio: z
        .string()
        .trim()
        .max(500, "Bio cannot exceed 500 characters")
        .nullable()
        .optional(),

      addressLine: z
        .string()
        .trim()
        .max(255, "Address cannot exceed 255 characters")
        .nullable()
        .optional(),

      locality: z
        .string()
        .trim()
        .max(100, "Locality cannot exceed 100 characters")
        .nullable()
        .optional(),

      city: z
        .string()
        .trim()
        .max(100, "City cannot exceed 100 characters")
        .nullable()
        .optional(),

      state: z
        .string()
        .trim()
        .max(100, "State cannot exceed 100 characters")
        .nullable()
        .optional(),

      postalCode: z
        .string()
        .trim()
        .regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit pincode")
        .nullable()
        .optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const userIdParamSchema = z.object({
  body: z.object({}).optional(),

  params: z.object({
    userId: z.string().uuid("Invalid user ID"),
  }),

  query: z.object({}).optional(),
});

module.exports = {
  updateProfileSchema,
  userIdParamSchema,
};
