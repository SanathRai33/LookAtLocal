const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const { getPublicStats, getLatestPublicListings } = require("./public.controller");

const router = express.Router();

router.get("/stats", getPublicStats);
router.get("/latest", authenticate, getLatestPublicListings);

module.exports = router;