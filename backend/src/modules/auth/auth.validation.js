const { z } = require("zod");

const registerSchema = z.object({
  body: z
    .object({
      fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .max(100, "Full name cannot exceed 100 characters"),

      email: z
        .string()
        .trim()
        .email("Please enter a valid email address")
        .transform((value) => value.toLowerCase()),

      phone: z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{9,14}$/, "Please enter a valid mobile number"),

      password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(72, "Password cannot exceed 72 characters"),
        // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // .regex(/\d/, "Password must contain at least one number")
        // .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),

      confirmPassword: z.string(),

      acceptTerms: z.literal(true, {
        error: "You must accept the Terms of Service and Privacy Policy",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((value) => value.toLowerCase()),

    password: z.string().min(1, "Password is required"),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),

      newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .max(72, "New password cannot exceed 72 characters")
        .regex(
          /[A-Z]/,
          "New password must contain at least one uppercase letter",
        )
        .regex(
          /[a-z]/,
          "New password must contain at least one lowercase letter",
        )
        .regex(/\d/, "New password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "New password must contain at least one special character",
        ),

      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "New passwords do not match",
      path: ["confirmNewPassword"],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: "New password must be different from current password",
      path: ["newPassword"],
    }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address")
      .transform((value) => value.toLowerCase()),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const resetPasswordSchema = z.object({
  body: z
    .object({
      token: z.string().min(1, "Reset token is required"),

      newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password cannot exceed 72 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character",
        ),

      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      path: ["confirmNewPassword"],
      message: "Passwords do not match",
    }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
};
