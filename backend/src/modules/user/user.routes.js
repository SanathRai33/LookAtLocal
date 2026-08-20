const express = require("express");

const authenticate = require("../../middlewares/auth.middleware");
const validate = require("../../middlewares/validate.middleware");
const upload = require("../../middlewares/upload.middleware");

const { updateProfileSchema, userIdParamSchema, updateAccountStatusSchema } = require("./user.validation");

const {
  getMyProfile,
  updateMyProfile,
  getPublicProfile,
  updateAvatar,
  updateMyAccountStatus,
  deleteMyAccount,
} = require("./user.controller");

const router = express.Router();

router.get("/me", authenticate, getMyProfile);
router.get("/:userId", validate(userIdParamSchema), getPublicProfile);
router.patch("/me", authenticate, validate(updateProfileSchema), updateMyProfile);
router.patch("/me/avatar", authenticate, upload.single("profileImage"), updateAvatar);
router.patch("/me/status", authenticate, validate(updateAccountStatusSchema), updateMyAccountStatus);
router.delete("/me", authenticate, deleteMyAccount);

module.exports = router;
