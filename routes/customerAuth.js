const express = require("express");
const router = express.Router();
const {userRegister, userOtpSend , userOtpVerify, userLogin} = require('../controller/customerAuthController');

router.route('/user-register').post(userRegister);
router.route('/user-send-otp').post(userOtpSend);
router.route('/user-verify-otp').post(userOtpVerify);
router.route('/user-login').post(userLogin);

module.exports = router;