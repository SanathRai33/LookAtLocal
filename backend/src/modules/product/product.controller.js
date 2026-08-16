const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/apiResponse");
const productService = require("./product.service");

const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct({
    userId: req.user.id,
    data: req.body,
    files: req.files || [],
  });

  return ApiResponse.success(
    res,
    201,
    "Product listing created successfully",
    product,
  );
});

const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.getProducts(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Products fetched successfully",
    result.products,
    result.pagination,
  );
});

const getMyProducts = asyncHandler(async (req, res) => {
  const result = await productService.getMyProducts(req.user.id, req.query);

  return ApiResponse.success(
    res,
    200,
    "Your product listings fetched successfully",
    result.products,
    result.pagination,
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(
    req.params.productId,
    req.user.id,
  );

  return ApiResponse.success(res, 200, "Product fetched successfully", product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(
    req.params.productId,
    req.user.id,
    req.body,
  );

  return ApiResponse.success(
    res,
    200,
    "Product listing updated successfully",
    product,
  );
});

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.productId, req.user.id);

  return ApiResponse.success(res, 200, "Product listing deleted successfully");
});

module.exports = {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
