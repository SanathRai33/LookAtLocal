const prisma = require("../../config/prisma");
const AppError = require("../../utils/appError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const { uploadImages, deleteImages } = require("../../services/upload.service");


const productSelect = {
  id: true,
  sellerId: true,
  categoryId: true,

  title: true,
  description: true,

  price: true,
  isNegotiable: true,

  condition: true,
  deliveryOption: true,

  addressLine: true,
  locality: true,
  city: true,
  state: true,
  postalCode: true,

  latitude: true,
  longitude: true,

  status: true,
  soldAt: true,

  createdAt: true,
  updatedAt: true,

  seller: {
    select: {
      id: true,
      fullName: true,
      phone: true,
      email: true,
      profileImageUrl: true,
      isPhoneVerified: true,
      isEmailVerified: true,
      createdAt: true,
    },
  },

  category: {
    select: {
      id: true,
      name: true,
      slug: true,
      icon: true,
    },
  },
};

const getSellerOtherProducts = async (sellerId, currentProductId, userId) => {
  const products = await prisma.productListing.findMany({
    where: {
      sellerId,
      id: { not: currentProductId },
      status: { in: ["ACTIVE", "RESERVED"] },
      deletedAt: null,
    },
    select: productSelect,
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return enrichProducts(products, userId);
};

const validateProductCategory = async (categoryId) => {
  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      module: "PRODUCT",
      isActive: true,
    },

    select: {
      id: true,
    },
  });

  if (!category) {
    throw new AppError("Invalid or inactive product category", 400);
  }

  return category;
};

const getProductImages = async (productIds) => {
  if (!productIds.length) {
    return new Map();
  }

  const images = await prisma.listingImage.findMany({
    where: {
      entityType: "PRODUCT",

      entityId: {
        in: productIds,
      },
    },

    orderBy: {
      sortOrder: "asc",
    },
  });

  const imageMap = new Map();

  for (const image of images) {
    if (!imageMap.has(image.entityId)) {
      imageMap.set(image.entityId, []);
    }

    imageMap.get(image.entityId).push(image);
  }

  return imageMap;
};

const getFavoriteProductIds = async (userId, productIds) => {
  if (!userId || !productIds.length) {
    return new Set();
  }

  const favorites = await prisma.favorite.findMany({
    where: {
      userId,

      entityType: "PRODUCT",

      entityId: {
        in: productIds,
      },
    },

    select: {
      entityId: true,
    },
  });

  return new Set(favorites.map((favorite) => favorite.entityId));
};

const enrichProducts = async (products, userId) => {
  if (!products.length) {
    return [];
  }

  const productIds = products.map((product) => product.id);

  const [imageMap, favoriteProductIds] = await Promise.all([
    getProductImages(productIds),

    getFavoriteProductIds(userId, productIds),
  ]);

  return products.map((product) => {
    return {
      ...product,

      images: imageMap.get(product.id) || [],

      isFavorite: favoriteProductIds.has(product.id),
    };
  });
};

const createProduct = async ({ userId, data, files = [] }) => {
  await validateProductCategory(data.categoryId);

  let uploadedImages = [];

  try {
    if (files.length > 0) {
      uploadedImages = await uploadImages(files, "lookatlocal/products");
    }

    const product = await prisma.$transaction(async (tx) => {
      const createdProduct = await tx.productListing.create({
        data: {
          sellerId: userId,

          categoryId: data.categoryId,

          title: data.title,

          description: data.description,

          price: data.price,

          isNegotiable: data.isNegotiable ?? false,

          condition: data.condition,

          deliveryOption: data.deliveryOption,

          addressLine: data.addressLine,

          locality: data.locality,

          city: data.city,

          state: data.state,

          postalCode: data.postalCode,

          latitude: data.latitude,

          longitude: data.longitude,

          status: "PENDING",
        },

        select: productSelect,
      });

      if (uploadedImages.length > 0) {
        await tx.listingImage.createMany({
          data: uploadedImages.map((image, index) => ({
            entityType: "PRODUCT",

            entityId: createdProduct.id,

            imageUrl: image.url,

            publicId: image.publicId,

            sortOrder: index,
          })),
        });
      }

      return createdProduct;
    });

    const [result] = await enrichProducts([product], userId);

    return result;
  } catch (error) {
    if (uploadedImages.length > 0) {
      await deleteImages(uploadedImages.map((image) => image.publicId)).catch(
        () => {},
      );
    }

    throw error;
  }
};

