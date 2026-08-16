const express = require("express");

const validate = require("../../middlewares/validate.middleware");

const {
  createSpaceUnitSchema,
  updateSpaceUnitSchema,
  spaceUnitIdParamSchema,
  getSpaceUnitsSchema,
} = require("./space-unit.validation");

const {
  createSpaceUnit,
  getSpaceUnits,
  getSpaceUnitById,
  updateSpaceUnit,
  deleteSpaceUnit,
} = require("./space-unit.controller");

const router = express.Router({ mergeParams: true });

router.post("/", validate(createSpaceUnitSchema), createSpaceUnit);
router.get("/", validate(getSpaceUnitsSchema), getSpaceUnits);
router.get("/:unitId", validate(spaceUnitIdParamSchema), getSpaceUnitById);
router.patch("/:unitId", validate(updateSpaceUnitSchema), updateSpaceUnit);
router.delete("/:unitId", validate(spaceUnitIdParamSchema), deleteSpaceUnit);

module.exports = router;