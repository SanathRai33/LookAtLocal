const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const categorySelect = {
  id: true,
  name: true,
  slug: true,
  icon: true,
  module: true,
  parentId: true,
  sortOrder: true,
};

const getCategories = async ({ module, search }) => {
  const where = {
    isActive: true,
  };

  if (module) {
    where.module = module;
  }

  if (search) {
    where.name = {
      contains: search,
      mode: "insensitive",
    };
  }

  const categories = await prisma.category.findMany({
    where,

    select: categorySelect,

    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        name: "asc",
      },
    ],
  });

  return categories;
};

const getCategoryById = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      isActive: true,
    },

    select: categorySelect,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

module.exports = {
  getCategories,
  getCategoryById,
};
