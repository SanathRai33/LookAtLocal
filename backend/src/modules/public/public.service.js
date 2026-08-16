const prisma = require("../../config/prisma");

const getPublicStats = async () => {
  const [
    totalUsers,
    activeJobs,
    activeRentals,
    activeCategories,
    activeUserLocations,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        status: "ACTIVE",
        deletedAt: null,
      },
    }),

    prisma.jobListing.count({
      where: {
        status: "ACTIVE",
        deletedAt: null,
      },
    }),

    prisma.rentalListing.count({
      where: {
        status: "ACTIVE",
        deletedAt: null,
        isAvailable: true,
      },
    }),

    prisma.category.count({
      where: {
        isActive: true,
      },
    }),

    prisma.user.findMany({
      where: {
        status: "ACTIVE",
        deletedAt: null,
        city: {
          not: "",
        },
      },
      select: {
        city: true,
      },
      distinct: ["city"],
    }),
  ]);

  const locations = new Set(
    activeUserLocations
      .map((user) => user.city?.trim().toLowerCase())
      .filter(Boolean),
  );

  return {
    activeLocations: locations.size,
    activeListings: activeJobs + activeRentals,
    serviceCategories: activeCategories,
    totalUsers,
  };
};

const getLatestPublicListings = async (userId) => {
  let city = null;
  let postalCode = null;

  if (userId) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
        status: "ACTIVE",
        deletedAt: null,
      },
      select: {
        city: true,
        postalCode: true,
      },
    });

    if (user) {
      city = user.city?.trim().toLowerCase() || null;
      postalCode = user.postalCode?.trim() || null;
    }
  }

  const [services, rentals, products, spaces, jobs] = await Promise.all([
    prisma.serviceListing.findMany({
      where: {
        status: "ACTIVE",
        isAvailable: true,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
        state: true,
        postalCode: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    }),

    prisma.rentalListing.findMany({
      where: {
        status: "ACTIVE",
        isAvailable: true,
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        pricePerDay: true,
        city: true,
        state: true,
        postalCode: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    }),

    prisma.productListing.findMany({
      where: {
        status: {
          in: ["ACTIVE", "RESERVED"],
        },
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        price: true,
        city: true,
        state: true,
        postalCode: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    }),

    prisma.spaceListing.findMany({
      where: {
        status: "ACTIVE",
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        postalCode: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    }),

    prisma.jobListing.findMany({
      where: {
        status: "ACTIVE",
        deletedAt: null,
      },
      select: {
        id: true,
        title: true,
        city: true,
        state: true,
        postalCode: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    }),
  ]);

  const listings = [
    ...services.map((item) => ({
      id: item.id,
      type: "SERVICE",
      category: "Service",
      title: item.title,
      price: item.price,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      location: [item.city, item.state].filter(Boolean).join(", "),
      createdAt: item.createdAt,
    })),

    ...rentals.map((item) => ({
      id: item.id,
      type: "RENTAL",
      category: "Rental",
      title: item.title,
      price: item.pricePerDay,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      location: [item.city, item.state].filter(Boolean).join(", "),
      createdAt: item.createdAt,
    })),

    ...products.map((item) => ({
      id: item.id,
      type: "PRODUCT",
      category: "Buy & Sell",
      title: item.title,
      price: item.price,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      location: [item.city, item.state].filter(Boolean).join(", "),
      createdAt: item.createdAt,
    })),

    ...spaces.map((item) => ({
      id: item.id,
      type: "SPACE",
      category: "Space",
      title: item.title,
      price: null,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      location: [item.city, item.state].filter(Boolean).join(", "),
      createdAt: item.createdAt,
    })),

    ...jobs.map((item) => ({
      id: item.id,
      type: "JOB",
      category: "Job",
      title: item.title,
      price: null,
      city: item.city,
      state: item.state,
      postalCode: item.postalCode,
      location: [item.city, item.state].filter(Boolean).join(", "),
      createdAt: item.createdAt,
    })),
  ];

  const listingImageTypes = ["SERVICE", "RENTAL", "PRODUCT", "SPACE"];

  const imageListings = listings.filter((listing) =>
    listingImageTypes.includes(listing.type),
  );

  const imageMap = new Map();

  if (imageListings.length > 0) {
    const images = await prisma.listingImage.findMany({
      where: {
        entityType: {
          in: listingImageTypes,
        },
        entityId: {
          in: imageListings.map((listing) => listing.id),
        },
      },
      select: {
        entityType: true,
        entityId: true,
        imageUrl: true,
        sortOrder: true,
      },
      orderBy: {
        sortOrder: "asc",
      },
    });

    for (const image of images) {
      const key = `${image.entityType}:${image.entityId}`;

      if (!imageMap.has(key)) {
        imageMap.set(key, image.imageUrl);
      }
    }
  }

  const getLocationPriority = (listing) => {
    const listingCity = listing.city?.trim().toLowerCase();
    const listingPostalCode = listing.postalCode?.trim();

    if (postalCode && listingPostalCode && listingPostalCode === postalCode) {
      return 1;
    }

    if (city && listingCity && listingCity === city) {
      return 2;
    }

    return 3;
  };

  listings.sort((a, b) => {
    const priorityDifference = getLocationPriority(a) - getLocationPriority(b);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return listings.slice(0, 8).map((listing) => {
    const {
      city: _city,
      state: _state,
      postalCode: _postalCode,
      ...publicListing
    } = listing;

    return {
      ...publicListing,
      imageUrl:
        listing.type === "JOB"
          ? null
          : imageMap.get(`${listing.type}:${listing.id}`) || null,
    };
  });
};

module.exports = {
  getPublicStats,
  getLatestPublicListings,
};
