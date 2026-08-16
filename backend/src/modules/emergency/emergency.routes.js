const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createEmergencySchema,
  updateEmergencySchema,
  emergencyIdParamSchema,
  getEmergenciesSchema,
} = require("./emergency.validation");

const {
  createEmergencyRequest,
  getEmergencyRequests,
  getMyEmergencyRequests,
  getEmergencyRequestById,
  updateEmergencyRequest,
  deleteEmergencyRequest,
  resolveEmergencyRequest,
} = require("./emergency.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createEmergencySchema), createEmergencyRequest);
router.get("/", validate(getEmergenciesSchema), getEmergencyRequests);
router.get("/my-requests", validate(getEmergenciesSchema), getMyEmergencyRequests);
router.get("/:emergencyId", validate(emergencyIdParamSchema), getEmergencyRequestById);
router.patch("/:emergencyId", validate(updateEmergencySchema), updateEmergencyRequest);
router.delete("/:emergencyId", validate(emergencyIdParamSchema), deleteEmergencyRequest);
router.post("/:emergencyId/resolve", validate(emergencyIdParamSchema), resolveEmergencyRequest);

module.exports = router;