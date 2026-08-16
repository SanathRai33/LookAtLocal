const { z } = require("zod");

const favoriteEntityTypes = [
  "SERVICE",
  "RENTAL",
  "PRODUCT",
  "SPACE",
  "JOB",
  "COMMUNITY",
];

const addFavoriteSchema = z.object({
  body: z.object({
    entityType: z.enum(favoriteEntityTypes),

    entityId: z.string().uuid("Invalid entity ID"),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

const removeFavoriteSchema = z.object({
  params: z.object({
    entityType: z.enum(favoriteEntityTypes),

    entityId: z.string().uuid("Invalid entity ID"),
  }),

  body: z.object({}).optional(),
  query: z.object({}).optional(),
});

const getFavoritesSchema = z.object({
  query: z.object({
    entityType: z.enum(favoriteEntityTypes).optional(),

    page: z.coerce.number().int().positive().default(1),

    limit: z.coerce.number().int().positive().max(100).default(20),
  }),

  body: z.object({}).optional(),
  params: z.object({}).optional(),
});

module.exports = {
  addFavoriteSchema,
  removeFavoriteSchema,
  getFavoritesSchema,
};
