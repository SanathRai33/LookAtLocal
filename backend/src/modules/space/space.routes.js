const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require("../../middlewares/upload.middleware");

const {
  createSpaceSchema,
  updateSpaceSchema,
  spaceIdParamSchema,
  getSpacesSchema,
} = require("./space.validation");

const {
  createSpace,
  getSpaces,
  getMySpaces,
  getSpaceById,
  updateSpace,
  deleteSpace,
} = require("./space.controller");

const spaceUnitRoutes = require("./space-unit.routes");

const router = express.Router();

router.use(authenticate);

router.post("/", upload.array("images", 5), validate(createSpaceSchema), createSpace);
router.get("/", validate(getSpacesSchema), getSpaces);
router.get("/my-listings", validate(getSpacesSchema), getMySpaces);
router.get("/:spaceId", validate(spaceIdParamSchema), getSpaceById);
router.patch("/:spaceId", validate(updateSpaceSchema), updateSpace);
router.delete("/:spaceId", validate(spaceIdParamSchema), deleteSpace);

router.use("/:spaceId/units", spaceUnitRoutes);

module.exports = router;