const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require("../../middlewares/upload.middleware");

const {
  createServiceSchema,
  updateServiceSchema,
  serviceIdParamSchema,
  getServicesSchema,
} = require("./service.validation");

const {
  createService,
  getServices,
  getMyServices,
  getServiceById,
  updateService,
  deleteService,
} = require("./service.controller");

const router = express.Router();

// Everything below requires authentication
router.use(authenticate);

router.post("/", upload.array("images", 5), validate(createServiceSchema), createService);

router.get("/", validate(getServicesSchema), getServices);

router.get("/my-listings", validate(getServicesSchema), getMyServices);

router.get("/:serviceId", validate(serviceIdParamSchema), getServiceById);

router.patch("/:serviceId", validate(updateServiceSchema), updateService);

router.delete("/:serviceId", validate(serviceIdParamSchema), deleteService);

module.exports = router;
