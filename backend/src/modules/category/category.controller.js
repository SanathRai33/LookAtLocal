const asyncHandler = require("../../utils/asyncHandler");

const ApiResponse = require("../../utils/ApiResponse");

const categoryService = require("./category.service");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getCategories(req.query);

  return ApiResponse.success(
    res,
    200,
    "Categories fetched successfully",
    categories,
  );
});

const getCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);

  return ApiResponse.success(
    res,
    200,
    "Category fetched successfully",
    category,
  );
});

module.exports = {
  getCategories,
  getCategoryById,
};
