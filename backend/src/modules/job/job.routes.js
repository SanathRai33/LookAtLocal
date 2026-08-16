const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const {
  createJobSchema,
  updateJobSchema,
  jobIdParamSchema,
  getJobsSchema,
} = require("./job.validation");

const {
  createJob,
  getJobs,
  getMyJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("./job.controller");

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createJobSchema), createJob);

router.get("/", validate(getJobsSchema), getJobs);

router.get("/my-listings", validate(getJobsSchema), getMyJobs);

router.get("/:jobId", validate(jobIdParamSchema), getJobById);

router.patch("/:jobId", validate(updateJobSchema), updateJob);

router.delete("/:jobId", validate(jobIdParamSchema), deleteJob);

module.exports = router;