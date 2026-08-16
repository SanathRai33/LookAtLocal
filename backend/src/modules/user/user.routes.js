const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require("../../middlewares/upload.middleware");

const { updateProfileSchema, userIdParamSchema } = require("./user.validation");

const {
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
  updateAvatar,
  deleteMyAccount,
} = require("./user.controller");

const router = express.Router();

router.get("/me", authenticate, getMyProfile);
router.patch("/me", authenticate, validate(updateProfileSchema), updateMyProfile);
router.patch("/me/avatar", authenticate, upload.single("profileImage"), updateAvatar);
router.delete("/me", authenticate, deleteMyAccount);
router.get("/:userId", validate(userIdParamSchema), getPublicProfile);

module.exports = router;
