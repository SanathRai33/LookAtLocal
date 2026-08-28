const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createJobApplicationSchema,
  applicationIdParamSchema,
  getApplicationsSchema,
} = require("./job-application.validation");

const {
  createApplication,
  getMyApplications,
  getReceivedApplications,
  getApplicationById,
  reviewApplication,
  shortlistApplication,
  acceptApplication,
  rejectApplication,
  withdrawApplication,
} = require("./job-application.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createJobApplicationSchema), createApplication);

router.get(
  "/my-applications",
  validate(getApplicationsSchema),
  getMyApplications,
);

router.get(
  "/received",
  validate(getApplicationsSchema),
  getReceivedApplications,
);

router.get(
  "/:applicationId",
  validate(applicationIdParamSchema),
  getApplicationById,
);

router.patch(
  "/:applicationId/review",
  validate(applicationIdParamSchema),
  reviewApplication,
);

router.patch(
  "/:applicationId/shortlist",
  validate(applicationIdParamSchema),
  shortlistApplication,
);

router.patch(
  "/:applicationId/accept",
  validate(applicationIdParamSchema),
  acceptApplication,
);

router.patch(
  "/:applicationId/reject",
  validate(applicationIdParamSchema),
  rejectApplication,
);

router.patch(
  "/:applicationId/withdraw",
  validate(applicationIdParamSchema),
  withdrawApplication,
);

module.exports = router;
