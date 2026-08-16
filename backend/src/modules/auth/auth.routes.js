const express = require("express");

const { registerLimiter, loginLimiter, forgotPasswordLimiter, resetPasswordLimiter, refreshTokenLimiter } = require("../../middlewares/rateLimit.middleware");
const validate = require("../../middlewares/validate.middleware");

const { registerSchema, loginSchema, changePasswordSchema, forgotPasswordSchema, resetPasswordSchema } = require("./auth.validation");

const { register, login, getMe, refreshToken, logout, changePassword, forgotPassword, resetPassword } = require("./auth.controller");

const authenticate = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registerLimiter, validate(registerSchema), register);
router.post("/login", loginLimiter, validate(loginSchema), login);
router.get("/me", authenticate, getMe);
router.post("/refresh", refreshTokenLimiter, refreshToken);
router.post("/logout", logout);
router.patch("/change-password", authenticate, validate(changePasswordSchema), changePassword);
router.post("/forgot-password", forgotPasswordLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", resetPasswordLimiter, validate(resetPasswordSchema), resetPassword);

module.exports = router;
