const express = require("express");
const {
  userOtpSend,
  userOtpVerify,
  userRegister,
} = require("../controller/customerAuthController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/user-register").post(userRegister);
router.route("/user-send-otp").post(userOtpSend);
router.route("/user-verify-otp").post(userOtpVerify);

module.exports = router;
