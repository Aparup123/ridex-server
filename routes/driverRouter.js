const express = require('express');
const { registerDriver, loginDriver } = require('../controllers/driver.controller');

const driverRouter = express.Router();

driverRouter.post('/register', registerDriver);
driverRouter.post('/login', loginDriver);

module.exports = driverRouter;