const { z } = require("zod");

const postTypes = ["EVENT", "ANNOUNCEMENT", "LOST_FOUND", "ALERT", "GENERAL"];
const postStatuses = ["PENDING", "ACTIVE", "REJECTED", "CLOSED"];

const createCommunityPostSchema = z.object({
  body: z.object({
    postType: z.enum(postTypes),

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

    startsAt: z.coerce.date().optional(),

    endsAt: z.coerce.date().optional(),

    locationName: z.string().trim().max(100).optional(),

    isPinned: z.coerce.boolean().default(false),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const updateCommunityPostSchema = z.object({
  body: z
    .object({
      postType: z.enum(postTypes).optional(),

      title: z.string().trim().min(3).max(150).optional(),

      description: z.string().trim().min(10).max(3000).optional(),

      startsAt: z.coerce.date().optional(),

      endsAt: z.coerce.date().optional(),

      locationName: z.string().trim().max(100).optional(),

      isPinned: z.coerce.boolean().optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
      message: "At least one field must be provided",
    }),

  params: z.object({
    postId: z.string().uuid("Invalid post ID"),
  }),

  query: z.object({}).optional(),
});

const communityPostIdParamSchema = z.object({
  params: z.object({
    postId: z.string().uuid("Invalid post ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getCommunityPostsSchema = z.object({
  query: z.object({
    search: z.string().trim().max(100).optional(),

    postType: z.enum(postTypes).optional(),

    isMine: z.enum(["true", "false"]).default("false"),

    showClosed: z.enum(["true", "false"]).default("false"),

    sort: z
      .enum(["newest", "oldest", "most_liked", "least_liked"])
      .default("newest"),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  params: z.object({}).optional(),
  body: z.object({}).optional(),
});

module.exports = {
  createCommunityPostSchema,
  updateCommunityPostSchema,
  communityPostIdParamSchema,
  getCommunityPostsSchema,
};
