const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const expressBusboy = require("express-busboy");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");

const app = express();

// Setup busboy middleware
/* expressBusboy.extend(app, {
  upload: true,
  path: "/",
}); */
//* Middleware set-up
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// All routes controller imports
const addGarage = require("./routes/addGarage.js");
const customerAuth = require("./routes/customerAuth.js");
const selectVechicle = require("./routes/selectVechicle.js");

//* All routes setup
app.use("/api/auth", customerAuth);
app.use("/api", selectVechicle);
app.use("/api", addGarage);

module.exports = app;
