const express = require("express");

const validate = require("../../middlewares/validate.middleware");

const {
  getCategoriesSchema,
  categoryIdParamSchema,
} = require("./category.validation");

const { getCategories, getCategoryById } = require("./category.controller");

const router = express.Router();

router.get("/", validate(getCategoriesSchema), getCategories);

router.get("/:categoryId", validate(categoryIdParamSchema), getCategoryById);

module.exports = router;
