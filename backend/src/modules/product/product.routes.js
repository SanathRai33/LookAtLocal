const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require("../../middlewares/upload.middleware");

const {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
  getProductsSchema,
} = require("./product.validation");

const {
  createProduct,
  getProducts,
  getMyProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./product.controller");

const router = express.Router();

router.use(authenticate);

router.post(
  "/",
  upload.array("images", 5),
  validate(createProductSchema),
  createProduct,
);

router.get("/", validate(getProductsSchema), getProducts);

router.get("/my-listings", validate(getProductsSchema), getMyProducts);

router.get("/:productId", validate(productIdParamSchema), getProductById);

router.patch("/:productId", validate(updateProductSchema), updateProduct);

router.delete("/:productId", validate(productIdParamSchema), deleteProduct);

module.exports = router;
