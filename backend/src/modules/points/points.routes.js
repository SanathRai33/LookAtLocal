const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");

const { getPointsHistorySchema } = require("./points.validation");

const { getPointsSummary, getPointsHistory } = require("./points.controller");

const router = express.Router();

router.use(authenticate);

router.get("/", getPointsSummary);
router.get("/history", validate(getPointsHistorySchema), getPointsHistory);

module.exports = router;
