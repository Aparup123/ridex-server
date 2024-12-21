const express= require('express');
const sendOtp = require('../../controllers/auth/auth.controller');

const authRouter=express.Router();

authRouter.post('/send-otp', sendOtp);

module.exports=authRouter;