const { z } = require("zod");

const CATEGORY_MODULES = ["SERVICE", "RENTAL", "PRODUCT", "SPACE", "JOB"];

const getCategoriesSchema = z.object({
  query: z.object({
    module: z.enum(CATEGORY_MODULES).optional(),

    search: z
      .string()
      .trim()
      .max(100, "Search cannot exceed 100 characters")
      .optional(),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

const categoryIdParamSchema = z.object({
  params: z.object({
    categoryId: z.string().uuid("Invalid category ID"),
  }),

  query: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  CATEGORY_MODULES,
  getCategoriesSchema,
  categoryIdParamSchema,
};
