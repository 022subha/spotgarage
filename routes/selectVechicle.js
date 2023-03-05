const express = require("express");
const router = express.Router();
const {getBrandsCollection, getTheModelOfBrand, getTheModelFuelType, insertGarageDataService, getTheNearestGarage , getCity, getTheNearestGarageService} = require('../controller/selectVecController');


router.route('/get-brands/:brandId').get(getBrandsCollection);
router.route('/get-model/:brand/:modelType').get(getTheModelOfBrand);
router.route('/get-model-fuel/:model').get(getTheModelFuelType);
router.route('/save-service').get(insertGarageDataService);
router.route('/get-garage').post(getTheNearestGarage);
router.route('/garage-service/:categoryId').post(getTheNearestGarageService);
router.route('/city').get(getCity);

module.exports = router;