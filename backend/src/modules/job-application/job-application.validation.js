const { z } = require("zod");

const applicationStatuses = [
  "APPLIED",
  "REVIEWING",
  "SHORTLISTED",
  "ACCEPTED",
  "REJECTED",
  "WITHDRAWN",
];

const createJobApplicationSchema = z.object({
  body: z.object({
    jobId: z.string().uuid("Invalid job ID"),

    message: z
      .string()
      .trim()
      .max(2000, "Message cannot exceed 2000 characters")
      .optional(),

    resumeUrl: z.string().trim().url("Invalid resume URL").optional(),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const applicationIdParamSchema = z.object({
  params: z.object({
    applicationId: z.string().uuid("Invalid application ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getApplicationsSchema = z.object({
  query: z.object({
    status: z.enum(applicationStatuses).optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createJobApplicationSchema,
  applicationIdParamSchema,
  getApplicationsSchema,
};
