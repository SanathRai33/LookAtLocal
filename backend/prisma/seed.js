const prisma = require("../src/config/prisma");

// initial categories
const categories = [
  // SERVICES
  {
    name: "Electrician",
    slug: "electrician",
    module: "SERVICE",
    icon: "zap",
    sortOrder: 1,
  },
  {
    name: "Plumber",
    slug: "plumber",
    module: "SERVICE",
    icon: "wrench",
    sortOrder: 2,
  },
  {
    name: "Carpenter",
    slug: "carpenter",
    module: "SERVICE",
    icon: "hammer",
    sortOrder: 3,
  },
  {
    name: "Cleaning",
    slug: "cleaning",
    module: "SERVICE",
    icon: "sparkles",
    sortOrder: 4,
  },
  {
    name: "Gardening",
    slug: "gardening",
    module: "SERVICE",
    icon: "leaf",
    sortOrder: 5,
  },
  {
    name: "Appliance Repair",
    slug: "appliance-repair",
    module: "SERVICE",
    icon: "settings",
    sortOrder: 6,
  },

  // RENTALS
  {
    name: "Tools",
    slug: "rental-tools",
    module: "RENTAL",
    icon: "wrench",
    sortOrder: 1,
  },
  {
    name: "Machinery",
    slug: "rental-machinery",
    module: "RENTAL",
    icon: "cog",
    sortOrder: 2,
  },
  {
    name: "Vehicles",
    slug: "rental-vehicles",
    module: "RENTAL",
    icon: "car",
    sortOrder: 3,
  },
  {
    name: "Electronics",
    slug: "rental-electronics",
    module: "RENTAL",
    icon: "monitor",
    sortOrder: 4,
  },
  {
    name: "Event Equipment",
    slug: "event-equipment",
    module: "RENTAL",
    icon: "party-popper",
    sortOrder: 5,
  },

  // BUY & SELL
  {
    name: "Electronics",
    slug: "marketplace-electronics",
    module: "PRODUCT",
    icon: "monitor",
    sortOrder: 1,
  },
  {
    name: "Furniture",
    slug: "marketplace-furniture",
    module: "PRODUCT",
    icon: "armchair",
    sortOrder: 2,
  },
  {
    name: "Appliances",
    slug: "marketplace-appliances",
    module: "PRODUCT",
    icon: "washing-machine",
    sortOrder: 3,
  },
  {
    name: "Vehicles",
    slug: "marketplace-vehicles",
    module: "PRODUCT",
    icon: "car",
    sortOrder: 4,
  },
  {
    name: "Other",
    slug: "marketplace-other",
    module: "PRODUCT",
    icon: "package",
    sortOrder: 99,
  },

  // SPACES
  {
    name: "Shop",
    slug: "shop",
    module: "SPACE",
    icon: "store",
    sortOrder: 1,
  },
  {
    name: "Office",
    slug: "office",
    module: "SPACE",
    icon: "building",
    sortOrder: 2,
  },
  {
    name: "Warehouse",
    slug: "warehouse",
    module: "SPACE",
    icon: "warehouse",
    sortOrder: 3,
  },

  // JOBS
  {
    name: "Skilled Work",
    slug: "skilled-work",
    module: "JOB",
    icon: "briefcase-business",
    sortOrder: 1,
  },
  {
    name: "Delivery",
    slug: "delivery",
    module: "JOB",
    icon: "bike",
    sortOrder: 2,
  },
  {
    name: "Sales",
    slug: "sales",
    module: "JOB",
    icon: "badge-indian-rupee",
    sortOrder: 3,
  },
  {
    name: "Office Work",
    slug: "office-work",
    module: "JOB",
    icon: "briefcase",
    sortOrder: 4,
  },
  {
    name: "Part Time",
    slug: "part-time",
    module: "JOB",
    icon: "clock",
    sortOrder: 5,
  },
];

// inserts/updates categories
const main = async () => {
  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        module_slug: {
          module: category.module,
          slug: category.slug,
        },
      },

      update: {
        name: category.name,
        icon: category.icon,
        sortOrder: category.sortOrder,
        isActive: true,
      },

      create: {
        ...category,
        isActive: true,
      },
    });
  }

  console.log(`${categories.length} categories seeded successfully`);
};

main()
  .catch((error) => {
    console.error("Category seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });