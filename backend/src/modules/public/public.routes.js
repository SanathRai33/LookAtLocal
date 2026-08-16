const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const { getPublicStats, getLatestPublicListings } = require("./public.controller");

const router = express.Router();

router.get("/stats", getPublicStats);
router.get("/latest", getLatestPublicListings);

module.exports = router;