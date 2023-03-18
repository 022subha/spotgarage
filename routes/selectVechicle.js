const express = require("express");
const {
  getBrandsCollection,
  getCity,
  getTheModelFuelType,
  getTheModelOfBrand,
  getTheNearestGarage,
  getTheNearestGarageService,
  insertGarageDataService,
} = require("../controller/selectVecController.js");
const router = express.Router();

router.route("/get-brands/:brandId").get(getBrandsCollection);
router.route("/get-model/:brand/:modelType").get(getTheModelOfBrand);
router.route("/get-model-fuel/:model").get(getTheModelFuelType);
router.route("/save-service").get(insertGarageDataService);
router.route("/get-garage").post(getTheNearestGarage);
router.route("/garage-service/:categoryId").post(getTheNearestGarageService);
router.route("/city").get(getCity);

module.exports = router;
