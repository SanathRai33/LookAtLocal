const { z } = require("zod");

const jobTypes = ["FULL_TIME", "PART_TIME", "CONTRACT", "DAILY_WAGE"];
const salaryTypes = ["HOURLY", "DAILY", "MONTHLY", "YEARLY"];
const jobStatuses = ["DRAFT", "PENDING", "ACTIVE", "CLOSED", "REJECTED"];

const booleanFromForm = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}, z.boolean());

const decimalField = z.coerce.number().positive("Must be greater than 0");

const optionalDecimalField = z.coerce.number().min(0).optional();

const createJobSchema = z.object({
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

    companyName: z
      .string()
      .trim()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name cannot exceed 100 characters"),

    jobType: z.enum(jobTypes),

    salaryMin: optionalDecimalField,

    salaryMax: optionalDecimalField,

    salaryType: z.enum(salaryTypes).optional(),

    benefits: z.string().trim().max(1000).nullable().optional(),

    experienceRequired: z.string().trim().max(200).nullable().optional(),

    vacancies: z.coerce.number().int().min(1).default(1),

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

    applicationDeadline: z.coerce.date().optional(),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateJobSchema = z.object({
  body: z
    .object({
      categoryId: z.string().uuid("Invalid category ID").optional(),

      title: z.string().trim().min(3).max(150).optional(),

      description: z.string().trim().min(10).max(3000).optional(),

      companyName: z.string().trim().min(2).max(100).optional(),

      jobType: z.enum(jobTypes).optional(),

      salaryMin: optionalDecimalField.nullable().optional(),

      salaryMax: optionalDecimalField.nullable().optional(),

      salaryType: z.enum(salaryTypes).nullable().optional(),

      benefits: z.string().trim().max(1000).nullable().optional(),

      experienceRequired: z.string().trim().max(200).nullable().optional(),

      vacancies: z.coerce.number().int().min(1).optional(),

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

      applicationDeadline: z.coerce.date().nullable().optional(),

      status: z.enum(jobStatuses).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    jobId: z.string().uuid("Invalid job ID"),
  }),

  query: z.object({}).optional(),
});

const jobIdParamSchema = z.object({
  params: z.object({
    jobId: z.string().uuid("Invalid job ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getJobsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    categoryId: z.string().uuid("Invalid category ID").optional(),

    city: z.string().trim().max(100).optional(),

    locality: z.string().trim().max(100).optional(),

    postalCode: z.string().trim().optional(),

    jobType: z.enum(jobTypes).optional(),

    jobType: z.enum(jobTypes).optional(),

    minSalary: z.coerce.number().min(0).optional(),

    maxSalary: z.coerce.number().min(0).optional(),

    salaryType: z.enum(salaryTypes).optional(),

    sort: z.enum(["newest", "oldest"]).default("newest"),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createJobSchema,
  updateJobSchema,
  jobIdParamSchema,
  getJobsSchema,
};
