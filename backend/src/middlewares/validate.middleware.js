const AppError = require("../utils/AppError");

const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return next(new AppError("Validation failed", 422, errors));
    }

    if (result.data.body !== undefined) {
      req.body = result.data.body;
    }

    if (result.data.params !== undefined) {
      req.validatedParams = result.data.params;
    }

    if (result.data.query !== undefined) {
      req.validatedQuery = result.data.query;
    }

    next();
  };
};

module.exports = validate;