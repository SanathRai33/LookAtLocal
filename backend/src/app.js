const env = require("./config/env");

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const publicRoutes = require("./modules/public/public.routes");
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/user/user.routes");
const categoryRoutes = require("./modules/category/category.routes");
const serviceRoutes = require("./modules/service/service.routes");
const serviceBookingRoutes = require("./modules/service-booking/service-booking.routes");
const favoriteRoutes = require("./modules/favorite/favorite.routes");
const reviewRoutes = require("./modules/review/review.routes");
const pointsRoutes = require("./modules/points/points.routes");
const notificationRoutes = require("./modules/notification/notification.routes");
const rentalRoutes = require("./modules/rental/rental.routes");
const productRoutes = require("./modules/product/product.routes");
const spaceRoutes = require("./modules/space/space.routes");
const jobRoutes = require("./modules/job/job.routes");
const emergencyRoutes = require("./modules/emergency/emergency.routes");
const adminRoutes = require("./modules/admin/admin.routes");
const communityRoutes = require("./modules/community/community.routes");

const ApiResponse = require("./utils/ApiResponse");
const notFoundHandler = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/error.middleware");
const { apiLimiter } = require("./middlewares/rateLimit.middleware");

const app = express();

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: env.clientUrl || "http://localhost:5173",
    credentials: true,
  }),
);

// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  }),
);

app.use(cookieParser());

// Logger
if (env.nodeEnv === "development") {
  app.use(morgan("dev"));
}

// Health check
app.get("/api/v1/health", (req, res) => {
  return ApiResponse.success(res, 200, "LookAtLocal API is running");
});

app.use("/api/v1", apiLimiter);

// API routes
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/service-bookings", serviceBookingRoutes);
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/spaces", spaceRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/community", communityRoutes);
app.use("/api/v1/emergency", emergencyRoutes);
app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/points", pointsRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/admin", adminRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
