const express = require("express");
const { addGarage } = require("../controller/addGarageController.js");
const authMiddleware = require("../middlewares/authMiddleware.js");
const router = express.Router();

router.route("/add-garage").post(authMiddleware, addGarage);

module.exports = router;
