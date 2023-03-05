const express = require('express');
const morgan = require("morgan");

const app = express();

//* Middleware set-up

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));


//* All routes controller imports
const selectVechicle = require('./routes/selectVechicle');
const customerAuth = require('./routes/customerAuth');


//* All routes setup
app.use('/api', selectVechicle);
app.use('/api/auth', customerAuth);

module.exports = app;