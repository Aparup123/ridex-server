const express = require('express');
const { registerDriver } = require('../controllers/driver.controller');

const driverRouter = express.Router();

driverRouter.post('/register', registerDriver);

module.exports = driverRouter;