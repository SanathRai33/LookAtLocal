const { z } = require("zod");

const userStatuses = ["ACTIVE", "SUSPENDED", "BANNED"];
const reportStatuses = ["OPEN", "REVIEWING", "RESOLVED", "DISMISSED"];
const reportEntityTypes = ["USER", "SERVICE", "RENTAL", "PRODUCT", "SPACE", "JOB", "EMERGENCY", "COMMUNITY"];
const reviewEntityTypes = ["SERVICE", "RENTAL"];
const categoryModules = ["SERVICE", "RENTAL", "PRODUCT", "SPACE", "JOB"];
const transactionTypes = ["EARNED", "REDEEMED", "ADJUSTED", "EXPIRED"];
const actionTypes = ["SERVICE_COMPLETED", "RENTAL_COMPLETED", "PRODUCT_SOLD", "JOB_COMPLETED", "EMERGENCY_HELP", "COMMUNITY_CONTRIBUTION", "ADMIN_ADJUSTMENT"];

const booleanFromForm = z.preprocess((value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}, z.boolean());

const userIdParamSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Invalid user ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const changeUserStatusSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Invalid user ID"),
  }),
  body: z.object({
    status: z.enum(userStatuses),
    reason: z.string().trim().max(500).optional(),
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

const rentalIdParamSchema = z.object({
  params: z.object({
    rentalId: z.string().uuid("Invalid rental ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const productIdParamSchema = z.object({
  params: z.object({
    productId: z.string().uuid("Invalid product ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const spaceIdParamSchema = z.object({
  params: z.object({
    spaceId: z.string().uuid("Invalid space ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const jobIdParamSchema = z.object({
  params: z.object({
    jobId: z.string().uuid("Invalid job ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const rejectReasonSchema = z.object({
  params: z.object({
    serviceId: z.string().uuid("Invalid service ID").optional(),
    rentalId: z.string().uuid("Invalid rental ID").optional(),
    productId: z.string().uuid("Invalid product ID").optional(),
    spaceId: z.string().uuid("Invalid space ID").optional(),
    jobId: z.string().uuid("Invalid job ID").optional(),
  }),
  body: z.object({
    reason: z.string().trim().min(3, "Reason must be at least 3 characters").max(500),
  }),
  query: z.object({}).optional(),
});

const reportIdParamSchema = z.object({
  params: z.object({
    reportId: z.string().uuid("Invalid report ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const reportActionSchema = z.object({
  params: z.object({
    reportId: z.string().uuid("Invalid report ID"),
  }),
  body: z.object({
    resolutionNote: z.string().trim().max(1000).optional(),
  }),
  query: z.object({}).optional(),
});

const reviewIdParamSchema = z.object({
  params: z.object({
    reviewId: z.string().uuid("Invalid review ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const categoryIdParamSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid("Invalid category ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
    slug: z.string().trim().min(2, "Slug must be at least 2 characters").max(100),
    icon: z.string().trim().max(50).optional(),
    module: z.enum(categoryModules),
    parentId: z.string().uuid("Invalid parent ID").nullable().optional(),
    sortOrder: z.coerce.number().int().min(0).default(0),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateCategorySchema = z.object({
  params: z.object({
    categoryId: z.string().uuid("Invalid category ID"),
  }),
  body: z
    .object({
      name: z.string().trim().min(2).max(100).optional(),
      slug: z.string().trim().min(2).max(100).optional(),
      icon: z.string().trim().max(50).nullable().optional(),
      module: z.enum(categoryModules).optional(),
      parentId: z.string().uuid("Invalid parent ID").nullable().optional(),
      sortOrder: z.coerce.number().int().min(0).optional(),
      isActive: booleanFromForm.optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),
  query: z.object({}).optional(),
});

const adjustPointsSchema = z.object({
  params: z.object({
    userId: z.string().uuid("Invalid user ID"),
  }),
  body: z.object({
    points: z.coerce.number().int().refine((val) => val !== 0, {
      message: "Points must be a non-zero integer",
    }),
    description: z.string().trim().max(500).optional(),
  }),
  query: z.object({}).optional(),
});

const sendNotificationSchema = z.object({
  body: z.object({
    userId: z.string().uuid("Invalid user ID").optional(),
    type: z.string().trim().min(2).max(50),
    title: z.string().trim().min(2).max(100),
    message: z.string().trim().min(2).max(1000),
    entityType: z.string().trim().max(50).optional(),
    entityId: z.string().uuid("Invalid entity ID").optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const sendBulkNotificationSchema = z.object({
  body: z.object({
    userIds: z.array(z.string().uuid("Invalid user ID")).min(1, "At least one user ID is required"),
    type: z.string().trim().min(2).max(50),
    title: z.string().trim().min(2).max(100),
    message: z.string().trim().min(2).max(1000),
    entityType: z.string().trim().max(50).optional(),
    entityId: z.string().uuid("Invalid entity ID").optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getUsersSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),
    status: z.enum(userStatuses).optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
    sort: z.enum(["newest", "oldest", "name"]).default("newest"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const getReportsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),
    status: z.enum(reportStatuses).optional(),
    entityType: z.enum(reportEntityTypes).optional(),
    sort: z.enum(["newest", "oldest"]).default("newest"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const getReviewsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),
    rating: z.coerce.number().int().min(1).max(5).optional(),
    entityType: z.enum(reviewEntityTypes).optional(),
    sort: z.enum(["newest", "oldest", "rating_asc", "rating_desc"]).default("newest"),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const getCategoriesSchema = z.object({
  query: z.object({
    module: z.enum(categoryModules).optional(),
    search: z.string().trim().max(100).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const getPointsSchema = z.object({
  query: z.object({
    userId: z.string().uuid("Invalid user ID").optional(),
    transactionType: z.enum(transactionTypes).optional(),
    actionType: z.enum(actionTypes).optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const getBookingsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),
    status: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(20),
  }),
  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const bookingIdParamSchema = z.object({
  params: z.object({
    bookingId: z.string().uuid("Invalid booking ID"),
  }),
  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

module.exports = {
  userIdParamSchema,
  changeUserStatusSchema,
  serviceIdParamSchema,
  rentalIdParamSchema,
  productIdParamSchema,
  spaceIdParamSchema,
  jobIdParamSchema,
  rejectReasonSchema,
  reportIdParamSchema,
  reportActionSchema,
  reviewIdParamSchema,
  categoryIdParamSchema,
  createCategorySchema,
  updateCategorySchema,
  adjustPointsSchema,
  sendNotificationSchema,
  sendBulkNotificationSchema,
  getUsersSchema,
  getReportsSchema,
  getReviewsSchema,
  getCategoriesSchema,
  getPointsSchema,
  getBookingsSchema,
  bookingIdParamSchema,
};