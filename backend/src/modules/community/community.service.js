const prisma = require("../../config/prisma");
const AppError = require("../../utils/AppError");

const { getPagination, getPaginationMeta } = require("../../utils/pagination");

const postSelect = {
  id: true,
  authorId: true,

  postType: true,

  title: true,
  description: true,

  startsAt: true,
  endsAt: true,

  locationName: true,
  address: true,
  latitude: true,
  longitude: true,

  isPinned: true,

  status: true,
  expiresAt: true,

  createdAt: true,
  updatedAt: true,

  author: {
    select: {
      id: true,
      fullName: true,
      profileImageUrl: true,
      city: true,
      state: true,
    },
  },

  confirmations: {
    select: {
      id: true,
      userId: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          fullName: true,
          profileImageUrl: true,
        },
      },
    },
  },
};

const createCommunityPost = async ({ userId, data }) => {
  const user = await prisma.user.findUnique({
    where: { id: userId, deletedAt: null },
    select: {
      addressLine: true,
      locality: true,
      city: true,
      state: true,
      postalCode: true,
      latitude: true,
      longitude: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const startsAt = data.startsAt ? new Date(data.startsAt) : new Date();
  const endsAt = data.endsAt ? new Date(data.endsAt) : null;

  let expiresAt = null;
  if (endsAt) {
    const sevenDaysAfterEnd = new Date(endsAt);
    sevenDaysAfterEnd.setDate(sevenDaysAfterEnd.getDate() + 7);
    expiresAt = sevenDaysAfterEnd;
  }

  const post = await prisma.communityPost.create({
    data: {
      authorId: userId,

      postType: data.postType,

      title: data.title,
      description: data.description,

      startsAt: startsAt,
      endsAt: endsAt,

      locationName: data.locationName,
      address: user.addressLine,
      latitude: user.latitude,
      longitude: user.longitude,

      isPinned: data.isPinned || false,

      status: "ACTIVE",
      expiresAt: expiresAt,
    },

    select: postSelect,
  });

  return post;
};

const getCommunityPosts = async (userId, filters) => {
  const {
    search,
    postType,
    isMine,
    showClosed,
    sort,
    page,
    limit,
  } = filters;

  const pagination = getPagination(page, limit);

  const where = {
    deletedAt: null,
  };

  if (isMine === "true") {
    where.authorId = userId;
  }

  if (showClosed === "false" || showClosed === undefined) {
    where.status = {
      not: "CLOSED",
    };
  }

  if (postType) {
    where.postType = postType;
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

  let orderBy;
  switch (sort) {
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "most_liked":
      orderBy = [
        {
          confirmations: {
            _count: "desc",
          },
        },
        { createdAt: "desc" },
      ];
      break;
    case "least_liked":
      orderBy = [
        {
          confirmations: {
            _count: "asc",
          },
        },
        { createdAt: "desc" },
      ];
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
  }

  const [posts, total] = await prisma.$transaction([
    prisma.communityPost.findMany({
      where,
      select: {
        ...postSelect,
        _count: {
          select: {
            confirmations: true,
          },
        },
      },
      orderBy,
      skip: pagination.skip,
      take: pagination.limit,
    }),
    prisma.communityPost.count({ where }),
  ]);

  const postsWithCount = posts.map((post) => ({
    ...post,
    likeCount: post._count.confirmations,
  }));

  return {
    posts: postsWithCount,
    pagination: getPaginationMeta({
      page: pagination.page,
      limit: pagination.limit,
      total,
    }),
  };
};

const getCommunityPostById = async (postId, userId) => {
  const post = await prisma.communityPost.findFirst({
    where: {
      id: postId,
      deletedAt: null,
    },
    select: {
      ...postSelect,
      _count: {
        select: {
          confirmations: true,
        },
      },
    },
  });

  if (!post) {
    throw new AppError("Community post not found", 404);
  }

  return {
    ...post,
    likeCount: post._count.confirmations,
  };
};

const updateCommunityPost = async (postId, userId, data) => {
  const existingPost = await prisma.communityPost.findFirst({
    where: {
      id: postId,
      authorId: userId,
      deletedAt: null,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!existingPost) {
    throw new AppError(
      "Community post not found or you do not have permission to update it",
      404,
    );
  }

  if (existingPost.status === "CLOSED") {
    throw new AppError("Cannot update a closed post", 400);
  }

  const updateData = { ...data };

  if (data.endsAt) {
    const endsAt = new Date(data.endsAt);
    const sevenDaysAfterEnd = new Date(endsAt);
    sevenDaysAfterEnd.setDate(sevenDaysAfterEnd.getDate() + 7);
    updateData.expiresAt = sevenDaysAfterEnd;
  }

  const post = await prisma.communityPost.update({
    where: {
      id: postId,
    },
    data: updateData,
    select: {
      ...postSelect,
      _count: {
        select: {
          confirmations: true,
        },
      },
    },
  });

  return {
    ...post,
    likeCount: post._count.confirmations,
  };
};

const deleteCommunityPost = async (postId, userId) => {
  const post = await prisma.communityPost.findFirst({
    where: {
      id: postId,
      authorId: userId,
      deletedAt: null,
    },
    select: {
      id: true,
    },
  });

  if (!post) {
    throw new AppError(
      "Community post not found or you do not have permission to delete it",
      404,
    );
  }

  await prisma.communityPost.update({
    where: {
      id: postId,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return;
};

module.exports = {
  createCommunityPost,
  getCommunityPosts,
  getCommunityPostById,
  updateCommunityPost,
  deleteCommunityPost,
};