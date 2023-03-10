const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//* Middleware set-up
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());

// All routes controller imports
const customerAuth = require("./routes/customerAuth");
const selectVechicle = require("./routes/selectVechicle");
const addGarage = require("./routes/addGarage");
const customerOrders = require("./routes/customerOrder");

//* All routes setup
app.use("/api/auth", customerAuth);
app.use("/api", selectVechicle);
app.use("/api", addGarage);
app.use("/api", customerOrders);

module.exports = app;
