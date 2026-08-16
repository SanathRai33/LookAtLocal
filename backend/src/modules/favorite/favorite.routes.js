const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");

const validate = require("../../middlewares/validate.middleware");

const {
  addFavoriteSchema,
  removeFavoriteSchema,
  getFavoritesSchema,
} = require("./favorite.validation");

const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("./favorite.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(addFavoriteSchema), addFavorite);
router.get("/", validate(getFavoritesSchema), getFavorites);
router.delete("/:entityType/:entityId", validate(removeFavoriteSchema), removeFavorite);

module.exports = router;
