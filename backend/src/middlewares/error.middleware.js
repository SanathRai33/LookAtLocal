const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
  let error = err;

  if (error.code === "P2002") {
    const fields = Array.isArray(error.meta?.target)
      ? error.meta.target.join(", ")
      : "field";

    error = new AppError(`A record with this ${fields} already exists`, 409);
  }

  if (error.code === "P2025") {
    error = new AppError("Requested resource was not found", 404);
  }

  if (error.code === "P2003") {
    error = new AppError("Invalid related resource", 400);
  }

  if (error.name === "JsonWebTokenError") {
    error = new AppError("Invalid authentication token", 401);
  }

  if (error.name === "TokenExpiredError") {
    error = new AppError("Authentication token has expired", 401);
  }

  if (error.name === "ZodError") {
    const errors = error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    error = new AppError("Validation failed", 422, errors);
  }

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    error = new AppError("Invalid JSON payload", 400);
  }

  const statusCode = error.statusCode || 500;

  const isProduction = process.env.NODE_ENV === "production";

  const response = {
    success: false,
    message:
      statusCode === 500 && !error.isOperational
        ? "Internal server error"
        : error.message || "Internal server error",
  };

  if (error.errors) {
    response.errors = error.errors;
  }

  if (!isProduction) {
    response.stack = error.stack;
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  return res.status(statusCode).json(response);
};

module.exports = errorHandler;