const express = require("express");
const router = express.Router();
const { addGarage } = require("../controller/addGarageController");
const { isAuthenticated } = require("../middlewares/authMiddleware");
router.route("/addGarage").post(addGarage);
module.exports = router;
