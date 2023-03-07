const express = require("express");
const router = express.Router();
const {
  customerOrders,
  updateStatus,
} = require("../controller/customerOrderController");

router.route("/customerOrders").get(customerOrders);
router.route("/updateOrderStatus").post(updateStatus);
module.exports = router;