const getProducts = async (userId, filters) => {
  const {
    search,
    categoryId,
    city,
    locality,
    postalCode,
    condition,
    deliveryOption,
    minPrice,
    maxPrice,
    isNegotiable,
    sort,
    page,
    limit,
  } = filters;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      city: true,
      locality: true,
      postalCode: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.city && !user.locality && !user.postalCode) {
    throw new AppError(
      "Please complete your profile location to find local products",
      400,
    );
  }

  const pagination = getPagination(page, limit);

  const where = {
    status: {
      in: ["ACTIVE", "RESERVED"],
    },
    deletedAt: null,
  };

  if (user.postalCode) {
    where.postalCode = user.postalCode;
  } else if (user.city) {
    where.city = {
      equals: user.city,
      mode: "insensitive",
    };
  }

  if (categoryId) {
    where.categoryId = categoryId;
  }

  if (condition) {
    where.condition = condition;
  }

  if (deliveryOption) {
    where.deliveryOption = deliveryOption;
  }

  if (typeof isNegotiable === "boolean") {
    where.isNegotiable = isNegotiable;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};

    if (minPrice !== undefined) {
      where.price.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      where.price.lte = maxPrice;
    }
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        category: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  let orderBy;

  switch (sort) {
    case "oldest":
      orderBy = {
        createdAt: "asc",
      };
      break;

    case "price_asc":
      orderBy = {
        price: "asc",
      };
      break;

    case "price_desc":
      orderBy = {
        price: "desc",
      };
      break;

    case "newest":
    default:
      orderBy = {
        createdAt: "desc",
      };
  }

  const [products, total] = await prisma.$transaction([
    prisma.productListing.findMany({
      where,

      select: productSelect,

      orderBy,

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.productListing.count({
      where,
    }),
  ]);

  const enrichedProducts = await enrichProducts(products, userId);

  return {
    products: enrichedProducts,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const getProductById = async (productId, userId) => {
  const product = await prisma.productListing.findFirst({
    where: {
      id: productId,

      deletedAt: null,

      OR: [
        {
          status: {
            in: ["ACTIVE", "RESERVED"],
          },
        },

        {
          sellerId: userId,
        },
      ],
    },

    select: productSelect,
  });

  if (!product) {
    throw new AppError("Product listing not found", 404);
  }

  const [result] = await enrichProducts([product], userId);
  const similarProducts = await getSellerOtherProducts(
    product.sellerId,
    product.id,
    userId,
  );

  return {
    ...result,
    similarProducts,
  };
};

const getMyProducts = async (userId, filters) => {
  const { search, status, page, limit } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    sellerId: userId,

    deletedAt: null,
  };

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];
  }

  const [products, total] = await prisma.$transaction([
    prisma.productListing.findMany({
      where,

      select: productSelect,

      orderBy: {
        createdAt: "desc",
      },

      skip: pagination.skip,

      take: pagination.limit,
    }),

    prisma.productListing.count({
      where,
    }),
  ]);

  const enrichedProducts = await enrichProducts(products, userId);

  return {
    products: enrichedProducts,

    pagination: getPaginationMeta({
      page: pagination.page,

      limit: pagination.limit,

      total,
    }),
  };
};

const updateProduct = async (productId, userId, data) => {
  const existingProduct = await prisma.productListing.findFirst({
    where: {
      id: productId,

      sellerId: userId,

      deletedAt: null,
    },

    select: {
      id: true,
      status: true,
    },
  });

  if (!existingProduct) {
    throw new AppError(
      "Product listing not found or you do not have permission to update it",
      404,
    );
  }

  if (data.categoryId) {
    await validateProductCategory(data.categoryId);
  }

  const updateData = {
    ...data,
  };

  const moderationFields = [
    "categoryId",
    "title",
    "description",
    "price",
    "condition",
    "deliveryOption",
    "addressLine",
    "locality",
    "city",
    "state",
    "postalCode",
  ];

  const requiresReview = moderationFields.some((field) =>
    Object.prototype.hasOwnProperty.call(data, field),
  );

  if (
    requiresReview &&
    ["ACTIVE", "RESERVED", "REJECTED"].includes(existingProduct.status)
  ) {
    updateData.status = "PENDING";
  }

  const product = await prisma.productListing.update({
    where: {
      id: productId,
    },

    data: updateData,

    select: productSelect,
  });

  const [result] = await enrichProducts([product], userId);

  return result;
};

const deleteProduct = async (productId, userId) => {
  const product = await prisma.productListing.findFirst({
    where: {
      id: productId,

      sellerId: userId,

      deletedAt: null,
    },

    include: {
      transactions: {
        where: {
          status: {
            in: ["REQUESTED", "ACCEPTED"],
          },
        },
      },
    },
  });

  if (!product) {
    throw new AppError(
      "Product listing not found or you do not have permission to delete it",
      404,
    );
  }

  if (product.transactions.length > 0) {
    throw new AppError(
      "Cannot delete a product listing with active transactions.",
      400,
    );
  }

  await prisma.$transaction(async (tx) => {
    const images = await tx.listingImage.findMany({
      where: {
        entityType: "PRODUCT",

        entityId: productId,
      },
    });

    if (images.length > 0) {
      await deleteImages(images.map((image) => image.publicId).filter(Boolean));

      await tx.listingImage.deleteMany({
        where: {
          entityType: "PRODUCT",

          entityId: productId,
        },
      });
    }

    await tx.productListing.update({
      where: {
        id: productId,
      },

      data: {
        deletedAt: new Date(),
        status: "CLOSED",
      },
    });
  });

  return;
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
};
