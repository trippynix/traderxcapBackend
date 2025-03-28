const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userSignUp");
const userLogInController = require("../controller/userLogIn");
const userDetailsController = require("../controller/userDetails");
const authToken = require("../middleware/authToken");
const editUserInfoController = require("../controller/editUserInfo");
const userLogoutController = require("../controller/userLogout");
const changePasswordController = require("../controller/changePassword");
const verifyUserController = require("../controller/verifyUser");
const verifyEmail = require("../controller/verifyEmail");
const forgotPassword = require("../controller/forgotPassword");
const resetPassword = require("../controller/resetPassword");

router.post("/signup", userSignUpController);
router.post("/login", userLogInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogoutController);
router.post("/edit-user", authToken, editUserInfoController);

// Update password
router.post("/change-password", authToken, changePasswordController);

// Verify user
router.get("/verify", authToken, verifyUserController);

// Verify email
router.post("/verify-email", verifyEmail);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

module.exports = router;
